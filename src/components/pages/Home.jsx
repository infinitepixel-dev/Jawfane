import propTypes from "prop-types"
import "./Home.css"
import Merch from "./Merch"
import Footer from "../sub-components/Footer"
import CanvasLogo from "../sub-components/CanvasLogo"
import MusicVideos from "./MusicVideos"

function Home({ theme }) {
  return (
    <div id="main-app">
      <CanvasLogo theme={theme} />
      <MusicVideos theme={theme} />
      <Merch theme={theme} />
      <Footer theme={theme} />
    </div>
  )
}

Home.propTypes = {
  theme: propTypes.string.isRequired,
}

export default Home
