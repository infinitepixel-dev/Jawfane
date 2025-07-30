import { useEffect, useState } from "react"

export default function BrevoModal() {
  const [isOpen, setIsOpen] = useState(false)

  // Auto-trigger modal after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Load Brevo SDK and initialize
  useEffect(() => {
    if (!isOpen) return

    const script = document.createElement("script")
    script.src = "https://cdn.brevo.com/js/sdk-loader.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      window.Brevo = window.Brevo || []
      window.Brevo.push([
        "subscribe:createForm",
        {
          formId: "686d468980ba4da59c34244b", // your form ID
          target: "#brevo-form-container",
        },
      ])
      // If Brevo form creation API is available, we can add:
      // Brevo.push(["subscribe:createForm", { formId: "YOUR_FORM_ID", target: "#brevo-form-container" }])
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
            <button
              onClick={() => setIsOpen(false)}
              className="top-3 right-3 absolute text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            {/* Brevo form will be injected here */}
            <div id="brevo-form-container" className="w-full min-h-[400px]">
              {/* Brevo SDK will populate this div */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
