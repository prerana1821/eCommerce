import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  fakeLoginApi,
  fakeSignUpApi,
  fakeForgotPassApi,
  Users,
} from "./fakeAuthApi";

export const AuthContext = createContext();

const findUserById = (id) => {
  return Users.find((user) => user.id === id);
};

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [status, setStatus] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loginFromApi = JSON.parse(localStorage?.getItem("login"));
    loginFromApi?.login && setLogin(true);
  }, []);

  const loginUserWithCredentials = async (username, password) => {
    try {
      setStatus("Checking..");
      const response = await fakeLoginApi(username, password);
      console.log({ response });
      localStorage?.setItem("login", JSON.stringify({ login: true }));
      if (response.success) {
        setLogin(true);
      }
      setStatus("Hurray! Login Successful");
      const userFromApi = findUserById(response.userId);
      setUser(userFromApi);
      return response;
    } catch (error) {
      console.log(error);
      if (!error.success) {
        setStatus("Ohh no login Unsuccessful");
      }
      return error;
    }
  };

  const signUpUserWithCredentials = async (username, password, email) => {
    try {
      setStatus("Adding...");
      const response = await fakeSignUpApi(username, password, email);
      console.log({ response });
      localStorage?.setItem("login", JSON.stringify({ login: true }));
      if (response.success) {
        setLogin(true);
      }
      setStatus("Hurray! Signup Successful");
      const userFromApi = findUserById(response.userId);
      setUser(userFromApi);
      return response;
    } catch (error) {
      console.log(error);
      if (!error.success) {
        setStatus("Ohh no signup Unsuccessful");
      }
      return error;
    }
  };

  const forgotPasswordByCredentials = async (email, password) => {
    try {
      setStatus("Checkkingg...");
      const response = await fakeForgotPassApi(email, password);
      console.log({ response });
      localStorage?.setItem("login", JSON.stringify({ login: true }));
      if (response.success) {
        setLogin(true);
      }
      setStatus("Hurray! Password Changed Successfully");
      const userFromApi = findUserById(response.userId);
      setUser(userFromApi);
      return response;
    } catch (error) {
      console.log(error);
      if (!error.success) {
        setStatus("Email doesn't exits");
      }
      return error;
    }
  };

  const logout = () => {
    setLogin(false);
    setStatus("");
    setUser({});
    localStorage?.removeItem("login");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        login,
        user,
        loginUserWithCredentials,
        signUpUserWithCredentials,
        forgotPasswordByCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
