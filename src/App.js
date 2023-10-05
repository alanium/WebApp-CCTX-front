import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAccess, setUser } from "./redux/actions";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes"
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Recovery from "./components/Recovery/Recovery";
import Login from "./components/Login/Login";
import ViewWorkOrder from "./components/View W.O/View W.O";
import SideBar from "./components/SideBar/SideBar";
import { UnexpectedError } from "./components/Error/UnexepectedError";
import "./App.css";
import "./SourceSansPro.css";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { FileDownloader } from "./components/FileDownloader/FileDownloader";
import { NewTask } from "./components/NewTask/NewTask";

function App() {
  const access = useSelector((state) => state.access);

  const renderNavBar = () => {
    if (access) {
      return <SideBar />;
    }
    return null;
  };


  async function enviarDatos(datos, ruta) {
    try {
      const response = await fetch(`https://alanium.pythonanywhere.com/${ruta}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });
  
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error for further handling if needed
    }
  }

  async function obtenerJSON(ruta) {
    try {
      const response = await fetch(`https://alanium.pythonanywhere.com/${ruta}`);
  
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error
    }
  }

  return (
    <div>
      {renderNavBar()}
      <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path="/home" exact element={<Home enviarDatos={enviarDatos} />} />
            <Route
              path="/home/view_wo"
              element={<ViewWorkOrder obtenerJSON={obtenerJSON} enviarDatos={enviarDatos} />}
            />
            <Route
            path="/home/control_panel"
            element={<ControlPanel obtenerJSON={obtenerJSON} enviarDatos={enviarDatos}/>}/>
            <Route
            path="/home/download_wo"
            element={<FileDownloader obtenerJSON={obtenerJSON} enviarDatos={enviarDatos}/>} />
            <Route
            path="/home/assign_task"
            element={<NewTask obtenerJSON={obtenerJSON} enviarDatos={enviarDatos} />} />
          </Route>
          <Route
            path="/recovery"
            element={<Recovery enviarDatos={enviarDatos} />}
          />
          <Route
            path="/register"
            element={<Register enviarDatos={enviarDatos} />}
          />
          <Route
            path="/"
            element={<Login enviarDatos={enviarDatos} />}
          />
        <Route
          path="*"
          element={<UnexpectedError />}/>
      </Routes>
    </div>
  );
}

export default App;
