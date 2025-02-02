import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"

const ContactForm = () => {
  const formRef = useRef()
  const [status, setStatus] = useState("")

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        "your_service_id", // Replace with your Email.js Service ID
        "your_template_id", // Replace with your Email.js Template ID
        formRef.current,
        "your_public_key" // Replace with your Email.js Public Key
      )
      .then(() => {
        setStatus("Message sent successfully!")
        formRef.current.reset()
      })
      .catch(() => {
        setStatus("Failed to send the message. Please try again.")
      })
  }

  return (
    <div className="max-w-md p-6 mx-auto text-white bg-gray-800 rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Contact Us</h2>
      <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="block w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="block w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="4"
            className="block w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send Message
        </button>
      </form>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  )
}

export default ContactForm
