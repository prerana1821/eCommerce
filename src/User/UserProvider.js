import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthProvider";
import { userReducer } from "./userReducer";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, login } = useAuth();

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

  const [userState, userDispatch] = useReducer(userReducer, {
    _id: "1",
    wishList: [],
    cart: [],
    addresses: [],
    loading: "",
  });

  console.log(userState);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
