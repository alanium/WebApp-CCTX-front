import React, { useEffect, useState } from "react";
import { BiXCircle } from "react-icons/bi";
import styles from "./SelectMasterItems.module.css" 

export function SelectMasterItems(props) {
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    const initialCategories = props.worders.map((masters) => masters.category);

    props.setCategory((prevCategory) => ({
      ...prevCategory,
      category_name: Set(initialCategories),
    }));

    props.setMaster((prevMaster) => ({
      ...prevMaster,
      selected_master:[...prevMaster.selected_master, ...props.worders],
      master_name: [
        ...prevMaster.master_name,
        ...props.worders.map((element) => element.description),
      ],

    }));

  },[])

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
          {props.worders.map((masters) => (
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
                    id={masters.description}
                    name={masters.description}
                    data={JSON.stringify(masters)}
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
