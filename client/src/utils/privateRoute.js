import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../utils/authContext";
import { useContext } from "react";

const ProtectedRoute = ({ redirectPath = '/profile', children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
