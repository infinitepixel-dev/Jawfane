import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./components/pages/Home"
import Tour from "./components/pages/Tour"
import Music from "./components/pages/MusicVideos"
import Booking from "./components/pages/Booking"

import Navigation from "./components/sub-components/Navigation"
import BackToTop from "./components/sub-components/BackToTop"

import "./App.css"

const App = () => {
  const [theme, setTheme] = useState("dark")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [toggleNavbar, setToggleNavbar] = useState(false)

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || "dark"
    setTheme(localTheme)
    document.documentElement.classList.add(localTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    document.documentElement.classList.replace(theme, newTheme)
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <Router basename="/Jawfane">
      <div id="home" className={`app-container ${theme} overflow-hidden`}>
        <Navigation
          theme={theme}
          toggleTheme={toggleTheme}
          setToggleNavbar={setToggleNavbar}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
        />
        <Routes>
          <Route
            path="/"
            element={<Home theme={theme} isMobile={isMobile} />}
          />
          <Route
            path="/home"
            element={<Home theme={theme} isMobile={isMobile} />}
          />
          <Route path="/tour" element={<Tour theme={theme} />} />
          <Route path="/music" element={<Music theme={theme} />} />
          <Route path="/booking" element={<Booking theme={theme} />} />
        </Routes>
        <BackToTop />
      </div>
    </Router>
  )
}

export default App
