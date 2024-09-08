import propTypes from "prop-types";

//INFO Pages imports

import Tour from "./Tour";
import Merch from "./Merch";
import MusicVideos from "./MusicVideos";
import Footer from "../sub-components/Footer";
import Lore from "./Lore";
import Booking from "../product_management/pages/Booking";

//INFO Sub-components imports
import Navigation from "../sub-components/navigation/Navigation";
import BackToTop from "@components/sub-components/BackToTop";
import CanvasLogo from "../sub-components/CanvasLogo";

function Home({
  theme,
  isMobile,
  cartItems,
  addToCart,
  DevMode,
  base,
  toggleTheme,
  setIsMobile,
  storeId,
}) {
  // console.log("Home component rendered");
  // console.log("Cart Items: ", cartItems);

  return (
    <>
      <Navigation
        DevMode={DevMode}
        base={base}
        theme={theme}
        toggleTheme={toggleTheme}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        cartItems={cartItems}
      />
      {/* <div id="main-app" className="w-screen"> */}
      <div id="home" className="w-screen overflow-x-hidden">
        <CanvasLogo theme={theme} isMobile={isMobile} />
        <Merch
          storeId={storeId}
          theme={theme}
          cartItems={cartItems}
          addToCart={addToCart}
          isMobile={isMobile}
        />
        <MusicVideos theme={theme} />
        <Tour theme={theme} />
        <Lore theme={theme} />
        <Booking theme={theme} />
        <Footer theme={theme} />
      </div>
      <BackToTop />
    </>
  );
}

Home.propTypes = {
  theme: propTypes.string.isRequired,
  isMobile: propTypes.bool.isRequired,
  cartItems: propTypes.array.isRequired,
  addToCart: propTypes.func.isRequired,
  DevMode: propTypes.bool.isRequired,
  base: propTypes.string.isRequired,
  toggleTheme: propTypes.func.isRequired,
  setIsMobile: propTypes.func.isRequired,
  storeId: propTypes.number,
};

export default Home;
