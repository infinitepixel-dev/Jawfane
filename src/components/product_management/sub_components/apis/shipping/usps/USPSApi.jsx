// USPSApi.jsx

/*
A component to fetch shipping rates from the USPS API
*/

//INFO React Libraries
import React, { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";

//INFO API Libraries
import axios from "axios";

const USPSRate = React.memo(function USPSRate({
  storeId,
  cartItems,
  setCartTotal,
  setShippingAndTaxTotal,
}) {
  // console.log("Store ID:", storeId);
  // console.log("Products in Cart:", cartItems);

  const apiUrl = "https://vps.infinitepixel.dev:3050";

  // State variables to store rates, errors, and access tokens
  const [rates, setRates] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [selectedRate, setSelectedRate] = useState(null); // State to keep track of selected shipping rate

  // Reference for animations
  const shippingRef = useRef(null);

  //INFO Utility function to parse product dimensions from a string
  const parseDimensions = (dimensions) => {
    // Expected format: "10x5x2 cm"
    const [length, width, height] = dimensions
      .split("x")
      .map((dim) => parseFloat(dim));
    return { length, width, height };
  };

  //INFO Utility function to aggregate product data
  const aggregateProductData = (products) => {
    let totalWeight = 0;
    let maxDimensions = { length: 0, width: 0, height: 0 };

    products.forEach((product) => {
      console.log("Product:", product);

      // Parse weight and dimensions
      const productWeight = parseFloat(product.product_weight);
      const { length, width, height } = parseDimensions(
        product.product_dimensions
      );

      // Sum up the total weight
      totalWeight += productWeight * product.quantity;

      // Calculate max dimensions for shipping
      maxDimensions.length = Math.max(maxDimensions.length, length);
      maxDimensions.width = Math.max(maxDimensions.width, width);
      maxDimensions.height += height; // Sum up the heights if stacked
    });

    return {
      weight: totalWeight,
      length: maxDimensions.length,
      width: maxDimensions.width,
      height: maxDimensions.height,
    };
  };

  //INFO Utility function to create a request body for USPS API
  const createRequestBody = (
    aggregateData,
    method,
    originZIP,
    destinationZIP
  ) => ({
    originZIPCode: originZIP,
    destinationZIPCode: destinationZIP,
    weight: aggregateData.weight,
    length: aggregateData.length,
    width: aggregateData.width,
    height: aggregateData.height,
    mailClass: method, // e.g., "PRIORITY_MAIL", "FIRST-CLASS_PACKAGE_SERVICE"
    processingCategory: "NON_MACHINABLE", // Adjust based on requirements
    rateIndicator: "DR", // Default for flat rate, adjust as needed
    destinationEntryFacilityType: "NONE",
    priceType: "RETAIL",
  });

  //INFO Utility function to fetch all shipping rates for multiple USPS methods
  const fetchAllRates = async (aggregateData) => {
    const methods = [
      "PRIORITY_MAIL",
      "FIRST-CLASS_PACKAGE_SERVICE", // Fixed the mailClass value
      "PRIORITY_MAIL_EXPRESS",
    ];
    const originZIP = "90210"; // Example origin ZIP
    const destinationZIP = "37087"; // Example destination ZIP

    // Fetch rates for all shipping methods in parallel
    const rates = await Promise.all(
      methods.map(async (method) => {
        const requestBody = createRequestBody(
          aggregateData,
          method,
          originZIP,
          destinationZIP
        );

        try {
          const response = await axios.post(`${apiUrl}/api/usps/rate`, {
            requestBody,
            accessToken, // Assume you have the access token available
          });
          return { method, rate: parseFloat(response.data.totalBasePrice) }; // Ensure rate is a number
        } catch (error) {
          console.error(`Error fetching rate for ${method}:`, error);
          return { method, rate: null };
        }
      })
    );

    return rates;
  };

  //INFO Fetch the access token when the component mounts
  useEffect(() => {
    const getAccessToken = async () => {
      if (!storeId) {
        console.error("Store ID not provided.");
        return;
      }
      try {
        // console.log("Store ID:", storeId);

        // Call your backend to get the access token with storeId
        const response = await axios.post(`${apiUrl}/api/usps/token`, {
          storeId: storeId,
        });
        return response.data.access_token;
      } catch (error) {
        console.error("Error fetching access token:", error);
        throw new Error("Unable to fetch access token");
      }
    };

    getAccessToken().then((token) => {
      setAccessToken(token);
    });
  }, [storeId, apiUrl]);

  //INFO Initialize animations when the component mounts
  useEffect(() => {
    if (shippingRef.current) {
      gsap.to(shippingRef.current, { x: 0, duration: 1 });
    } else {
      console.error("GSAP target not found.");
    }
  }, []);

  //INFO Function to get shipping rates based on aggregated product data
  const getShippingRates = async () => {
    console.log("Getting Shipping Rates...");

    // Collect and aggregate product data from the cart
    const aggregatedData = aggregateProductData(cartItems);

    try {
      const allRates = await fetchAllRates(aggregatedData);
      console.log("Shipping Rates:", allRates);

      // Update state with the fetched rates
      setRates(allRates);
    } catch (err) {
      console.error("Error fetching shipping rates:", err);
      setError("Error fetching shipping rates");
    }
  };

  //INFO Handler for selecting a shipping rate
  // const handleRateChange = (event) => {
  //   const selectedValue = event.target.value;
  //   setSelectedRate(selectedValue);

  //   // Update the cart total by adding the selected shipping rate to the cart subtotal
  //   const shippingRate = parseFloat(selectedValue);
  //   const cartSubtotal = cartItems.reduce(
  //     (total, item) => total + item.finalPrice * item.quantity,
  //     0
  //   );
  //   setCartTotal(cartSubtotal + shippingRate);
  //   setShippingAndTaxTotal(shippingRate);
  // };

  //REVIEW v2
  const handleRateChange = (event) => {
    const selectedValue = parseFloat(event.target.value);
    setSelectedRate(selectedValue);

    // Update the cart total and shipping total
    const cartSubtotal = cartItems.reduce(
      (total, item) => total + item.finalPrice * item.quantity,
      0
    );
    setCartTotal(cartSubtotal);
    setShippingAndTaxTotal(selectedValue);
  };

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <button
        ref={shippingRef}
        className="px-4 py-2 w-full md:w-auto flex items-center justify-center font-bold text-white bg-yellow-600 rounded-lg shadow hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        onClick={getShippingRates}
      >
        Get Shipping Rates
      </button>

      {/* Dropdown for selecting shipping rates */}
      <div className="w-full mt-4">
        {rates.length > 0 && (
          <select
            className="w-full md:w-auto p-2 text-slate-200 font-bold text-center rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-slate-500 hover:bg-slate-600 duration-150"
            value={selectedRate || ""}
            onChange={handleRateChange}
            aria-label="Select a shipping method"
          >
            <option value="">Select a shipping method</option>
            {rates.map((r, index) => (
              <option key={index} value={r.rate}>
                {/* if no rate display a no shiping methods foudn error */}
                {r.rate === null
                  ? "No shipping methods found"
                  : `${r.method} - $${r.rate.toFixed(2)}`}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Display any errors */}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
});

USPSRate.propTypes = {
  storeId: propTypes.number.isRequired,
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  setCartTotal: propTypes.func.isRequired,
  setShippingAndTaxTotal: propTypes.func.isRequired,
};

export default USPSRate;
