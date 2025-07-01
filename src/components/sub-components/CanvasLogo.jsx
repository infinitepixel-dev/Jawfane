import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import propTypes from "prop-types"
// import logo from "@public/jawfane_logo.svg";
// import hero_bg from "@public/hero_bg.webp";
// import hero_bg_mobile from "/hero_bg_mobile.webp";

import "../../css/AnimatedLogo.css"

const AnimatedLogo = ({ theme, isMobile }) => {
  const logoRef = useRef(null)

  const colorChangeSpeed = 2000 // Duration in milliseconds for the color change
  const interval = colorChangeSpeed // Interval between color changes

  useEffect(() => {
    const newColor = theme === "dark" ? "#000000" : "#FFFFFF"
    gsap.to(document.body, { backgroundColor: newColor, duration: 1 })

    const colors = [
      "#1d7d7b",
      "#4caf50",
      "#fdd835",
      "#e53935",
      "#81c784",
      "#fff176",
      "#ff7043",
      "#ff8a80",
      "#f06292",
      "#ab47bc",
    ]

    let currentColorIndex = 0

    const changeColor = () => {
      const nextColorIndex = (currentColorIndex + 1) % colors.length
      const nextColor = colors[nextColorIndex]

      gsap.to(logoRef.current, {
        duration: colorChangeSpeed / 1000,
        filter: `drop-shadow(0px 0px 10px ${nextColor})`,
        onComplete: () => {
          currentColorIndex = nextColorIndex
          setTimeout(changeColor, interval)
        },
      })
    }

    changeColor()

    return () => {
      // Cleanup to avoid memory leaks
      gsap.killTweensOf(logoRef.current)
    }
  }, [colorChangeSpeed, interval, theme])

  return (
    <div
      id="animatedLogo"
      className="relative flex justify-center items-center w-full h-screen"
    >
      {isMobile ? (
        <img
          src="/images/hero_bg_mobile.webp"
          alt="Hero Background"
          className="absolute w-full h-full"
          style={{
            objectFit: "scale-down",
            objectPosition: "center",
            filter: "contrast(1.2) brightness(0.27)",
          }}
        />
      ) : (
        <img
          src="/images/hero_bg.png"
          alt="Hero Background"
          className="absolute w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}
      {isMobile ? (
        <img
          ref={logoRef}
          src="/images/jawfane_logo.svg"
          alt="Jawfane Logo"
          className="relative px-4"
          style={{
            height: "30%",
            width: "auto",
            position: "absolute",
            top: "10%",
            objectFit: "contain",
            fill: "black",
          }}
        />
      ) : (
        <img
          ref={logoRef}
          src="/images/jawfane_logo.svg"
          alt="Jawfane Logo"
          className="relative"
          style={{
            height: "40%",
            width: "auto",
            objectFit: "contain",
          }}
        />
      )}
    </div>
  )
}

AnimatedLogo.propTypes = {
  theme: propTypes.string.isRequired,
  isMobile: propTypes.bool.isRequired,
}

export default AnimatedLogo
