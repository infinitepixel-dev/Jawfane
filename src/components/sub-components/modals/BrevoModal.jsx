import { useEffect, useState } from "react"

export default function BrevoModal() {
  const [isOpen, setIsOpen] = useState(false)

  // Optional: load Brevo's script if they require one
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.brevo.com/js/sdk-loader.js" // Replace with Brevo script if provided
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
      >
        Open Signup Form
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="top-3 right-3 absolute text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Brevo Form (iframe or div target) */}
            <div className="w-full h-[500px]">
              <iframe
                src="brevo-frame.html" // Replace with actual Brevo form URL
                width="100%"
                height="100%"
                frameBorder="0"
                title="Brevo Signup Form"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
