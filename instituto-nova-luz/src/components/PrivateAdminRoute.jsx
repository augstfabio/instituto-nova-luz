import React from "react";
import { Navigate } from "react-router-dom";

import Loading from "./Loading";
import { useAuth } from "../hooks/useAuth";

const PrivateAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const ADMIN_USER_ID = import.meta.env.VITE_ADMIN_USER_ID; 

  if (loading) {
    return <div style={{ height: '50vh' }}><Loading /></div>;
  }

  if (!user || user.uid !== ADMIN_USER_ID) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateAdminRoute;
