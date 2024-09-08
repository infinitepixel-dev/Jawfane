//Payments.jsx

/*
A component to manage payment available to the store
*/

//INFO React Libraries
import { useState } from "react";
import propTypes from "prop-types";

//INFO React Animation Libraries
import { gsap } from "gsap";

//INFO React Icons;
import { FaStripe, FaPaypal } from "react-icons/fa";
import SquarePayLogo from "/images/logos/Square_Jewel_Black.svg";

//INFO Sub-components
import SquareMerchantSetup from "@apis_product_management/payments/square/SquareMerchantSetup";

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

  const handleSquareDetailsChange = (e) => {
    const { name, value } = e.target;
    setSquareDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

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

      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const oauthPopup = window.open(
        authUrl,
        "SquareOAuthPopup",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      const pollOAuthPopup = setInterval(() => {
        if (oauthPopup.closed) {
          clearInterval(pollOAuthPopup);
          console.log(
            "OAuth popup closed. You can now handle the token response."
          );
        }
      }, 500);
    }
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
              >
                {typeof paymentOptions[paymentType].icon === "string" ? (
                  <img
                    src={paymentOptions[paymentType].icon}
                    alt={paymentOptions[paymentType].label}
                    className="w-12 m-4"
                    style={{
                      filter: enabledPayments[paymentType]
                        ? `invert(62%) sepia(55%) saturate(556%) hue-rotate(73deg) brightness(93%) contrast(94%)`
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

          {/* Square Merchant Setup */}
          <SquareMerchantSetup
            enabled={enabledPayments.square}
            onSubmit={handleSubmit}
            squareDetails={squareDetails}
            onDetailsChange={handleSquareDetailsChange}
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
