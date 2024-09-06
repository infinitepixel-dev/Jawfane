//FlatRateShipping.jsx

/*
A component to manage flat rate shipping
*/

//INFO React Libraries
import { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";

//TODO allow the component to update based on the shipping options from the API
// eslint-disable-next-line no-unused-vars
const FlatRateShipping = ({ getShippingOptions, saveShippingOptions }) => {
  const [shippingType, setShippingType] = useState("");
  const [flatRate, setFlatRate] = useState("");
  const [quantityBased, setQuantityBased] = useState([{ range: "", cost: "" }]);
  const [shippingMethodName, setShippingMethodName] = useState("");

  // Refs for GSAP animations
  const formRef = useRef(null);
  const flatRateRef = useRef(null);
  const quantityBasedRef = useRef(null);

  useEffect(() => {
    // Animate the form on initial load
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (shippingType === "flatRate") {
      gsap.from(flatRateRef.current, { opacity: 0, y: 20, duration: 0.5 });
    } else if (shippingType === "quantityBased") {
      gsap.from(quantityBasedRef.current, { opacity: 0, y: 20, duration: 0.5 });
    }
  }, [shippingType]);

  const handleShippingTypeChange = (e) => {
    setShippingType(e.target.value);
  };

  const handleAddRange = () => {
    setQuantityBased([...quantityBased, { range: "", cost: "" }]);
  };

  const handleRangeChange = (index, e) => {
    const updatedRanges = [...quantityBased];
    updatedRanges[index][e.target.name] = e.target.value;
    setQuantityBased(updatedRanges);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the data (save, send to API, etc.)
    console.log({
      shippingType,
      flatRate,
      quantityBased,
      shippingMethodName,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gray-900 rounded-lg shadow-lg text-slate-200 space-y-4"
      ref={formRef}
    >
      <div className="mb-4">
        <label className="block text-lg mb-2">Shipping Type:</label>
        <select
          value={shippingType}
          onChange={handleShippingTypeChange}
          className="w-full p-2 rounded bg-gray-800 text-gray-200"
        >
          <option value="">Select Shipping Type</option>
          <option value="flatRate">Flat Rate</option>
          <option value="quantityBased">Quantity Based</option>
        </select>
      </div>

      {shippingType === "flatRate" && (
        <div ref={flatRateRef} className="mb-4">
          <label className="block text-lg mb-2">Flat Rate:</label>
          <input
            type="number"
            value={flatRate}
            onChange={(e) => setFlatRate(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-gray-200"
          />
        </div>
      )}

      {shippingType === "quantityBased" && (
        <div ref={quantityBasedRef} className="space-y-4 mb-4">
          <label className="block text-lg mb-2">Quantity-Based Shipping:</label>
          {quantityBased.map((item, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                name="range"
                placeholder="Range (e.g., 1-5)"
                value={item.range}
                onChange={(e) => handleRangeChange(index, e)}
                className="w-full p-2 rounded bg-gray-800 text-gray-200"
              />
              <input
                type="number"
                name="cost"
                placeholder="Cost"
                value={item.cost}
                onChange={(e) => handleRangeChange(index, e)}
                className="w-full p-2 rounded bg-gray-800 text-gray-200"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddRange}
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Add Range
          </button>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-lg mb-2">Shipping Method Name:</label>
        <input
          type="text"
          value={shippingMethodName}
          onChange={(e) => setShippingMethodName(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-gray-200"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
      >
        Save Shipping Method
      </button>
    </form>
  );
};

FlatRateShipping.propTypes = {
  getShippingOptions: propTypes.func.isRequired,
  saveShippingOptions: propTypes.func.isRequired,
};

export default FlatRateShipping;
