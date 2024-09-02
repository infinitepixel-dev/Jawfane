import React, { useState } from "react"
import axios from "axios"

const ContactForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [result, setResult] = useState(null)

  const sendEmail = (event) => {
    event.preventDefault()
    axios
      .post("/send", { ...state })
      .then((response) => {
        setResult(response.data)
        setState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      })
      .catch(() => {
        setResult({
          success: false,
          message: "Something went wrong. Try again later",
        })
      })
  }

  const onInputChange = (event) => {
    const { name, value } = event.target

    setState({
      ...state,
      [name]: value,
    })
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      {result && (
        <p
          className={`${
            result.success ? "text-green-500" : "text-red-500"
          } mb-4`}
        >
          {result.message}
        </p>
      )}
      <form onSubmit={sendEmail}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={state.name}
            placeholder="Enter your full name"
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={state.email}
            placeholder="Enter your email"
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={state.subject}
            placeholder="Enter subject"
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={state.message}
            rows="3"
            placeholder="Enter your message"
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ContactForm
