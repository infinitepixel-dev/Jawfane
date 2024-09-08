const DevMode = true;
//Be sure to change the base in vite.config.js to the correct path
//Home.jx

/*
A component that populates the home page
*/

//INFO React Libraries
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//INFO Pages
import Home from "@components/pages/Home";
import Tour from "@components/pages/Tour";
import Merch from "@components/pages/Merch";
import Music from "@components/pages/MusicVideos";
import Lore from "@components/pages/Lore";
import Booking from "@components/pages/Booking";

//INFO Sub-components
// import BackToTop from "@components/sub-components/BackToTop";

//ANCHOR Product Management Components
//INFO Admin Pages
import Dashboard from "@admin_product_management/Dashboard.jsx";
// import UsersManager from "@admin_product_management/UsersManager";
// import AddProductForm from "@admin_product_management/AddProductForm";

//INFO Pages
import CartPage from "@pages_product_management/CartPage";
import CheckoutPage from "@pages_product_management/Checkout";

// INFO Sub-components
// import CartPopOut from "@sub-menus_product_management/CartPopOut";

import "./App.css";

const App = () => {
  //TODO fetch the db for the store id
  const storeId = 1;

  //import the base from vite config
  const [base, setBase] = useState("");
  const [theme, setTheme] = useState("dark");
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 ? true : false
  );
  // Cart Items
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (DevMode) {
      console.log("Infinite Pixel Development Mode Enabled");
      setBase("/dev");
    }
  }, []);

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  //INFO theme settings
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
      document.documentElement.classList.add(localTheme);
    } else {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  //INFO toggles the theme and locally stores it
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Router basename="/dev">
      <div
        id="main-app"
        className={`app-container ${theme} overflow-hidden bg-black`}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                theme={theme}
                isMobile={isMobile}
                cartItems={cartItems}
                addToCart={addToCart}
                DevMode={DevMode}
                base={base}
                toggleTheme={toggleTheme}
                setIsMobile={setIsMobile}
                storeId={storeId}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                theme={theme}
                isMobile={isMobile}
                cartItems={cartItems}
                addToCart={addToCart}
                DevMode={DevMode}
                base={base}
                toggleTheme={toggleTheme}
                setIsMobile={setIsMobile}
                storeId={storeId}
              />
            }
          />
          <Route
            path="/Jawfane"
            element={
              <Home
                theme={theme}
                isMobile={isMobile}
                cartItems={cartItems}
                addToCart={addToCart}
                DevMode={DevMode}
                base={base}
                toggleTheme={toggleTheme}
                setIsMobile={setIsMobile}
                storeId={storeId}
              />
            }
          />
          <Route path="/tour" element={<Tour theme={theme} />} />
          <Route
            path="/merch"
            element={
              <Merch
                theme={theme}
                cartItems={cartItems}
                addToCart={addToCart}
                storeId={storeId}
                isMobile={isMobile}
              />
            }
          />
          <Route path="/music" element={<Music theme={theme} />} />

          <Route
            path="lore"
            element={<Lore theme={theme} isMobile={isMobile} />}
          />
          <Route path="/booking" element={<Booking theme={theme} />} />

          {/* Payments Routes */}
          {/* Cart Page */}
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                setCartItems={setCartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                DevMode={DevMode}
                base={base}
                theme={theme}
                toggleTheme={toggleTheme}
                isMobile={isMobile}
                setIsMobile={setIsMobile}
              />
            }
          />
          <Route
            path={`/checkout`}
            element={<CheckoutPage cartItems={cartItems} storeId={storeId} />}
          />

          {/* Product Management Routes */}

          {/* Admin Pages */}
          <Route
            path={`${base}/dashboard`}
            element={<Dashboard storeId={storeId} />}
          />
          <Route
            path={`/dashboard`}
            element={<Dashboard storeId={storeId} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
