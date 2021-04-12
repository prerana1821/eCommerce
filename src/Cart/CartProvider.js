import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { cartReducer } from "./cartReducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      const response = await axios.get("api/cartItems");
      const data = response.data.cartItems;
      cartDispatch({ type: "LOAD_DATA_TO_CART", payload: data });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get("api/wishListItems");
      const data = response.data.wishListItems;
      cartDispatch({ type: "LOAD_DATA_TO_WISHLIST", payload: data });
    })();
  }, []);

  const [cartState, cartDispatch] = useReducer(cartReducer, {
    wishList: [],
    cart: [],
    loading: "",
  });

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
