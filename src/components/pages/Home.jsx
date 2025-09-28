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

function Home() {
  const { theme, isMobile } = useOutletContext()

  return (
    <div id="main-app" className="w-screen">
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

// Still useful to define shape for tooling, but now not strictly "required" as props
Home.propTypes = {
  //mark as required
  theme: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
}

export default Home
