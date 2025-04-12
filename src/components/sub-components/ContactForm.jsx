//ContactForm.jsx

import { useState, useRef } from "react";
import PropTypes from "prop-types";
// import ScrollingIconsBar from "./utility/ScrollingIconsBar";

//INFO Modals
import ModalWrapper from "./modals/ModalWrapper";

//Ensure the correct formatatting... when using non typescript projects
const contactFormPropTypes = {
  setShowModal: PropTypes.func.isRequired,
};

const ContactForm = ({ setShowModal }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    company: "",
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const maxMessageLength = 250; // Maximum character limit for the message

  const email = import.meta.env.VITE_FORM_EMAIL; // Ensure you have this in your .env file

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }

    // Optional: Block suspicious TLDs or domains
    const spammyPatterns = ["@tempmail", "@10minutemail", "@mailinator"];
    if (
      spammyPatterns.some((pattern) =>
        formData.email.toLowerCase().includes(pattern)
      )
    ) {
      newErrors.email = "Please use a real email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!validateForm()) {
      setSubmitting(false);
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    // FormSubmit required hidden fields
    payload.append("_template", "table");
    payload.append("_subject", "New Contact Submission");
    payload.append("_captcha", "false");

    try {
      //import VIte Email from env
      const response = await fetch(email, {
        method: "POST",
        body: payload,
      });

      if (response.ok) {
        setShowThankYou(true);
        setFormData({
          company: "",
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
        setErrors({});
      } else {
        alert("There was a problem submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div id="contact-form" style={{ zIndex: 9999 }}>
        <form
          ref={formRef}
          action="https://formsubmit.co/49b3ec7186e27ea9fd61c9e9f858330c"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-6 bg-white shadow-xl p-4 md:p-10 rounded-xl min-w-[90svw] md:min-w-[40svw]"
        >
          {/* Hidden Fields */}
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_subject" value="New Contact Submission" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" style={{ display: "none" }} />
          <input type="hidden" name="_next" value="http://localhost:5174/" />

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="block font-medium text-sky-950 text-sm"
            >
              Company (Optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="bg-slate-100 mt-1 p-3 border border-gray-300 focus:border-blue-500 rounded-md focus:ring focus:ring-blue-200 w-full text-slate-800"
              placeholder="Business Name"
            />
          </div>

          {/* First & Last Name (Side by Side on md+) */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block font-medium text-sky-950 text-sm"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-slate-100 mt-1 p-3 border border-gray-300 focus:border-blue-500 rounded-md focus:ring focus:ring-blue-200 w-full text-slate-800"
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block font-medium text-sky-950 text-sm"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-slate-100 mt-1 p-3 border border-gray-300 focus:border-blue-500 rounded-md focus:ring focus:ring-blue-200 w-full text-slate-800"
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
              className="block font-medium text-sky-950 text-sm"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-100 mt-1 p-3 border border-gray-300 focus:border-blue-500 rounded-md focus:ring focus:ring-blue-200 w-full text-slate-800"
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
              className="block font-medium text-sky-950 text-sm"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="bg-slate-100 mt-1 p-3 border border-gray-300 focus:border-blue-500 rounded-md focus:ring focus:ring-blue-200 w-full text-slate-800"
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
            className="bg-gradient-to-r from-blue-500 hover:from-blue-600 to-indigo-600 hover:to-indigo-700 py-3 rounded-md focus:ring-4 focus:ring-indigo-300 w-full font-semibold text-white transition duration-200 ease-in-out"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>

          {/* Close Button */}
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-400 hover:bg-gray-500 py-2 rounded-md w-full font-semibold text-gray-800 transition duration-200 ease-in-out"
          >
            Close
          </button>
        </form>
      </div>

      {/* Thank You Modal */}
      {showThankYou && (
        <ModalWrapper>
          <div className="bg-white shadow-lg p-8 rounded-lg max-w-sm text-center">
            <h2 className="mb-4 font-bold text-green-600 text-2xl">
              Thank You!
            </h2>
            <p className="text-gray-700">
              Your message has been submitted successfully.
            </p>
            <button
              onClick={() => {
                setShowThankYou(false); // closes the thank you modal
                setShowModal(false); // closes the contact form modal
                window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
              }}
              className="bg-blue-600 hover:bg-blue-700 mt-6 px-4 py-2 rounded text-white"
            >
              Close
            </button>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

ContactForm.propTypes = contactFormPropTypes;

export default ContactForm;
