// AddProductForm.jsx

/*
A form component to add a new product with AlertModal integration
*/

// INFO: React Libraries
import { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";

// INFO: GSAP for animations
import { gsap } from "gsap";

// INFO: Sub-Components
import AlertModal from "@widgets_product_management/AlertModal";

function AddProductForm({ storeId, setProducts }) {
  console.log("AddProductForm storeId: ", storeId);

  // Initial form data extracted for reusability
  const initialFormData = {
    title: "",
    price: 0.0,
    quantity: 0,
    description: "",
    category: "",
    product_id: "",
    created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    image_url: "",
    image: null,
    product_weight: 0.0,
    weight_unit: "",
    product_dimensions: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    status: 1,
    featured: 0,
    sale: 0,
    discount_price: 0.0,
    discount_start: null,
    discount_end: null,
  };

  // State for form data
  const [formData, setFormData] = useState(initialFormData);

  // Track selected image type ('file' or 'url')
  const [selectedImageType, setSelectedImageType] = useState("file");

  // For image preview
  const [preview, setPreview] = useState("");

  // State for AlertModal visibility and message
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Ref for GSAP animations
  const formRef = useRef(null);

  // Handle file input change and image compression
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const img = document.createElement("img");
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while preserving aspect ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to blob and update formData
        canvas.toBlob(
          (blob) => {
            setFormData({ ...formData, image: blob });
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(blob);
          },
          file.type,
          0.9 // Optional: Adjust image quality
        );
      };
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `https://vps.infinitepixel.dev:3082/api/products`;

    // Prepare form data for submission
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    });

    console.log("Form data:", formData);

    //if no discount_start dates are set, set them to null
    if (formData.discount_start === "") {
      data.set("discount_start", null);
    }

    if (formData.discount_end === "") {
      data.set("discount_end", null);
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          store_id: storeId,
        },
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);

        // Show error message in AlertModal
        setAlertMessage(
          `Error: ${errorData.message || "Failed to add product."}`
        );
        setShowAlertModal(true);
      } else {
        // Get the new product ID from the response
        const { id } = await response.json();

        // Build the new product object
        const newProduct = {
          id,
          ...formData,
        };

        // Update the products state
        setProducts((prevProducts) => [...prevProducts, newProduct]);

        // Show success message in AlertModal
        setAlertMessage("Product added successfully!");
        setShowAlertModal(true);

        // Reset form data and preview
        setFormData(initialFormData);
        setPreview("");
      }
    } catch (err) {
      console.error("Fetch error:", err);

      // Show generic error message in AlertModal
      setAlertMessage("An error occurred while adding the product.");
      setShowAlertModal(true);
    }
  };

  // GSAP animation on form load
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="relative">
      {/* AlertModal */}
      {showAlertModal && (
        <AlertModal
          message={alertMessage}
          closeModal={() => setShowAlertModal(false)}
        />
      )}

      {/* Form */}
      <form
        className="mx-auto max-w-3xl rounded-lg bg-slate-700 p-8 text-white shadow-lg"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <h2 className="mb-6 text-center text-3xl font-bold">Add New Product</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          />

          {/* Category */}
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Meta Title */}
          <input
            type="text"
            placeholder="Meta Title"
            value={formData.meta_title}
            onChange={(e) =>
              setFormData({ ...formData, meta_title: e.target.value })
            }
            className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Meta Description */}
          <textarea
            placeholder="Meta Description"
            value={formData.meta_description}
            onChange={(e) =>
              setFormData({
                ...formData,
                meta_description: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          />

          {/* Meta Keywords */}
          <input
            type="text"
            placeholder="Meta Keywords"
            value={formData.meta_keywords}
            onChange={(e) =>
              setFormData({
                ...formData,
                meta_keywords: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Additional form fields can be added here */}
        </div>

        <div className="my-6">
          {/* Radio buttons to select between Image URL and File Upload */}
          <div className="flex justify-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="imageType"
                value="url"
                checked={selectedImageType === "url"}
                onChange={() => {
                  setSelectedImageType("url");
                  setFormData({
                    ...formData,
                    image: null,
                    image_url: "",
                  });
                  setPreview("");
                }}
              />
              <span>Image URL</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="imageType"
                value="file"
                checked={selectedImageType === "file"}
                onChange={() => {
                  setSelectedImageType("file");
                  setFormData({
                    ...formData,
                    image_url: "",
                    image: null,
                  });
                  setPreview("");
                }}
              />
              <span>Upload Image</span>
            </label>
          </div>

          {/* Conditionally render either the Image URL input or File input */}
          {selectedImageType === "file" ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-4 w-full rounded-lg border bg-white p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image_url: e.target.value,
                })
              }
              className="mt-4 w-full rounded-lg border bg-white p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Display image preview */}
        {preview && (
          <div className="my-6">
            <img
              src={preview}
              alt="Image preview"
              className="h-auto w-full rounded-lg"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

AddProductForm.propTypes = {
  storeId: propTypes.number.isRequired,
  setProducts: propTypes.func.isRequired,
};

export default AddProductForm;
