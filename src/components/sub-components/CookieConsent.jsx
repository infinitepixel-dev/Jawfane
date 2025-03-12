import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(
    () => !localStorage.getItem("cookieConsent")
  )

  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent")
    if (consentGiven !== "true") {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center gap-3 p-4 text-center text-white bg-gray-900">
      <p className="text-sm">
        This website uses cookies to enhance user experience. By continuing, you
        accept our{" "}
        <Link to="/privacy-policy" className="z-50 text-blue-400 underline">
          cookie policy
        </Link>
        .
      </p>
      <button
        onClick={acceptCookies}
        className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        aria-label="Accept cookies"
      >
        Accept
      </button>
    </div>
  )
}

export default CookieConsent
