import React from "react";
import styles from "./WorkOrder.module.css";

export default function WorkOrder(props) {
  return (
    <div style={{ margin: "20px" }}>
      <div style={{ margin: "12px" }}>
        <div>
          <label>PROJECT:</label>
        </div>
        <div
          style={{
            margin: "5px",
          }}
        >
          <label>{props.worder["Project name"]}</label>
        </div>
      </div>
      <div style={{ margin: "12px" }}>
        <div>
          <label>SUBCONTRACTOR:</label>
        </div>

        <div
          style={{
            margin: "5px",
          }}
        >
          <label>{props.worder.subcontratist}</label>
        </div>
      </div>
      <div style={{ margin: "12px" }}>
        <div>
          <label>CATEGORY:</label>
        </div>

        <div
          style={{
            margin: "5px",
          }}
        >
          <label>{props.worder.task_name[0].category}</label>
        </div>
      </div>
      <div style={{ margin: "12px" }}>
        <div>
          <label>WO.ID</label>
        </div>

        <div
          style={{
            margin: "5px",
          }}
        >
          <label>{props.worder.iD}</label>
        </div>
      </div>
      <div style={{ margin: "12px" }}>
        <div>
          <label>P.M NAME</label>
        </div>

        <div
          style={{
            margin: "5px",
          }}
        >
          <label>{props.worder.pm_fullname}</label>
        </div>
      </div>
      <div
        className={styles.selectedTasks}
        style={{
          marginTop: "10px",
          justifyContent: "center",
          maxHeight: "100px",
          overflowY: "auto",
        }}
      >
        {props.worder.task_name.map((task) => (
          <div>
            <p style={{ marginLeft: "5px" }}>•{task.task_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
