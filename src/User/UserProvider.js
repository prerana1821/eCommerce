import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { userReducer } from "./userReducer";

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

  const [userState, userDispatch] = useReducer(userReducer, {
    wishList: [],
    cart: [],
    loading: "",
  });

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
