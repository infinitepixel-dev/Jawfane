import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"

gsap.registerPlugin(ScrollToPlugin)

const Navigation = ({ theme, setToggleNavbar, isMobile, setIsMobile }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [selected, setSelected] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const navDrawerRef = useRef(null)

  // Define menu in one place; type: 'route' or 'hash'
  const menuItems = [
    { label: "Home", type: "route", to: "/" },
    { label: "Tour", type: "route", to: "/tour" },
    { label: "Merch", type: "route", to: "/merch" },
    { label: "Buy Music", type: "route", to: "/buy-music" },
    { label: "Booking", type: "route", to: "/booking" },
  ]

  // Track window size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [setIsMobile])

  // Update selected item on location change; support #hash deep links
  useEffect(() => {
    const hash = location.hash?.replace("#", "")
    if (hash) {
      setSelected(hash)
      const target = document.getElementById(hash)
      if (target) {
        gsap.to(window, {
          duration: 0.9,
          ease: "power2.inOut",
          scrollTo: { y: target, offsetY: 0 },
        })
      }
    } else {
      // match by pathname to keep active state
      const match = menuItems.find(
        (m) => m.type === "route" && m.to === location.pathname
      )
      setSelected(match?.label?.toLowerCase() || "")
    }
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
    setToggleNavbar((prev) => !prev)

    gsap.to(navDrawerRef.current, {
      x: !menuOpen ? 0 : "-100%",
      duration: 0.4,
      ease: !menuOpen ? "power2.out" : "power2.in",
    })
  }

  const handleClick = (item) => {
    if (item.type === "route") {
      // Navigate to a route (e.g., /buy-music)
      navigate(item.to)
    } else if (item.type === "hash") {
      // Navigate home with hash and scroll
      // Ensures we are on "/" so the element exists
      if (location.pathname !== "/") {
        navigate(`/#${item.to}`)
      } else {
        const target = document.getElementById(item.to)
        if (target) {
          gsap.to(window, {
            duration: 0.9,
            ease: "power2.inOut",
            scrollTo: { y: target, offsetY: 0 },
          })
        } else {
          // fallback: set hash to trigger the effect after the section mounts
          window.location.hash = `#${item.to}`
        }
      }
    }
    setSelected(item.label.toLowerCase())
    if (isMobile && menuOpen) toggleMenu()
  }

  return (
    <header className="top-0 z-50 fixed w-full">
      <div
        className={`flex items-center justify-between px-6 py-2 ${
          theme === "dark" ? "bg-black/70" : "bg-white/80"
        } backdrop-blur-md`}
      >
        {isMobile && (
          <button
            onClick={toggleMenu}
            className="z-50 text-white"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} size="lg" />
          </button>
        )}
      </div>

      {/* Desktop Menu */}
      {!isMobile && (
        <nav className="flex justify-center gap-12 bg-black/50 backdrop-blur-md py-2 font-semibold text-white">
          {menuItems.map((item) => {
            const isActive =
              (item.type === "route" && location.pathname === item.to) ||
              (item.type === "hash" && selected === item.to)
            return (
              <button
                key={item.label}
                onClick={() => handleClick(item)}
                className={`rounded-full px-4 py-2 transition-all duration-300 ${
                  isActive
                    ? "bg-sky-500 text-black"
                    : "hover:bg-sky-700 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <nav
          ref={navDrawerRef}
          className="top-0 left-0 z-40 fixed bg-black p-6 pt-6 w-3/4 h-screen text-white -translate-x-full transform"
        >
          <div className="flex justify-end mb-8">
            <button
              onClick={toggleMenu}
              className="focus:outline-none text-white text-2xl"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <ul className="flex flex-col gap-6 font-bold text-lg">
            {menuItems.map((item) => {
              const isActive =
                (item.type === "route" && location.pathname === item.to) ||
                (item.type === "hash" && selected === item.to)
              return (
                <li
                  key={item.label}
                  onClick={() => handleClick(item)}
                  className={`cursor-pointer transition-colors ${
                    isActive ? "text-sky-400" : "hover:text-sky-500"
                  }`}
                >
                  {item.label}
                </li>
              )
            })}
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
