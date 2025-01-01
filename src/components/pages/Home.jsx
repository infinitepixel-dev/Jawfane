import propTypes from "prop-types"

//INFO Pages imports

import Tour from "./Tour"
// import Merch from "./Merch";
import MusicVideos from "./MusicVideos"
import Footer from "../sub-components/Footer"

//INFO Sub-components imports
import CanvasLogo from "../sub-components/CanvasLogo"

function Home({ theme, isMobile }) {
  return (
    <div id="main-app" className="w-screen">
      <CanvasLogo theme={theme} isMobile={isMobile} />
      <Tour theme={theme} />
      {/* <Merch theme={theme} /> */}
      <MusicVideos theme={theme} />
      <Footer theme={theme} />
    </div>
  )
}

Home.propTypes = {
  theme: propTypes.string.isRequired,
  isMobile: propTypes.bool.isRequired,
}

export default Home
