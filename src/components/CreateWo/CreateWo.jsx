import React, { useEffect, useState } from "react";
import { BiNoEntry, BiXCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { WoPreview } from "../WoPreview/WoPreview";
import styles from "./CreateWo.module.css";

export function CreateWo(props) {
  const [worders, setWorders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({});
  const [projectId, setProjectId] = useState({
    project_name: "",
    project_id: "",
  });
  const [taskId, setTaskId] = useState({
    task_name: [],
    task_id: [],
  });
  const [subId, setSubId] = useState({
    sub_name: "",
    sub_id: "",
  });
  const role = useSelector((state) => state.user.role);
  const [isProjectReady, setIsProjectReady] = useState(false);
  const [isTaskReady, setIsTaskReady] = useState(false);
  const [isWoReady, setIsWoReady] = useState(false);
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
    setProjectId({
      project_name:
        event.target.options[event.target.selectedIndex].getAttribute("name"),
      project_id:
        event.target.options[event.target.selectedIndex].getAttribute("id"),
      action: "preview",
    });
    setInput({
      project_id:
        event.target.options[event.target.selectedIndex].getAttribute("id"),
      action: "get_task",
    });
    console.log(input);
  };

  const subChangeHandler = (event) => {
    setSubId({
      sub_name:
        event.target.options[event.target.selectedIndex].getAttribute("name"),        
      sub_id:
        event.target.options[event.target.selectedIndex].getAttribute("id"),
      action: "preview",
    });
    console.log(subId);
  };

  const handleTaskChange = (event) => {
    const taskName = event.target.name;
    const taskId = event.target.id;
    const isChecked = event.target.checked;
    setTaskId((prevInput) => {
      if (isChecked) {
        return {
          task_name: [...prevInput.task_name, taskName],
          task_id: [...prevInput.task_id, taskId],
          action: "preview",
        };
      } else {
        return {
          task_name: prevInput.task_name.filter((task) => task !== taskName),
          task_id: prevInput.task_id.filter((task) => task !== taskId),
          action: "preview",
        };
      }
    });
    console.log(taskId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (input.id !== null || (taskId.task_id && taskId.task_id.length > 0)) {
      try {
        let result;

        // Check conditions to determine what to submit
        if (submitCounter == 0) {
          result = await props.enviarDatos({
            project_id: projectId.project_id,
            action: "get_task"
          }, "generate_wo");
          setIsProjectReady(true);
        } else if (submitCounter == 1) {
          result = await props.enviarDatos(
            { action: "get_subcontractor" },
            "generate_wo"
          );
          setIsTaskReady(true);
        } else if (submitCounter == 2) {
          console.log([projectId, taskId, subId]);
          result = await props.enviarDatos(
            {
              project_id: projectId.project_id,
              task_id: taskId.task_id,
              sub_id: subId.sub_id,
              action: "preview",
            },
            "generate_wo"
          );
          setIsWoReady(true);
        }
        setSubmitcounter(submitCounter + 1);
        console.log(submitCounter);
        if (result) {
          console.log(result);
          setWorders(result);
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
                    {isWoReady ? (
                      <WoPreview
                      project={projectId}
                      sub={subId}
                      task={taskId}
                      />
                    ) : (
                      <form>
                        <label
                          className="form-label"
                          style={{ color: "white" }}
                        >
                          Select Conractor
                        </label>
                        <select
                          name="contractors"
                          id="contractors"
                          className="global-input-1"
                          onChange={subChangeHandler}
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
                    )}
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
