import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Auth.css";
import {
  initialAuthData,
  isEmailValid,
  isPasswordValid,
} from "../../utils/authUtils";
// import github_logo from "../../assets/logo/Github.svg";
// import google_logo from "../../assets/logo/Google.svg";
import {
  authError,
  loginAction,
  signupAction,
} from "../../redux/features/users/userSlice";

const Auth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authError({ state: false, message: "" }));
  }, [dispatch]);
  const isError = useSelector((state) => state.user.error);
  const [isLogin, setIsLogin] = useState(true);
  const [authData, setAuthData] = useState(initialAuthData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      [name]: value,
    }));
  };

  const handleAuthSwitch = () => {
    dispatch(authError({ state: false, message: "" }));
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      password: "",
      confirmPassword: "",
    }));
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const handleAuthBtnClick = async () => {
    try {
      if (isLogin) {
        dispatch(authError({ state: false, message: "" }));
        if (authData.email && authData.password) {
          dispatch(authError({ state: false, message: "" }));

          if (isEmailValid(authData.email)) {
            dispatch(authError({ state: false, message: "" }));

            const { confirmPassword, ...others } = authData;
            dispatch(loginAction(others));
          } else {
            dispatch(
              authError({
                state: true,
                message: "Invalid E-Mail",
              })
            );
          }
        } else {
          dispatch(
            authError({
              state: true,
              message: "Invalid Credentials",
            })
          );
        }
      } else {
        if (authData.email && authData.password) {
          dispatch(authError({ state: false, message: "" }));

          if (isEmailValid(authData.email)) {
            dispatch(authError({ state: false, message: "" }));

            if (isPasswordValid(authData.password)) {
              dispatch(authError({ state: false, message: "" }));

              if (authData.confirmPassword === authData.password) {
                dispatch(authError({ state: false, message: "" }));

                const { confirmPassword, ...others } = authData;
                dispatch(signupAction(others));
              } else {
                dispatch(
                  authError({
                    state: true,
                    message: "Password and Confirm Password does not match",
                  })
                );
              }
            } else {
              dispatch(
                authError({
                  state: true,
                  message:
                    "Password length is too short (Minimum 8 characters)",
                })
              );
            }
          } else {
            dispatch(
              authError({
                state: true,
                message: "Invalid E-Mail",
              })
            );
          }
        } else {
          dispatch(
            authError({
              state: true,
              message: "Invalid Credentials",
            })
          );
        }
      }
    } catch (error) {
      dispatch(
        authError({
          state: true,
          message: "Internal error",
        })
      );
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-inner-container">
        <div className="auth-contents">
          <div className="auth-header">
            <h1>Story Space</h1>
            <p>Hey, Enter your {isLogin ? "Login" : "Sign up"} details here</p>
          </div>
          <div className="auth-inputs">
            <input
              type="email"
              name="email"
              placeholder="E-Mail"
              value={authData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={authData.password}
              onChange={handleInputChange}
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={authData.confirmPassword}
                onChange={handleInputChange}
              />
            )}
          </div>
          <div className="auth-actions">
            <div>
              {isError.state && <p className="error">{isError.message}</p>}
            </div>
            <p className="forgot">Forgot Password?</p>
          </div>
          <div className="auth-btn">
            <button onClick={handleAuthBtnClick}>
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </div>
          {/* <div className="auth-divider">- or -</div> */}
          {/* <div className="oauth-container">
            <div className="oauth-inner-container">
              <img src={google_logo} alt="Google-logo" />
              <p>Google</p>
            </div>
            <div className="oauth-inner-container">
              <img src={github_logo} alt="Github-logo" />
              <p>Github</p>
            </div>
          </div> */}
          <div className="auth-switch">
            <p>
              {isLogin
                ? "Don't have an account ?"
                : "Have an account already ?"}
            </p>
            <span onClick={handleAuthSwitch}>
              {isLogin ? "Sign up" : "Log in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
