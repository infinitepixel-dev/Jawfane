//ProductUtility.jsx

//INFO React Libraries
import { useState } from "react";

//INFO Animation Libraries
import { gsap } from "gsap";

function ProductsUtility(storeId) {
  const [editProduct, setEditProduct] = useState(null);

  // State for AlertModal visibility and message
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Edit product handler
  const handleEditClick = (
    product,
    setEditedData,
    setImageOption,
    setImageUrl,
    setImageFile
  ) => {
    setEditedData({
      id: product.id,
      title: product.title ?? "",
      price: product.price ?? "",
      quantity: product.quantity ?? "",
      description: product.description ?? "",
      category: product.category ?? "",
      product_id: product.product_id ?? "",
      // created_at: product.created_at ?? null,
      image_url: product.image_url ?? "",
      image: product.image ?? "",
      product_weight: product.product_weight ?? "",
      weight_unit: product.weight_unit ?? "",
      product_dimensions: product.product_dimensions ?? "",
      meta_title: product.meta_title ?? "",
      meta_description: product.meta_description ?? "",
      meta_keywords: product.meta_keywords ?? "",
      status: product.status ?? "",
      featured: product.featured ?? "",
      sale: product.sale ?? "",
      discount_price: product.discount_price ?? "",
      discount_start: product.discount_start ?? null,
      discount_end: product.discount_end ?? null,
    });
    setImageOption(product.image_url ? "image_url" : "image_upload" ?? "");
    setImageUrl(product.image_url ?? "");
    setImageFile(null);
    setEditProduct(product.id);
  };
  const [modalMessage, setModalMessage] = useState("");

  // Input change handler for form fields
  const handleInputChange = (e, setEditedData) => {
    // console.log('handleInputChange...')

    const { name, value } = e.target;
    // console.log(`Changing ${name} to ${value}`)
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value ?? "", // Ensure that the value is never undefined
    }));
  };

  // Save product changes
  const handleSave = async (
    id,
    apiUrl,
    editedData,
    fetchProducts,
    imageOption,
    imageFile,
    imageUrl
  ) => {
    console.log("Saving changes...", id);
    const updateUrl = `${apiUrl}/api/products/${id}`;
    const formData = new FormData();

    // Add form data excluding image_url
    for (const key in editedData) {
      // console.log("Edited data:", editedData);

      if (key !== "image_url") {
        formData.append(key, editedData[key]);
      }
    }

    // Add image file or URL based on the selected option
    if (imageOption === "image_upload" && imageFile) {
      formData.append("image", imageFile);
    } else if (imageOption === "image_url" && imageUrl) {
      //determine of image is a url and if so show the alert model and return
      if (!imageUrl.includes("http") || !imageUrl.includes("https")) {
        setModalMessage("Please enter a valid image URL");
        return;
      }

      formData.append("image_url", imageUrl);
    }

    try {
      console.log("Store id:", storeId);
      console.log("Form data:", formData);

      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          store_id: storeId,
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);

        // Show error message in AlertModal
        setAlertMessage(
          `Error: ${errorData.message || "Failed to update product."}`
        );
        setShowAlertModal(true);
      } else {
        // Show success message in AlertModal
        setAlertMessage("Product updated successfully!");
        setShowAlertModal(true);

        setEditProduct(null);

        await fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Cancel editing mode
  const handleCancel = (setEditedData, setImageFile, setImageUrl) => {
    setEditProduct(null);
    setEditedData({
      title: "",
      price: "",
      quantity: "",
      description: "",
      category: "",
      product_id: "",
      created_at: null,
      image_url: "",
      image: "",
      product_weight: "",
      weight_unit: "",
      product_dimensions: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      status: "",
      featured: "",
      sale: "",
      discount_price: "",
      discount_start: null,
      discount_end: null,
    });
    setImageFile(null);
    setImageUrl("");
  };

  // Handle trash icon animation on click (turn and shake)
  const handleDeleteClick = (id, index, setSelectedProduct, setShowModal) => {
    setSelectedProduct({ id, index });
    setShowModal(true); // Show the modal when delete is clicked
  };

  //Not used in place of bulk deleting
  const confirmDelete = async (
    selectedProduct,
    trashIconRefs,
    handleDelete,
    cardRefs,
    setShowModal,
    setSelectedProduct
  ) => {
    if (selectedProduct) {
      // Trash icon animation
      await gsap.to(trashIconRefs.current[selectedProduct.index], {
        rotate: 90,
        repeat: 3,
        yoyo: true,
        duration: 0.1,
      });

      // Proceed with deletion

      handleDelete(
        selectedProduct.id,
        selectedProduct.index,
        trashIconRefs,
        cardRefs
      );
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  const closeModal = (setShowModal) => {
    setShowModal(false);
  };

  //returns functions to be used in other components
  return {
    editProduct,
    handleEditClick,
    handleInputChange,
    handleSave,
    handleCancel,
    handleDeleteClick,
    confirmDelete,
    closeModal,
    modalMessage,
    showAlertModal,
    setShowAlertModal,
    alertMessage,
  };
}

export default ProductsUtility;
