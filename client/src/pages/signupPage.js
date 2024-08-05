import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { AuthContext } from "../utils/authContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { onSignup , isLoggedIn } = useContext(AuthContext);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSignup(signupData);
  };

  useEffect(() => {
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
        <h1 className="text-2xl text-center">SignUp</h1>
      </div>
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <input
          name="email"
          type="email"
          value={signupData.email}
          onChange={handleChange}
          placeholder="abc@gmail.com"
          className="border border-black p-1 m-1"
        />
        <input
          name="name"
          type="text"
          placeholder="username"
          value={signupData.name}
          onChange={handleChange}
          className="border border-black p-1 m-1"
        />
        <input
          name="password"
          type="text"
          placeholder="********"
          value={signupData.password}
          onChange={handleChange}
          className="border border-black p-1 m-1"
        />
        <input
          name="passwordConfirm"
          type="text"
          placeholder="********"
          value={signupData.passwordConfirm}
          onChange={handleChange}
          className="border border-black p-1 m-1"
        />
        <button
          type="button"
          className="hover:text-blue-500"
          onClick={handleSubmit}
        >
          Sign up
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

export default Signup;
