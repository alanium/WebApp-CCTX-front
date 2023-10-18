import React, { useState, useEffect } from "react";
import WorkOrder from "../WorkOrder/WorkOrder";
import styles from "./ViewWO.module.css";
import { ImSpinner8 } from "react-icons/im";
import { useSelector } from "react-redux";
import { BiNoEntry } from "react-icons/bi";

export default function ViewWorkOrder(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    // Fetch data when the component mounts
    props
      .obtenerJSON("view_wo")
      .then((responseData) => {
        // Update the local state with the fetched data
        setData(responseData);
        setLoading(false); // Establecer el estado de carga en false cuando se complete la carga
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false); // En caso de error, también establecer el estado de carga en false
      });
  }, [props]);

  return (
    <div className={styles.centeredContainer}>
      {role !== "member" ? (
        <div>
          {loading ? (
            <div className={styles.loadingIcon}>
              <ImSpinner8 className={styles.spin} />
            </div>
          ) : (
            <div className={styles.workOrderGrid}>
              {data.map((workOrder) => (
                <div key={workOrder["iD"]} className={styles.workOrderCard}>
                  <WorkOrder
                    name={workOrder["Project name"]}
                    id={workOrder["iD"]}
                    email={workOrder["pm_email"]}
                    fullname={workOrder["pm_fullname"]}
                    subcontratist={workOrder["subcontratist"]}
                    task={workOrder["task_name"]}
                    price={workOrder["total negotiated price"]}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="global-container">
          <div className={styles.titleDiv}>
            <div>
              <label className="global-card-title">You Dont Have Access</label>
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "0px",
              }}
            >
              <label className="global-card-title" style={{ fontSize: "70px" }}>
                <BiNoEntry />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
