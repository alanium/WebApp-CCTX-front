import React, { useEffect, useState } from "react";
import styles from "./CreateWo.module.css";

export function CreateWo(props) {
  const initialMaster = props.master || {};
  const [editedMaster, setEditedMaster] = useState(initialMaster);
  const [worders, setWorders] = useState([]);
  const [isCorrect, setIsCorrect] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [taskId, setTaskId] = useState({});

  useEffect(() => {
    const allWorders = categories.reduce((allWorders, category) => {
      return allWorders.concat(props.master[category].map((task) => task.wo));
    }, []);

    const uniqueWorders = Array.from(new Set(allWorders));
    setWorders(uniqueWorders);
  }, []);

  useEffect(() => {
    props.setMaster(editedMaster);
    console.log(props.master);
  }, [editedMaster, props]);


  const categories = Object.keys(editedMaster);

  const changeHandler = (event) => {
    const { category, task, name } = event.target.dataset;
    const value = event.target.value;
  
    setEditedMaster((prevMaster) => {
      const updatedMaster = {
        ...prevMaster,
        [category]: prevMaster[category].map((item) =>
          item.name === task ? { ...item, [name]: value } : item
        ),
      };
      return updatedMaster;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.setIsSubmitting(true);

    for (const category of categories) {
      for (const task of props.master[category]) {
        if (task.week === "") {
          setIsCorrect(false);
          setErrorMessage("Can't leave WEEK empty before submitting");
          return;
        }
      }
    }

    console.log(props.master);

    const taskIdResponse = await props.enviarDatos(
      {
        data: editedMaster,
        action: "work_order",
      },
      "create_project"
    );

    console.log(taskIdResponse);

    setTaskId(taskIdResponse);

    const isTaskCompleted = await checkStatus(event, taskIdResponse.task_id);

    if (isTaskCompleted) {
      props.handleSubmit(event);
    }
  };

  const checkStatus = async (event, task_id) => {
    console.log(taskId);

    let response = await props.enviarDatos(
      { task_id: task_id, action: "check_status" },
      "create_project"
    );

    while (!response.result) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      response = await props.enviarDatos(
        { task_id: task_id, action: "check_status" },
        "create_project"
      );
    }

    return response.result;
  };

  return (
    <div>
      {isCorrect ? null : (
        <div className={styles.popupContainer}>
          <div className="global-container">
            <div>
              <label style={{ color: "white" }}>{errorMessage}</label>{" "}
            </div>
            <div>
              <button
                className="global-button"
                onClick={() => setIsCorrect(true)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      <form
        className={styles.selectedTasks}
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {categories.map((category) => (
          <div
            key={category}
            style={{ marginBottom: "10px", marginTop: "20px" }}
          >
            {editedMaster[category] &&
            editedMaster[category][0] &&
            editedMaster[category][0].category_name ? (
              <label
                className="form-label"
                style={{ fontWeight: "bold", color: "white", fontSize: "25px" }}
              >
                {editedMaster[category][0].category_name}
              </label>
            ) : null}
            <div>
              {editedMaster[category].map((task) => (
                <div style={{ margin: "10px" }} key={task.name}>
                  <div
                    style={{
                      fontSize: "20px",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "15px",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ fontWeight: "bold", fontSize: "20px" }}>
                        {task.name}
                      </label>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div style={{ fontSize: "15px", marginBottom: "10px" }}>
                        <label style={{ fontSize: "15px" }}>Week:</label>
                      </div>
                      {task.week === null ? (task.week = "") : null}
                      <input
                        className="global-input-1"
                        onChange={changeHandler}
                        type="number"
                        data-category={category}
                        data-task={task.name}
                        data-name="week"
                        key="week"
                        value={task.week}
                        max="51"
                      />
                    </div>
                    <div>
                      <div style={{ marginBottom: "5px" }}>
                        <label style={{ fontSize: "15px" }}>
                          Work Order Number:
                        </label>
                      </div>

                      <select
                        className="global-input-1"
                        onChange={changeHandler}
                        data-category={category}
                        data-task={task.name}
                        data-name="wo"
                        key="wo"
                        value={task.wo}
                      >
                        {worders.map((worder) => (
                          <option key={worder} value={worder}>
                            {worder}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </form>
      <button className="global-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
