/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie, deleteCookie } from "../utils/cookies";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();


  // SIGNUP LOGIC
  const onSignup = async (signupData) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/v1/users/signup`,
        signupData
      );
      console.log(response.data);
      setCookie(
        "jwt",
        response.data.token,
        process.env.REACT_APP_JWT_EXPIRES_IN
      );
      setIsLoggedIn(true);
      setUser(response.data.User);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  // LOGIN LOGIC
  const onLogin = async (email, password) => {
    try {
      const response = await axios.post(`${backendURL}/api/v1/users/login`, {
        email,
        password,
      });
      console.log(response.data);
      setCookie(
        "jwt",
        response.data.token,
        process.env.REACT_APP_JWT_EXPIRES_IN
      );
      setIsLoggedIn(true);
      setUser(response.data.User);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if (user){
      navigate("/profile");
    }
  }, [user])
  // LOGOUT LOGIC
  const onLogout = () => {
    setIsLoggedIn(false);
    deleteCookie("jwt");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/v1/users/auth`, {
          withCredentials: true,
        });
        setIsLoggedIn(true);
        console.log(response);
        
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    checkLoginStatus();
  }, []);

  const authContextValue = {
    isLoggedIn,
    user,
    setIsLoggedIn,
    setUser,
    onLogin,
    onSignup,
    onLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};


