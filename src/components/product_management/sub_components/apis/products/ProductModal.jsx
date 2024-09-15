import { useRef, useEffect } from "react";
import propTypes from "prop-types";

import ImageUtility from "@utilities_product_management/ImageUtility";

const ProductModal = ({ isOpen, product, handleClose }) => {
  const modalRef = useRef(null);

  // Destructure the method from ImageUtility
  const { convertBlobToBase64 } = ImageUtility();

  useEffect(() => {
    // Function to handle clicks outside of the modal
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    // Add event listeners and disable scrolling when the modal is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Disable scrolling outside the modal
    } else {
      document.body.style.overflow = ""; // Reset overflow when modal is closed
    }

    // Clean up event listeners and reset overflow on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = ""; // Reset overflow
    };
  }, [isOpen, handleClose]);

  // Return null if modal is not open or product is not provided
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-md transition duration-500"
      style={{
        zIndex: 1000,
      }}
    >
      <div
        ref={modalRef}
        className="relative p-4 bg-white rounded-lg shadow-lg"
      >
        <button onClick={handleClose} className="absolute top-2 right-2">
          &times;
        </button>
        <img
          src={product.image_url || convertBlobToBase64(product.image)}
          alt={product.title}
          className="w-min object-contain"
          style={{ minHeight: "50vh" }}
        />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    </div>
  );
};

// Define prop types for the component
ProductModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  product: propTypes.object,
  handleClose: propTypes.func.isRequired,
};

export default ProductModal;
