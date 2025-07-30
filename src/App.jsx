// App.jsx
import { useEffect, useState, useMemo } from "react"
import { RouterProvider } from "react-router-dom"
import { createAppRouter } from "./router"

const App = () => {
  const [theme, setTheme] = useState("dark")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [toggleNavbar, setToggleNavbar] = useState(false)

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || "dark"
    setTheme(localTheme)
    document.documentElement.classList.add(localTheme)
  }, [])

  const router = useMemo(
    () =>
      createAppRouter({
        theme,
        isMobile,
        setToggleNavbar,
        setIsMobile,
      }),
    [theme, isMobile] // rebuild router if layout changes
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
