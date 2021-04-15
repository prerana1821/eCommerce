import { useLocation, useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const { status, forgotPasswordByCredentials } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [signUpCredentials, setSignUpCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    msg: "",
  });

  const ForgotPassHandler = async () => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        signUpCredentials.email
      )
    ) {
      if (signUpCredentials.password === signUpCredentials.confirmPassword) {
        const result = await forgotPasswordByCredentials(
          signUpCredentials.email,
          signUpCredentials.password
        );
        if (result.success) {
          navigate(state?.from ? state.from : "/");
        }
      } else {
        setSignUpCredentials({
          ...signUpCredentials,
          msg: "Passwords doesn't Match",
        });
      }
    } else {
      setSignUpCredentials({
        ...signUpCredentials,
        msg: "Enter a valid email id",
      });
    }
  };

  return (
    <div className='login-form'>
      <h2>Forgot Password</h2>
      <div className='login-input'>
        <input
          type='email'
          className='input-txt-error'
          required
          value={signUpCredentials.email}
          onChange={(e) =>
            setSignUpCredentials(() => ({
              ...signUpCredentials,
              email: e.target.value,
            }))
          }
        />
        <span className='flt-label flt-label-form tri-pink'>
          <i className='fas fa-envelope'></i> Email
        </span>
      </div>

      <div className='login-input'>
        <input
          className='input-txt-error'
          required
          type={signUpCredentials.showPassword ? "text" : "password"}
          value={signUpCredentials.password}
          onChange={(e) =>
            setSignUpCredentials(() => ({
              ...signUpCredentials,
              password: e.target.value,
            }))
          }
        />
        <span className='flt-label flt-label-form tri-pink'>
          <i className='fas fa-lock'></i> Password
        </span>
        <button
          className='show-pass'
          onClick={() =>
            setSignUpCredentials(() => ({
              ...signUpCredentials,
              showPassword: !signUpCredentials.showPassword,
            }))
          }
        >
          {signUpCredentials.showPassword ? (
            <i className='far fa-lg fa-eye-slash'></i>
          ) : (
            <i className='far fa-lg  fa-eye'></i>
          )}
        </button>
      </div>

      <div className='login-input'>
        <input
          className='input-txt-error'
          required
          type={signUpCredentials.showConfirmPassword ? "text" : "password"}
          value={signUpCredentials.confirmPassword}
          onChange={(e) =>
            setSignUpCredentials(() => ({
              ...signUpCredentials,
              confirmPassword: e.target.value,
            }))
          }
        />
        <span className='flt-label flt-label-form tri-pink'>
          <i className='fas fa-lock'></i> Confirm Password
        </span>
        <button
          className='show-pass'
          onClick={() =>
            setSignUpCredentials(() => ({
              ...signUpCredentials,
              showConfirmPassword: !signUpCredentials.showConfirmPassword,
            }))
          }
        >
          {signUpCredentials.showConfirmPassword ? (
            <i className='far fa-lg fa-eye-slash'></i>
          ) : (
            <i className='far fa-lg  fa-eye'></i>
          )}
        </button>
      </div>

      <p>{signUpCredentials.msg}</p>

      <p className='mg'>
        Remember Password?
        <Link to='/login'>
          <span className='pink-txt'> Login up!</span>
        </Link>
      </p>

      <button className='btn btn-main' onClick={ForgotPassHandler}>
        Login
      </button>

      <h3>{status}</h3>
    </div>
  );
};
