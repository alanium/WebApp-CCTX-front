import React, { useEffect, useRef, useState } from "react";
import { BiXCircle } from "react-icons/bi";
import styles from "./SelectMasterItems.module.css";

export function SelectMasterItems(props) {
  const ref = useRef(null);
  const [selectedMasterDescriptions, setSelectedMasterDescriptions] = useState(
    []
  );
  const [unselectedItems, setUnselectedItems] = useState(false);
  const [selectedMasterIDs, setSelectedMasterIDs] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const categories = Object.keys(props.worders);
  const [master, setMaster] = useState({});

  useEffect(() => {
    console.log(master);
  }, [master]);

  const toggleTask = (task) => {
    if (selectedTasks.includes(task)) {
      let updatedSelectedMasterIDs = [...selectedMasterIDs];
      let updatedSelectedMasterDescriptions = [...selectedMasterDescriptions];
  
      // Iterate through the master items of the task
      task.master_items.forEach((master) => {
        const masterID = master.id;
        const masterDescription = master.description;
  
        if (selectedMasterIDs.includes(masterID)) {
          // Remove the master item's ID from selectedMasterIDs
          updatedSelectedMasterIDs = updatedSelectedMasterIDs.filter(
            (id) => id !== masterID
          );
  
          // Remove the master item's description from selectedMasterDescriptions
          updatedSelectedMasterDescriptions = updatedSelectedMasterDescriptions.filter(
            (desc) => desc !== masterDescription
          );
        }
      });
  
      // Update selectedMasterIDs and selectedMasterDescriptions
      setSelectedMasterIDs(updatedSelectedMasterIDs);
      setSelectedMasterDescriptions(updatedSelectedMasterDescriptions);
  
      // Uncheck the task
      setSelectedTasks(selectedTasks.filter((item) => item !== task));
    } else {
      // Checking the task, add it to selectedTasks
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  const gatherUnselectedCheckboxes = () => {
    const updatedMaster = { ...master };

      categories.forEach((category) => {
        if (category !== "OTHERS") {
          updatedMaster[category] = [];
          props.worders[category].forEach((task) => {
            if (selectedTasks.includes(task)) {
              const updatedTask = { ...task };
              updatedTask.master_items = task.master_items.filter((master) =>
                selectedMasterIDs.includes(master.id)
              );
              updatedMaster[category].push(updatedTask);
            }
          });
        }
      });
      // Update the master state
      setMaster(updatedMaster)
      props.setMaster(updatedMaster)

    const unselectedMasters = [];

      // Collect all unselected master objects
      categories.forEach((category) => {
        if (category !== "OTHERS") {
          props.worders[category].forEach((task) => {
            task.master_items.forEach((master) => {
              if (
                !selectedMasterDescriptions.includes(master.description) &&
                !selectedMasterIDs.includes(master.id)
              ) {
                // Create a new object without the 'id' property
                const masterWithoutId = { ...master };
                let aux = 0;
                delete masterWithoutId.id;
                unselectedMasters.forEach((item) => {
                  if (item.description === masterWithoutId.description) {
                    aux++;
                  }
                });
                if (aux === 0) {
                  unselectedMasters.push(masterWithoutId);
                }
              }
            });
          });
        }
      });

      // Push unselected masters to the "OTHERS" category
      props.worders["OTHERS"][0].master_items.push(...unselectedMasters);
      setMaster((prevMaster) => ({
        ...prevMaster,
        ["OTHERS"]: [...props.worders["OTHERS"]],
      }));
      console.log(master);
      props.setMaster((prevMaster) => ({
        ...prevMaster,
        ["OTHERS"]: [...props.worders["OTHERS"]],
      }));
      console.log("master", master);
      props.setIsMitemsReady(true)
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
    console.log(selectedMasterIDs);
  };

  const handleSubmit = (event) => {
    let allMasterItems = [];

    for (const category of categories) {
      props.worders[category].map((task) => {
        task.master_items.map((master) => {
          if (!allMasterItems.includes(master.description)) {
            allMasterItems.push(master.description);
          }
        });
      });
    }

    if (allMasterItems.every(item => selectedMasterDescriptions.includes(item))) {
      const updatedMaster = { ...master };

      categories.forEach((category) => {
        if (category !== "OTHERS") {
          updatedMaster[category] = [];
          props.worders[category].forEach((task) => {
            if (selectedTasks.includes(task)) {
              const updatedTask = { ...task };
              updatedTask.master_items = task.master_items.filter((master) =>
                selectedMasterIDs.includes(master.id)
              );
              updatedMaster[category].push(updatedTask);
            }
          });
        }
      });
      // Update the master state
      setMaster(updatedMaster)
      console.log(master);
      props.setMaster(updatedMaster);
      console.log("master", master);
      () => props.setIsMitemsReady(true)
    } else {
        setUnselectedItems(true)
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
                  marginRight: "5px",
                }}
              >
                NO
              </button>

              <button
                onClick={() => {
                  event.preventDefault();
                  () => props.setIsMitemsReady(true);
                  gatherUnselectedCheckboxes();
                }}
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
                        onChange={() => toggleTask(task)}
                      />
                      <label>{task.name}</label>
                      <div>
                        {task.master_items.map((master, index) => (
                          <div style={{ marginLeft: "15px" }} key={master.id}>
                            {selectedTasks.includes(task) && (
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
                            {selectedTasks.includes(task) && (
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
          // onClick={(event) => {event.preventDefault(); handleSubmit()}}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          Select Master Items
        </button>
      </form>
    </div>
  );
}
