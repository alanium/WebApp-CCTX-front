import React, { useEffect, useState } from "react";
import { BiXCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styles from "./SelectSub.module.css";

export function SelectSub(props) {
  const navigate = useNavigate();
  const [showMaster, setShowMaster] = useState(false);
  const [worders, setWorders] = useState(props.worders);

  useEffect(() => {
    let aux = [];
    worders.work_orders.forEach((wo) =>
      aux.push({ id: wo.id, sub_id: wo.subcontractor_id })
    );
    props.setSub(aux);
  }, []);

  const changeHandler = (event, wo_id) => {
    const sub_id = event.target.value;

    props.setSub((prevSub) =>
      prevSub.map((obj) => (obj.id === wo_id ? { ...obj, sub_id } : obj))
    );
  };

  return (
    <div>
      <form
        className={styles.selectedTasks}
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label
            className="form-label"
            style={{
              marginBottom: "10px",
              fontWeight: "bold",
              color: "white",
              fontSize: "25px",
            }}
          >
            Select Subcontractor
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label
            className="form-label"
            style={{
              marginBottom: "10px",
              fontWeight: "bold",
              color: "white",
              fontSize: "18px",
            }}
          >
            {worders.work_orders[0].project_name}
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label
            className="form-label"
            style={{
              marginBottom: "10px",
              fontWeight: "bold",
              color: "white",
              fontSize: "18px",
            }}
          >
            {worders.work_orders[0].costumer_name}
          </label>
        </div>
        <div>
          <label
            style={{ fontWeight: "bold", color: "white", fontSize: "18px" }}
            onClick={
              showMaster
                ? () => setShowMaster(false)
                : () => setShowMaster(true)
            }
          >
            Toggle Master Items
          </label>
        </div>

        <br />
        {worders.work_orders.map((wo) => (
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              marginTop: "20px",
            }}
          >
            <label className="form-label">{wo.wo_id}</label>
            <div>
              {wo.tasks.map((task) => (
                <div style={{ margin: "10px" }} key={wo.id}>
                  <div>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        marginBottom: "10px",
                      }}
                      className="form-label"
                    >
                      {task.task_name}
                    </label>
                  </div>
                  {showMaster ? (
                    <div>
                      {task.master_items.map((master) => (
                        <div>
                          <label style={{
                        fontWeight: "normal",}} className="form-label">-{master.name}</label>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <select
              onChange={(event) => changeHandler(event, wo.id)}
              className="global-input-1"
            >
              <option value="">Select Subcontractor</option>
              {worders.subcontractors.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </form>
      <button
        className="global-button"
        type="submit"
        onClick={props.handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
