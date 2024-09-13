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
  // Set whether to store cart items in localStorage
  const enableLocalStorage = true; //INFO Toggle this to true or false

  //REVIEW - added test product to cartItems
  // const [cartItems, setCartItems] = useState([]);
  //v2 w/ localStorage
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage if enabled and exists
    if (enableLocalStorage) {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

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

  // Effect to handle saving cart items to localStorage if enabled
  useEffect(() => {
    if (enableLocalStorage) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product) => {
    // Function to check if a product with the same id and variant already exists in the cart
    const isSameProductVariant = (item, product) => {
      // Compare the id and all variants (or any other unique attributes like selectedSize or selectedColor)
      return (
        item.id === product.id &&
        item.selectedSize === product.selectedSize &&
        item.selectedColor === product.selectedColor
      );
    };

    // Check if a product with the same id and variants exists in the cart
    const existingProduct = cartItems.find((item) =>
      isSameProductVariant(item, product)
    );

    if (existingProduct) {
      console.log("Product already exists in cart", existingProduct);

      // If a product with the same variant exists, just update the quantity
      setCartItems(
        cartItems.map((item) =>
          isSameProductVariant(item, product)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If no matching product with the same variants exists, add as a new product object
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // const updateQuantity = (id, quantity) => {
  //   setCartItems(
  //     cartItems.map((item) =>
  //       item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
  //     )
  //   );
  // };

  const updateQuantity = (id, quantity, selectedSize, selectedColor) => {
    setCartItems(
      cartItems.map((item) => {
        // Compare both the id and the variant (selectedSize, selectedColor) to find the exact match
        if (
          item.id === id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
        ) {
          return { ...item, quantity };
        }
        return item;
      })
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
    <Router basename={DevMode ? "/dev" : ""}>
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
