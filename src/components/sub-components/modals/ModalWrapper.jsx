//ModalWrapper.jsx

import ReactDOM from "react-dom";

const ModalWrapper = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-md">
      {children}
    </div>,
    document.getElementById("modalWrapper-root") // Add this to index.html
  );
};

export default ModalWrapper;
