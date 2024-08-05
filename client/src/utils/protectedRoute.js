import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../utils/authContext" // Adjust the import path as needed
import PageNotFound from "../pages/pnfError"; // Adjust the import path as needed

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <PageNotFound />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
