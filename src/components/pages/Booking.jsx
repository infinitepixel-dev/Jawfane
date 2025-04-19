//jawfane@gmail.com

// {/* <h2 className="font-bold text-gray-900 text-lg">
//   No Email Client Found
// </h2>
// <p className="mt-2 text-gray-700">
//   It looks like you don&apos;t have a default email app set up on
//   your device. You can:
// </p>
// <ul className="space-y-2 mt-3 text-gray-700 text-sm">
//   <li>
//     ✅ Open your preferred email service (Gmail, Outlook, etc.) and
//     manually send an email to: <strong>jawfane@gmail.com</strong>
//   </li>
//   <li>
//     <strong>OR</strong>
//   </li>
//   <li>
//     ⚙️ Set up a default email app in the system settings on your
//     device.
//   </li>
// </ul> */}

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

//INFO Modals
import ModalWrapper from "../sub-components/modals/ModalWrapper";

//INFO Forms
import ContactForm from "../sub-components/ContactForm";

const Booking = () => {
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const modalRef = useRef(null); // <-- Modal ref
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          gsap.to(sectionRef.current, {
            opacity: 1,
            duration: 2,
            ease: "power2.out",
          });
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headingRef.current) {
              gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 1.8, ease: "power3.out" }
              );
            }

            if (entry.target === buttonRef.current) {
              gsap.fromTo(
                buttonRef.current,
                { opacity: 0, scale: 0.8 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 1.8,
                  ease: "elastic.out(1, 0.3)",
                  delay: 0.3,
                }
              );
            }

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is in view
      }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (buttonRef.current) observer.unobserve(buttonRef.current);
    };
  }, []);

  useEffect(() => {
    if (showModal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }

    if (showModal) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "";
    }

    // Clean up on unmount in case component is removed with modal open
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const handleBookingClick = (e) => {
    e.preventDefault();
    // window.location.href = "mailto:jawfane@gmail.com?subject=Booking Inquiry";
    e.preventDefault();
    // window.location.href = "mailto:jawfane@gmail.com?subject=Booking Inquiry";

    setTimeout(() => {
      if (document.visibilityState === "visible") {
        setShowModal(true);
      }
    }, 100);
  };

  return (
    <div
      ref={sectionRef}
      id="booking"
      className="relative flex flex-col justify-center items-center bg-gray-900 p-4 min-h-screen text-white"
      style={{
        backgroundImage: `url(/images/Jawfane-44.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0, // Start hidden
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

      {showModal && (
        <ModalWrapper>
          <div ref={modalRef} className="z-[1100] relative">
            <ContactForm setShowModal={setShowModal} theme="dark" />
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};

export default Booking;
