import propTypes from "prop-types";

import Merch from "./Merch";
import Footer from "../sub-components/Footer";
import CanvasLogo from "../sub-components/CanvasLogo";
import MusicVideos from "./MusicVideos";

function Home({ theme, isMobile }) {
  return (
    <div id="main-app" className="w-screen">
      <CanvasLogo theme={theme} isMobile={isMobile} />
      <MusicVideos theme={theme} />
      <Merch theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

Home.propTypes = {
  theme: propTypes.string.isRequired,
  isMobile: propTypes.bool.isRequired,
};

export default Home;
