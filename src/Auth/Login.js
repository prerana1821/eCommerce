import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../AuthProvider";
import { useState } from "react";
import "./Login.css";

export const Login = () => {
  const { status, login, loginUserWithCredentials } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const loginHandler = async () => {
    const result = await loginUserWithCredentials(
      loginCredentials.username,
      loginCredentials.password
    );
    if (result.success) {
      navigate(state?.from ? state.from : "/");
    }
  };

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <div className='login-input'>
        <input
          type='text'
          className='input-txt-error'
          required
          value={loginCredentials.username}
          onChange={(e) =>
            setLoginCredentials(() => ({
              ...loginCredentials,
              username: e.target.value,
            }))
          }
        />
        <span className='flt-label tri-pink'>
          <i className='fas fa-user'></i> Username
        </span>
      </div>

      <div className='login-input'>
        <input
          className='input-txt-error'
          required
          type={loginCredentials.showPassword ? "text" : "password"}
          value={loginCredentials.password}
          onChange={(e) =>
            setLoginCredentials(() => ({
              ...loginCredentials,
              password: e.target.value,
            }))
          }
        />
        <span className='flt-label tri-pink'>
          <i class='fas fa-lock'></i> Password
        </span>
        <button
          className='show-pass'
          onClick={() =>
            setLoginCredentials(() => ({
              ...loginCredentials,
              showPassword: !loginCredentials.showPassword,
            }))
          }
        >
          {loginCredentials.showPassword ? (
            <i class='far fa-lg fa-eye-slash'></i>
          ) : (
            <i class='far fa-lg  fa-eye'></i>
          )}
        </button>
      </div>
      <h3>{status}</h3>
      <button className='btn btn-main' onClick={loginHandler}>
        {login ? "Logout" : "Login"}
      </button>
    </div>
  );
};