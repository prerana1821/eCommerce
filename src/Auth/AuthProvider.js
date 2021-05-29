import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
  const [status, setStatus] = useState({ loading: "", success: "", error: "" });
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
      setStatus({ loading: "Checking.." });
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
        setStatus({
          success: `Login Successful. Welcome ${response.data.user.username}!`,
        });
      }
      return response.data;
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
        setStatus({
          success: `Signup Successful. Welcome ${response.data.user.username}!`,
        });
      }
      return response.data;
    } catch (error) {
      if (!error.success) {
        console.log(error.response);
        setStatus({ error: error.response.data.errorMessage });
      }
      return error;
    }
  };

  const logout = () => {
    setLogin(false);
    setStatus({ loading: "", success: "", error: "" });
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
