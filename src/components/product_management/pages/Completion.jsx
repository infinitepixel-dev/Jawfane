import { useEffect, useState } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Completion = ({ stripePromise }) => {
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    // GSAP Animations on page load
    gsap.fromTo(
      ".thank-you-text",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
    gsap.fromTo(
      ".back-home-button",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(
      "#messages",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power2.out" }
    );

    if (!stripePromise) {
      console.log("Stripe.js hasn't loaded yet.");
      return;
    }

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get("payment_intent_client_secret");

      const { error, paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      if (error) {
        console.error("Error in retrieving payment intent:", error);
        setMessageBody(`> ${error.message}`);
      } else {
        setMessageBody(
          `> Payment ${paymentIntent.status}: ${paymentIntent.id}`
        );
      }
    });
  }, [stripePromise]);

  return (
    <div className="h-screen flex items-center justify-center text-slate-200 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="container mx-auto p-8 text-center max-w-lg">
        <h1 className="thank-you-text text-4xl font-bold mb-6 text-white">
          Thank you for your purchase!
        </h1>

        <Link
          to="/"
          className="back-home-button inline-block mt-4 rounded-lg bg-blue-500 px-6 py-3 text-white text-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Back Home
        </Link>

        <div
          id="messages"
          className="mt-8 text-white text-lg bg-slate-700 p-4 rounded-lg shadow-md"
          style={messageBody ? { display: "block" } : { display: "none" }}
        >
          {messageBody}
        </div>
      </div>
    </div>
  );
};

Completion.propTypes = {
  stripePromise: propTypes.object,
};

export default Completion;
