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

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://api-prestore.prerananawar1.repl.co/auth"
  //       );
  //       console.log("auth response", { response });
  //       authDispatch({ type: "LOAD_USERS", payload: response.data.auth });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    const loginFromApi = JSON.parse(localStorage?.getItem("login"));
    loginFromApi?.login && setLogin(true);
  }, []);

  useEffect(() => {
    const userFromApi = JSON.parse(localStorage?.getItem("user"));
    userFromApi?._id && setUser({ ...userFromApi });
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
      if (response.data.success) {
        // const userFromApi = findUserById(authState, response.data.user._id);
        setUser(response.data.user);
        localStorage?.setItem("login", JSON.stringify({ login: true }));
        const { _id, username, password, email } = response.data.user;
        localStorage?.setItem(
          "user",
          JSON.stringify({ _id, username, password, email })
        );
        setLogin(true);
      }
      setStatus("Hurray! Login Successful");
      return response.data;
    } catch (error) {
      if (!error.success) {
        setStatus("Ohh no login Unsuccessful");
      }
      return error;
    }
  };

  const signUpUserWithCredentials = async (username, password, email) => {
    try {
      setStatus("Adding...");
      const response = await axios.post(
        "https://api-prestore.prerananawar1.repl.co/auth/signup",
        {
          username: username,
          password: password,
          email: email,
        }
      );
      localStorage?.setItem("login", JSON.stringify({ login: true }));
      if (response.data.success) {
        setLogin(true);
        // authDispatch({ type: "ADD_NEW_USER", payload: response.data.user });
        setUser(response.data.user);
        setStatus("Hurray! Signup Successful");
      }
      return response.data;
    } catch (error) {
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
      localStorage?.setItem("login", JSON.stringify({ login: true }));
      if (response.success) {
        setLogin(true);
      }
      setStatus("Hurray! Password Changed Successfully");
      const userFromApi = findUserById(Users, response.userId);
      setUser(userFromApi);
      return response;
    } catch (error) {
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
    localStorage?.removeItem("user");
    navigate("/");
  };

  // const authReducer = (authState, action) => {
  //   switch (action.type) {
  //     case "LOAD_USERS":
  //       return [...authState, ...action.payload];
  //     case "ADD_NEW_USER":
  //       return authState.concat(action.payload);
  //     default:
  //       console.log("Something went wrong");
  //       break;
  //   }
  // };

  // const [authState, authDispatch] = useReducer(authReducer, []);

  return (
    <AuthContext.Provider
      value={{
        status,
        login,
        user,
        // authState,
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
