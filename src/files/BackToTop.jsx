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

  const sections = ["home", "music", "footer"] // List of sections
  const sectionScrollChunk = 0.3 // Scroll through 30% of section height at a time

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
    const currentSectionId = sections[currentSectionIndex]
    const currentSectionElement = document.getElementById(currentSectionId)

    if (currentSectionElement) {
      const sectionHeight = currentSectionElement.offsetHeight
      const currentScrollPos = window.scrollY
      const targetScrollPos =
        currentScrollPos + sectionHeight * sectionScrollChunk

      // Scroll in chunks if more room in the section
      if (targetScrollPos < currentSectionElement.offsetTop + sectionHeight) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: targetScrollPos },
          ease: "power2.out",
        })
      } else if (currentSectionIndex < sections.length - 1) {
        // Move to next section if the current section is fully scrolled
        const nextSectionId = sections[currentSectionIndex + 1]
        const nextSectionElement = document.getElementById(nextSectionId)

        if (nextSectionElement) {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: nextSectionElement.offsetTop },
            ease: "power2.out",
          })
          setCurrentSectionIndex(currentSectionIndex + 1)
        }
      }
    }
  }

  return (
    <div className="right-4 bottom-4 z-50 fixed flex flex-col space-y-2">
      <button
        ref={buttonRef}
        onClick={scrollToTop}
        className="bg-blue-500 hover:bg-blue-700 shadow-lg p-4 rounded-full text-white transition"
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
        className="bg-green-500 hover:bg-green-700 shadow-lg p-4 rounded-full text-white transition"
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
