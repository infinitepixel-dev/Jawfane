import { useEffect } from "react"

export default function BrevoModal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.Brevo) {
        window.Brevo.push([
          "openPopupForm",
          { formId: "686d468980ba4da59c34244b" },
        ])
      }
    }, 1000) // Delay to ensure SDK is loaded
    return () => clearTimeout(timer)
  }, [])

  return null
}
