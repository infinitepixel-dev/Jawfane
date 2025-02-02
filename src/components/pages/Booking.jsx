import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import jawfane from "/images/Jawfane-44.jpg"

const Booking = () => {
  const headingRef = useRef(null)
  const buttonRef = useRef(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )

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
    )
  }, [])

  const handleBookingClick = (e) => {
    e.preventDefault()

    // Open mailto link
    window.location.href = "mailto:jawfane@gmail.com?subject=Booking Inquiry"

    // Check if the user remains on the page after 1 second
    setTimeout(() => {
      if (document.visibilityState === "visible") {
        setShowModal(true)
      }
    }, 1000)
  }

  return (
    <div
      id="booking"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-white bg-gray-900"
      style={{
        backgroundImage: `url(${jawfane})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.9,
      }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
      <h1
        ref={headingRef}
        className="relative z-10 mb-6 text-5xl font-bold text-center shadow-md"
      >
        For bookings, click below
      </h1>
      <button
        ref={buttonRef}
        onClick={handleBookingClick}
        className="relative z-10 px-6 py-3 font-semibold text-white transition-transform transform bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600"
      >
        Book Now
      </button>

      {/* Modal - Higher z-index for correct layering */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[1000]">
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm text-center z-[1100]">
            <h2 className="text-lg font-bold text-gray-900">
              No Email Client Found
            </h2>
            <p className="mt-2 text-gray-700">
              It looks like you don&apos;t have a default email app set up on
              your device. You can:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
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
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 mt-4 text-white bg-gray-800 rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Booking
