import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../utils/authContext" // Adjust the import path as needed
import PageNotFound from "../pages/pnfError"; // Adjust the import path as needed
import { getCookie } from "./cookies";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!getCookie('jwt')) {
    return <PageNotFound />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
