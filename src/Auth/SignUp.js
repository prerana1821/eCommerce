import { useLocation, useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../User";
import "./SignUp.css";
import Loading from "./../images/loading.svg";

export const SignUp = () => {
  const { status, signUpUserWithCredentials } = useAuth();
  const { userDispatch } = useUser();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [signUpCredentials, setSignUpCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    msg: "",
  });

  const signUpUser = async () => {
    if (
      signUpCredentials.email &&
      signUpCredentials.username &&
      signUpCredentials.password
    ) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          signUpCredentials.email
        )
      ) {
        if (signUpCredentials.password === signUpCredentials.confirmPassword) {
          const result = await signUpUserWithCredentials(
            signUpCredentials.username,
            signUpCredentials.password,
            signUpCredentials.email
          );
          if (result.success) {
            userDispatch({ type: "ADD_USER", payload: result.user._id });
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
    } else {
      setSignUpCredentials({
        ...signUpCredentials,
        msg: "Every field is required",
      });
    }
  };

  return (
    <div className='login-form'>
      <h2>Sign Up</h2>
      <form onSubmit={(e) => e.preventDefault()} className='signup-form'>
        <div className='login-input'>
          <input
            type='email'
            className='input-txt-error'
            required
            value={signUpCredentials.email}
            onChange={(e) =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                msg: "",
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
            type='text'
            className='input-txt-error'
            required
            value={signUpCredentials.username}
            onChange={(e) =>
              setSignUpCredentials(() => ({
                ...signUpCredentials,
                msg: "",
                username: e.target.value,
              }))
            }
          />
          <span className='flt-label flt-label-form tri-pink'>
            <i className='fas fa-user'></i> Username
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
                msg: "",
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
                msg: "",
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
          Already have an account?
          <Link to='/login'>
            <span className='pink-txt'>Login up!</span>
          </Link>
        </p>

        <button className='btn btn-main' onClick={signUpUser}>
          Sign Up
        </button>
      </form>
      <h3>
        {status.loading && (
          <img src={Loading} alt='loading' className='loading' />
        )}
      </h3>
    </div>
  );
};
