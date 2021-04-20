import { createContext, useContext } from "react";
import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router";
import {
  // fakeLoginApi,
  // fakeSignUpApi,
  fakeForgotPassApi,
  Users,
} from "./fakeAuthApi";
import { findUserById } from "../utils";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://api-prestore.prerananawar1.repl.co/auth"
        );
        console.log({ response });
        authDispatch({ type: "LOAD_USERS", payload: response.data.auth });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const loginFromApi = JSON.parse(localStorage?.getItem("login"));
    loginFromApi?.login && setLogin(true);
  }, []);

  const loginUserWithCredentials = async (username, password) => {
    try {
      setStatus("Checking..");
      const response = await axios.post(
        "https://api-prestore.prerananawar1.repl.co/auth/login",
        {
          username: username,
          password: password,
        }
      );
      // console.log({ response });
      localStorage?.setItem("login", JSON.stringify({ login: true }));
      if (response.data.success) {
        setLogin(true);
        const userFromApi = findUserById(authState, response.data.userName.id);
        setUser(userFromApi);
      }
      setStatus("Hurray! Login Successful");
      return response.data;
    } catch (error) {
      // console.log(error);
      if (!error.success) {
        setStatus("Ohh no login Unsuccessful");
      }
      return error;
    }
  };

  const signUpUserWithCredentials = async (username, password, email) => {
    try {
      setStatus("Adding...");
      // const response = await fakeSignUpApi(username, password, email);
      const response = await axios.post(
        "https://api-prestore.prerananawar1.repl.co/auth/signup",
        {
          username: username,
          password: password,
          email: email,
        }
      );
      console.log({ response });
      localStorage?.setItem("login", JSON.stringify({ login: true }));
      if (response.data.success) {
        setLogin(true);
        authDispatch({ type: "ADD_NEW_USER", payload: response.data.user });
      }
      setStatus("Hurray! Signup Successful");
      console.log(response.data.user);
      // const userFromApi = findUserById(authState, response.data.user.id);
      // console.log(userFromApi);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      // console.log(error);
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
      // console.log({ response });
      localStorage?.setItem("login", JSON.stringify({ login: true }));
      if (response.success) {
        setLogin(true);
      }
      setStatus("Hurray! Password Changed Successfully");
      const userFromApi = findUserById(Users, response.userId);
      setUser(userFromApi);
      return response;
    } catch (error) {
      // console.log(error);
      if (!error.success) {
        setStatus("Email doesn't exits");
      }
      return error;
    }
  };

  const logout = () => {
    setLogin(false);
    setStatus("");
    setUser({
      id: "",
      username: "",
      email: "",
      password: "",
    });
    localStorage?.removeItem("login");
    navigate("/");
  };

  const authReducer = (authState, action) => {
    switch (action.type) {
      case "LOAD_USERS":
        return [...authState, ...action.payload];
      case "ADD_NEW_USER":
        return authState.concat(action.payload);
      default:
        console.log("Something went wrong");
        break;
    }
  };

  const [authState, authDispatch] = useReducer(authReducer, []);

  console.log(authState);

  return (
    <AuthContext.Provider
      value={{
        status,
        login,
        user,
        authState,
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
