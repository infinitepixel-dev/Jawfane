import propTypes from "prop-types";

//INFO Pages imports

import Tour from "./Tour";
import Merch from "./Merch";
import MusicVideos from "./MusicVideos";
import Footer from "../sub-components/Footer";
import Lore from "./Lore";

//INFO Sub-components imports
import CanvasLogo from "../sub-components/CanvasLogo";

function Home({ theme, isMobile, cartItems, addToCart }) {
  // console.log("Home component rendered");
  // console.log("Cart Items: ", cartItems);

  return (
    // <div id="main-app" className="w-screen">
    <div id="main-app" className="w-screen overflow-x-hidden">
      <CanvasLogo theme={theme} isMobile={isMobile} />
      <Merch theme={theme} cartItems={cartItems} addToCart={addToCart} />
      <MusicVideos theme={theme} />
      <Tour theme={theme} />
      <Lore theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

Home.propTypes = {
  theme: propTypes.string.isRequired,
  isMobile: propTypes.bool.isRequired,
  cartItems: propTypes.array.isRequired,
  addToCart: propTypes.func.isRequired,
};

export default Home;
