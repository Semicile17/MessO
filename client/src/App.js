import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/loginPage";
import Signup from "./pages/signupPage";
import Profile from "./pages/profilePage";
import PageNotFound from "./pages/pnfError";
import Home from "./pages/homePage";
import TopBar from "./components/topbar";

function App() {
  return (
    <>
    <TopBar/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/404" element={<PageNotFound />} />
        </Routes>
    </>
  );
}

export default App;
