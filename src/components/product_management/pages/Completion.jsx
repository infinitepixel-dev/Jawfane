import { useEffect, useState } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

const Completion = ({ stripePromise }) => {
  console.log("Completion component is rendering"); // Add this line
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    if (!stripePromise) {
      console.log("Stripe.js hasn't loaded yet.");
      return;
    }

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get("payment_intent_client_secret");
      console.log("Client Secret:", clientSecret);

      const { error, paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      if (error) {
        console.error("Error in retrieving payment intent:", error);
        setMessageBody(`> ${error.message}`);
      } else {
        console.log("Payment intent retrieved successfully:", paymentIntent);
        setMessageBody(
          `> Payment ${paymentIntent.status}: ${paymentIntent.id}`
        );
      }
    });
  }, [stripePromise]);

  return (
    <div className="h-screen text-white bg-slate-800">
      <h1>Thank you!</h1>
      <Link
        to="/"
        className="block mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow transition hover:bg-blue-700"
      >
        Back Home
      </Link>

      <div
        id="messages"
        role="alert"
        style={messageBody ? { display: "block" } : {}}
      >
        {messageBody}
      </div>
    </div>
  );
};

Completion.propTypes = {
  stripePromise: propTypes.object,
};

export default Completion;
