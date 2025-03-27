import { useState, useEffect } from "react"

const CountdownTimer = ({ releaseDate, onTimeUp }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(releaseDate) - new Date()
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return null
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      if (!newTimeLeft) {
        clearInterval(timer)
        onTimeUp()
      }
      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) return null

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-gray-900">
      <h1 className="text-4xl font-bold">Coming Soon</h1>
      <p className="mt-4 text-2xl">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
        {timeLeft.seconds}s
      </p>
    </div>
  )
}

export default CountdownTimer
