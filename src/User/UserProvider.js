import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
// import { userReducer } from "./userReducer";
import { useAuth } from "../Auth/AuthProvider";
import { findUserById, found } from "../utils";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, login } = useAuth();

  console.log(user);

  console.log(login);

  useEffect(() => {
    if (login) {
      (async () => {
        try {
          const response = await axios.get(
            `https://api-prestore.prerananawar1.repl.co/user-details/cart/${user._id}`
          );
          console.log("cart response", { response });
          const data = response.data.cart;
          console.log("DATA", data);
          const cart = data.map((item) => {
            return item.productId;
          });
          userDispatch({ type: "LOAD_DATA_TO_CART", payload: cart });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [login]);

  useEffect(() => {
    if (login) {
      (async () => {
        try {
          const response = await axios.get(
            `https://api-prestore.prerananawar1.repl.co/user-details/wishlist/${user._id}`
          );
          console.log("wishlist response", { response });
          const data = response.data.wishList;
          console.log("DDAATAA", data);
          const wishList = data.map((item) => {
            return item.productId;
          });
          userDispatch({ type: "LOAD_DATA_TO_WISHLIST", payload: wishList });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [login]);

  useEffect(() => {
    if (login) {
      (async () => {
        try {
          const response = await axios.get(
            `https://api-prestore.prerananawar1.repl.co/user-details/address/${user._id}`
          );
          console.log("address response", { response });
          const data = response.data.addresses;
          console.log("DDAATAAMUM", data);
          userDispatch({ type: "LOAD_DATA_TO_ADDRESS", payload: data });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [login]);

  useEffect(() => {
    if (login) {
      (async () => {
        try {
          const response = await axios.get(
            `https://api-prestore.prerananawar1.repl.co/user-details/${user._id}`
          );
          console.log("user response", { response });
          const data = response.data.user;
          console.log("DDAATAA2.0", data);
          userDispatch({ type: "LOAD_USER_DETAILS", payload: data });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [login]);

  const userReducer = (userState, action) => {
    // const currentUser = findUserById(userState, user._id);

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
          ...userState,
          _id: action.payload._id,
        };
      case "LOAD_DATA_TO_CART":
        return {
          ...userState,
          cart: action.payload,
        };
      case "LOAD_DATA_TO_WISHLIST":
        return {
          ...userState,
          wishList: action.payload,
        };
      case "LOAD_DATA_TO_ADDRESS":
        return {
          ...userState,
          addresses: action.payload,
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
            return item._id === action.payload.id
              ? action.payload.address
              : item;
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

  const [userState, userDispatch] = useReducer(userReducer, {
    _id: "1",
    wishList: [],
    cart: [],
    addresses: [],
    loading: "",
  });

  console.log(userState);
  // const currentUser = findUserById(userState, user._id);
  // console.log({ currentUser });

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
