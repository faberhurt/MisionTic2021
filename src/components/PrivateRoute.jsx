import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <div className="m-9 text-center text-3xl font-extrabold text-red-500">
      Debes Resgistrarte Primero
    </div>
  );
};

export default PrivateRoute;
