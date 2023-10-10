import React, { useEffect, useState } from "react";
import { BiNoEntry, BiXCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import styles from "./CreateWo.module.css";

export function CreateWo(props) {
  const [worders, setWorders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({});
  const [taskInput, setTaskInput] = useState({
    tasks: [],
  });
  const [subcontractor, setSubcontractor] = useState({})
  const role = useSelector((state) => state.user.role);
  const [isProjectReady, setIsProjectReady] = useState(false);
  const [isTaskReady, setIsTaskReady] = useState(false);
  const [submitCounter, setSubmitcounter] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await props.obtenerJSON("generate_wo");
        if (result) {
          console.log(result);
          setWorders(result);
        } else {
          console.log("No funcionó");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchData();
  }, []);

  const changeHandler = (event) => {
    setInput({
      id: event.target.options[event.target.selectedIndex].getAttribute("id"),
      action: "get_task",
    });
    console.log(input);
  };

  const subcontractorChangeHandler = (event) => {
    setSubcontractor({
      subcontractor: event.target.options[event.target.selectedIndex].getAttribute("id"),
      action: "preview",
    });
    console.log(input);
  };

  const handleTaskChange = (event) => {
    const taskId = event.target.id;
    const isChecked = event.target.checked;
    setTaskInput((prevInput) => {
      if (isChecked) {
        return {
          tasks: [...prevInput.tasks, taskId],
          action: "get_subcontractor",
        };
      } else {
        return {
          tasks: prevInput.tasks.filter((task) => task !== taskId),
          action: "get_subcontractor",
        };
      }
    });
    console.log(taskInput);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (input.id !== null || (taskInput.tasks && taskInput.tasks.length > 0)) {
      try {
        let result;

        // Check conditions to determine what to submit
        if (submitCounter == 0) {
          result = await props.enviarDatos(input, "generate_wo")
          setIsProjectReady(true);
        } else if (submitCounter == 1) {
          result = await props.enviarDatos(taskInput, "generate_wo")
          setIsTaskReady(true);
        } else if (submitCounter == 2) {
          result = await props.enviarDatos(subcontractor, "generate_wo")
        }
        setSubmitcounter(submitCounter + 1);
        console.log(submitCounter)
        if (result) {
          console.log(result);
          setWorders(result);
          setIsProjectReady(true);
          if (submitCounter == 2) setIsTaskReady(true);
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Please fill in the form before submitting");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="global-container">
      <div className={styles.titleDiv}>
        <label className="global-card-title" style={{ marginBottom: "20px" }}>
          Generte Work Order
        </label>
      </div>
      {role !== "member" ? (
        <div>
          <div>
            {isProjectReady ? (
              <div>
                {isTaskReady ? (
                  <div>
                    <form>
                      <label className="form-label" style={{ color: "white" }}>
                        Select Conractor
                      </label>
                      <select
                        name="contractors"
                        id="contractors"
                        className="global-input-1"
                        onChange={subcontractorChangeHandler}
                      >
                        <option>Select a Contractor</option>
                        {worders.map((contractor) => (
                          <option
                            key={contractor.id}
                            id={contractor.id}
                            name={contractor.name}
                          >
                            {contractor.name}
                          </option>
                        ))}
                      </select>
                      <br />
                      <button
                        className="global-button"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                ) : (
                  <div>
                    <form>
                      <label className="form-label" style={{ color: "white" }}>
                        Edit Tasks
                      </label>
                      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                        {worders.map((task) => (
                          <div
                            key={task.id}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "flex-start",
                            }}
                          >
                            <input
                              type="checkbox"
                              id={task.id}
                              name={task.name}
                              value={task.id}
                              onChange={handleTaskChange}
                            />
                            <label
                              style={{
                                color: "white",
                                textAlign: "justify",
                                textJustify: "inter-word",
                                flex: "1",
                              }}
                            >
                              {task.name}
                            </label>
                          </div>
                        ))}
                        <div>
                          <button
                            type="submit"
                            className="global-button"
                            onClick={handleSubmit}
                          >
                            Edit Tasks
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <form>
                  <label className="form-label" style={{ color: "white" }}>
                    Select Project
                  </label>
                  <select
                    name="projects"
                    id="projects"
                    className="global-input-1"
                    onChange={changeHandler}
                  >
                    <option>Select a Project</option>
                    {worders.map((project) => (
                      <option
                        key={project.id}
                        id={project.id}
                        name={project.name}
                      >
                        {project.name}
                      </option>
                    ))}
                  </select>
                  <br />
                  <button
                    className="global-button"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
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
