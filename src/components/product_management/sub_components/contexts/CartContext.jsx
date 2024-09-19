import { createContext, useState } from "react";
import propTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartTotal, setCartTotalState] = useState(0);
  const [shippingAndTaxTotal, setShippingAndTaxTotalState] = useState(0);

  // Custom setter functions to ensure values are always numbers fixed to 2 decimals
  const setCartTotal = (value) => {
    setCartTotalState(Number(parseFloat(value).toFixed(2)));
  };

  const setShippingAndTaxTotal = (value) => {
    console.log("Value: typeof", typeof value, value);
    setShippingAndTaxTotalState(Number(parseFloat(value).toFixed(2)));
  };

  return (
    <CartContext.Provider
      value={{
        cartTotal,
        setCartTotal,
        shippingAndTaxTotal,
        setShippingAndTaxTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: propTypes.node,
};
