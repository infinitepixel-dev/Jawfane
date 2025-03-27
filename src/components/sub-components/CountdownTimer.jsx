import { useState, useEffect, useRef, useLayoutEffect } from "react"
import PropTypes from "prop-types"
import { gsap } from "gsap"

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
  const bgRef = useRef(null)
  const orbsRef = useRef([])
  const initialized = useRef(false)

  // Countdown timer logic
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
  }, [releaseDate, onTimeUp])

  // Run animations once after mounting
  useLayoutEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Background Animation
    gsap.to(bgRef.current, {
      backgroundPosition: "50% 60%",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    // Animate each orb smoothly
    orbsRef.current.forEach((orb, i) => {
      // Floating movement
      gsap.to(orb, {
        x: "random(-20, 20, 1)",
        y: "random(-20, 20, 1)",
        scale: "random(0.8, 1.3)",
        duration: 10 + i * 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Smooth Shape Morphing
      gsap.to(orb, {
        borderRadius: ["30%", "50%", "70%", "100%", "40%", "20%"],
        duration: 12 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      // Color Transition
      gsap.to(orb, {
        backgroundColor: [
          "#ff007f",
          "#fc4903",
          "#ffd700",
          "#9acd32",
          "#0384fc",
        ],
        duration: 10 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })
    })
  }, [])

  if (!timeLeft) return null

  return (
    <div
      ref={bgRef}
      className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden"
      style={{
        background: "linear-gradient(#1a1a1a, #8003fc)",
        backgroundSize: "200% 200%",
      }}
    >
      {/* Floating Orbs */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el && !orbsRef.current.includes(el)) orbsRef.current.push(el)
          }}
          className="absolute orb mix-blend-screen"
          style={{
            width: `${Math.random() * 150 + 100}px`,
            height: `${Math.random() * 150 + 100}px`,
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />
      ))}

      {/* Countdown Timer Box */}
      <div className="p-6 text-center bg-black bg-opacity-50 rounded-lg shadow-lg backdrop-blur-md">
        <h1 className="mb-4 font-bold text-white text-7xl">Coming Soon</h1>
        <p className="text-4xl text-white">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </p>
      </div>
    </div>
  )
}

// ✅ PropTypes for Safety
CountdownTimer.propTypes = {
  releaseDate: PropTypes.instanceOf(Date).isRequired,
  onTimeUp: PropTypes.func,
}

// ✅ Default Props to Avoid Errors
CountdownTimer.defaultProps = {
  onTimeUp: () => console.log("Time is up!"),
}

export default CountdownTimer
