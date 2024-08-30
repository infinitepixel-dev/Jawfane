import { useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"
import { useLocation } from "react-router-dom"
import propTypes from "prop-types"
import AudioPlayer from "./AudioPlayer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faArrowUp } from "@fortawesome/free-solid-svg-icons"

const Navigation = ({ theme }) => {
  const location = useLocation()
  const [selected, setSelected] = useState("home")
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
    setIsCollapsed(true)
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  useEffect(() => {
    const hash = location.hash.substring(1) || "home"
    setSelected(hash)

    const targetElement = document.getElementById(hash)
    if (targetElement) {
      gsap.to(window, {
        scrollTo: { y: targetElement, offsetY: 0 },
        duration: 1,
        ease: "power2.inOut",
      })
    }
  }, [location])

  useEffect(() => {
    const navItems = document.querySelectorAll("nav ul li")

    gsap.fromTo(
      navItems,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.out" }
    )

    navItems.forEach((item) => {
      const scaleUp = () =>
        gsap.to(item, { scale: 1.1, duration: 0.3, ease: "power2.out" })
      const scaleDown = () =>
        gsap.to(item, { scale: 1, duration: 0.3, ease: "power2.out" })

      item.addEventListener("mouseenter", scaleUp)
      item.addEventListener("mouseleave", scaleDown)

      return () => {
        item.removeEventListener("mouseenter", scaleUp)
        item.removeEventListener("mouseleave", scaleDown)
      }
    })
  }, [])

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
      setIsCollapsed(true)
    }
  }

  const toggleNavbar = () => setIsCollapsed(!isCollapsed)

  return (
    <nav
      id="navigation"
      className={`sticky top-0 w-full p-8 z-50 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } transition-all duration-300 ease-in-out`}
      style={{ marginTop: "0rem", marginBottom: "-1rem" }}
    >
      <div className="absolute left-1 top-4">
        <button
          onClick={toggleNavbar}
          className="p-2 text-white bg-blue-500 rounded-lg md:hidden"
        >
          <FontAwesomeIcon icon={isCollapsed ? faBars : faArrowUp} />
        </button>
      </div>

      <ul
        className={`${
          isCollapsed && isMobile ? "hidden" : "flex"
        } flex-col md:flex-row justify-around items-center space-y-2 md:space-y-0 md:space-x-32 font-extrabold transition-all duration-300 ease-in-out`}
      >
        {["merch", "tour", "music", "lore", "booking"].map((item) => (
          <li
            key={item}
            className={`p-2 rounded transition-transform cursor-pointer ${
              selected === item
                ? `bg-blue-500 ${
                    theme === "dark" ? "text-black" : "text-white"
                  } rounded-full`
                : theme === "dark"
                ? "hover:bg-blue-800 text-white rounded-full"
                : "hover:bg-gray-500 text-black rounded-full"
            } ${
              ["merch", "tour", "booking"].includes(item)
                ? "pointer-events-none line-through"
                : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            <a href={`#${item}`}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          </li>
        ))}

        <div className="relative top-[-1rem] mx-auto">
          <AudioPlayer theme={theme} />
        </div>
      </ul>
    </nav>
  )
}

Navigation.propTypes = {
  theme: propTypes.string.isRequired,
}

export default Navigation
