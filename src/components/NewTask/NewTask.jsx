import React, { useState, useEffect } from 'react'
import styles from './NewTask.module.css'
import { useNavigate } from 'react-router-dom'
export function NewTask (props) {
    const [processes, setProcesses] = useState([])
    const [projects, setProjects] = useState([])
    const [datos, setDatos] = useState({})
    const [input, setInput] = useState({
        selected_project:"",
        selected_processes: [],
    })
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchData() {
          try {
            const result = await props.obtenerJSON("assign_task");
            if (result) {
              console.log(result);
              setDatos(result)
              setProcesses(result["process_names"])
              setProjects(result["project_names"])
            } else {
              console.log("No funcionó");
            }
          } catch (error) {
            console.error("Error: ", error);
          }
        }
        fetchData();
      }, []);
      const handleProjectChange = (event) => {
        setInput({ ...input, selected_project: event.target.value });
    };
    const handleProcessChange = (event) => {
        const processId = event.target.id;
        const isChecked = event.target.checked;
        setInput((prevInput) => {
            if (isChecked) {
                return {
                    ...prevInput,
                    selected_processes: [...prevInput.selected_processes, processId],
                };
            } else {
                return {
                    ...prevInput,
                    selected_processes: prevInput.selected_processes.filter(
                        (process) => process !== processId
                    ),
                };
            }
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (input.selected_project !== "Select a Project" && input.selected_processes.length > 0) {
            const jsonData = {
                selected_project: input.selected_project,
                selected_processes: input.selected_processes,
            };
            props
                .enviarDatos(jsonData, "assign_task")
                .then((datos) => {
                    if (datos) {
                        console.log(datos);
                    }
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });
        } else {
            console.log("Please select a project and at least one process before clicking submit");
        }
    };
    return (
        <div className="global-container" style={{ position: "fixed"}}>
            <div className={styles.titleDiv}>
            <label className='global-card-title' style={{marginBottom: "20px"}}>
                Assign New Task
            </label>
            {processes.length > 0 && projects.length > 0 ? (
                <form>
                    <label
                        className='form-label'
                        style={{color: "white"}}
                    >
                    Select Project:
                    </label>
                    <select
                    name="selected_project"
                    id={input.selected_project}
                    className="global-input-1"
                    onChange={handleProjectChange}
                    value={input.selected_project}
                    >
                    <option>Select a Project</option>
                    {projects.map((selected_project) => (
                        <option
                        key={selected_project.id}
                        id={selected_project.id}
                        value={selected_project.id}>
                            {selected_project.name}
                        </option>
                    ))}
                    </select>
                    <label
                    className='form-label'
                    style={{ color: "white"}}
                    >
                    Select Processes
                    </label>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {processes.map((process) => (
                        <div key={process.id} style={{ display: 'flex', flexDirection: 'row' }}>
                            <input
                            type="checkbox"
                            id={process.id}
                            name={process.name}
                            value={process.id}
                            onChange={handleProcessChange} />
                            <label>
                                {process.name}
                            </label>
                        </div>
                    ))}
                    </div>
                    
                    <hr/>
                    <div>
                        <button
                        type="submit"
                        className='global-button'
                        onClick={handleSubmit}
                        >
                        Assign Tasks
                        </button>
                    </div>
                    
                    <br />
                </form>
            ) : (
                <div>
                    <div>
                        <p style={{ color: "white"}}>Loading data...</p>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}






