// view-cart/EmptyCartModal.jsx

import propTypes from "prop-types";

const EmptyCartModal = ({ handleEmptyCartCancel, handleEmptyCartConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="w-96 rounded-lg bg-white bg-opacity-90 p-6 text-black shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Confirm Empty Cart</h2>
        <p className="mb-4">Are you sure you want to empty your entire cart?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleEmptyCartCancel}
            className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleEmptyCartConfirm}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Empty Cart
          </button>
        </div>
      </div>
    </div>
  );
};

EmptyCartModal.propTypes = {
  handleEmptyCartCancel: propTypes.func.isRequired,
  handleEmptyCartConfirm: propTypes.func.isRequired,
};

export default EmptyCartModal;
