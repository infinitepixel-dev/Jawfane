import { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import gsap from "gsap"

const NewsletterPopup = ({ onClose }) => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle")
  const [message, setMessage] = useState("")
  const popupRef = useRef(null)
  const emailInputRef = useRef(null)

  useEffect(() => {
    if (popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      )
    }
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (res.ok) {
        setStatus("success")
        setMessage("You're on the list!")
        setEmail("")
        localStorage.setItem("jawfane_subscribed", "true")
        onClose() // closes popup after success
      } else {
        setStatus("error")
        setMessage(data?.message || "Something went wrong.")
      }
    } catch (err) {
      setStatus("error")
      setMessage("Could not connect. Try again.")
    }
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-90">
      <div
        ref={popupRef}
        className="relative bg-white dark:bg-zinc-900 shadow-2xl p-6 rounded-xl md:w-full max-w-md"
      >
        <button
          onClick={onClose}
          className="top-2 right-3 absolute text-gray-400 hover:text-red-500 text-xl"
          aria-label="Close popup"
        >
          ×
        </button>

        <h2 className="mb-4 font-bold text-zinc-900 dark:text-white text-2xl text-center">
          Join the Jawfane Newsletter
        </h2>

        <p className="mb-4 text-zinc-500 dark:text-zinc-300 text-sm text-center">
          Get updates on merch drops, new songs, and shows.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white dark:bg-zinc-800 p-3 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full text-zinc-900 dark:text-white"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-black dark:bg-white hover:opacity-90 py-2 rounded-md font-semibold text-slate-900 dark:text-black transition-all"
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>

          {message && (
            <p
              className={`text-center text-sm ${
                status === "success"
                  ? "text-green-600"
                  : status === "error"
                  ? "text-red-500"
                  : "text-zinc-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

NewsletterPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default NewsletterPopup
