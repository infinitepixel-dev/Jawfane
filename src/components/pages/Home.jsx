import { useOutletContext } from "react-router-dom"
import PropTypes from "prop-types"

// INFO Pages imports
import Tour from "./Tour"
import MerchPage from "./Merch"
import MusicVideos from "./MusicVideos"
import Booking from "./Booking"
import Footer from "../sub-components/Footer"
import Lore from "./Lore"
import AlbumArtGallery from "../sub-components/AlbumArtGallery"
import MusicMenu from "../sub-components/MusicMenu"

// INFO Sub-components imports
import CanvasLogo from "../sub-components/CanvasLogo"

// Brevo Modal Component
import { useState, useEffect } from "react"

function BrevoModal() {
  const [isOpen, setIsOpen] = useState(false)

  // Optional auto-trigger (3s delay)
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Modal Overlay */}
      {isOpen && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="top-3 right-3 absolute text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            {/* Brevo Form (iframe) */}
            <div className="w-full h-[500px]">
              <iframe
                src="https://your-brevo-form-url" // Replace with actual Brevo form URL
                width="100%"
                height="100%"
                frameBorder="0"
                title="Brevo Signup Form"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Home() {
  const { theme, isMobile } = useOutletContext()

  return (
    <div id="main-app" className="w-screen">
      <MusicMenu />
      <CanvasLogo theme={theme} isMobile={isMobile} />

      {/* Brevo Modal
      <BrevoModal /> */}

      <AlbumArtGallery />
      <Tour theme={theme} />
      <MerchPage theme={theme} />
      <div>
        <Lore theme={theme} isMobile={isMobile} />
      </div>
      <MusicVideos theme={theme} />
      <Booking theme={theme} />
      <Footer theme={theme} isMobile={isMobile} />
    </div>
  )
}

// Still useful to define shape for tooling, but now not strictly "required" as props
Home.propTypes = {
  theme: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
}

export default Home
