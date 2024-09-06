//AlertModal.jsx

/*
A modal component to display alerts to the user
*/

//INFO React Libraries
import { useRef, useEffect } from "react";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";

const AlertModal = ({ message, closeModal }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Animate modal appearance
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5 }
    );
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="p-6 bg-gray-400 bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg"
      >
        <p className="mb-4 text-lg">{message}</p>
        <button
          onClick={closeModal}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>
  );
};

AlertModal.propTypes = {
  message: propTypes.string.isRequired,
  closeModal: propTypes.func.isRequired,
};

export default AlertModal;
