//Navigation.jsx

/*
A navigation bar to traverse website pages
*/

//INFO React Libraries
import { useEffect, useState, useRef, useCallback } from "react"
import propTypes from "prop-types"
import { useLocation, useNavigate } from "react-router-dom"

//INFO Animation Libraries
import { gsap } from "gsap"

//INFO Sub-components
import AudioPlayer from "@components/sub-components/AudioPlayer"

//INFO Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faArrowUp } from "@fortawesome/free-solid-svg-icons"

const Navigation = ({
  DevMode,
  base,
  theme,
  setToggleNavbar,
  isMobile,
  setIsMobile,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selected, setSelected] = useState("") // Tracks the currently selected menu item
  const [isCollapsed, setIsCollapsed] = useState(true) // Tracks the state of the navbar (collapsed/expanded)
  const [isUserClosed, setIsUserClosed] = useState(false) // Tracks if the user manually closed the navbar
  const navBarRef = useRef(null) // Ref for the navbar element
  const navRef = useRef(null) // Ref for the navigation container element
  const inactivityTimeoutRef = useRef(null) // Ref to manage the inactivity timeout
  const hamburgerRef = useRef(null) // Ref for the mobile hamburger button
  const toggleArrowRef = useRef(null) // Ref for the desktop toggle arrow

  // Adjusts navbar state based on screen size
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true) // Collapse the navbar when switching to mobile view
    }
  }, [isMobile])

  // Handle resize to detect mobile vs desktop
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768
      setIsMobile(isNowMobile)

      if (!isNowMobile) {
        // Ensure the menu is always visible on desktop
        gsap.set(navBarRef.current, { opacity: 1 })
        gsap.set(navRef.current, {
          opacity: 1,
          backgroundColor: "rgba(0, 3, 4, 0.95)",
          backdropFilter: "blur(10px)",
        })
      } else {
        gsap.set(navBarRef.current, { opacity: 1 })
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initial check on load

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

  // Handle navbar visibility and fade on scroll or inactivity
  useEffect(() => {
    const handleScroll = () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current)
      }

      // Show the menu when scrolling
      gsap.to(navBarRef.current, {
        opacity: 1,
        duration: 0.5,
        pointerEvents: "auto",
      })
      gsap.to(navRef.current, {
        opacity: 1,
        backgroundColor: "rgba(0, 3, 4, 0.95)",
        duration: 0.5,
        backdropFilter: "blur(10px)",
        pointerEvents: "auto", // Enable pointer events when navbar is visible
      })

      // Set timeout to hide navigation if user is inactive for 5 seconds
      inactivityTimeoutRef.current = setTimeout(() => {
        if (!isMobile && !isUserClosed) {
          gsap.to(navBarRef.current, {
            opacity: 0,
            duration: 0.5,
            pointerEvents: "none",
          })
          gsap.to(navRef.current, {
            opacity: 0,
            backgroundColor: "transparent",
            duration: 0.5,
            pointerEvents: "none", // Disable pointer events when navbar is hidden
          })
          setIsCollapsed(true)
        }
      }, 5000) // 5-second delay
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current)
      }
    }
  }, [isMobile, isUserClosed])

  // Toggle navbar with GSAP (for mobile and desktop)
  const toggleNavbar = useCallback(() => {
    if (isCollapsed) {
      gsap.to(navBarRef.current, {
        opacity: 1,
        height: "auto",
        duration: 0.5,
        ease: "power2.out",
        display: "flex",
        pointerEvents: "auto", // Enable pointer events when navbar is visible
      })
      gsap.to(navRef.current, {
        backgroundColor: "rgba(0, 3, 4, 0.95)",
        opacity: 1,
        duration: 0.5,
        backdropFilter: "blur(10px)",
        pointerEvents: "auto", // Enable pointer events when navbar is visible
      })
      setIsUserClosed(false)
    } else {
      gsap.to(navBarRef.current, {
        opacity: isMobile ? 1 : 0,
        duration: 0.5,
        ease: "power2.in",
        height: 0,
        display: "none",
        pointerEvents: "none", // Disable pointer events when navbar is hidden
      })
      gsap.to(navRef.current, {
        backgroundColor: "transparent",
        opacity: isMobile ? 1 : 0,
        duration: 0.5,
        pointerEvents: "none", // Disable pointer events when navbar is hidden
      })
      setIsUserClosed(true)
    }

    setIsCollapsed(!isCollapsed) // Toggle the state between collapsed and expanded
  }, [isCollapsed, isMobile])

  useEffect(() => {
    if (setToggleNavbar) {
      setToggleNavbar(() => toggleNavbar) // Pass the toggleNavbar function to the parent component if needed
    }
  }, [setToggleNavbar, toggleNavbar])

  // Handle item click for smooth scrolling and navigation
  const handleItemClick = (item) => {
    setSelected(item)

    const targetElement = document.getElementById(item)

    if (targetElement) {
      gsap.to(window, {
        scrollTo: { y: targetElement, offsetY: 0 },
        duration: 1,
        ease: "power2.inOut",
      })
    } else {
      navigate(`/#${item}`, { replace: true })
      setTimeout(() => {
        const target = document.getElementById(item)
        if (target) {
          gsap.to(window, {
            scrollTo: { y: target, offsetY: 0 },
            duration: 1,
            ease: "power2.inOut",
          })
        }
      }, 0)
    }

    if (isMobile) {
      toggleNavbar() // Close the navbar after clicking an item on mobile
    }
  }

  return (
    <>
      {/* Toggle Arrow: Always visible on desktop, positioned at the bottom center of the navbar */}
      {!isMobile && (
        <div
          ref={toggleArrowRef}
          alt="Open/Close Navigation Menu"
          className="fixed top-[0.5em] left-8 transform -translate-x-1/2 z-50 cursor-pointer border border-lime-600 rounded-full bg-lime-600 p-2"
          onClick={toggleNavbar}
          style={{
            zIndex: 950,
          }}
        >
          {/* Shared state for both mobile and desktop toggle */}
          <FontAwesomeIcon icon={isCollapsed ? faBars : faArrowUp} size="lg" />
        </div>
      )}

      {/* Hamburger button: Only visible on mobile */}
      {isMobile && (
        <div
          ref={hamburgerRef}
          className="fixed pl-4 top-4"
          style={{
            zIndex: 1000,
          }}
        >
          <button
            onClick={toggleNavbar}
            className="p-2 text-white rounded-lg bg-lime-600"
          >
            {/* Shared state for both mobile and desktop toggle */}
            {isCollapsed ? (
              <FontAwesomeIcon icon={faBars} />
            ) : (
              <FontAwesomeIcon icon={faArrowUp} />
            )}
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <nav
        ref={navRef}
        id="navigation"
        className={`fixed top-0 w-full border-b-2 shadow-lg shadow-border-bottom border-lime-600 z-50 transition-all duration-300 ease-in-out ${
          !isCollapsed && !isMobile
            ? "bg-black bg-opacity-60"
            : "bg-transparent"
        } ${theme === "dark" ? " text-white" : "bg-gray-100 text-black"}`}
        style={{ opacity: 1, zIndex: 900 }}
      >
        <ul
          ref={navBarRef}
          className={`px-8 ${
            isCollapsed && isMobile ? "hidden" : "flex"
          } pt-4 flex-col md:flex-row justify-around items-center space-y-2 md:space-y-0 md:space-x-16 font-extrabold transition-all duration-300 ease-in-out`}
        >
          {["home", "merch", "music", "tour", "lore", "booking"].map((item) => (
            <li
              key={item}
              className={`p-2 cursor-pointer relative ${
                selected === item
                  ? `${theme === "dark" ? "text-lime-500" : "text-black"}`
                  : `${theme === "dark" ? "text-white" : "text-black"}`
              } 
             
              `}
              onClick={() => handleItemClick(item)}
            >
              {/*  //INFO - Allows you to disable the "Booking" or other links
               ${
                item === "booking" ? "pointer-events-none line-through" : ""
              }
              */}
              <span className="no-underline">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
              <span
                className={`absolute bottom-[-0.25em] left-0 w-full h-[0.25em] ${
                  selected === item ? "bg-lime-500" : "bg-transparent"
                } transition-all duration-300 ease-in-out`}
              ></span>
            </li>
          ))}

          <div className="relative top-[-1rem] mx-auto">
            <AudioPlayer theme={theme} />
          </div>
          {/* If DevMode is enable display the Dashboard in the navigation */}
          {DevMode && (
            <li
              className={`p-2 cursor-pointer relative ${
                selected === "dev" ? "text-lime-500" : "text-white"
              }`}
              onClick={() => handleItemClick("dev")}
            >
              <a href={`${base}/dashboard`} className="no-underline">
                <span className="text-rose-700">(DevMode Enabled)</span>
                <br />
                Admin Dashboard
              </a>
              <span
                className={`absolute bottom-[-0.25em] left-0 w-full h-[0.25em] ${
                  selected === "dev" ? "bg-lime-500" : "bg-transparent"
                } transition-all duration-300 ease-in-out`}
              ></span>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}

Navigation.propTypes = {
  DevMode: propTypes.bool,
  base: propTypes.string,
  theme: propTypes.string.isRequired,
  setToggleNavbar: propTypes.func,
  isMobile: propTypes.bool.isRequired,
  setIsMobile: propTypes.func.isRequired,
}

export default Navigation
