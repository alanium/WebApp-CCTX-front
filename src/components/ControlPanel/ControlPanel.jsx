import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setAccess, setUser } from "../../redux/actions";
import styles from "./ControlPanel.module.css";
import {
  BiSolidUserCircle,
  BiSolidFileFind,
  BiSolidCheckboxChecked,
  BiSolidWrench,
  BiSolidStar,
  BiLogOut,
  BiDownload,
} from "react-icons/bi";
import "../../index.css";
import Maintenace from "../Maintenance/Maintenance";

export function ControlPanel(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state);
  const underMaintenance = useSelector((state) => state.underMaintenance);
  const [isAvaliable, setIsAvaliable] = useState(true);

  useEffect(() => {
    if (underMaintenance.includes("control_panel")) {
      setIsAvaliable(false)
    }
  }, [])

  const handleOnClick = (event) => {
    const targetButton = event.target.closest("button");

    if (targetButton) {
      console.log(targetButton.name);
      navigate(`/home/control_panel/${targetButton.name}`);
    }
  };

  return (
    <div className={styles.homeContainer}>
      {isAvaliable ? (
        <div>
          <div style={{ textAlign: "center" }}>
            <BiSolidUserCircle className={styles.bigIcon} />
            <div className={styles.titleDiv}>
              <label className="global-card-subtitle">
                Hello, {user.fullname}
              </label>
            </div>
          </div>
          <div className={styles.btnDiv}>
            <button
              name="manage_roles"
              className={styles.homeButton}
              onClick={handleOnClick}
            >
              <BiSolidWrench
                name="manage_roles"
                className={styles.icon}
                onClick={handleOnClick}
              />
            </button>
            <label>Manage Roles</label>
          </div>
          <div className={styles.btnDiv}>
            <button
              name="handle_maintenance"
              className={styles.homeButton}
              onClick={handleOnClick}
            >
              <BiSolidWrench
                name="handle_maintenance"
                className={styles.icon}
                onClick={handleOnClick}
              />
            </button>
            <label>Handle Maintenance</label>
          </div>
        </div>
      ) : <Maintenace />}
    </div>
  );
}
