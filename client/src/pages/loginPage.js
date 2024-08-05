import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { AuthContext } from "../utils/authContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin ,isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate("/404"); 
    }
  }, [isLoggedIn, navigate]);
  
  if (isLoggedIn) {
    return null; 
  }

  return (
    <>
      <div className="">
        <h1 className="text-2xl text-center">Login</h1>
      </div>
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <input
          name="email"
          type="email"
          value={email}
          placeholder="abc@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-black p-1 m-1"
        />
        <input
          name="password"
          type="text"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-black p-1 m-1"
        />
        <button
          type="button"
          className="hover:text-blue-500"
          onClick={handleSubmit}
        >
          Login
        </button>
        <button className="m-2">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </button>
      </div>
    </>
  );
};

export default Login;
