//StripeMerchantSetup.jsx

//INFO React Libraries
import propTypes from "prop-types";

//INFO Icons
// eslint-disable-next-line no-unused-vars
import { FaStripe } from "react-icons/fa";

function StripeMerchantSetup({
  enabled,
  onSubmit,
  stripeDetails,
  onDetailsChange,
}) {
  if (!enabled) return null;

  return (
    <div className="mt-8 bg-slate-300 bg-opacity-20 text-slate-200 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Stripe Merchant Details</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="merchant_id">
          Merchant ID
        </label>
        <input
          type="text"
          id="merchant_id"
          name="merchant_id"
          className="w-full rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 bg-slate-300 bg-opacity-20 text-slate-300 shadow-lg"
          value={stripeDetails.merchant_id}
          onChange={onDetailsChange}
          placeholder="Enter Stripe Merchant ID"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="api_key">
          API Key
        </label>
        <input
          type="text"
          id="api_key"
          name="api_key"
          className="w-full rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 bg-slate-300 bg-opacity-20 text-slate-300 shadow-lg"
          value={stripeDetails.api_key}
          onChange={onDetailsChange}
          placeholder="Enter Stripe API Key"
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

StripeMerchantSetup.propTypes = {
  enabled: propTypes.bool.isRequired,
  onSubmit: propTypes.func.isRequired,
  stripeDetails: propTypes.shape({
    merchant_id: propTypes.string.isRequired,
    api_key: propTypes.string.isRequired,
  }).isRequired,
  onDetailsChange: propTypes.func.isRequired,
};

export default StripeMerchantSetup;
