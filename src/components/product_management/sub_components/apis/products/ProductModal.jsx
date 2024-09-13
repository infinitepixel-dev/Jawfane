import { useRef, useEffect } from "react";
import propTypes from "prop-types";

const ProductModal = ({
  isOpen,
  product,
  handleClose,
  convertBlobToBase64,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClose]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-md transition duration-500">
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

ProductModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  product: propTypes.object,
  handleClose: propTypes.func.isRequired,
  convertBlobToBase64: propTypes.func.isRequired,
};

export default ProductModal;
