import { useState } from "react"
import axios from "axios"
import { Builder, parseStringPromise } from "xml2js"

const USPSRate = () => {
  const [rate, setRate] = useState(null)
  const [error, setError] = useState(null)

  const getShippingRate = async () => {
    const userID = "infinite_pixel"
    const userPW = `uzDoCjz5@?iLSYKl"K!h`
    const apiUrl = "https://stg-secure.shippingapis.com/shippingapi.dlll"

    const builder = new Builder()
    console.log("Generated XML:", xmlData)
    const requestBody = {
      RateV4Request: {
        $: { USERID: userID },
        $: { USERPW: userPW },
        Revision: "2",
        Package: {
          $: { ID: "1ST" }, // Package ID
          Service: "GROUND ADVANTAGE", // Service type
          ZipOrigination: "30677", // Zip code of origin
          ZipDestination: "46750", // Zip code of destination
          Pounds: "0", // Package weight in pounds
          Ounces: "10", // Package weight in ounces
          Container: "VARIABLE", // Container type
          Width: "", // Empty Width
          Length: "", // Empty Length
          Height: "", // Empty Height
          ShipDate: "2023-08-08", // Ship date
        },
      },
    }

    const xmlData = builder.buildObject(requestBody)

    try {
      const response = await axios.get(apiUrl, {
        params: {
          API: "RateV4",
          XML: xmlData,
        },
      })

      console.log("Response data:", response.data) // Check the response data

      const result = await parseStringPromise(response.data)
      console.log("Parsed result:", result) // Check the parsed XML result

      const shippingRate = result.RateV4Response.Package[0].Postage[0].Rate[0]
      setRate(shippingRate)
    } catch (err) {
      console.log("Error:", err) // Log any errors
      setError("Error fetching shipping rate")
    }
  }

  return (
    <div>
      <button onClick={getShippingRate}>Get Shipping Rate</button>
      {rate && <p>Shipping Rate: ${rate}</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default USPSRate
