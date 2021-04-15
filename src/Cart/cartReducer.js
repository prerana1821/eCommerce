import { found } from "../utils";

export const cartReducer = (cartState, action) => {
  switch (action.type) {
    case "LOAD_DATA_TO_CART":
      return {
        ...cartState,
        cart: action.payload,
      };
    case "LOAD_DATA_TO_WIHSLIST":
      return {
        ...cartState,
        wishList: action.payload,
      };
    case "STATUS":
      return {
        ...cartState,
        loading: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...cartState,
        cart: [...cartState.cart, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...cartState,
        cart: cartState.cart.filter((item) => {
          return item.id !== action.payload.id;
        }),
      };
    case "ADD_TO_WISHLIST":
      return {
        ...cartState,
        wishList: [...cartState.wishList, action.payload],
      };
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
    case "ADD_TO_CART_FROM_WISHLIST":
      return {
        ...cartState,
        cart: found(cartState.cart, action.payload.id)
          ? cartState.cart.map((value) => {
              return value.id === action.payload.id
                ? { ...action.payload, quantity: value.quantity + 1 }
                : value;
            })
          : [...cartState.cart, { ...action.payload, quantity: 1 }],
        wishList: cartState.wishList.filter((item) => {
          return item.id !== action.payload.id;
        }),
      };
    default:
      console.log("Something went wrong");
      break;
  }

  return cartState;
};
