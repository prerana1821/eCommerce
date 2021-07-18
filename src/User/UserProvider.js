import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthProvider";
import { userReducer } from "./userReducer";
import { API_URL } from "../utils";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await axios.get(`${API_URL}/user-details`);
          const data = response.data.user;
          userDispatch({ type: "LOAD_USER_DETAILS", payload: data });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [token]);

  const [userState, userDispatch] = useReducer(userReducer, {
    _id: "1",
    wishList: [],
    cart: [],
    addresses: [],
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
