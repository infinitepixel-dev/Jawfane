//SquareMerchantSetup.jsx

/*
A component to setup the Square Merchant account
*/

//INFO React Libraries
import propTypes from "prop-types";

function SquareMerchantSetup({
  enabled,
  onSubmit,
  squareDetails,
  onDetailsChange,
}) {
  if (!enabled) return null;

  return (
    <div className="mt-8 bg-slate-300 bg-opacity-20 text-slate-200 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Square Merchant Details</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="merchant_id">
          Merchant ID
        </label>
        <input
          type="text"
          id="merchant_id"
          name="merchant_id"
          className="w-full rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 bg-slate-300 bg-opacity-20 text-slate-300 shadow-lg"
          value={squareDetails.merchant_id}
          onChange={onDetailsChange}
          placeholder="Enter Square Merchant ID"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium mb-1"
          htmlFor="application_id"
        >
          Application ID
        </label>
        <input
          type="text"
          id="application_id"
          name="application_id"
          className="w-full rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 bg-slate-300 bg-opacity-20 text-slate-300 shadow-lg"
          value={squareDetails.application_id}
          onChange={onDetailsChange}
          placeholder="Enter Square Application ID"
        />
      </div>
      <button
        onClick={onSubmit}
        className="w-full bg-green-500 text-white p-2 rounded mt-4"
      >
        Save
      </button>
    </div>
  );
}

SquareMerchantSetup.propTypes = {
  enabled: propTypes.bool.isRequired,
  onSubmit: propTypes.func.isRequired,
  squareDetails: propTypes.shape({
    merchant_id: propTypes.string.isRequired,
    application_id: propTypes.string.isRequired,
  }).isRequired,
  onDetailsChange: propTypes.func.isRequired,
};

export default SquareMerchantSetup;
