import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import ContactForm from "../sub-components/ContactForm";
// import { Contact } from "lucide-react";

const Booking = () => {
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        delay: 0.5,
      }
    );
  }, []);

  const handleBookingClick = (e) => {
    e.preventDefault();

    // Open mailto link
    window.location.href = "mailto:jawfane@gmail.com?subject=Booking Inquiry";

    // Check if the user remains on the page after 1 second
    setTimeout(() => {
      if (document.visibilityState === "visible") {
        setShowModal(true);
      }
    }, 1000);
  };

  return (
    <div
      id="booking"
      className="z-10 relative flex flex-col justify-center items-center bg-gray-900 p-4 min-h-screen text-white"
      style={{
        backgroundImage: `url(/images/Jawfane-44.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.9,
      }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
      <h1
        ref={headingRef}
        className="z-10 relative shadow-md mb-6 font-bold text-5xl text-center"
      >
        For bookings, click below
      </h1>
      <button
        ref={buttonRef}
        onClick={handleBookingClick}
        className="z-10 relative bg-orange-500 hover:bg-orange-600 shadow-lg px-6 py-3 rounded-lg font-semibold text-white transition-transform transform"
      >
        Book Now
      </button>

      {/* Modal - Higher z-index for correct layering */}
      {showModal && (
        <div className="z-[1000] fixed inset-0 flex justify-center items-center bg-black bg-opacity-80">
          <div className="z-[1100] bg-white shadow-2xl p-6 rounded-lg text-center max-full">
            {/* <h2 className="font-bold text-gray-900 text-lg">
              No Email Client Found
            </h2>
            <p className="mt-2 text-gray-700">
              It looks like you don&apos;t have a default email app set up on
              your device. You can:
            </p>
            <ul className="space-y-2 mt-3 text-gray-700 text-sm">
              <li>
                ✅ Open your preferred email service (Gmail, Outlook, etc.) and
                manually send an email to: <strong>jawfane@gmail.com</strong>
              </li>
              <li>
                <strong>OR</strong>
              </li>
              <li>
                ⚙️ Set up a default email app in the system settings on your
                device.
              </li>
            </ul> */}
            <ContactForm setShowModal={setShowModal} theme="dark" />

            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-800 hover:bg-gray-700 mt-4 px-4 py-2 rounded-lg text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
