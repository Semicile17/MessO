import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../utils/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("student"); // Role state
  const [idOrEmailOrPhone, setIdOrEmailOrPhone] = useState(""); // Input for ID, email, or phone
  const [password, setPassword] = useState("");
  const { onLogin, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin(idOrEmailOrPhone, password, role); // Send role along with credentials
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
      <div className="mt-16 flex flex-col w-full h-screen  items-center">
        <h1 className="text-2xl font-bold font-serif p-5">LOGIN</h1>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-black p-1 m-1"
        >
          <option value="student">Student</option>
          <option value="warden">Warden</option>
          <option value="caretaker">Caretaker</option>
        </select>

        {role === "student" && (
          <input
            name="id"
            type="number"
            value={idOrEmailOrPhone}
            placeholder="Enter ID number"
            onChange={(e) => setIdOrEmailOrPhone(e.target.value)}
            className="border border-black p-1 m-1"
          />
        )}
        
        {role === "warden" && (
          <input
            name="email"
            type="email"
            value={idOrEmailOrPhone}
            placeholder="Enter Email"
            onChange={(e) => setIdOrEmailOrPhone(e.target.value)}
            className="border border-black p-1 m-1"
          />
        )}
        
        {role === "caretaker" && (
          <input
            name="phone"
            type="tel"
            value={idOrEmailOrPhone}
            placeholder="Enter Phone Number"
            onChange={(e) => setIdOrEmailOrPhone(e.target.value)}
            className="border border-black p-1 m-1"
          />
        )}
        
        <input
          name="password"
          type="password"
          placeholder="Enter Password"
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
      </div>
    </>
  );
};

export default Login;
