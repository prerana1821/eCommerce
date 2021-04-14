import { createContext, useContext } from "react";
import { useState } from "react";
import { fakeLoginApi } from "./fakeAuthApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [status, setStatus] = useState("");

  const loginUserWithCredentials = async (username, password) => {
    try {
      setStatus("Checking..");
      const response = await fakeLoginApi(username, password);
      console.log({ response });
      if (response.success) {
        setLogin(true);
      }
      setStatus("Hurray! Login Successful");
      return response;
    } catch (error) {
      console.log(error);
      if (!error.success) {
        setStatus("Ohh no login Unsuccessful");
      }
      return error;
    } finally {
      setStatus("");
    }
  };

  return (
    <AuthContext.Provider value={{ status, login, loginUserWithCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
