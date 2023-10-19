import React, { useState } from "react";
import { BiXCircle } from "react-icons/bi";
import styles from "./SelectMasterItems.module.css" 

export function SelectMasterItems(props) {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className={isExpanded ? `${styles.contenedor} ${styles.expanded}` : styles.contenedor}>
      <form>
        <div style={{marginBottom: "10px", marginTop:"10px"}}>        
          <label className="form-label" style={{ color: "white", fontSize: "25px" }}>
            Select Master Items
          </label>
        </div>
        <div className={styles.selectedTasks} onClick={toggleExpansion} style={{ maxHeight: "300px", overflowY: "auto" }}>
          {props.worders.map((masters, index) => (
            <div>
              {masters.map((master) => (
                <div
                  key={master.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <input
                    type="checkbox"
                    id={master.id}
                    name={master.description}
                    data={JSON.stringify(master)}
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
                    title={master.description} 
                  >
                    {master.description}
                  </label>
                </div>
              ))}
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
