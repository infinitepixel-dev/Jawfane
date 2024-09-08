//Shipping.jsx

/*
A component to manage shipping options available to the store
*/

//INFO React Libraries
import { useState, useRef, useLayoutEffect } from "react";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";

//INFO Sub-components
import FlatRateShipping from "@components/product_management/sub_components/apis/shipping/FlatRateShipping";

//INFO Widgets
import AnimatedCheckbox from "@components/product_management/sub_components/widgets/AnimatedCheckbox";

function Shipping({ storeId }) {
  // console.log("Shipping:", storeId);

  const [shippingOptions, setShippingOptions] = useState({
    flatRate: true, //for dev set to true for force enable
  });

  // Refs for GSAP animations
  const flatRateRef = useRef(null); //For Dev set to true or false null
  const flatRateCheckboxRef = useRef(null);

  //INFO Run GSAP animation for the shipping options when they are rendered
  useLayoutEffect(() => {
    if (shippingOptions.flatRate && flatRateRef.current) {
      gsap.from(flatRateRef.current, { opacity: 0, y: -20, duration: 0.5 });
    }
  }, [shippingOptions.flatRate]);

  //INFO Custom checkbox animation for flat rate shipping
  useLayoutEffect(() => {
    if (flatRateCheckboxRef.current) {
      gsap.to(flatRateCheckboxRef.current, {
        backgroundColor: shippingOptions.flatRate ? "#10b981" : "#4b5563",
        duration: 0.3,
      });
    }
  }, [shippingOptions.flatRate]);

  //ANCHOR Toggle shipping option
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
          <AnimatedCheckbox
            isSelected={shippingOptions.flatRate}
            onSelect={() => toggleShipping("flatRate")}
          />
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
      </div>
    </div>
  );
}

Shipping.propTypes = {
  storeId: propTypes.number.isRequired,
};

export default Shipping;
