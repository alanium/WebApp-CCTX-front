import React, { useEffect, useState } from "react";
import { BiXCircle } from "react-icons/bi";
import styles from "./SelectMasterItems.module.css";

export function SelectMasterItems(props) {
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    props.setMaster((prevMaster) => ({
      ...prevMaster,
      selected_master: props.worders,
      master_name: props.worders.map((element) => element.description),
    }));
    console.log(props.master);
  }, []);

  const toggleExpansion = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div
      className={
        isExpanded
          ? `${styles.contenedor} ${styles.expanded}`
          : styles.contenedor
      }
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
          onClick={toggleExpansion}
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {props.worders.map((masters, index) => (
            <div>
              <div
                key={masters.decription}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <input
                  type="checkbox"
                  id={masters.id}
                  name={masters.description}
                  data={JSON.stringify(masters)}
                  key={index}
                  category={masters.category}
                  onChange={props.masterChangeHandler}
                  defaultChecked={true}
                />
                <label
                  style={{
                    color: "white",
                    textAlign: "justify",
                    textJustify: "inter-word",
                    flex: "1",
                  }}
                  title={masters.description}
                >
                  {masters.description}
                </label>
              </div>
              {props.master.master_name.includes(masters.description) ? (
                <div>
                  {masters.processes.map((process, index) => (
                    <div>
                      <input
                        type="checkbox"
                        id={process.id}
                        name={process.name}
                        key={index}
                        onChange={props.processChangeHandler}
                        defaultChecked={true}
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
              ) : null}
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
