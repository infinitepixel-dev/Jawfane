//ContactForm.jsx

import { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
// import ScrollingIconsBar from "./utility/ScrollingIconsBar";

//INFO Modals
import ModalWrapper from "./modals/ModalWrapper"

const contactFormPropTypes = {
  setShowModal: PropTypes.func.isRequired,
}

const ContactForm = ({ setShowModal }) => {
  //INFO State Variables
  const [isEmailReady, setIsEmailReady] = useState(false)
  const [email, setEmail] = useState(null)

  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    company: "",
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const maxMessageLength = 250 // Maximum character limit for the message

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Invalid email format"
    }

    // Optional: Block suspicious TLDs or domains
    const spammyPatterns = ["@tempmail", "@10minutemail", "@mailinator"]
    if (
      spammyPatterns.some((pattern) =>
        formData.email.toLowerCase().includes(pattern)
      )
    ) {
      newErrors.email = "Please use a real email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (!validateForm()) {
      setSubmitting(false)
      return
    }

    const payload = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value)
    })

    // FormSubmit required hidden fields
    payload.append("_template", "table")
    payload.append("_subject", "New Contact Submission")
    payload.append("_captcha", "false")

    try {
      //import VIte Email from env
      const response = await fetch(email, {
        method: "POST",
        body: payload,
      })

      if (response.ok) {
        setShowThankYou(true)
        setFormData({
          company: "",
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        })
        setErrors({})
      } else {
        alert("There was a problem submitting the form.")
      }
    } catch (error) {
      console.error("Error submitting the form:", error)
    } finally {
      setSubmitting(false)
    }
  }

  //wait for  = import.meta.env.VITE_FORM_EMAIL; // Ensure you have this in your .env file
  useEffect(() => {
    setEmail(import.meta.env.VITE_FORM_EMAIL)
    if (email) {
      setIsEmailReady(true)
    }
  }, [email])

  return (
    <>
      <div id="contact-form" style={{ zIndex: 9999 }}>
        {/* if isEmailReady is true */}
        {isEmailReady ? (
          <form
            ref={formRef}
            action={email}
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6 bg-neutral-200 shadow-xl p-4 md:p-10 rounded-xl min-w-[90svw] md:min-w-[40svw]"
          >
            {/* Hidden Fields */}
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_subject"
              value="New Contact Submission"
            />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_next" value="https://jawfane.com/" />

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block font-medium text-army-hover text-sm"
              >
                Company (Optional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="bg-neutral-100 mt-1 p-3 border border-neutral-500 focus:border-army-hover rounded-md focus:ring focus:ring-army w-full text-army-hover"
                placeholder="Business Name"
              />
            </div>

            {/* First & Last Name (Side by Side on md+) */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block font-medium text-army-hover text-sm"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-neutral-100 mt-1 p-3 border border-gray-300 focus:border-army-hover rounded-md focus:ring focus:ring-army w-full text-army-hover"
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block font-medium text-army-hover text-sm"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-neutral-100 mt-1 p-3 border border-gray-300 focus:border-army-hover rounded-md focus:ring focus:ring-army w-full text-army-hover"
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-army-hover text-sm"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-neutral-100 mt-1 p-3 border border-gray-300 focus:border-army-hover rounded-md focus:ring focus:ring-army w-full text-army-hover"
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block font-medium text-army-hover text-sm"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-neutral-100 mt-1 p-3 border border-gray-300 focus:border-army-hover rounded-md focus:ring focus:ring-army w-full text-army-hover"
                rows="4"
                placeholder="Message"
                maxLength={maxMessageLength}
              />
              <div
                className={`text-sm text-right mt-1 ${
                  formData.message.length >= maxMessageLength
                    ? "text-red-800"
                    : formData.message.length >= maxMessageLength - 20
                    ? "text-orange-600"
                    : "text-slate-400"
                }`}
              >
                {formData.message.length}/{maxMessageLength} characters
              </div>
              {errors.message && (
                <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-army hover:from-army to-army-hover hover:to-army py-3 rounded-md focus:ring-4 w-full font-semibold text-neutral-100 transition duration-200 ease-in-out focus:army-hover"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="bg-stone-400/70 hover:bg-stone-500/60 py-2 rounded-md w-full font-semibold text-army-hover transition duration-200 ease-in-out"
            >
              Close
            </button>
          </form>
        ) : null}
      </div>

      {/* Thank You Modal */}
      {showThankYou && (
        <ModalWrapper>
          <div className="bg-neutral-200 shadow-lg p-8 rounded-lg max-w-sm text-center">
            <h2 className="mb-4 font-bold text-army-hover text-2xl">
              Thank You!
            </h2>
            <p className="text-army-hover">
              Your message has been submitted successfully.
            </p>
            <button
              onClick={() => {
                setShowThankYou(false) // closes the thank you modal
                setShowModal(false) // closes the contact form modal
                window.scrollTo({ top: 0, behavior: "smooth" }) // scroll to top
              }}
              className="bg-army hover:bg-army-hover mt-6 px-4 py-2 rounded text-neutral-100"
            >
              Close
            </button>
          </div>
        </ModalWrapper>
      )}
    </>
  )
}

ContactForm.propTypes = contactFormPropTypes

export default ContactForm
