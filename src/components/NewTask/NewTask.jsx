import React, { useState, useEffect } from "react";
import styles from "./NewTask.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiNoEntry, BiXCircle } from "react-icons/bi";
import { ImSpinner8 } from "react-icons/im";
export function NewTask(props) {
  const [processes, setProcesses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [datos, setDatos] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({
    selected_project: "",
    selected_processes: [],
  });
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const result = await props.obtenerJSON("assign_task");
        if (result) {
          console.log(result);
          setDatos(result);
          setProcesses(result["process_names"]);
          setProjects(result["project_names"]);
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
    setIsSubmitting(true);
    setError(false);
    if (
      input.selected_project !== "Select a Project" &&
      input.selected_processes.length > 0
    ) {
      const jsonData = {
        selected_project: input.selected_project,
        selected_processes: input.selected_processes,
      };
      props
        .enviarDatos(jsonData, "assign_task")
        .then((datos) => {
          if (datos) {
            console.log(datos);
            setInput({
              selected_project: "",
              selected_processes: [],
            })
            navigate("/home")
            setIsSubmitting(false);
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
          setIsSubmitting(false);
        });
    } else {
      setIsSubmitting(false);
      setError(true);
      console.log(
        "Please select a project and at least one process before clicking submit"
      );
    }
  };
  return (
    <div className="global-container" style={{ position: "fixed" }}>
      {role !== "member" ? (
        <div>
          <div>
          {isSubmitting ? (
            <div className={styles.spinContainer} style={{ zIndex: 1000 }}>
              <div className={styles.spinContainer}>
                <ImSpinner8 className={styles.spin} />
              </div>
            </div>
          ) : null}
          </div>
          {isLoading ? (
            <div className={styles.titleDiv}>
              <label
                className="global-card-title"
                style={{ marginBottom: "20px" }}
              >
                Assign New Task
              </label>
              {processes.length > 0 && projects.length > 0 ? (
                <form>
                  <label className="form-label" style={{ color: "white" }}>
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
                        value={selected_project.id}
                      >
                        {selected_project.name}
                      </option>
                    ))}
                  </select>
                  <label
                    className="form-label"
                    style={{ margin: "10px", color: "white" }}
                  >
                    Select Processes
                  </label>
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {processes.map((process) => (
                      <div
                        key={process.id}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <input
                          type="checkbox"
                          id={process.id}
                          name={process.name}
                          value={process.id}
                          onChange={handleProcessChange}
                        />
                        <label
                          style={{
                            color: "white",
                            textAlign: "justify",
                            textJustify: "inter-word",
                            flex: "1",
                          }}
                        >
                          {process.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <div>
                    <button
                      type="submit"
                      className="global-button"
                      onClick={handleSubmit}
                    >
                      Assign Tasks
                    </button>
                    { error ? 
                        <p style={{ color: "red" }} > <BiXCircle/> Please select a project and a process before submitting the form</p>  : null
                    }
                  </div>
                  <br />
                </form>
              ) : (
                <div>
                  <div>
                    <p style={{ color: "white" }}>Loading data...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div>
                <p style={{ color: "white" }}>Loading data...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.titleDiv}>
          <div>
            <label className="global-card-title">You Dont Have Access</label>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "0px",
            }}
          >
            <label className="global-card-title" style={{ fontSize: "70px" }}>
              <BiNoEntry />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
