import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { gsap } from "gsap";
import { ShoppingCart, ChevronLeft, ChevronRight } from "react-feather";

function CartPopOut({ cartItems, isSidebarOpen, setSidebarOpen }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const cartButtonRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (isSidebarOpen) {
      // Sidebar opens
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      // Fix the cart button to the upper-right corner
      gsap.to(cartButtonRef.current, {
        top: "1em", // Always position the button to the top
        right: "2em",
        duration: 0.5,
        ease: "power3.out",
        position: "fixed", // Ensure it's fixed in place
      });
    } else {
      // Sidebar closes
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });

      // Reset the cart button to follow the navbar or its default position
      gsap.to(cartButtonRef.current, {
        top: "auto", // Position it back to the default when sidebar is closed
        right: "2em",
        duration: 0.5,
        ease: "power3.in",
        position: "fixed", // Ensure the button stays fixed
      });
    }
  }, [isSidebarOpen]);

  const toggleCart = () => {
    if (cartItems.length === 0 || isAnimating) return;

    setIsAnimating(true);

    if (isSidebarOpen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="absolute bottom-16 right-8">
      <button
        ref={cartButtonRef}
        style={{
          right: "2em",
          zIndex: 800,
          opacity: cartItems.length === 0 ? 0.5 : 0.9,
          cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
        }}
        onClick={toggleCart}
        className={`fixed rounded px-2 py-2 text-white ${
          cartItems.length === 0 ? "bg-gray-400" : "bg-blue-500"
        }`}
        disabled={cartItems.length === 0}
      >
        {isSidebarOpen ? (
          <div>
            <span className="flex items-center">
              <ShoppingCart />
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

      <div
        ref={sidebarRef}
        className="cart-sidebar fixed right-0 top-0 h-full transform bg-opacity-80 bg-white shadow-lg"
        style={{
          backdropFilter: "blur(2em)",
          width: "80vw",
          maxWidth: "320px",
          transform: "translateX(100%)",
          zIndex: 750,
        }}
      >
        {/* Sidebar content */}
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="mb-4 text-2xl font-bold text-black">Mini Cart</h2>
            {cartItems.length > 0 ? (
              <>
                <hr className="border-gray-400 mb-4" />
                <ul className="mt-16">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <li className="mb-4  pb-4">
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
                    </div>
                  ))}
                </ul>
              </>
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="sticky bottom-16 bg-white p-4 shadow-lg">
              <div className="mt-4">
                <p className="text-lg font-semibold text-black">
                  Total: $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </p>
              </div>
              <button className="mt-4 w-full rounded bg-green-500 py-2 text-white hover:bg-green-600">
                <Link to="/cart">View Full Cart</Link>
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
  isSidebarOpen: propTypes.bool.isRequired,
  setSidebarOpen: propTypes.func.isRequired,
};

export default CartPopOut;
