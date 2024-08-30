import propTypes from "prop-types"
import "./Home.css"
import Merch from "./Merch"
import Footer from "../sub-components/Footer"
import CanvasLogo from "../sub-components/CanvasLogo"
import MusicVideos from "./MusicVideos"
import Lore from "./Lore"

function Home({ theme }) {
  return (
    <div id="main-app" className="w-screen">
      <CanvasLogo theme={theme} />
      <MusicVideos theme={theme} />
      <Merch theme={theme} />
      <Lore theme={theme} />
      <Footer theme={theme} />
    </div>
  )
}

Home.propTypes = {
  theme: propTypes.string.isRequired,
}

export default Home
