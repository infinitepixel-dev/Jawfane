import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { gsap } from "gsap"

const ContactForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [result, setResult] = useState(null)
  const formRef = useRef(null)

  useEffect(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
    })
  }, [])

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
    <div
      id="booking"
      ref={formRef}
      className="flex flex-col h-screen max-w-xl mx-auto overflow-hidden"
    >
      {" "}
      <div className=" mt-36">
        {result && (
          <p
            role="alert"
            aria-live="assertive"
            className={`text-center mb-4 ${
              result.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {result.message}
          </p>
        )}
        <h2 className="mb-8 text-2xl font-bold text-center text-slate-200 sm:text-3xl">
          Book Jawfane
        </h2>
        <form
          onSubmit={sendEmail}
          className="p-6 space-y-6 bg-white rounded-lg shadow-lg"
          aria-labelledby="form-heading"
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-medium text-gray-700"
            >
              Full Name <span className="sr-only">(Required)</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={state.name}
              placeholder="Enter your full name"
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700"
            >
              Email <span className="sr-only">(Required)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              placeholder="Enter your email"
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={state.subject}
              placeholder="Enter subject"
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={state.message}
              rows="4"
              placeholder="Enter your message"
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Submit contact form"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
