import propTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

//INFO Sub-components imports
import Navigation from "@navigation_product_management/Navigation";
import { CartContext } from "@contexts_product_management/CartContext";

// Load Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = ({
  DevMode,
  cartItems,
  enabledPayments,
  base,
  theme,
  toggleTheme,
  isMobile,
  setIsMobile,
}) => {
  const {
    cartTotal,
    setCartTotal,
    shippingAndTaxTotal,
    setShippingAndTaxTotal,
  } = useContext(CartContext);
  const location = useLocation();
  const { storeId } = location.state || {}; // Only get serializable state

  const [clientSecret, setClientSecret] = useState(null);
  const apiUrl = `https://vps.infinitepixel.dev:3040/api/payment`;

  useEffect(() => {
    setCartTotal(
      //ensure cartItems total is set to a number data type
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  }, [cartItems, setCartTotal]);

  // useEffect(() => {
  //   if (location.state) {
  //     const { cartTotal, shippingAndTaxTotal } = location.state;

  //     // Set the context values using the data passed from CartPage
  //     setCartTotal(cartTotal);
  //     setShippingAndTaxTotal(shippingAndTaxTotal);
  //   }
  // }, [location.state, setCartTotal, setShippingAndTaxTotal]);

  // // Calculate the total in cents for the payment
  // const calculateTotalInCents = () => {
  //   return Math.round((cartTotal + shippingAndTaxTotal) * 100);
  // };

  // Fetch the clientSecret from the backend when the page loads
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      // Ensure cartItems and enabledPayments are valid
      if (!cartItems || !cartItems.length || !enabledPayments?.stripe) return;

      if (cartTotal <= 0) {
        return;
      }

      // console.log("Shipping and Tax Total:", shippingAndTaxTotal);

      // const totalAmountCents = calculateTotalInCents();
      const totalAmountCents = Math.round(
        (cartTotal + shippingAndTaxTotal) * 100
      );
      console.log("Total Amount in Cents:", totalAmountCents);

      try {
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
        if (data && data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("Error fetching clientSecret:", data);
        }
      } catch (error) {
        console.error("Error fetching payment intent:", error);
      }
    };

    fetchPaymentIntent();
  }, [
    cartItems,
    apiUrl,
    enabledPayments?.stripe,
    cartTotal,
    shippingAndTaxTotal,
  ]);

  // Define the options for the Stripe Elements component
  const options = {
    clientSecret, // Provide the clientSecret
  };

  // console.log("checkout ct:", cartTotal);
  // console.log("checkout stt:", shippingAndTaxTotal);

  return (
    <>
      <Navigation
        storeId={storeId}
        DevMode={DevMode}
        base={base}
        theme={theme}
        toggleTheme={toggleTheme}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        cartItems={cartItems}
      />

      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md">
          <h2 className="mb-8 text-center text-2xl font-bold">Checkout</h2>

          {/* Display Cart Total and Shipping & Tax Total */}
          <div className="mb-4 p-4 bg-white shadow rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${cartTotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping & Tax:</span>
              <span>${shippingAndTaxTotal}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${cartTotal + shippingAndTaxTotal}</span>
            </div>
          </div>

          {/* Stripe Payment Form */}
          {enabledPayments?.stripe && clientSecret && cartTotal >= 0 ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                DevMode={DevMode}
                clientSecret={clientSecret}
                cartItems={cartItems}
                storeId={storeId}
                setCartTotal={setCartTotal}
                shippingAndTaxTotal={shippingAndTaxTotal}
                setShippingAndTaxTotal={setShippingAndTaxTotal}
              />
            </Elements>
          ) : (
            <p>Loading payment details...</p>
          )}
        </div>
      </div>
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
