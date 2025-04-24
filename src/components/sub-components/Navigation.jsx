import { useEffect, useState, useRef, useCallback } from "react"
import { gsap } from "gsap"
import { useLocation } from "react-router-dom"
import propTypes from "prop-types"
// import AudioPlayer from "./AudioPlayer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faArrowUp } from "@fortawesome/free-solid-svg-icons"

const Navigation = ({ theme, setToggleNavbar, isMobile, setIsMobile }) => {
  const location = useLocation()
  const [selected, setSelected] = useState("")

  const navBarRef = useRef(null)
  const navRef = useRef(null)
  const hamburgerRef = useRef(null)

  // Handle resize to detect mobile vs desktop
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768
      setIsMobile(isNowMobile)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [setIsMobile])

  // Handle URL hash scrolling on initial load
  useEffect(() => {
    const hash = location.hash.substring(1)
    setSelected(hash ? hash : "home")

    if (hash) {
      const targetElement = document.getElementById(hash)
      if (targetElement) {
        gsap.to(window, {
          scrollTo: { y: targetElement, offsetY: 0 },
          duration: 1,
          ease: "power2.inOut",
        })
      }
    }
  }, [location])

  const toggleNavbar = useCallback(() => {
    if (navBarRef.current) {
      const isNavVisible = navBarRef.current.classList.contains("hidden")

      // If the navbar is currently hidden, show it
      if (isNavVisible) {
        gsap.to(navBarRef.current, {
          opacity: 1,
          height: "auto", // Ensure it expands to show the menu items
          duration: 0.5,
          ease: "power2.out",
        })
        navBarRef.current.classList.remove("hidden")
      } else {
        // If the navbar is visible, hide it
        gsap.to(navBarRef.current, {
          opacity: 0,
          height: 0, // Collapse the menu
          duration: 0.5,
          ease: "power2.out",
        })
        navBarRef.current.classList.add("hidden")
      }
    }

    setToggleNavbar((prev) => !prev) // Toggle the state to control navbar visibility
  }, [isMobile, setToggleNavbar])

  const handleItemClick = (item) => {
    setSelected(item)
    const targetElement = document.getElementById(item)
    if (targetElement) {
      gsap.to(window, {
        scrollTo: { y: targetElement, offsetY: 0 },
        duration: 1,
        ease: "power2.inOut",
      })
    }
    if (isMobile) {
      toggleNavbar()
    }
  }

  return (
    <>
      {isMobile && (
        <div
          ref={hamburgerRef}
          className="sticky pl-4 top-4"
          style={{ zIndex: 1000 }}
        >
          <button
            role="button"
            onClick={toggleNavbar}
            className="p-2 text-white bg-blue-500 rounded-lg"
          >
            {isMobile ? (
              <FontAwesomeIcon icon={faBars} />
            ) : (
              <FontAwesomeIcon icon={faArrowUp} />
            )}
          </button>
        </div>
      )}

      <nav
        ref={navRef}
        id="navigation"
        className={`sticky top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          !isMobile ? "bg-black bg-opacity-60" : "bg-transparent"
        } ${
          theme === "dark" ? " text-slate-950" : "bg-gray-100 text-slate-900"
        }`}
      >
        <ul
          ref={navBarRef}
          className={`px-8 ${
            isMobile ? "hidden" : "flex"
          } py-4 md:py-2 flex-col md:flex-row gap-14 justify-center items-center space-y-2 md:space-y-0 md:space-x-16 font-extrabold transition-all duration-300 ease-in-out`}
        >
          {["tour", "music", "booking"].map((item) => (
            <li
              key={item}
              role="button"
              className={`p-2 rounded transition-transform cursor-pointer ${
                selected === item
                  ? `bg-sky-500 ${
                      theme === "dark" ? "text-black" : "text-slate-950"
                    } rounded-full`
                  : theme === "dark"
                  ? "hover:bg-sky-700 text-white rounded-full"
                  : "hover:bg-gray-500 text-slate-950 rounded-full"
              }`}
              onClick={() => handleItemClick(item)}
            >
              <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

Navigation.propTypes = {
  theme: propTypes.string.isRequired,
  setToggleNavbar: propTypes.func.isRequired,
  isMobile: propTypes.bool.isRequired,
  setIsMobile: propTypes.func.isRequired,
}

export default Navigation
