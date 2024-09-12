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

//REVIEW Payments Completion Tests
import Completion from "@pages_product_management/Completion";

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
  //REVIEW - added test product to cartItems
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Product 1",
      price: "19.99",
      quantity: 1,
      description: "Description of product 1",
      category: "Category 1",
      product_id: "P001",
      created_at: "2024-09-07T17:08:19.000Z",
      image_url:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSpqwW2DCVf862oiFLcesO0FuaUhZkrwczFiEoXLjoWaBad5-74aFTP-TKMmn5eh8IUy4CdtKC-g5VsRiU31wXEVMvokvhbsfy8r2KVTwsgzDIt6uvh-fX2BGPs7Ad_WgWdis6EhltuVA&usqp=CAc",
      image: null,
      product_weight: "0.50",
      weight_unit: "kg",
      product_dimensions: "10x5x2 cm",
      meta_title: "Meta Title 1",
      meta_description: "Meta Description 1",
      meta_keywords: "keyword1, keyword2, keyword3",
      status: 1,
      featured: 1,
      sale: 1,
      discount_price: "15.99",
      discount_start: "2024-09-07T04:00:00.000Z",
      discount_end: "2024-09-07T04:00:00.000Z",
    },
  ]);

  // eslint-disable-next-line no-unused-vars
  const [enabledPayments, setEnabledPayments] = useState({
    stripe: true,
    paypal: true,
    googlePay: true,
  });

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

    // console.log("Cart Items:", cartItems);
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
                addToCart={addToCart}
                cartItems={cartItems}
                setCartItems={setCartItems}
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
            element={
              <CheckoutPage
                cartItems={cartItems}
                storeId={storeId}
                enabledPayments={enabledPayments}
                DevMode={DevMode}
                base={base}
                theme={theme}
                toggleTheme={toggleTheme}
                isMobile={isMobile}
                setIsMobile={setIsMobile}
              />
            }
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

          {/* Payments Completion */}
          <Route path={`/completion`} element={<Completion theme={theme} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
