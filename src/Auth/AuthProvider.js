import axios from "axios";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../utils";
import {
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "./authUtils";

export const AuthContext = createContext();

export const addUser = ({ data, setUser, setToken }) => {
  setUser(data.user);
  setToken(data.token);
  localStorage?.setItem("token", JSON.stringify({ token: data.token }));
  const { _id, username, email } = data.user;
  localStorage?.setItem("user", JSON.stringify({ _id, username, email }));
  setupAuthHeaderForServiceCalls(data.token);
};

export const AuthProvider = ({ children }) => {
  const { token: savedToken } = JSON.parse(localStorage?.getItem("token")) || {
    token: null,
  };
  if (savedToken) {
    setupAuthHeaderForServiceCalls(savedToken);
  }
  const [token, setToken] = useState(savedToken);
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({ loading: "", success: "", error: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const userFromApi = JSON.parse(localStorage?.getItem("user"));
    userFromApi?._id && setUser({ ...userFromApi });
    setupAuthExceptionHandler(logout, navigate);
  }, []);

  const loginUserWithCredentials = async (username, password) => {
    try {
      setStatus({ loading: "Checking.." });
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        username: username,
        password: password,
      });
      if (data.success) {
        addUser({ data, setUser, setToken });
        setStatus({
          success: `Login Successful. Welcome ${data.user.username}!`,
        });
      }
      return data;
    } catch (error) {
      if (!error.success) {
        console.log(error.response);
        setStatus({ error: error.response.data.errorMessage });
      }
      return error;
    }
  };

  const signUpUserWithCredentials = async (username, password, email) => {
    try {
      setStatus({ loading: "Adding user credentials..." });
      const { data } = await axios.post(`${API_URL}/auth/signup`, {
        username: username,
        password: password,
        email: email,
      });
      if (data.success) {
        addUser({ data, setUser, setToken });
        setStatus({
          success: `Signup Successful. Welcome ${data.user.username}!`,
        });
      }
      return data;
    } catch (error) {
      if (!error.success) {
        console.log(error.response);
        setStatus({ error: error.response.data.errorMessage });
      }
      return error;
    }
  };

  const logout = () => {
    setToken("");
    setStatus({ loading: "", success: "", error: "" });
    setUser({
      id: "",
      username: "",
      email: "",
      password: "",
    });
    localStorage?.removeItem("token");
    localStorage?.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        token,
        user,
        setStatus,
        loginUserWithCredentials,
        signUpUserWithCredentials,
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
