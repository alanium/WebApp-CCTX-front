import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoutes = () => {
  const role = useSelector((state) => state.user.role);

  if (role === "user" || role === "admin") {
    return <Navigate to="/no_access" />;
  }

  return <Outlet />;
};

export default UserRoutes;