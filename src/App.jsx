// App.jsx
import { useEffect, useState, useMemo } from "react"
import { RouterProvider } from "react-router-dom"
import { createAppRouter } from "./router"

const App = () => {
  const [theme, setTheme] = useState("dark")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // eslint-disable-next-line no-unused-vars
  const [toggleNavbar, setToggleNavbar] = useState(false)
  const [showWebsite, setShowWebsite] = useState(false)

  const releaseDate = new Date(date.replace(/-/g, "/")).toISOString()

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || "dark"
    setTheme(localTheme)

    // ensure only one theme class on <html>
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(localTheme)

    const now = new Date()
    const launchDate = new Date(releaseDate)
    if (now >= launchDate) {
      setShowWebsite(true)
    }
  }, [])

  const router = useMemo(
    () =>
      createAppRouter({
        theme,
        isMobile,
        // toggleTheme,
        setToggleNavbar,
        setIsMobile,
      }),
    [theme, isMobile] // rebuild router if layout changes
  )

  if (!showWebsite) {
    return (
      <CountdownTimer
        releaseDate={releaseDate}
        onTimeUp={() => setShowWebsite(true)}
      />
    )
  }

  return <RouterProvider router={router} />
}

export default App
