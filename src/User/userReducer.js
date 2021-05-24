import { found } from "../utils";

export const userReducer = (userState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        _id: action.payload,
        wishList: [],
        cart: [],
        loading: "",
      };
    case "LOAD_USER_DETAILS":
      return {
        ...action.payload,
        wishList: action.payload.wishList.map((item) => {
          return item.productId;
        }),
        cart: action.payload.cart.map((item) => {
          return item.productId;
        }),
      };
    case "STATUS":
      return {
        ...userState,
        loading: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...userState,
        cart: userState.cart.concat({ ...action.payload, quantity: 1 }),
      };
    case "ADD_ADDRESS":
      return {
        ...userState,
        addresses: userState.addresses.concat(action.payload),
      };

    case "REMOVE_FROM_CART":
      return {
        ...userState,
        cart: userState.cart.filter((item) => {
          return item._id !== action.payload._id;
        }),
      };
    case "DELETE_ADDRESS":
      return {
        ...userState,
        addresses: action.payload,
      };
    case "ADD_TO_WISHLIST":
      return {
        ...userState,
        wishList: userState.wishList.concat(action.payload),
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...userState,
        wishList: userState.wishList.filter((item) => {
          return item._id !== action.payload._id;
        }),
      };
    case "EDIT_ADDRESS":
      return {
        ...userState,
        addresses: userState.addresses.map((item) => {
          return item._id === action.payload.id ? action.payload.address : item;
        }),
      };
    case "INCREMENT_QUANTITY":
      return {
        ...userState,
        cart: userState.cart.map((item) => {
          return item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        }),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...userState,
        cart: userState.cart.map((item) => {
          return item._id === action.payload._id
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        }),
      };
    case "ADD_TO_CART_FROM_WISHLIST":
      return {
        ...userState,
        cart: found(userState.cart, action.payload._id)
          ? userState.cart.map((value) => {
              return value._id === action.payload._id
                ? { ...action.payload, quantity: value.quantity + 1 }
                : value;
            })
          : [...userState.cart, { ...action.payload, quantity: 1 }],
        wishList: userState.wishList.filter((item) => {
          return item._id !== action.payload._id;
        }),
      };
    default:
      console.log("Something went wrong");
      break;
  }

  return userState;
};
