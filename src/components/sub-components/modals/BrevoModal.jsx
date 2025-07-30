import { useState } from "react"

export default function BrevoModal() {
  const [isOpen, setIsOpen] = useState(false)

  // Optional auto-trigger (after 3 seconds)
  useState(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000)
    return () => clearTimeout(timer)
  }, [])

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
            <div className="w-full h-[500px]">
              <iframe
                src="https://your-brevo-form-url" // Replace with actual Brevo URL
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
