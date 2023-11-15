import React, { useEffect } from "react";
import { setMaintenance } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HandleMaintenance.module.css"

export default function HandleMaintenance(props) {
    const dispatch = useDispatch();
    const maintenance = useSelector((state) => state.underMaintenance);
  
    // State to track the status of each button
    const [buttonStatus, setButtonStatus] = React.useState({
      create_project: maintenance.includes("create_project"),
      download_wo: maintenance.includes("download_wo"),
    });
  
    useEffect(() => {
      const storedMaintenance = localStorage.getItem("underMaintenance");
      if (storedMaintenance) {
        dispatch(setMaintenance(JSON.parse(storedMaintenance)));
  
        // Update button status based on the stored maintenance state
        setButtonStatus({
          create_project: JSON.parse(storedMaintenance).includes("create_project"),
          download_wo: JSON.parse(storedMaintenance).includes("download_wo"),
        });
      }
    }, [dispatch]);
  
    const buttonHandler = (event) => {
      const buttonValue = event.target.value;
  
      // Update maintenance state and localStorage
      const updatedMaintenance = buttonStatus[buttonValue]
        ? maintenance.filter((item) => item !== buttonValue)
        : [...maintenance, buttonValue];
  
      dispatch(setMaintenance(updatedMaintenance));
      localStorage.setItem("underMaintenance", JSON.stringify(updatedMaintenance));
  
      // Update button status after updating maintenance state
      setButtonStatus((prevStatus) => ({
        ...prevStatus,
        [buttonValue]: !prevStatus[buttonValue],
      }));
    }
  return (
    <div className="global-container">
      <label
        style={{
          marginBottom: "15px",
          textAlign: "center",
          display: "block",
          margin: "0 auto",
        }}
        className="global-card-title"
      >
        Handle Maintenance
      </label>
      <div className={styles.buttonsDiv}>
        <div className={styles.btnDiv}>
          <button
            onClick={buttonHandler}
            className={styles.maintenanceButton}
            value="create_project"
          >
            Create Project
            <div
              className={`${styles.statusIndicator} ${
                buttonStatus.create_project ? styles.enabled : styles.disabled
              }`}
            ></div>
          </button>
          
        </div>
        <div className={styles.btnDiv}>
          <button
            onClick={buttonHandler}
            value="download_wo"
            className={styles.maintenanceButton}
          >
            Download WO
            <div
              className={`${styles.statusIndicator} ${
                buttonStatus.download_wo ? styles.enabled : styles.disabled
              }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
}
