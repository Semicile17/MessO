import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/loginPage";
import Signup from "./pages/signupPage";
import Profile from "./pages/profilePage";
import PageNotFound from "./pages/pnfError";
import Home from "./pages/homePage";

function App() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/404" element={<PageNotFound />} />
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
