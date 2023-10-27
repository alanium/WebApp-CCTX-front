import React, { useEffect, useRef, useState } from "react";
import { BiXCircle } from "react-icons/bi";
import styles from "./SelectMasterItems.module.css";

export function SelectMasterItems(props) {
  const ref = useRef(null);

  useEffect(() => {
    props.setMaster((prevMaster) => ({
      ...prevMaster,
      selected_master: Object.create(props.worders),
    }));
    console.log(props.master);
  }, []);

  const [selectedMasterDescriptions, setSelectedMasterDescriptions] = useState(
    []
  );
  const [selectedMasterIDs, setSelectedMasterIDs] = useState([])
  const [selectedTasks, setSelectedTasks] = useState([]);
  const categories = Object.keys(props.worders);
  const [isDescriptionSelectedInOtherTask, setisDescriptionSelectedInOtherTask] = useState(false)
  const toggleTask = (taskName) => {
    if (selectedTasks.includes(taskName)) {
      setSelectedTasks(selectedTasks.filter((item) => item !== taskName));
    } else {
      setSelectedTasks([...selectedTasks, taskName]);
    }
  };

  const descriptionHandler = (event, id) => {
    const description = event.target.name;
    const checked = event.target.checked;
  
    if (checked) {
      setSelectedMasterDescriptions([...selectedMasterDescriptions, description]);
      setSelectedMasterIDs([...selectedMasterIDs, id]);
    } else {
      setSelectedMasterDescriptions(selectedMasterDescriptions.filter((desc) => desc !== description));
      setSelectedMasterIDs(selectedMasterIDs.filter((masterId) => masterId !== id));
    }
  };

  return (
    <div>
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
            <div key={category}>
              <div>
                <label>{category}</label>
              </div>
              <div>

                  {props.worders[category].map((task, index) => (
                    <div style={{ marginLeft: "5px" }} key={task.name}>
                      <input
                        type="checkbox"
                        onChange={() => toggleTask(task.name)}
                      />
                      <label>{task.name}</label>
                      <div>
                        {task.master_items.map((master, index) => (
                          <div style={{ marginLeft: "15px" }} key={master.id}>
                            {selectedTasks.includes(task.name) && (
                              <input
                                onChange={(event) => descriptionHandler(event, master.id)}
                                name={master.description}
                                type="checkbox"
                                id={master.id}
                                disabled={selectedMasterDescriptions.includes(master.description) && !selectedMasterIDs.includes(master.id)}
                              />
                            )}
                            {selectedTasks.includes(task.name) && (
                              <label>{master.description}</label>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

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
