//Shipping.jsx

/*
A component to manage shipping options available to the store
*/

//INFO React Libraries
import { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";

//INFO Sub-components
import FlatRateShipping from "@components/product_management/sub_components/apis/shipping/FlatRateShipping";

function Shipping({ storeId }) {
  console.log("Shipping:", storeId);

  const [shippingOptions, setShippingOptions] = useState({
    flatRate: true, //for dev set to true for force enable
  });

  // Refs for GSAP animations
  const flatRateRef = useRef(null); //For Dev set to true or false null
  const flatRateCheckboxRef = useRef(null);

  useEffect(() => {
    // Animate the shipping options when they become visible
    if (shippingOptions.flatRate) {
      gsap.from(flatRateRef.current, { opacity: 0, y: -20, duration: 0.5 });
    }
  }, [shippingOptions]);

  useEffect(() => {
    // Custom checkbox animation for flat rate shipping
    if (shippingOptions.flatRate) {
      gsap.to(flatRateCheckboxRef.current, {
        backgroundColor: "#10b981",
        duration: 0.3,
      });
    } else {
      gsap.to(flatRateCheckboxRef.current, {
        backgroundColor: "#4b5563",
        duration: 0.3,
      });
    }
  }, [shippingOptions.flatRate]);

  const toggleShipping = (shippingType) => {
    setShippingOptions((prev) => ({
      ...prev,
      [shippingType]: !prev[shippingType],
    }));
  };

  //ANCHOR GET request to the API to get the shipping options
  const getShippingOptions = async () => {
    await fetch(`/api/store/${storeId}/shipping`)
      .then(async (res) => await res.json())
      .then((data) => setShippingOptions(data))
      .catch((err) => console.error(err));
  };

  //ANCHOR POST request to the API to save the shipping options
  const saveShippingOptions = async () => {
    fetch(`/api/store/${storeId}/shipping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shippingOptions),
    })
      .then(async (res) => await res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="shipping p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h1 className="text-2xl font-semibold mb-4">Shipping Options</h1>
      <div className="shipping-options space-y-4">
        {/* Flat Rate Shipping */}
        <div className="shipping-option flex items-center space-x-4">
          <div
            ref={flatRateCheckboxRef}
            onClick={() => toggleShipping("flatRate")}
            className={`w-6 h-6 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
              shippingOptions.flatRate ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            {shippingOptions.flatRate && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            )}
          </div>
          <label
            htmlFor="flatRate"
            className="text-lg cursor-pointer"
            onClick={() => toggleShipping("flatRate")}
          >
            Flat Rate Shipping
          </label>
          {shippingOptions.flatRate && (
            <div ref={flatRateRef} className="mt-4 w-full">
              <FlatRateShipping
                getShippingOptions={getShippingOptions}
                saveShippingOptions={saveShippingOptions}
              />
            </div>
          )}
        </div>

        {/*  */}
      </div>
    </div>
  );
}

Shipping.propTypes = {
  storeId: propTypes.number.isRequired,
};

export default Shipping;
