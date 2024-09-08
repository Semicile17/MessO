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

  // LOGIN LOGIC
  const onLogin = async (id, password,login_type) => {
    try {
      const email = id ;
      let data; 
      
      const route = login_type === "student" ? "stu_login" : "adm_login";
      if(route==='stu_login'){
         data = {id,password}
      }else{
        data = {email,password}
      }
      const response = await axios.post(`${backendURL}/api/v1/auth/${route}`,data);
      console.log(response.data);
      setCookie(
        "jwt",
        response.data.token,
        process.env.REACT_APP_JWT_EXPIRES_IN
      );
      setIsLoggedIn(true);
      console.log(isLoggedIn);
      setUser(response.data.Student);
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
        const response = await axios.get(`${backendURL}/api/v1/auth`, {
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
    onLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};


