import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react"
import PropTypes from "prop-types"
import { gsap } from "gsap"

//Ensure the correct formatatting... when using non typescript projects
const countdownTimerPropTypes = {
  releaseDate: PropTypes.string.isRequired,
  onTimeUp: PropTypes.func,
}

//uses Reacts new default parameters as defaultProps will be deprecated
const CountdownTimer = ({
  releaseDate,
  onTimeUp = () => console.log("Time is up!"),
}) => {
  // Calculates time left until release date
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

  //State and Ref variables
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(releaseDate))

  const bgRef = useRef(null)
  const orbsRef = useRef([])
  const orbCount = 12
  const initialized = useRef(false)

  // Store initial orb positions in a ref so they do not reset on re-renders
  const orbPositions = useRef(
    [...Array(orbCount)].map(() => ({
      size: Math.random() * 150 + 100,
      top: Math.random() * 100,
      left: Math.random() * 100,
    }))
  )

  // Memoize onTimeUp to prevent re-renders
  const handleTimeUp = useCallback(() => {
    onTimeUp()
  }, [onTimeUp])

  // Orbs animation (completely independent from countdown)
  useLayoutEffect(() => {
    if (initialized.current || !bgRef.current) return
    initialized.current = true

    gsap.to(bgRef.current, {
      backgroundPosition: "50% 60%",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    orbsRef.current.forEach((orb, i) => {
      if (!orb) return // Skip null orbs

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

  // Countdown logic (separate from orbs)
  useEffect(() => {
    // Function to check the cookie value
    const getCookie = (name) => {
      const regex = new RegExp("(^| )" + name + "=([^;]+)")
      const match = regex.exec(document.cookie)
      return match ? decodeURIComponent(match[2]) : null
    }

    // Check cookie and bypass timer if true
    const timesUpMF = getCookie("TimesUpMF")
    // console.log("TimesUpMF cookie value:", timesUpMF);

    if (timesUpMF == "true") {
      handleTimeUp()
      return // Skip setting up the interval
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(releaseDate)
      if (!newTimeLeft) {
        clearInterval(timer)
        handleTimeUp()
      } else {
        setTimeLeft(newTimeLeft)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [releaseDate, handleTimeUp])

  if (!timeLeft) return null

  return (
    <div
      ref={bgRef}
      className="relative flex flex-col justify-center items-center w-screen h-screen overflow-hidden select-none"
      style={{
        background: "linear-gradient(#1a1a1a, #8003fc)",
        backgroundSize: "200% 200%",
      }}
    >
      {/* Orbs (Independent from Countdown) */}
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

      {/* Countdown Timer */}
      <div className="bg-black bg-opacity-50 shadow-lg backdrop-blur-md p-6 rounded-lg text-center">
        <h1 className="mb-4 font-bold text-white text-7xl">Coming Soon</h1>
        <p className="text-white text-4xl">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </p>
      </div>
    </div>
  )
}

CountdownTimer.propTypes = countdownTimerPropTypes

/*note Deprecated defaultProps - left for reference...
  CountdownTimer.defaultProps = {
    onTimeUp: () => console.log("Time is up!"),
  };
*/

export default CountdownTimer
