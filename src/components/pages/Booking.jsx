import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Booking = () => {
  const headingRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    // Animate the heading and button using GSAP
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

  return (
    <div
      className="relative z-0 flex flex-col items-center justify-center min-h-screen p-4 text-white bg-gray-900"
      style={{
        backgroundImage: "url('public/images/Jawfane-44.jpg')",
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
      <a
        ref={buttonRef}
        href="mailto:jawfane@gmail.com?subject=Booking Inquiry"
        className="relative z-10 px-6 py-3 font-semibold text-white transition-transform transform bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600"
      >
        Book Now
      </a>
    </div>
  )
}

export default Booking
