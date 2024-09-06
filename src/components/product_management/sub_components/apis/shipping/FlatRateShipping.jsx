// FlatRateShipping.jsx

/*
A component to manage flat rate and quantity-based shipping with GSAP animations
*/

//INFO React Libraries
import { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";

//INFO Sub-components
import AlertModal from "@widgets_product_management/AlertModal";

// Main FlatRateShipping component
// eslint-disable-next-line no-unused-vars
const FlatRateShipping = ({ getShippingOptions, saveShippingOptions }) => {
  const [shippingType, setShippingType] = useState("");
  const [flatRate, setFlatRate] = useState("");
  const [quantityBased, setQuantityBased] = useState([
    { methodName: "", lowEnd: "", highEnd: "", cost: "", isEditing: true }, // Initial row is in edit mode
  ]);
  const [shippingMethodName, setShippingMethodName] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // Refs for GSAP animations
  const formRef = useRef(null);
  const flatRateRef = useRef(null);
  const quantityBasedRef = useRef(null);

  useEffect(() => {
    // Animate form appearance
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

  // Add a new range row with editing enabled initially
  const handleAddRange = () => {
    setQuantityBased([
      ...quantityBased,
      { methodName: "", lowEnd: "", highEnd: "", cost: "", isEditing: true },
    ]);
  };

  // Handle input changes for range fields
  const handleRangeChange = (index, e) => {
    const updatedRanges = [...quantityBased];
    updatedRanges[index][e.target.name] = e.target.value;
    setQuantityBased(updatedRanges);
  };

  // Toggle edit mode for a range
  const handleEditRange = (index) => {
    const updatedRanges = [...quantityBased];
    updatedRanges[index].isEditing = !updatedRanges[index].isEditing;
    setQuantityBased(updatedRanges);
  };

  // Remove a range row
  const handleRemoveRange = (index) => {
    const updatedRanges = quantityBased.filter((_, i) => i !== index);
    setQuantityBased(updatedRanges);
  };

  // Display modal with message
  const showModal = (message) => {
    setModalMessage(message);
  };

  // Close modal
  const closeModal = () => {
    setModalMessage("");
  };

  // Check if the provided number is a whole number
  const isWholeNumber = (num) => Number.isInteger(parseFloat(num));

  // Validate if the range overlaps with others or is out of order
  const isRangeValid = (lowEnd, highEnd, index) => {
    const newLow = parseInt(lowEnd, 10);
    const newHigh = parseInt(highEnd, 10);

    if (
      !isWholeNumber(newLow) ||
      !isWholeNumber(newHigh) ||
      newLow >= newHigh
    ) {
      return false;
    }

    for (let i = 0; i < quantityBased.length; i++) {
      if (i !== index) {
        const oldLow = parseInt(quantityBased[i].lowEnd, 10);
        const oldHigh = parseInt(quantityBased[i].highEnd, 10);

        if (
          (newLow >= oldLow && newLow <= oldHigh) ||
          (newHigh >= oldLow && newHigh <= oldHigh)
        ) {
          return false;
        }

        if (i === index - 1 && newLow !== oldHigh + 1) {
          return false;
        }
      }
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all ranges
    const invalidRange = quantityBased.some(
      (item, index) => !isRangeValid(item.lowEnd, item.highEnd, index)
    );

    if (invalidRange) {
      showModal("One or more ranges are overlapping or not sequential.");
      return;
    }

    // Process the data (save, send to API, etc.)
    saveShippingOptions({
      shippingType,
      flatRate,
      quantityBased,
      shippingMethodName,
    });
  };

  return (
    <>
      {modalMessage && (
        <AlertModal message={modalMessage} closeModal={closeModal} />
      )}
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 bg-gray-900 rounded-lg shadow-lg text-slate-200"
        ref={formRef}
        aria-label="Flat Rate Shipping Form"
      >
        <div className="mb-4">
          <label className="block mb-2 text-lg" htmlFor="shippingType">
            Shipping Type:
          </label>
          <select
            id="shippingType"
            value={shippingType}
            onChange={handleShippingTypeChange}
            className="w-full p-2 text-gray-200 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-required="true"
          >
            <option value="">Select Shipping Type</option>
            <option value="flatRate">Flat Rate</option>
            <option value="quantityBased">Quantity Based</option>
          </select>
        </div>

        {shippingType === "flatRate" && (
          <div ref={flatRateRef} className="mb-4">
            <label className="block mb-2 text-lg" htmlFor="flatRate">
              Flat Rate:
            </label>
            <input
              id="flatRate"
              type="number"
              value={flatRate}
              onChange={(e) => setFlatRate(e.target.value)}
              className="w-full p-2 text-gray-200 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-required="true"
            />
          </div>
        )}

        {shippingType === "quantityBased" && (
          <div ref={quantityBasedRef} className="mb-4 space-y-4">
            <label className="block mb-2 text-lg">
              Quantity-Based Shipping:
            </label>
            {quantityBased.map((item, index) => (
              <div key={index} className="space-y-2">
                {item.isEditing ? (
                  <>
                    <input
                      type="text"
                      name="methodName"
                      placeholder="Method Name"
                      value={item.methodName}
                      onChange={(e) => handleRangeChange(index, e)}
                      className="w-full p-2 text-gray-200 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      aria-required="true"
                    />
                    <div className="flex space-x-4">
                      <input
                        type="number"
                        name="lowEnd"
                        placeholder="Low End (e.g., 1)"
                        value={item.lowEnd}
                        onChange={(e) => handleRangeChange(index, e)}
                        className="w-full p-2 text-gray-200 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                        aria-required="true"
                      />
                      <input
                        type="number"
                        name="highEnd"
                        placeholder="High End (e.g., 5)"
                        value={item.highEnd}
                        onChange={(e) => {
                          if (
                            isRangeValid(item.lowEnd, e.target.value, index)
                          ) {
                            handleRangeChange(index, e);
                          } else {
                            showModal(
                              "Range overlaps or is invalid. Ensure the new range does not overlap and is sequential."
                            );
                          }
                        }}
                        className="w-full p-2 text-gray-200 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                        aria-required="true"
                      />
                    </div>
                    <input
                      type="number"
                      name="cost"
                      placeholder="Cost"
                      value={item.cost}
                      onChange={(e) => handleRangeChange(index, e)}
                      className="w-full p-2 text-gray-200 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      aria-required="true"
                    />
                    <button
                      type="button"
                      onClick={() => handleEditRange(index)}
                      className="px-2 py-1 text-sm text-black bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <p className="text-lg">{item.methodName}</p>
                      {item.methodName && (
                        <button
                          type="button"
                          onClick={() => handleEditRange(index)}
                          className="px-2 py-1 text-sm text-white bg-yellow-600 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          aria-label="Edit range"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="flex justify-between space-x-4">
                      <p>
                        {item.lowEnd} - {item.highEnd}
                      </p>
                      <p>{item.cost} USD</p>
                    </div>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveRange(index)}
                  className="px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label="Delete range"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddRange}
              className="px-4 py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Add new range"
            >
              Add New Row
            </button>
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2 text-lg" htmlFor="shippingMethodName">
            Shipping Method Name:
          </label>
          <input
            id="shippingMethodName"
            type="text"
            value={shippingMethodName}
            onChange={(e) => setShippingMethodName(e.target.value)}
            className="w-full p-2 text-gray-200 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-required="true"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-purple-900 rounded hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-label="Save shipping method"
        >
          Save Shipping Method
        </button>
      </form>
    </>
  );
};

FlatRateShipping.propTypes = {
  getShippingOptions: propTypes.func.isRequired,
  saveShippingOptions: propTypes.func.isRequired,
};

export default FlatRateShipping;
