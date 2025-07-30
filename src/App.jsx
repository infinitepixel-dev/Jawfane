// App.jsx
import { useEffect, useState, useMemo } from "react"
import { RouterProvider } from "react-router-dom"
import CountdownTimer from "./components/sub-components/CountdownTimer"
import BrevoModal from "./components/sub-components/modals/BrevoModal"
import { createAppRouter } from "./router"

const App = () => {
  // const date = "04/11/2025 17:11:00"; //Test release date
  const date = "04/23/2025 00:00:00" //Actual release date

  const [theme, setTheme] = useState("dark")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // eslint-disable-next-line no-unused-vars
  const [toggleNavbar, setToggleNavbar] = useState(false)
  const [showWebsite, setShowWebsite] = useState(false)

  const releaseDate = new Date(date.replace(/-/g, "/")).toISOString()

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || "dark"
    setTheme(localTheme)
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
      <BrevoModal />
      // <CountdownTimer
      //   releaseDate={releaseDate}
      //   onTimeUp={() => setShowWebsite(true)}
      // />
    )
  }

  return <RouterProvider router={router} />
}

export default App
