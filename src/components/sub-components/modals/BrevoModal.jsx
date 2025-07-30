import { useEffect, useState } from "react"

export default function BrevoModal() {
  const [isOpen, setIsOpen] = useState(false)

  // Automatically open modal after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Load Brevo SDK and initialize the form
  useEffect(() => {
    if (!isOpen) return

    // Create and load the Brevo SDK script
    const script = document.createElement("script")
    script.src = "https://cdn.brevo.com/js/sdk-loader.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      window.Brevo = window.Brevo || []
      window.Brevo.push([
        "init",
        {
          client_key: "dtq5ykan67fp7ln64p33o8n0", // Your Brevo client key
        },
      ])

      // Replace FORM_ID_HERE with your actual form ID
      window.Brevo.push([
        "subscribe:createForm",
        {
          formId: "686d468980ba4da59c34244b",
          target: "#brevo-form-container",
        },
      ])
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="top-3 right-3 absolute text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            {/* Brevo form will be rendered inside this container */}
            <div id="brevo-form-container" className="w-full min-h-[400px]" />
          </div>
        </div>
      )}
    </>
  )
}
