import React, { useEffect, useState } from "react";
import { BiXCircle } from "react-icons/bi";
import styles from "./SelectMasterItems.module.css";

export function SelectMasterItems(props) {
  

  useEffect(() => {
    props.setMaster((prevMaster) => ({
      ...prevMaster,
      selected_master: props.worders,
    }));
    console.log(props.master);
  }, []);

  const [selectedTasks, setSelectedTasks] = useState([]);


  const categories = Object.keys(props.worders)

  const toggleTask = (taskName) => {
    if (selectedTasks.includes(taskName)) {
      setSelectedTasks(selectedTasks.filter((item) => item !== taskName));
    } else {
      setSelectedTasks([...selectedTasks, taskName]);
    }
  };


  return (
    <div
  
    >
      <form>
        <div style={{ marginBottom: "10px", marginTop: "10px" }}>
          <label
            className="form-label"
            style={{ color: "white", fontSize: "25px" }}
          >
            Select Master Items
          </label>
        </div>
        <div
          className={styles.selectedTasks}
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
        {categories.map((category) => (
          <div>
            <div>
              <label>
                {category}
              </label>
            </div>
            <div>
              <form>
                {props.worders[category].map((task, index) => (
                  <div style={{
                    marginLeft: "5px"
                  }}>
                    <input
                      type="checkbox"
                      onChange={() => toggleTask(task.name)}
                    />
                    <label>
                      {task.name}
                    </label>
                    <div>
                      {task.master_items.map((master, index) => (
                        <div style={{
                          marginLeft: "15px"
                        }}>
                          {selectedTasks.includes(task.name) && (
                              <input type="checkbox" />
                            )}
                            {selectedTasks.includes(task.name) && (
                              <label>{master.description}</label>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
        ))}
        </div>
        <button
          type="submit"
          className="global-button"
          onClick={props.handleSubmit}
        >
          Select Master Items
        </button>
      </form>
    </div>
  );
}
