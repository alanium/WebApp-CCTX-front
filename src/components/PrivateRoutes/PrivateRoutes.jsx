import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const access = useSelector((state) => state.access);

  return (
    access ? <Outlet/> : <Navigate to="/"/>
  )
};

export default PrivateRoutes;
