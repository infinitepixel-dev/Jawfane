//CartPopOut.jsx

/*
A component to display a mini cart sidebar that slides in from the right
*/

//INFO React Libraries
import { useState, useRef } from "react";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";

//INFO React Router
import { NavLink } from "react-router-dom";

//INFO Icons
import { ShoppingCart, ChevronLeft, ChevronRight } from "react-feather";

function CartPopOut({ cartItems }) {
  const [isVisible, setIsVisible] = useState(false);
  const cartButtonRef = useRef(null); // Ref to access the button element

  // Function to toggle the cart sidebar
  const toggleCart = () => {
    if (cartItems.length === 0) return; // Do nothing if the cart is empty

    if (isVisible) {
      // Close cart
      gsap.to(".cart-sidebar", {
        x: "100%", // Move sidebar out of view
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => setIsVisible(false), // Set to false after animation
      });

      // Animate button from fixed to absolute
      gsap.to(cartButtonRef.current, {
        top: "auto", // Back to absolute position
        right: "2em",
        duration: 0.5,
        ease: "power3.in",
      });
    } else {
      // Open cart
      setIsVisible(true);

      // Move button to a fixed position
      gsap.to(cartButtonRef.current, {
        top: "1em", // Fix button to top when cart is visible
        right: "2em",
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(".cart-sidebar", {
        x: 0, // Move sidebar into view
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  return (
    <div
      className="absolute bottom-16 right-8"
      style={{
        position: isVisible ? "fixed" : "absolute", // Switch between fixed and absolute
        top: isVisible ? "1em" : "auto", // Set top based on visibility
      }}
    >
      {/* Button to open/close the cart sidebar */}
      <button
        ref={cartButtonRef} // Attach ref to the button
        style={{
          right: "2em", // Adjust position for visibility
          zIndex: 800, // Ensure the button is above the sidebar
          opacity: cartItems.length === 0 ? 0.5 : 0.9, // Reduce opacity if the cart is empty
          cursor: cartItems.length === 0 ? "not-allowed" : "pointer", // Change cursor style if empty
        }}
        onClick={toggleCart}
        className={`fixed rounded px-2 py-2 text-white ${
          cartItems.length === 0 ? "bg-gray-400" : "bg-blue-500"
        }`} // Change background color if empty
        disabled={cartItems.length === 0} // Disable the button if the cart is empty
      >
        {isVisible ? (
          <div>
            <span className="flex items-center">
              <ShoppingCart />

              {/* Badge to show number of items */}
              {cartItems.length > 0 && (
                <span
                  className="absolute ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full"
                  style={{
                    top: "-8px",
                    left: "-16px",
                  }}
                >
                  {cartItems.length}
                </span>
              )}
              <ChevronRight />
            </span>
          </div>
        ) : (
          <div>
            <span className="flex items-center">
              <ShoppingCart />

              {/* Badge to show number of items */}
              {cartItems.length > 0 && (
                <span
                  className="absolute ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full"
                  style={{
                    top: "-8px",
                    left: "-16px",
                  }}
                >
                  {cartItems.length}
                </span>
              )}
              <ChevronLeft />
            </span>
          </div>
        )}
      </button>

      {/* Cart Sidebar */}
      <div
        className={`cart-sidebar fixed right-0 top-0 h-full transform bg-opacity-80 bg-white shadow-lg ${
          isVisible ? "" : "translate-x-full"
        }`}
        style={{
          backdropFilter: "blur(2em)",
          width: isVisible ? "80vw" : "100vw",
          maxWidth: "320px", // Max width for larger screens
          transform: "translateX(100%)",
          zIndex: 750, // Ensure the cart sidebar is just below the button
        }}
      >
        <div className="flex h-full flex-col">
          {/* Cart Items Section (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="mb-4 text-2xl font-bold text-black">Mini Cart</h2>

            {/* List cart items */}
            {cartItems.length > 0 ? (
              <>
                {/* hr tag */}
                <hr className="border-gray-400 mb-4" />
                <ul className="mt-16">
                  {cartItems.map((item, index) => (
                    <>
                      <li
                        key={index}
                        className="mb-4 border-b border-gray-200 pb-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-black">
                              {item.title}
                            </p>
                            <p className="text-black">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="text-black">${item.price}</p>
                        </div>
                      </li>
                      <hr className="border-gray-400 mb-4" />
                    </>
                  ))}
                </ul>
              </>
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>

          {/* Cart Footer (Fixed at the Bottom) */}
          {cartItems.length > 0 && (
            <div className="sticky bottom-16 bg-white p-4 shadow-lg">
              {/* cart total */}
              <div className="mt-4">
                <p className="text-lg font-semibold text-black">
                  Total: $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </p>
              </div>

              {/* Button to go to the full cart view */}
              <button className="mt-4 w-full rounded bg-green-500 py-2 text-white hover:bg-green-600">
                <NavLink to="/cart">View Full Cart</NavLink>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

CartPopOut.propTypes = {
  cartItems: propTypes.arrayOf(
    propTypes.shape({
      title: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
      quantity: propTypes.number.isRequired,
    })
  ).isRequired,
};

export default CartPopOut;
