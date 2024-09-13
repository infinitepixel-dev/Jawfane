import { useState, useEffect } from "react";
import propTypes from "prop-types";

import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";

import { useStripe, useElements } from "@stripe/react-stripe-js";

//REVIEW use GSAP to slightly slow the checkout process and make it more visually appealing
// eslint-disable-next-line no-unused-vars
import { gsap } from "gsap";

const CheckoutForm = ({ cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

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
        return_url: `${window.location.origin}/completion`,
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
    //Output the total of the cart items
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // console.log("Total: ", total);

    setCartTotal(total);
  }, [cartItems, setCartTotal]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* Link Authentication Element for returning customers */}
      <LinkAuthenticationElement id="link-authentication-element" />

      {/* Stripe Payment Element */}
      <PaymentElement id="payment-element" />

      {/* Submit Button */}
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow transition hover:bg-blue-700"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            `Pay $${cartTotal}`
          )}
        </span>
      </button>

      {/* Error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

CheckoutForm.propTypes = {
  clientSecret: propTypes.string.isRequired,
  cartItems: propTypes.array.isRequired,
};

export default CheckoutForm;
