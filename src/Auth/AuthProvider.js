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
        setUser(response.data.user);
        localStorage?.setItem("login", JSON.stringify({ login: true }));
        const { _id, username, password, email } = response.data.user;
        localStorage?.setItem(
          "user",
          JSON.stringify({ _id, username, password, email })
        );
        setLogin(true);
        setStatus("Hurray! Login Successful");
      }
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
