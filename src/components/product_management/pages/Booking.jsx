import React, { useState } from "react"

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [messageformCounter, setMessageformCounter] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    if (name === "message") {
      setMessageformCounter(value.length)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add form submission logic here
    console.log("Form submitted:", formData)
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen f-full"
      id="booking"
    >
      <div className="w-full max-w-lg p-8 border rounded-md shadow-md border-slate-400 bg-slate-100">
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Book Jawfane
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="company">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Your Company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="message">
              Message <span className="text-red-500">*</span>
            </label>
            <div>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message Here..."
                maxLength={250}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                rows="4"
                required
              />
            </div>
            <div className="text-sm text-gray-500">
              {messageformCounter}/250
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Booking
