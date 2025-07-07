import express from "express"
import cors from "cors"
import subscribeHandler from "./subscribe.js"

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.post("/api/subscribe", subscribeHandler)

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`)
})
