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
            `https://api-prestore.prerananawar1.repl.co/user-details/${user._id}`
          );
          const data = response.data.user;
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
