import React, { useState, useEffect } from "react";
import { SelectWO } from "./SelectWO";
import { useDispatch } from "react-redux";
import { setBar } from "../../redux/actions";

export function SelectProject(props) {
  const [projects, setProjects] = useState(props.data);
  const [project, setProject] = useState(null);
  const [render, setRender] = useState(false);
  const [isProjectReady, setIsProjectReady] = useState(false);
  const [worders, setWorders] = useState([]);
  const dispatch = useDispatch()


  useEffect(() => {
    setProjects(props.data);
    console.log(projects);
  }, [projects]);

  const handleChange = (event) => {
    if (event.target.value !== null) {
      setProject({ id: event.target.value });
    }
    
  };

  async function handleSubmit(event) {
    event.preventDefault();
    
    if (project !== null) {
      props.setIsLoading(true)
      dispatch(setBar(true))
      try {
        const result = await props.enviarDatos(
          { id: project.id, action: "get_wo" },
          "/download_wo"
        );
        if (result) {
          setWorders(result);
          console.log(result);
        } else {
          console.log("No funcionó");
        }
      } catch (error) {
        console.error("Error, ", error);
      } finally {
        props.setIsLoading(false)
        dispatch(setBar(false))
        setIsProjectReady(true);
      }
    } else {
      props.setPopup(true)
    }
    
    
  }

  return (
    <div>
      {isProjectReady ? (
        <SelectWO
          setIsLoading={props.setIsLoading}
          enviarDatos={props.enviarDatos}
          worders={worders}
          setData={props.setData}
          setPopup={props.setPopup}
        />
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <select
              className="global-input-1"
              style={{maxWidth: "600px"}}
              onChange={handleChange}
              
            >
              <option  value={null}>Select a Project</option>
              {projects.map((customer) => (
                <option style={{maxWidth: "600px"}} title={customer.name} key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <button className="global-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
