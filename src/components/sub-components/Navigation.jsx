import { useEffect, useState, useRef } from "react"
import { useLocation } from "react-router-dom"
import { gsap } from "gsap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"

const Navigation = ({ theme, setToggleNavbar, isMobile, setIsMobile }) => {
  const location = useLocation()
  const [selected, setSelected] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  const navDrawerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      const nowMobile = window.innerWidth < 768
      setIsMobile(nowMobile)
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [setIsMobile])

  useEffect(() => {
    const hash = location.hash.substring(1)
    setSelected(hash || "home")

    if (hash) {
      const target = document.getElementById(hash)
      if (target) {
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 0 },
          duration: 1,
          ease: "power2.inOut",
        })
      }
    }
  }, [location])

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
    setToggleNavbar((prev) => !prev)

    if (!menuOpen) {
      gsap.to(navDrawerRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      })
    } else {
      gsap.to(navDrawerRef.current, {
        x: "-100%",
        duration: 0.4,
        ease: "power2.in",
      })
    }
  }

  const handleItemClick = (item) => {
    setSelected(item)
    const target = document.getElementById(item)
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 0 },
        duration: 1,
        ease: "power2.inOut",
      })
    }
    if (isMobile && menuOpen) toggleMenu()
  }

  const menuItems = ["tour", "music", "booking"]

  return (
    <header className="top-0 z-50 fixed w-full">
      <div
        className={`flex items-center justify-between px-6 py-2 ${
          theme === "dark" ? "bg-black bg-opacity-70" : "bg-white bg-opacity-80"
        } backdrop-blur-md`}
      >
        {isMobile && (
          <button onClick={toggleMenu} className="z-50 text-white">
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} size="lg" />
          </button>
        )}
      </div>

      {/* Desktop Menu */}
      {!isMobile && (
        <nav className="flex justify-center gap-12 bg-black bg-opacity-50 backdrop-blur-md py-2 font-semibold text-white">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleItemClick(item)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selected === item
                  ? "bg-sky-500 text-black"
                  : "hover:bg-sky-700 hover:text-white"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <nav
          ref={navDrawerRef}
          className="top-0 left-0 z-40 fixed bg-black p-6 pt-6 w-3/4 h-screen text-white -translate-x-full transform"
        >
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={toggleMenu}
              className="focus:outline-none text-white text-2xl"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* Menu Items */}
          <ul className="flex flex-col gap-6 font-bold text-lg">
            {menuItems.map((item) => (
              <li
                key={item}
                onClick={() => handleItemClick(item)}
                className={`cursor-pointer transition-colors ${
                  selected === item ? "text-sky-400" : "hover:text-sky-500"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

Navigation.propTypes = {
  theme: PropTypes.string.isRequired,
  setToggleNavbar: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  setIsMobile: PropTypes.func.isRequired,
}

export default Navigation
