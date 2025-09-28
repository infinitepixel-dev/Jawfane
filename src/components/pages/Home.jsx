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
import CanvasLogo from "../sub-components/CanvasLogo"

function Home(props) {
  // Prefer outlet context, fall back to props if someone renders <Home theme="..." />
  const outlet = useOutletContext?.() || {}
  const theme = props.theme ?? outlet.theme
  const isMobile = props.isMobile ?? outlet.isMobile

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

// Make them OPTIONAL since Home reads from Outlet context
Home.propTypes = {
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
}

export default Home
