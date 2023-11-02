import React, { useEffect, useState } from "react";
import styles from "./CreateWo.module.css";

export function CreateWo(props) {
  const initialMaster = props.master || {};
  const [editedMaster, setEditedMaster] = useState(initialMaster);
  const [worders, setWorders] = useState([]);
  const [isCorrect, setIsCorrect] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const allWorders = categories.reduce((allWorders, category) => {
      return allWorders.concat(props.master[category].map((task) => task.wo));
    }, []);

    const uniqueWorders = Array.from(new Set(allWorders));
    setWorders(uniqueWorders);
  }, []);

  const categories = Object.keys(editedMaster);

  const changeHandler = (event) => {
    const { category, task, name } = event.target.dataset;
    const value = event.target.value;

    setEditedMaster((prevMaster) => {
      if (prevMaster[category] && /^\d*$/.test(value)) {
        const newValue = Math.min(Number(value), 51); // Ensure the value is not greater than 51
        return {
          ...prevMaster,
          [category]: prevMaster[category].map((item) =>
            item.name === task ? { ...item, [name]: newValue } : item
          ),
        };
      } else {
        return prevMaster;
      }
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    for (const category of categories) {
      for (const task of props.master[category]) {
        if (task.week === "") {
          setIsCorrect(false);
          setErrorMessage("Cant leave WEEK empty before submitting");
        }
      }
    } // Use functional form of setState

    if (isCorrect) {
      props.setMaster(editedMaster);
      console.log(props.master);
      props.handleSubmit()
  };
  }

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
            style={{ marginBottom: "10px", marginTop: "10px" }}
          >
            <label
              className="form-label"
              style={{ color: "white", fontSize: "25px" }}
            >
              {editedMaster[category][0].category_name}
            </label>
            <div>
              {editedMaster[category].map((task) => (
                <div key={task.name}>
                  <label>{task.name}</label>
                  <div>
                    <div>
                      <label>WEEK:</label>
                      {task.week === null ? (task.week = "") : null}
                      <input
                        onChange={changeHandler}
                        type="number"
                        data-category={category}
                        data-task={task.name}
                        data-name="week"
                        value={task.week}
                        max="51"
                      />
                    </div>
                    <div>
                      <label>WO:</label>
                      <select
                        onChange={changeHandler}
                        data-category={category}
                        data-task={task.name}
                        data-name="wo"
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
        <button onClick={(event) => handleSubmit(event)}>Submit</button>
      </form>
    </div>
  );
}
