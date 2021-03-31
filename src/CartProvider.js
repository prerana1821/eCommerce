import { createContext, useContext, useReducer } from "react";

export const CartContext = createContext();

const cartReducer = (cartState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return cartState.concat({ ...action.payload, quantity: 1 });
    case "INCREMENT_QUANTITY":
      return cartState.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
    case "DECREMENT_QUANTITY":
      return cartState.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      });
    default:
      console.log("Something went wrong");
      break;
  }

  return cartState;
};

export const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
