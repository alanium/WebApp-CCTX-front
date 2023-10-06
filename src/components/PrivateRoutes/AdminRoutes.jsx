import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const role = useSelector((state) => state.user.role)

  return (
    role !== "admin" ? <Outlet/> : <Navigate to="/no_access"/>
  )
};

export default AdminRoutes;
