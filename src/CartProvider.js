import { createContext, useContext, useReducer } from "react";

export const CartContext = createContext();

const cartReducer = (cartState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...cartState,
        cart: [...cartState.cart, { ...action.payload, quantity: 1 }],
      };
    case "ADD_TO_WISHLIST":
      return {
        ...cartState,
        wishList: [...cartState.wishList, action.payload],
      };
    // return {
    //   ...cartState,
    //   wishList: cartState.wishList.map((item) => {
    //     return item.id === action.payload.id
    //       ? cartState.wishList.filter((item) => item.id !== action.payload.id)
    //       : cartState.wishList.concat(action.payload);
    //   }),
    // };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...cartState,
        wishList: cartState.wishList.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "INCREMENT_QUANTITY":
      return {
        ...cartState,
        cart: cartState.cart.map((item) => {
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        }),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...cartState,
        cart: cartState.cart.map((item) => {
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        }),
      };
    case "REMOVE_FROM_CART":
      return {
        ...cartState,
        cart: cartState.cart.filter((item) => {
          return item.id !== action.payload.id;
        }),
      };
    // case "REMOVE_FROM_WISHLIST":
    //   return {
    //     ...cartState,
    //     wishList: cartState.wishList.filter((item) => {
    //       return item.id !== action.payload.id;
    //     }),
    //   };
    case "ADD_TO_CART_FROM_WISHLIST":
      return {
        ...cartState,
        cart: [
          ...cartState.cart,
          cartState.cart.reduce((acc, value) => {
            return value.id === action.payload.id
              ? { ...value, quantity: value.quantity + 1 }
              : { ...action.payload, quantity: 1 };
          }, {}),
          // cartState.cart.map((item) => {
          //   return item.id === action.payload.id
          //     ? { ...item, quantity: item.quantity + 1 }
          //     : { ...action.payload, quantity: 1 };
          // }),
        ],
      };
    default:
      console.log("Something went wrong");
      break;
  }

  return cartState;
};

export const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    wishList: [],
    cart: [],
  });

  console.log(cartState.cart);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
