import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function ViewProjects(props) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const role = useSelector((state) => state.user.role);
  
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

    return <div>View Projects</div>
}