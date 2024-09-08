//Payments.jsx

/*
A component to manage payment available to the store
*/

//INFO React Libraries
import { useState } from "react";
import propTypes from "prop-types";

//React Animation Libraries
import { gsap } from "gsap";

//React Icons;
import { FaStripe, FaPaypal } from "react-icons/fa";
import SquarePayLogo from "/images/logos/Square_Jewel_Black.svg";

function Payments({ storeId }) {
  const [enabledPayments, setEnabledPayments] = useState({
    stripe: false,
    paypal: false,
    square: false,
  });

  const [squareDetails, setSquareDetails] = useState({
    merchant_id: "",
    application_id: "",
  });

  const paymentOptions = {
    stripe: {
      label: "Stripe",
      icon: <FaStripe size={75} />,
      color: "#635BFF",
      ariaLabel: "Stripe Payment Option",
    },
    paypal: {
      label: "PayPal",
      icon: <FaPaypal size={75} />,
      color: "#00457C",
      ariaLabel: "PayPal Payment Option",
    },
    square: {
      label: "Square",
      icon: SquarePayLogo,
      color: "#28A745",
      ariaLabel: "Square Payment Option",
    },
  };

  // Toggle function for payment processor
  const togglePayment = (paymentType) => {
    setEnabledPayments((prev) => ({
      ...prev,
      [paymentType]: !prev[paymentType],
    }));

    const iconElement = document.querySelector(`.${paymentType}-icon`);

    // GSAP animation to apply the brand color when enabled, and #666666 when disabled
    const isEnabled = !enabledPayments[paymentType];
    const targetColor = isEnabled
      ? paymentOptions[paymentType].color
      : "#666666";

    gsap.to(iconElement, {
      duration: 0.5,
      ease: "power2.inOut",
      fill: targetColor, // assuming it's a `fill` color SVG. Change to `stroke` if necessary
      opacity: isEnabled ? 1 : 0.5, // Opacity fades in when enabled, fades out when disabled
      filter: isEnabled ? "none" : "grayscale(100%)", // Apply grayscale filter when disabled
    });
  };

  const handleSquareDetailsChange = (e) => {
    const { name, value } = e.target;
    setSquareDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  //v2
  const handleSubmit = () => {
    if (enabledPayments.square) {
      console.log(
        "Store Id:",
        storeId,
        "Square Payment Details:",
        squareDetails
      );

      const originalUrl = window.location.href;
      const authUrl = `http://localhost:3040/connect?storeId=${storeId}&merchant_id=${
        squareDetails.merchant_id
      }&application_id=${
        squareDetails.application_id
      }&originalUrl=${encodeURIComponent(originalUrl)}`;

      // Open a new popup window for the OAuth flow
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const oauthPopup = window.open(
        authUrl,
        "SquareOAuthPopup",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      // Poll the popup window to check if it's closed and handle the result
      const pollOAuthPopup = setInterval(() => {
        if (oauthPopup.closed) {
          clearInterval(pollOAuthPopup);
          // Handle the token retrieval after authentication
          console.log(
            "OAuth popup closed. You can now handle the token response."
          );
          // Here you can trigger a function to fetch stored tokens or handle the next steps
        }
      }, 500);
    }
  };

  //v1
  // const handleSubmit = () => {
  //   if (enabledPayments.square) {
  //     // Handle saving or processing squareDetails
  //     console.log(
  //       "Store Id:",
  //       storeId,
  //       "Square Payment Details:",
  //       squareDetails
  //     );

  //     let originalUrl = window.location.href;

  //     // Corrected URL formation using & for multiple query params
  //     window.location.href = `http://localhost:3040/connect?storeId=${storeId}&merchant_id=${squareDetails.merchant_id}&application_id=${squareDetails.application_id}&originalUrl=${originalUrl}`;
  //   }
  // };

  // Function to handle key presses for accessibility
  const handleKeyPress = (e, paymentType) => {
    if (e.key === "Enter") {
      togglePayment(paymentType);
    }
  };

  // Function to convert color to CSS filter (for colorizing SVGs)
  const applyColorFilter = (color) => {
    return color === "#28A745" // Check if the color is Square's brand color.
      ? "invert(62%) sepia(55%) saturate(556%) hue-rotate(73deg) brightness(93%) contrast(94%)"
      : "none"; // Fallback if the color doesn't match
  };

  return (
    <div className="container-fluid bg-slate-200 bg-opacity-10 rounded-lg">
      <div className="flex justify-center items-center">
        <div className="p-8 space-y-4">
          <h2 className="text-2xl font-bold text-slate-300">
            Select Payment Methods
          </h2>
          <div className="flex space-x-6">
            {Object.keys(paymentOptions).map((paymentType) => (
              <div
                key={paymentType}
                role="button"
                tabIndex="0"
                aria-pressed={enabledPayments[paymentType]}
                aria-label={paymentOptions[paymentType].ariaLabel}
                className={`cursor-pointer ${
                  enabledPayments[paymentType]
                    ? "text-current"
                    : "text-gray-400"
                } ${paymentType}-icon`}
                onClick={() => togglePayment(paymentType)}
                onChange={(e) => handleKeyPress(e, paymentType)}
              >
                {typeof paymentOptions[paymentType].icon === "string" ? (
                  <img
                    src={paymentOptions[paymentType].icon}
                    alt={paymentOptions[paymentType].label}
                    className="w-12 m-4"
                    style={{
                      filter: enabledPayments[paymentType]
                        ? applyColorFilter(paymentOptions[paymentType].color)
                        : "grayscale(100%) brightness(0) invert(30%)",
                      width: "4.50rem",
                    }}
                  />
                ) : (
                  <div
                    className="w-12 m-4"
                    style={{
                      color: enabledPayments[paymentType]
                        ? paymentOptions[paymentType].color
                        : "#666666",
                    }}
                  >
                    {paymentOptions[paymentType].icon}
                  </div>
                )}
                <p
                  className="mt-2 text-center font-extrabold"
                  style={
                    enabledPayments[paymentType]
                      ? { color: paymentOptions[paymentType].color }
                      : { color: "#666666" }
                  }
                >
                  {paymentOptions[paymentType].label}
                </p>
              </div>
            ))}
          </div>

          {/* Conditional Form for Square */}
          {enabledPayments.square && (
            <div className="mt-8 bg-slate-300 bg-opacity-20 text-slate-200 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">
                Square Merchant Details
              </h3>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="merchant_id"
                >
                  Merchant ID
                </label>
                <input
                  type="text"
                  id="merchant_id"
                  name="merchant_id"
                  className="w-full rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 bg-slate-300 bg-opacity-20 text-slate-300 shadow-lg"
                  value={squareDetails.merchant_id}
                  onChange={handleSquareDetailsChange}
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
                  onChange={handleSquareDetailsChange}
                  placeholder="Enter Square Application ID"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-green-500 text-white p-2 rounded mt-4"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Payments.propTypes = {
  storeId: propTypes.number.isRequired, //REVIEW may update all store Id's to be stringed at some point
};

export default Payments;
