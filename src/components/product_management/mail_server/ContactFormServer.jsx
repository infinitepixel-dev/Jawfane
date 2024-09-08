// Import required modules
const express = require("express")
const nodemailer = require("nodemailer")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

// Create transporter for sending email
const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP details
  auth: {
    user: "your-email@gmail.com", // your email
    pass: "your-email-password", // your email password
  },
})

// Endpoint to handle form submission
app.post("/send-email", (req, res) => {
  const { name, email, company, message } = req.body

  // Format email content
  const mailOptions = {
    from: email, // sender email
    to: "your-destination-email@example.com", // recipient email
    subject: `New Booking Request from ${name}`,
    html: `
      <h1>Booking Request</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  }

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      return res.status(500).send({ message: "Error sending email", error })
    }
    res.status(200).send({ message: "Email sent successfully!" })
  })
})

// Start the server
app.listen(3001, () => {
  console.log("Server started on http://localhost:3001")
})
