import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

export default async function subscribeHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { email } = req.body
  if (!email) {
    return res.status(400).json({ message: "Missing email" })
  }

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/contacts",
      {
        email,
        updateEnabled: true,
        listIds: [3], // 👈 your Brevo list ID
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    )

    return res.status(200).json({ contactId: response.data.id })
  } catch (err) {
    return res.status(500).json({
      message: err.response?.data?.message || "Brevo API error",
    })
  }
}
