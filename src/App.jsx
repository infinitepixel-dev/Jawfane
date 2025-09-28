// App.jsx
import { useEffect, useMemo, useState, Suspense } from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import CountdownTimer from "./components/sub-components/CountdownTimer"
import RoutesWithComponents from "./components/routes/routesConfig"
import Navigation from "./components/sub-components/Navigation.jsx"

// Friendly fallback if a route component failed to bind
function MissingPage({ path }) {
  return (
    <div className="place-items-center grid bg-black p-6 min-h-screen text-white">
      <div className="max-w-xl text-center">
        <h2 className="mb-2 font-bold text-xl">Route component missing</h2>
        <p className="text-white/70">
          Couldn’t load <code className="text-fuchsia-300">{path}</code>. Check
          the file path (relative to <code>src/routes/</code>) and that it has a{" "}
          <strong>default export</strong>.
        </p>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="place-items-center grid bg-black p-6 min-h-screen text-white">
      <div className="max-w-md text-center">
        <h1 className="mb-2 font-extrabold text-3xl">404</h1>
        <p className="text-white/70">Page not found.</p>
      </div>
    </div>
  )
}

// Root layout that provides Outlet context for pages (Home uses useOutletContext)
function RootLayout({ theme, isMobile, setIsMobile, setToggleNavbar }) {
  return (
    <>
      <Navigation
        theme={theme}
        setToggleNavbar={setToggleNavbar}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />
      {/* Provide context expected by pages like Home.jsx */}
      <Outlet context={{ theme, isMobile, setIsMobile, setToggleNavbar }} />
    </>
  )
}

export default function App() {
  // const date = "04/11/2025 17:11:00" // Test release date
  const date = "04/23/2025 00:00:00" // Actual release date

  const [theme, setTheme] = useState("dark")
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  )
  const [toggleNavbar, setToggleNavbar] = useState(false)
  const [showWebsite, setShowWebsite] = useState(false)

  // Normalize to ISO for CountdownTimer
  const releaseDate = useMemo(
    () => new Date(date.replace(/-/g, "/")).toISOString(),
    [date]
  )

  // Theme + initial release gate
  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || "dark"
    setTheme(localTheme)

    // ensure only one theme class on <html>
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(localTheme)

    const now = new Date()
    const launchDate = new Date(releaseDate)
    if (now >= launchDate) setShowWebsite(true)
  }, [releaseDate])

  // Keep isMobile in sync
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  if (!showWebsite) {
    return (
      <CountdownTimer
        releaseDate={releaseDate}
        onTimeUp={() => setShowWebsite(true)}
      />
    )
  }

  // Helper to safely render a route element
  const renderRouteElement = (route) => {
    const Cmp = route.component
    if (!Cmp) {
      // component didn’t bind (path mismatch or no default export)
      return <MissingPage path={route.componentPath} />
    }
    return <Cmp />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Root layout provides Outlet context (fixes useOutletContext null) */}
        <Route
          path="/"
          element={
            <RootLayout
              theme={theme}
              isMobile={isMobile}
              setIsMobile={setIsMobile}
              setToggleNavbar={setToggleNavbar}
            />
          }
        >
          {/* Lazy pages get a Suspense fallback */}
          <Route
            index
            element={
              <Suspense
                fallback={<div className="p-6 text-white/80">Loading…</div>}
              >
                {renderRouteElement(
                  // find the route whose path is "/"
                  RoutesWithComponents.find((r) => r.path === "/") || {}
                )}
              </Suspense>
            }
          />

          {/* Map the rest of your routes under the layout.
              Use child paths without the leading slash so they render inside this Outlet. */}
          {RoutesWithComponents.filter((r) => r.path !== "/").map((r) => (
            <Route
              key={r.key}
              path={r.path.replace(/^\//, "")}
              element={
                <Suspense
                  fallback={<div className="p-6 text-white/80">Loading…</div>}
                >
                  {renderRouteElement(r)}
                </Suspense>
              }
            />
          ))}

          {/* 404 for anything unmatched under root */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
