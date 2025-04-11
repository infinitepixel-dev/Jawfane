import propTypes from "prop-types"

//INFO Pages imports

import Tour from "./Tour"
import MusicVideos from "./MusicVideos"
import Booking from "./Booking"
import Footer from "../sub-components/Footer"
import Lore from "./Lore"
import AlbumArtGallery from "../sub-components/AlbumArtGallery"
import MusicMenu from "../sub-components/MusicMenu"

//INFO Sub-components imports
import CanvasLogo from "../sub-components/CanvasLogo"

function Home({ theme, isMobile }) {
  return (
    <div id="main-app" className="w-screen">
      <MusicMenu />
      <CanvasLogo theme={theme} isMobile={isMobile} />
      <AlbumArtGallery />
      <Tour theme={theme} />
      <div className="p-2">
        <Lore theme={theme} isMobile={isMobile} />
      </div>
      <MusicVideos theme={theme} />
      <Booking theme={theme} />
      <Footer theme={theme} />
    </div>
  )
}

Home.propTypes = {
  theme: propTypes.string.isRequired,
  isMobile: propTypes.bool.isRequired,
}

export default Home
