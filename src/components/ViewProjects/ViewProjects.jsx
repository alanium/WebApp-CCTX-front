import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Maintenace from "../Maintenance/Maintenance";

export function ViewProjects(props) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const role = useSelector((state) => state.user.role);
    const isAvaliable = false;
  
    useEffect(() => {
      // Fetch data when the component mounts
      props
        .obtenerJSON("view_project")
        .then((responseData) => {
          // Update the local state with the fetched data
          setData(responseData);
          setLoading(false); // Establecer el estado de carga en false cuando se complete la carga
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false); // En caso de error, también establecer el estado de carga en false
        });
    }, [props]);

    return (
    <div className="global-container">
      {isAvaliable ? (
        <div>
          <label>View Projects</label>
        </div>
      ) :
        <Maintenace />
      }
    </div>
  )
}