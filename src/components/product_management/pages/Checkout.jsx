import propTypes from "prop-types";

import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

//INFO Sub-components imports
import Navigation from "@navigation_product_management/Navigation";

// Load Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = ({
  cartItems,
  enabledPayments,
  DevMode,
  base,
  theme,
  toggleTheme,
  isMobile,
  setIsMobile,
}) => {
  const [clientSecret, setClientSecret] = useState(null);
  const apiUrl = `https://vps.infinitepixel.dev:3040/api/payment`;

  // Calculate the total in cents for the payment
  const calculateTotalInCents = (cartItems) => {
    return Math.round(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0) *
        100
    );
  };

  // Fetch the clientSecret from the backend when the page loads
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (!cartItems.length || !enabledPayments.stripe) return;

      const totalAmountCents = calculateTotalInCents(cartItems);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmountCents,
          currency: "usd",
          description: "Your purchase description",
        }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    fetchPaymentIntent();
  }, [cartItems, apiUrl, enabledPayments.stripe]);

  // Define the options for the Stripe Elements component
  const options = {
    clientSecret, // Provide the clientSecret
  };

  return (
    <>
      <Navigation
        DevMode={DevMode}
        base={base}
        theme={theme}
        toggleTheme={toggleTheme}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        cartItems={cartItems}
      />

      {enabledPayments.stripe && clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md">
              <h2 className="mb-8 text-center text-2xl font-bold">Checkout</h2>
              <CheckoutForm clientSecret={clientSecret} cartItems={cartItems} />
            </div>
          </div>
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
    </>
  );
};

CheckoutPage.propTypes = {
  cartItems: propTypes.array.isRequired,
  enabledPayments: propTypes.object.isRequired,
  DevMode: propTypes.bool.isRequired,
  base: propTypes.string.isRequired,
  theme: propTypes.string.isRequired,
  toggleTheme: propTypes.func.isRequired,
  isMobile: propTypes.bool.isRequired,
  setIsMobile: propTypes.func.isRequired,
};

export default CheckoutPage;
