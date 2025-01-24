import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const PrivateLoginAndRegister = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{height:'50vh'}}>"carregando"</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateLoginAndRegister;
