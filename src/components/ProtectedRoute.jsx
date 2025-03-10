import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("jwtToken");

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
