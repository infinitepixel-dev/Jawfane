import axios from "axios"
import { useEffect, useState } from "react"
import { gsap } from "gsap"

function TaxjarSalesTax() {
  const [taxData, setTaxData] = useState(null)
  const [error, setError] = useState(null)

  const TAXJAR_API_URL = "https://api.sandbox.taxjar.com/v2/taxes"
  const TAXJAR_API_KEY = import.meta.env.VITE_TAXJAR_API_KEY

  // Function to fetch tax data
  const getTax = async () => {
    const orderData = {
      from_country: "US",
      from_zip: "07001",
      from_state: "NJ",
      from_city: "Avenel",
      from_street: "305 W Village Dr",
      to_country: "US",
      to_zip: "07446",
      to_state: "NJ",
      to_city: "Ramsey",
      to_street: "63 W Main St",
      amount: 49.5,
      shipping: 12.5,
    }

    try {
      const response = await axios.post(TAXJAR_API_URL, orderData, {
        headers: {
          Authorization: `Bearer ${TAXJAR_API_KEY}`,
          "Content-Type": "application/json",
        },
      })
      setTaxData(response.data) // Save the tax data
    } catch (error) {
      console.error("Error fetching tax data:", error)
      setError(error) // Save the error
    }
  }

  // GSAP animation on component mount
  useEffect(() => {
    getTax()

    // GSAP animation for when the component is mounted
    gsap.from(".tax-container", { duration: 1, opacity: 0, y: 20 })
  }, []) // Runs only once on mount

  return (
    <div className="flex items-center justify-center h-screen text-white bg-gray-900">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg tax-container">
        <h2 className="mb-4 text-2xl font-bold">TaxJar Sales Tax</h2>

        {/* Display error if exists */}
        {error && (
          <p className="text-red-500">
            Error fetching tax data: {error.message}
          </p>
        )}

        {/* Display tax data if available */}
        {taxData ? (
          <div className="space-y-2">
            <p className="text-xl">Tax: ${taxData.tax.amount_to_collect}</p>
          </div>
        ) : (
          <p className="text-lg">Calculating tax...</p>
        )}
      </div>
    </div>
  )
}

export default TaxjarSalesTax
