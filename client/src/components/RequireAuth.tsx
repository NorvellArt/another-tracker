import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";
import { AuthContext } from "../../provider/AuthProvider";

export const RequireAuth = () => {
    const { isAuthenticated } = React.useContext(AuthContext);
    const location = useLocation();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={"/login"} state={{ from: location }} replace />
    );
};
