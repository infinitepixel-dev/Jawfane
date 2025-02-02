const DevMode = false

//INFO React Libraries
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//INFO Pages imports
import Home from "./components/pages/Home"
import Tour from "./components/pages/Tour"
import Music from "./components/pages/MusicVideos"
import Booking from "./components/pages/Booking"

//INFO Sub-components imports
import Navigation from "./components/sub-components/Navigation"
import BackToTop from "./components/sub-components/BackToTop"

import "./App.css"

const App = () => {
  const storeId = 1

  //import the base from vite config
  const [base, setBase] = useState("")
  const [theme, setTheme] = useState("dark")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [toggleNavbar, setToggleNavbar] = useState(false) // Manage the navbar toggle state

  //INFO theme settings
  useEffect(() => {
    const localTheme = localStorage.getItem("theme")
    if (localTheme) {
      setTheme(localTheme)
      document.documentElement.classList.add(localTheme)
    } else {
      document.documentElement.classList.add(theme)
    }
  }, [theme])

  //INFO toggles the theme and locally stores it
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    document.documentElement.classList.remove(theme)
    document.documentElement.classList.add(newTheme)
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <Router>
      <div id="home" className={`app-container ${theme} overflow-hidden`}>
        <Navigation
          theme={theme}
          toggleTheme={toggleTheme}
          setToggleNavbar={setToggleNavbar} // Pass the setter to Navigation
          isMobile={isMobile}
          setIsMobile={setIsMobile}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                storeId={storeId}
                theme={theme}
                isMobile={isMobile}
                cartItems={cartItems}
                addToCart={addToCart}
                DevMode={DevMode}
                base={base}
                toggleTheme={toggleTheme}
                setIsMobile={setIsMobile}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                storeId={storeId}
                theme={theme}
                isMobile={isMobile}
                cartItems={cartItems}
                addToCart={addToCart}
                DevMode={DevMode}
                base={base}
                toggleTheme={toggleTheme}
                setIsMobile={setIsMobile}
              />
            }
          />
          <Route
            path="/Jawfane"
            element={
              <Home
                storeId={storeId}
                theme={theme}
                isMobile={isMobile}
                cartItems={cartItems}
                addToCart={addToCart}
                DevMode={DevMode}
                base={base}
                toggleTheme={toggleTheme}
                setIsMobile={setIsMobile}
              />
            }
          />
          <Route path="/tour" element={<Tour theme={theme} />} />
          <Route path="/music" element={<Music theme={theme} />} />
          <Route path="/booking" element={<Booking theme={theme} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
