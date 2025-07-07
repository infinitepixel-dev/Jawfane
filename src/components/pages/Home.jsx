import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import PropTypes from "prop-types"

import Tour from "./Tour"
import MerchPage from "./Merch"
import MusicVideos from "./MusicVideos"
import Booking from "./Booking"
import Footer from "../sub-components/Footer"
import Lore from "./Lore"
import AlbumArtGallery from "../sub-components/AlbumArtGallery"
import MusicMenu from "../sub-components/MusicMenu"
import NewsletterPopup from "../../components/NewsletterPopup"
import CanvasLogo from "../sub-components/CanvasLogo"

function Home() {
  const { theme, isMobile } = useOutletContext()
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const hasSubscribed = localStorage.getItem("jawfane_subscribed")
    if (!hasSubscribed) {
      const timer = setTimeout(() => {
        setShowPopup(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])

  const handlePopupClose = () => {
    setShowPopup(false)
    localStorage.setItem("jawfane_subscribed", "true")
  }

  return (
    <div id="main-app" className="w-screen">
      {showPopup && <NewsletterPopup onClose={handlePopupClose} />}
      <MusicMenu />
      <CanvasLogo theme={theme} isMobile={isMobile} />
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

Home.propTypes = {
  theme: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
}

export default Home
