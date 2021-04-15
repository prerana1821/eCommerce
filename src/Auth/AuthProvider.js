import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fakeLoginApi, fakeSignUpApi, fakeForgotPassApi } from "./fakeAuthApi";

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

  const loginUserWithCredentials = async (username, password) => {
    try {
      setStatus("Checking..");
      const response = await fakeLoginApi(username, password);
      console.log({ response });
      localStorage?.setItem("login", JSON.stringify({ login: true }));
      if (response.success) {
        setLogin(true);
      }
      setUser(response.userName);
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

  const signUpUserWithCredentials = async (username, password, email) => {
    try {
      setStatus("Adding...");
      const response = await fakeSignUpApi(username, password, email);
      console.log({ response });
      localStorage?.setItem("login", JSON.stringify({ login: true }));
      if (response.success) {
        setLogin(true);
      }
      setUser(response.userName);
      setStatus("Hurray! Signup Successful");
      return response;
    } catch (error) {
      console.log(error);
      if (!error.success) {
        setStatus("Ohh no signup Unsuccessful");
      }
      return error;
    } finally {
      setStatus("");
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
      setUser(response.userName);
      setStatus("Hurray! Password Changed Successfully");
      return response;
    } catch (error) {
      console.log(error);
      if (!error.success) {
        setStatus("Email doesn't exits");
      }
      return error;
    } finally {
      setStatus("");
    }
  };

  const logout = () => {
    setLogin(false);
    setUser({ id: "", username: "", email: "", password: "" });
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
