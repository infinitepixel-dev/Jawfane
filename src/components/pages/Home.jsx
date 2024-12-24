//Home.jsx

/*
A component to manage the home page of the website
*/

//INFO React Libraries
import propTypes from "prop-types"

//INFO Pages
import Tour from "@pages/Tour"
import Merch from "@pages/Merch"
import MusicVideos from "@pages/MusicVideos"
import Footer from "@pages/Footer"
import Lore from "@pages/Lore"
import Booking from "@pages/Booking"

//INFO Sub-components
import Navigation from "@navigation_product_management/Navigation"
import BackToTop from "@buttons_product_management/BackToTop"
import CanvasLogo from "@logos_product_management/CanvasLogo"

function Home({
  storeId,
  theme,
  isMobile,
  cartItems,
  addToCart,
  DevMode,
  base,
  toggleTheme,
  setIsMobile,
}) {
  // console.log("Home component rendered");
  // console.log("Cart Items: ", cartItems);

  return (
    <>
      <Navigation
        storeId={storeId}
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
        <MusicVideos theme={theme} />
        <Tour theme={theme} />
        <Lore theme={theme} />
        <Booking theme={theme} />
        <Footer theme={theme} />
      </div>
      <BackToTop />
    </>
  )
}

Home.propTypes = {
  storeId: propTypes.number,
  theme: propTypes.string.isRequired,
  isMobile: propTypes.bool.isRequired,
  DevMode: propTypes.bool.isRequired,
  base: propTypes.string.isRequired,
  toggleTheme: propTypes.func.isRequired,
  setIsMobile: propTypes.func.isRequired,
}

export default Home
