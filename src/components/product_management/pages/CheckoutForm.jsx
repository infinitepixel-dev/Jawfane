import { useState, useEffect, useContext } from "react";
import propTypes from "prop-types";
import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

// Import the Cart Context
import { CartContext } from "@contexts_product_management/CartContext"; // Adjust the path as necessary

// eslint-disable-next-line no-unused-vars
import { gsap } from "gsap";

//API Shipping API
import USPSApi from "@apis_product_management/shipping/usps/USPSApi";

const CheckoutForm = ({
  DevMode,
  storeId,
  cartItems,

  setShippingAndTaxTotal,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Access the cart context values
  const { cartTotal, setCartTotal, shippingAndTaxTotal } =
    useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: DevMode
          ? `${window.location.origin}/dev/completion`
          : `${window.location.origin}/completion`,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // Output the total of the cart items and update the cartTotal in context
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setCartTotal(total); // Update the context's cartTotal
  }, [cartItems, setCartTotal]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* Link Authentication Element for returning customers */}
      <LinkAuthenticationElement id="link-authentication-element" />

      {/* Stripe Payment Element */}
      <PaymentElement id="payment-element" />

      {/* Shipping API */}
      <div className="mb-4">
        <USPSApi
          storeId={storeId}
          cartItems={cartItems}
          setCartTotal={setCartTotal}
          setShippingAndTaxTotal={setShippingAndTaxTotal}
        />
      </div>

      {/* Submit Button */}
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow transition hover:bg-blue-700"
      >
        <span id="button-text">
          {isLoading && !cartTotal ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            `Pay $${cartTotal + shippingAndTaxTotal}` // Display the total of the cart items
          )}
        </span>
      </button>

      {/* Error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

CheckoutForm.propTypes = {
  DevMode: propTypes.bool.isRequired,
  storeId: propTypes.number.isRequired,
  clientSecret: propTypes.string.isRequired,
  cartItems: propTypes.array.isRequired,
  setCartTotal: propTypes.func.isRequired,
  shippingAndTaxTotal: propTypes.number.isRequired,
  setShippingAndTaxTotal: propTypes.func.isRequired,
};

export default CheckoutForm;
