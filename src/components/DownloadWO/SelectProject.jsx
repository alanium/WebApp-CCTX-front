import React, { useState, useEffect } from "react";
import { SelectWO } from "./SelectWO";

export function SelectProject(props) {
  const [projects, setProjects] = useState(props.data);
  const [project, setProject] = useState(null);
  const [render, setRender] = useState(false);
  const [isProjectReady, setIsProjectReady] = useState(false);
  const [worders, setWorders] = useState([]);

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
    props.setIsLoading(true)
    if (project !== null) {
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
        setIsProjectReady(true);
      }
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
        />
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <select
              className="global-input-1"
              
              onChange={handleChange}
            >
              <option value={null}>Select a Project</option>
              {projects.map((customer) => (
                <option key={customer.id} value={customer.id}>
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
