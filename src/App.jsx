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
import { CreateProject } from "./components/CreateProject/CreateProject";
import { ViewProjects } from "./components/ViewProjects/ViewProjects";
import ManageWo from "./components/ManageWo/ManageWo";
import { ManageRoles } from "./components/ManageRoles/ManageRoles";
import { ManageTasks } from "./components/MangeTasks/ManageTasks";
import { ManageProjects } from "./components/ManageProjects/ManageProjects";

function App() {
  const access = useSelector((state) => state.access);
  const location = useLocation()
  const renderNavBar = () => {
    if (access && location.pathname != "/home") {
      return <SideBar />;
    }
    return null;
  };


  async function enviarDatos(datos, ruta, action = undefined) {
    try {
      let bodyData = JSON.stringify(datos);
      if (action !== undefined) {
        datos.action = action
        bodyData = JSON.stringify( datos );
      }
      const response = await fetch(`http://3.145.79.50:5000/${ruta}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error for further handling if needed
    }
  }



  async function obtenerJSON(ruta) {
    try {
      const response = await fetch(`http://3.145.79.50:5000/${ruta}`);
  
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
            <Route path="/home" exact element={<Home />} />
            <Route
              path="/home/manage_wo/view_wo"
              element={<ViewWorkOrder obtenerJSON={obtenerJSON} enviarDatos={enviarDatos} />}
            />
            <Route
            path="/home/manage_tasks/"
            element={<ManageTasks obtenerJSON={obtenerJSON} enviarDatos={enviarDatos} />} />
            <Route
            path="/home/control_panel/manage_roles"
            element={<ManageRoles obtenerJSON={obtenerJSON} enviarDatos={enviarDatos}/>}/>
            <Route
            path="/home/manage_wo/download_wo"
            element={<FileDownloader obtenerJSON={obtenerJSON} enviarDatos={enviarDatos}/>} />
            <Route
            path="/home/manage_tasks/assign_task"
            element={<NewTask obtenerJSON={obtenerJSON} enviarDatos={enviarDatos} />} />
            <Route
            path="/home/manage_projects/create_project"
            element={<CreateProject obtenerJSON={obtenerJSON} enviarDatos={enviarDatos} />} />
            <Route
            path="/home/manage_projects/view_projects"
            element={<ViewProjects obtenerJSON={obtenerJSON} enviarDatos={enviarDatos} /> } />
            <Route
            path="/home/manage_wo"
            element={<ManageWo />} />
            <Route
            path="/home/control_panel"
            element={<ControlPanel  />} />
            <Route
            path="/home/manage_projects"
            element={<ManageProjects />} />
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
