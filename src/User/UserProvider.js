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
            `https://api-prestore.prerananawar1.repl.co/user-details/`
          );
          console.log("userdetails response", { response });
          const data = response.data.userDetails;
          console.log("DDAATAA2.0", data);
          userDispatch({ type: "LOAD_USER_DETAILS", payload: data });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [login]);

  const userReducer = (userState, action) => {
    const currentUser = findUserById(userState, user._id);

    switch (action.type) {
      case "ADD_USER":
        return userState.concat({
          id: action.payload,
          wishList: [],
          cart: [],
          loading: "",
        });
      case "LOAD_USER_DETAILS":
        return action.payload;
      case "LOAD_DATA_TO_CART":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                cart: action.payload,
              };
            }
            return user;
          })
        );
      case "LOAD_DATA_TO_WISHLIST":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                wishList: action.payload,
              };
            }
            return user;
          })
        );
      case "LOAD_DATA_TO_ADDRESS":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                addresses: action.payload,
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
      case "ADD_ADDRESS":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                addresses: user.addresses.concat(action.payload),
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
                  return item._id !== action.payload._id;
                }),
              };
            }
            return user;
          })
        );
      case "DELETE_ADDRESS":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                addresses: action.payload,
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
                  return item._id !== action.payload._id;
                }),
              };
            }
            return user;
          })
        );
      case "EDIT_ADDRESS":
        return (
          currentUser &&
          userState.map((user) => {
            if (user === currentUser) {
              return {
                ...user,
                addresses: user.addresses.map((item) => {
                  return item._id === action.payload.id
                    ? action.payload.address
                    : item;
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
                  return item._id === action.payload._id
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
                  return item._id === action.payload._id
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
                cart: found(user.cart, action.payload._id)
                  ? user.cart.map((value) => {
                      return value._id === action.payload._id
                        ? { ...action.payload, quantity: value.quantity + 1 }
                        : value;
                    })
                  : [...user.cart, { ...action.payload, quantity: 1 }],
                wishList: user.wishList.filter((item) => {
                  return item._id !== action.payload._id;
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
      id: "1",
      wishList: [],
      cart: [],
      addresses: [],
      loading: "",
    },
  ]);

  console.log(userState);
  const currentUser = findUserById(userState, user._id);
  console.log({ currentUser });

  return (
    <UserContext.Provider value={{ currentUser, userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
