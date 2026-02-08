import propTypes from "prop-types"
import "./Home.css"
import Footer from "../sub-components/Footer"
import CanvasLogo from "../sub-components/CanvasLogo"
import MusicVideos from "./MusicVideos"

function Home({ theme }) {
  return (
    <div id="main-app" className="w-screen">
      <CanvasLogo theme={theme} />
      <MusicVideos theme={theme} />
      <Footer theme={theme} />
    </div>
  )
}

Home.propTypes = {
  theme: propTypes.string.isRequired,
}

export default Home
