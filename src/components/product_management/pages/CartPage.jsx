// CartPage.jsx

/*
A component that populates the cart page
*/

//INFO React Libraries
import { useEffect, useState, useContext } from "react";
import propTypes from "prop-types";

import { useNavigate } from "react-router-dom";
//INFO Sub-components
import CartItem from "@apis_product_management/view-cart/CartItem";
import DeleteModal from "@apis_product_management/view-cart/DeleteModal";
import EmptyCartModal from "@apis_product_management/view-cart/EmptyCartModal";
import Navigation from "@navigation_product_management/Navigation";

//INFO Icons
import { Trash2 } from "react-feather";

import { CartContext } from "@contexts_product_management/CartContext";

//API Shipping API
import USPSApi from "@apis_product_management/shipping/usps/USPSApi";

function CartPage({
  storeId,
  cartItems,
  setCartItems,
  removeFromCart,
  updateQuantity,
  DevMode,
  base,
  theme,
  toggleTheme,
  isMobile,
  setIsMobile,
}) {
  const navigate = useNavigate();

  const {
    cartTotal,
    setCartTotal,
    shippingAndTaxTotal,
    setShippingAndTaxTotal,
  } = useContext(CartContext);
  // const location = useLocation();
  // const { storeId } = location.state || {}; // Only get serializable state

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEmptyCartModalVisible, setIsEmptyCartModalVisible] = useState(false);
  // const [cartTotal, setCartTotal] = useState();
  // const [shippingAndTaxTotal, setShippingAndTaxTotal] = useState(0);

  // Your handler function for navigating to the checkout page
  const handleProceedToCheckout = () => {
    navigate("/checkout", {
      state: {
        storeId: storeId,
        cartItems,
        cartTotal,
        shippingAndTaxTotal,
      },
    });
  };

  const showDeleteModal = (item) => {
    setItemToDelete(item);
    setIsModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    removeFromCart(itemToDelete.cartItemId);
    setIsModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsModalVisible(false);
  };

  const handleEmptyCartClick = () => {
    setIsEmptyCartModalVisible(true);
  };

  const handleEmptyCartConfirm = () => {
    setCartItems([]);
    setIsEmptyCartModalVisible(false);
  };

  const handleEmptyCartCancel = () => {
    setIsEmptyCartModalVisible(false);
  };

  useEffect(() => {
    //calculate cartItems totals on load
    setCartTotal(
      cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    );
  }, [cartItems, setCartTotal]);

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

      <div className="container-fluid min-h-screen mx-auto mb-20 mt-4 p-8 text-slate-200 bg-slate-800">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg font-medium text-gray-400">
              Your cart is currently empty.
            </p>
            <button
              className="mt-4 rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
              onClick={() => {
                return navigate("/#merch");
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item, index) => (
              <CartItem
                storeId={storeId}
                key={item.cartItemId}
                item={item}
                index={index}
                updateQuantity={updateQuantity}
                showDeleteModal={showDeleteModal}
              />
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-8 flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={handleEmptyCartClick}
                className="flex items-center space-x-2 text-red-500 hover:text-red-700 duration-300"
              >
                <Trash2 className="h-6 w-6" />
                <span>Empty Cart</span>
              </button>
            </div>

            {/* Shipping API */}
            <div className="mt-8">
              <USPSApi
                storeId={storeId}
                cartItems={cartItems}
                setCartTotal={setCartTotal}
                setShippingAndTaxTotal={setShippingAndTaxTotal}
              />
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-1xl font-bold italic text-slate-300">
                S/H + Tax: ${shippingAndTaxTotal.toFixed(2)}
              </h2>
              <h2 className="text-3xl font-bold text-slate-200">
                {/* Total: ${calculateTotal()} */}
                <span>${(cartTotal + shippingAndTaxTotal).toFixed(2)}</span>
              </h2>
              <button
                className="mt-4 w-full rounded-lg bg-green-700 px-6 py-3 text-lg font-bold text-white hover:bg-green-500 duration-300 md:w-auto"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        {isModalVisible && (
          <DeleteModal
            itemToDelete={itemToDelete}
            handleDeleteCancel={handleDeleteCancel}
            handleDeleteConfirm={handleDeleteConfirm}
          />
        )}

        {isEmptyCartModalVisible && (
          <EmptyCartModal
            handleEmptyCartCancel={handleEmptyCartCancel}
            handleEmptyCartConfirm={handleEmptyCartConfirm}
          />
        )}
      </div>
    </>
  );
}

CartPage.propTypes = {
  storeId: propTypes.number.isRequired,
  cartItems: propTypes.array.isRequired,
  setCartItems: propTypes.func.isRequired,
  removeFromCart: propTypes.func.isRequired,
  updateQuantity: propTypes.func.isRequired,
  DevMode: propTypes.bool.isRequired,
  base: propTypes.string.isRequired,
  theme: propTypes.string.isRequired,
  toggleTheme: propTypes.func.isRequired,
  isMobile: propTypes.bool.isRequired,
  setIsMobile: propTypes.func.isRequired,
};

export default CartPage;
