import { useState, useEffect } from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/sub-components/Navigation"
import Home from "./components/pages/Home"
import BackToTop from "./components/sub-components/BackToTop"
import MerchPage from "./components/pages/MerchPage"
import Music from "./components/pages/MusicVideos"
// import Tour from './components/pages/Tour'
// import Booking from './components/pages/Booking'

import "./App.css"

const App = () => {
  const [theme, setTheme] = useState("dark")

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
      <div id="home" className={`app-container ${theme}`}>
        <Navigation theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/home" element={<Home theme={theme} />} />
          <Route path="/music" element={<Music theme={theme} />} />
          <Route path="/merch" element={<MerchPage theme={theme} />} />
          {/* <Route path='/tour' element={<Tour theme={theme} />} /> */}
          {/* <Route path='/booking' element={<Booking theme={theme} />} /> */}
        </Routes>
        <BackToTop />
      </div>
    </Router>
  )
}

export default App
