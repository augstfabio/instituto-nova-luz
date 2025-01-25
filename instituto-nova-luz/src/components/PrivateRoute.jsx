import React from "react";
import { Navigate } from "react-router-dom";

import Loading from "./Loading";
import { useAuth } from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{height:'50vh'}}><Loading/></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
