import React from "react";
import { Navigate } from "react-router-dom";
import { Login } from "../pages";

const RequireAuth = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user || user == null) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;
