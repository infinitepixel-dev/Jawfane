// Payments.jsx

/*
A component to manage payment available to the store with dynamic animations
*/

//INFO React Libraries
import { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";

//INFO React Animation Libraries
import { gsap } from "gsap";

//INFO React Icons;
import { FaStripe, FaPaypal } from "react-icons/fa";
import SquarePayLogo from "/images/logos/Square_Jewel_Black.svg";

//INFO Sub-components
import SquareMerchantSetup from "@apis_product_management/payments/square/SquareMerchantSetup";
import StripeMerchantSetup from "@apis_product_management/payments/stripe/StripeMerchantSetup";

function Payments({ storeId }) {
  // State to track enabled payment methods
  const [enabledPayments, setEnabledPayments] = useState({
    stripe: false,
    paypal: false,
    square: false,
  });

  // State for Square and Stripe details
  const [squareDetails, setSquareDetails] = useState({
    merchant_id: "",
    application_id: "",
  });

  const [stripeDetails, setStripeDetails] = useState({
    merchant_id: "",
    api_key: "",
  });

  // Refs for the containers
  const stripeContainerRef = useRef(null);
  const squareContainerRef = useRef(null);

  // Payment options metadata
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

  // GSAP animation effect to handle payment container transitions
  useEffect(() => {
    Object.keys(enabledPayments).forEach((paymentType) => {
      const containerRef =
        paymentType === "stripe" ? stripeContainerRef : squareContainerRef;

      if (enabledPayments[paymentType]) {
        gsap.to(containerRef.current, {
          opacity: 1,
          height: "auto",
          visibility: "visible",
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(containerRef.current, {
          opacity: 0,
          height: 0,
          visibility: "hidden",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    });
  }, [enabledPayments]);

  // Handle toggle between payment types and animate icons
  const togglePayment = (paymentType) => {
    setEnabledPayments((prev) => ({
      ...prev,
      [paymentType]: !prev[paymentType],
    }));

    const iconElement = document.querySelector(`.${paymentType}-icon`);
    const isEnabled = !enabledPayments[paymentType];
    const targetColor = isEnabled
      ? paymentOptions[paymentType].color
      : "#666666";

    gsap.to(iconElement, {
      duration: 0.5,
      ease: "power2.inOut",
      fill: targetColor,
      opacity: isEnabled ? 1 : 0.5,
      filter: isEnabled ? "none" : "grayscale(100%)",
    });
  };

  // Handlers for Square Merchant Setup form
  const handleSquareDetailsChange = (e) => {
    const { name, value } = e.target;
    setSquareDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handlers for Stripe Merchant Setup form
  const handleStripeDetailsChange = (e) => {
    const { name, value } = e.target;
    setStripeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle Square and Stripe setup submissions
  const handleSubmit = () => {
    if (enabledPayments.square) {
      console.log(
        "Store Id:",
        storeId,
        "Square Payment Details:",
        squareDetails
      );
    }
  };

  const handleStripeSubmit = () => {
    console.log("Store ID:", storeId, "Stripe Details:", stripeDetails);
  };

  return (
    <div className="container-fluid bg-slate-200 bg-opacity-10 rounded-lg">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-slate-300 text-center mb-8">
          Select Payment Methods
        </h2>
        <div className="grid grid-cols-3 gap-8 justify-center items-start">
          {Object.keys(paymentOptions).map((paymentType) => (
            <div
              key={paymentType}
              role="button"
              tabIndex="0"
              aria-pressed={enabledPayments[paymentType]}
              aria-label={paymentOptions[paymentType].ariaLabel}
              className={`cursor-pointer ${
                enabledPayments[paymentType] ? "text-current" : "text-gray-400"
              } ${paymentType}-icon text-center`}
              onClick={() => togglePayment(paymentType)}
            >
              {typeof paymentOptions[paymentType].icon === "string" ? (
                <img
                  src={paymentOptions[paymentType].icon}
                  alt={paymentOptions[paymentType].label}
                  className="w-12 mx-auto"
                  style={{
                    filter: enabledPayments[paymentType]
                      ? `invert(62%) sepia(55%) saturate(556%) hue-rotate(73deg) brightness(93%) contrast(94%)`
                      : "grayscale(100%) brightness(0) invert(30%)",
                    width: "4.50rem",
                  }}
                />
              ) : (
                <div
                  className="w-12 mx-auto"
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

        {/* Square Merchant Setup */}
        <div
          className="square-container overflow-hidden opacity-0"
          ref={squareContainerRef}
          style={{ height: 0 }}
        >
          <SquareMerchantSetup
            enabled={enabledPayments.square}
            onSubmit={handleSubmit}
            squareDetails={squareDetails}
            onDetailsChange={handleSquareDetailsChange}
          />
        </div>

        {/* Stripe Merchant Setup */}
        <div
          className="stripe-container overflow-hidden opacity-0"
          ref={stripeContainerRef}
          style={{ height: 0 }}
        >
          <StripeMerchantSetup
            enabled={enabledPayments.stripe}
            onSubmit={handleStripeSubmit}
            stripeDetails={stripeDetails}
            onDetailsChange={handleStripeDetailsChange}
          />
        </div>
      </div>
    </div>
  );
}

Payments.propTypes = {
  storeId: propTypes.number.isRequired, //REVIEW may update all store Id's to be stringed at some point
};

export default Payments;
