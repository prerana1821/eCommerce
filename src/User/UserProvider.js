import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
// import { userReducer } from "./userReducer";
import { useAuth } from "../Auth/AuthProvider";
import { findUserById, found } from "../utils";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      const response = await axios.get("api/cartItems");
      const data = response.data.cartItems;
      userDispatch({ type: "LOAD_DATA_TO_CART", payload: data });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get("api/wishListItems");
      const data = response.data.wishListItems;
      userDispatch({ type: "LOAD_DATA_TO_WISHLIST", payload: data });
    })();
  }, []);

  const { user } = useAuth();

  const userReducer = (userState, action) => {
    const currentUser = findUserById(userState, user.id);

    console.log(userState);
    console.log(currentUser);

    switch (action.type) {
      case "ADD_USER":
        return userState.concat({
          id: action.payload,
          wishList: [],
          cart: [],
          loading: "",
        });
      case "LOAD_DATA_TO_CART":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                cart: user.cart.concat(action.payload),
              };
            }
            return user;
          })
        );
      case "LOAD_DATA_TO_WIHSLIST":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                wishList: user.wishList.concat(action.payload),
              };
            }
            return user;
          })
        );
      case "STATUS":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                loading: action.payload,
              };
            }
            return user;
          })
        );
      case "ADD_TO_CART":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                cart: user.cart.concat({ ...action.payload, quantity: 1 }),
              };
            }
            return user;
          })
        );
      case "REMOVE_FROM_CART":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                cart: user.cart.filter((item) => {
                  return item.id !== action.payload.id;
                }),
              };
            }
            return user;
          })
        );
      case "ADD_TO_WISHLIST":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                wishList: user.wishList.concat(action.payload),
              };
            }
            return user;
          })
        );
      case "REMOVE_FROM_WISHLIST":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                wishList: user.wishList.filter((item) => {
                  return item.id !== action.payload.id;
                }),
              };
            }
            return user;
          })
        );
      case "INCREMENT_QUANTITY":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                cart: user.cart.map((item) => {
                  return item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item;
                }),
              };
            }
            return user;
          })
        );
      case "DECREMENT_QUANTITY":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                cart: user.cart.map((item) => {
                  return item.id === action.payload.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item;
                }),
              };
            }
            return user;
          })
        );
      case "ADD_TO_CART_FROM_WISHLIST":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                cart: found(user.cart, action.payload.id)
                  ? user.cart.map((value) => {
                      return value.id === action.payload.id
                        ? { ...action.payload, quantity: value.quantity + 1 }
                        : value;
                    })
                  : [...user.cart, { ...action.payload, quantity: 1 }],
                wishList: user.wishList.filter((item) => {
                  return item.id !== action.payload.id;
                }),
              };
            }
            return user;
          })
        );
      default:
        console.log("Something went wrong");
        break;
    }

    return userState;
  };

  const [userState, userDispatch] = useReducer(userReducer, [
    {
      id: 1,
      wishList: [],
      cart: [],
      loading: "",
    },
  ]);

  // console.log({ userState });

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
