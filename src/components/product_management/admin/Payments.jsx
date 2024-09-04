import { useState } from "react";

// INFO Animation Libraries
import { gsap } from "gsap";

// INFO Icons
import { FaStripe, FaPaypal } from "react-icons/fa";
import SquarePayLogo from "@public/images/logos/Square_Jewel_Black.svg"; // Your Square logo SVG

function Payments() {
  // State to track enabled/disabled status of payment processors
  const [enabledPayments, setEnabledPayments] = useState({
    stripe: false,
    paypal: false,
    square: false,
  });

  // Payment processors data
  const paymentOptions = {
    stripe: {
      label: "Stripe",
      icon: <FaStripe size={50} />,
      color: "#635BFF", // Stripe brand color
      ariaLabel: "Stripe Payment Option",
    },
    paypal: {
      label: "PayPal",
      icon: <FaPaypal size={50} />,
      color: "#00457C", // PayPal brand color
      ariaLabel: "PayPal Payment Option",
    },
    square: {
      label: "Square",
      icon: SquarePayLogo,
      color: "#28A745", // Square brand color
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
    // center the content
    <div
      className="
        flex justify-center items-center 
   
    
    "
    >
      <div className="p-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">
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
                enabledPayments[paymentType] ? "text-current" : "text-gray-400"
              } ${paymentType}-icon`}
              onClick={() => togglePayment(paymentType)}
              onKeyPress={(e) => handleKeyPress(e, paymentType)}
            >
              {/* if icon equals .icon else image url */}
              {typeof paymentOptions[paymentType].icon === "string" ? (
                // SVG image with color using filter
                <img
                  src={paymentOptions[paymentType].icon}
                  alt={paymentOptions[paymentType].label}
                  className="w-12"
                  style={{
                    filter: enabledPayments[paymentType]
                      ? applyColorFilter(paymentOptions[paymentType].color)
                      : "grayscale(100%) brightness(0) invert(30%)",
                  }}
                />
              ) : (
                <div
                  className="w-12"
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
                className="mt-2 text-center"
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
      </div>
    </div>
  );
}

export default Payments;
