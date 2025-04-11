import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react"
import PropTypes from "prop-types"
import { gsap } from "gsap"

const calculateTimeLeft = (releaseDate) => {
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

const CountdownTimer = ({
  releaseDate,
  onTimeUp = () => console.log("Time is up!"),
}) => {
  // Ensure releaseDate is a Date object
  const releaseDateObj = new Date(releaseDate)

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(releaseDateObj))

  const bgRef = useRef(null)
  const orbsRef = useRef([])

  const orbCount = 12
  const initialized = useRef(false)

  const orbPositions = useRef(
    [...Array(orbCount)].map(() => ({
      size: Math.random() * 150 + 100,
      top: Math.random() * 100,
      left: Math.random() * 100,
    }))
  )

  const handleTimeUp = useCallback(() => {
    onTimeUp()
  }, [onTimeUp])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = calculateTimeLeft(releaseDateObj)

        if (!newTime) {
          handleTimeUp()
          clearInterval(timer)
          return prevTime
        }

        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [releaseDateObj, handleTimeUp])

  useLayoutEffect(() => {
    if (initialized.current) return
    initialized.current = true

    gsap.to(bgRef.current, {
      backgroundPosition: "50% 60%",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    orbsRef.current.forEach((orb, i) => {
      const deltaX = gsap.utils.random(30, 80)
      const deltaY = gsap.utils.random(30, 80)
      const duration = gsap.utils.random(6, 12)

      gsap.to(orb, {
        x: `+=${deltaX}`,
        y: `+=${deltaY}`,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(orb, {
        borderRadius: ["30%", "50%", "70%", "100%", "40%", "20%"],
        duration: 12 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      gsap.to(orb, {
        backgroundColor: gsap.utils.random([
          "#ff007f",
          "#0384fc",
          "#fc4903",
          "#ffd700",
          "#9acd32",
        ]),
        duration: 10 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: { amount: 4 },
      })
    })
  }, [])

  if (!timeLeft) return null

  return (
    <div
      ref={bgRef}
      className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden select-none"
      style={{
        background: "linear-gradient(#1a1a1a, #8003fc)",
        backgroundSize: "200% 200%",
      }}
    >
      {orbPositions.current.map((pos, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el && !orbsRef.current.includes(el)) orbsRef.current.push(el)
          }}
          className="absolute orb mix-blend-screen"
          style={{
            width: `${pos.size}px`,
            height: `${pos.size}px`,
            top: `${pos.top}vh`,
            left: `${pos.left}vw`,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            filter: "blur(35px)",
          }}
        />
      ))}

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

CountdownTimer.propTypes = {
  releaseDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  onTimeUp: PropTypes.func,
}

export default CountdownTimer
