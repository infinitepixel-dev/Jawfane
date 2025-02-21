import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { gsap } from "gsap"

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showNextButton, setShowNextButton] = useState(true)
  const buttonRef = useRef(null)
  const nextButtonRef = useRef(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const sections = [
    "home",
    "album",
    "tour",
    "lore",
    "music",
    "booking",
    "footer",
  ] // List of sections

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      setIsVisible(scrollPosition > 300)

      // If at bottom of the page, hide the "next" button
      if (scrollPosition + windowHeight >= documentHeight) {
        setShowNextButton(false)
      } else {
        setShowNextButton(true)
      }

      // Collapse the navbar on manual scroll
      if (scrollPosition > 0) {
        // closeNavbar(); // Call the passed-in closeNavbar function
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  useEffect(() => {
    const animateButton = (ref, visible) => {
      gsap.to(ref.current, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 20,
        scale: visible ? 1 : 0.8,
        rotate: visible ? 0 : 45,
        duration: 0.6,
        display: visible ? "block" : "none",
        ease: visible ? "power2.out" : "power2.in",
      })
    }

    animateButton(buttonRef, isVisible)
    animateButton(nextButtonRef, showNextButton)
  }, [isVisible, showNextButton])

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: "power2.out",
    })
    setCurrentSectionIndex(0) // Reset to the first section
  }

  const scrollToNextSection = () => {
    const nextSectionIndex = currentSectionIndex + 1

    if (nextSectionIndex < sections.length) {
      const nextSectionId = sections[nextSectionIndex]
      const nextSectionElement = document.getElementById(nextSectionId)

      console.log("Next Section ID:", nextSectionId)
      console.log("Next Section Element:", nextSectionElement)

      if (nextSectionElement) {
        // Log the position of the section to debug
        console.log("Next Section OffsetTop:", nextSectionElement.offsetTop)

        // Attempt a scroll directly with window.scrollTo() for debugging
        window.scrollTo({
          top: nextSectionElement.offsetTop,
          behavior: "smooth",
        })

        // Now update the index state after scrolling
        setCurrentSectionIndex(nextSectionIndex)
      } else {
        console.error("Section not found:", nextSectionId)
      }
    } else {
      console.warn("No more sections to scroll to.")
    }
  }

  return (
    <div className="fixed z-50 flex flex-col space-y-2 bottom-4 right-4">
      <button
        ref={buttonRef}
        onClick={scrollToTop}
        className="p-4 text-white transition bg-blue-500 rounded-full shadow-lg hover:bg-blue-700"
        style={{
          opacity: 0,
          transform: "translateY(20px) scale(0.8) rotate(45deg)",
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>

      <button
        ref={nextButtonRef}
        onClick={scrollToNextSection}
        className="p-4 text-white transition bg-green-500 rounded-full shadow-lg hover:bg-green-700"
        style={{
          opacity: 0,
          transform: "translateY(20px) scale(0.8) rotate(45deg)",
        }}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
    </div>
  )
}

export default BackToTop
