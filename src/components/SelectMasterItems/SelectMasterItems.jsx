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
  const [unselectedItems, setUnselectedItems] = useState(false);
  const [selectedMasterIDs, setSelectedMasterIDs] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const categories = Object.keys(props.worders);

  const toggleTask = (taskName) => {
    if (selectedTasks.includes(taskName)) {
      setSelectedTasks(selectedTasks.filter((item) => item !== taskName));
    } else {
      setSelectedTasks([...selectedTasks, taskName]);
    }
  };

  const gatherUnselectedCheckboxes = () => {
    const unselectedMasters = [];
  
    // Collect all unselected master objects
    categories.forEach((category) => {
      if (category !== "OTHERS") {
        props.worders[category].forEach((task) => {
          task.master_items.forEach((master) => {
            if (
              selectedTasks.includes(task.name) &&
              !selectedMasterDescriptions.includes(master.description) &&
              !selectedMasterIDs.includes(master.id)
            ) {
                // Create a new object without the 'id' property
                const masterWithoutId = { ...master };
                let aux = 0
                delete masterWithoutId.id
                unselectedMasters.forEach((item) => {
                  if (item.description === masterWithoutId.description) {
                    aux++;
                  }
                })
               if (!aux === 0) {
                unselectedMasters.push(masterWithoutId)
               }
            }
          });
        });
      }
    });
  
    // Push unselected masters to the "OTHERS" category
    props.worders["OTHERS"][0].master_items.push(...unselectedMasters);
  
    console.log(props.worders["OTHERS"][0].master_items);
  };

  const descriptionHandler = (event, id) => {
    const description = event.target.name;
    const checked = event.target.checked;

    if (checked) {
      setSelectedMasterDescriptions([
        ...selectedMasterDescriptions,
        description,
      ]);
      setSelectedMasterIDs([...selectedMasterIDs, id]);
    } else {
      setSelectedMasterDescriptions(
        selectedMasterDescriptions.filter((desc) => desc !== description)
      );
      setSelectedMasterIDs(
        selectedMasterIDs.filter((masterId) => masterId !== id)
      );
    }
  };

  return (
    <div>
      {unselectedItems ? (
        <div className={styles.popupContainer}>
          <div className="global-container">
            <div>
              <label className="form-label" style={{ color: "white" }}>
                You have unselected master items, do you wish to add them to the
                OTHERS category? If not please select them before continuing.
              </label>
            </div>
            <div className={styles.buttonsDiv}>
              <button
                onClick={() => setUnselectedItems(false)}
                className="global-button"
                style={{
                  width: "calc(50% - 10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.300)",
                  color: "white",
                  height: "45px",
                  marginRight: "5px"
                }}
              >
                NO
              </button>

              <button
                onClick={gatherUnselectedCheckboxes}
                className="global-button"
                style={{
                  width: "calc(50% - 10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.300)",
                  color: "white",
                  height: "45px",
                }}
              >
                YES
              </button>
            </div>
          </div>
        </div>
      ) : null}
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
          {categories.map((category) =>
            category !== "OTHERS" ? (
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
                                ref={ref}
                                master={master}
                                onChange={(event) =>
                                  descriptionHandler(event, master.id)
                                }
                                name={master.description}
                                type="checkbox"
                                id={master.id}
                                disabled={
                                  selectedMasterDescriptions.includes(
                                    master.description
                                  ) && !selectedMasterIDs.includes(master.id)
                                }
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
            ) : null
          )}
        </div>
        <button
          type="submit"
          className="global-button"
          onClick={(e) => {
            e.preventDefault();
            setUnselectedItems(true);
          }}
        >
          Select Master Items
        </button>
      </form>
    </div>
  );
}
