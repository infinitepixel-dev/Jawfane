import propTypes from "prop-types";

import "./Home.css";
// import AudioPlayer from "../sub-components/AudioPlayer";
import CanvasLogo from "../sub-components/CanvasLogo";

import Hero from "./Hero";
import MusicVideos from "./MusicVideos";

function Home({ theme }) {
  return (
    <div id="home">
      <CanvasLogo theme={theme} />

      <Hero theme={theme} />
      <MusicVideos theme={theme} />
    </div>
  );
}

Home.propTypes = {
  theme: propTypes.string.isRequired,
};

export default Home;
