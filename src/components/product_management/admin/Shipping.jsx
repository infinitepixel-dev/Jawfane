// Shipping.jsx

/*
A component to manage shipping options available to the store
*/

// React Libraries
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import propTypes from "prop-types";

// Animation Libraries
import { gsap } from "gsap";

// Sub-components
import FlatRateShipping from "@apis_product_management/shipping/FlatRateShipping";
import USPSShipping from "@apis_product_management/shipping/usps/USPSShipping";
// Import other shipping components as needed

// Widgets
import AnimatedCheckbox from "@components/product_management/sub_components/widgets/AnimatedCheckbox";

function Shipping({ storeId }) {
  const apiURL = "http://66.128.253.47:3001";

  const [shippingOptions, setShippingOptions] = useState({});

  // Refs for GSAP animations
  const optionRefs = useRef([]);

  // Fetch shipping options from API
  useEffect(() => {
    const getShippingOptions = async () => {
      try {
        const res = await fetch(`${apiURL}/api/store/${storeId}/credentials`);
        const data = await res.json();
        setShippingOptions(data);
      } catch (err) {
        console.error(err);
      }
    };
    getShippingOptions();
  }, [storeId]);

  // Map service_name to components
  const shippingComponents = {
    "Flat Rate": FlatRateShipping,
    USPS: USPSShipping,
    // UPS: UPSShipping,
    // FedEx: FedExShipping,
    // ... add other mappings as needed
  };

  // Convert shippingOptions object to an array and filter it
  const shippingOptionsArray = Object.keys(shippingOptions)
    .filter((key) => !isNaN(key)) // Keep only numeric keys
    .map((key) => shippingOptions[key])
    .filter((option) => option.service_name in shippingComponents); // Filter out non-shipping providers

  // Toggle shipping option
  const toggleShipping = (service_name) => {
    setShippingOptions((prevOptions) => {
      const updatedOptions = JSON.parse(JSON.stringify(prevOptions)); // Deep copy
      Object.keys(updatedOptions).forEach((key) => {
        if (!isNaN(key) && updatedOptions[key].service_name === service_name) {
          const updatedServiceEnabled = !updatedOptions[key].service_enabled;
          updatedOptions[key].service_enabled = updatedServiceEnabled ? 1 : 0;
          updatedOptions[key].updated_at = new Date().toISOString();
          // Now make API call to update the service_enabled field
          updateServiceEnabled(updatedOptions[key]);
        }
      });
      return updatedOptions;
    });
  };

  // Function to update service_enabled in the database
  const updateServiceEnabled = async (credential) => {
    try {
      await fetch(
        `${apiURL}/api/store/${storeId}/credentials/${credential.service_name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        }
      );
      // console.log(
      //   `${credential.service_name} service_enabled updated to ${credential.service_enabled}`
      // );
    } catch (err) {
      console.error(
        `Error updating ${credential.service_name} service_enabled:`,
        err
      );
    }
  };

  // Run GSAP animations when options are rendered
  useLayoutEffect(() => {
    shippingOptionsArray.forEach((option, index) => {
      if (option.service_enabled && optionRefs.current[index]) {
        gsap.from(optionRefs.current[index], {
          opacity: 0,
          y: -20,
          duration: 0.5,
        });
      }
    });
  }, [shippingOptionsArray]);

  // Save shipping options to API (if needed)
  const saveShippingOptions = async () => {
    try {
      const res = await fetch(`${apiURL}/api/store/${storeId}/shipping`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shippingOptions),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  // console.log("Shipping Options:", shippingOptions);

  return (
    <div className="shipping p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h1 className="text-2xl font-semibold mb-4">Shipping Options</h1>
      <div className="shipping-options space-y-4">
        {shippingOptionsArray.map((option, index) => {
          const ShippingComponent = shippingComponents[option.service_name];

          return (
            <div
              key={option.id}
              className="shipping-option flex items-center space-x-4"
            >
              <AnimatedCheckbox
                isSelected={!!option.service_enabled}
                onSelect={() => toggleShipping(option.service_name)}
              />
              <label
                htmlFor={option.service_name}
                className="text-lg cursor-pointer"
                onClick={() => toggleShipping(option.service_name)}
              >
                {option.service_name} Shipping
              </label>
              {!!option.service_enabled && ShippingComponent && (
                <div
                  ref={(el) => (optionRefs.current[index] = el)}
                  className="mt-4 w-full"
                >
                  <ShippingComponent
                    storeId={storeId}
                    shippingOptions={shippingOptions}
                    setShippingOptions={setShippingOptions}
                    saveShippingOptions={saveShippingOptions}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Shipping.propTypes = {
  storeId: propTypes.number.isRequired,
};

export default Shipping;
