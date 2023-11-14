import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setAccess, setUser } from "../../redux/actions";
import styles from "./ManageTasks.module.css";
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

export function ManageTasks(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state);
  const isAvaliable = true;
  const handleOnClick = (event) => {
    const targetButton = event.target.closest("button");
    if (targetButton) {
      console.log(targetButton.name);
      navigate(`/home/manage_tasks/${targetButton.name}`);
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
          <div className={styles.buttonsDiv}>
            <div className={styles.btnDiv}>
              <button
                name="assign_task"
                className={styles.homeButton}
                onClick={handleOnClick}
              >
                <BiSolidStar className={styles.icon} />
              </button>
              <label>Assign Task</label>
            </div>
          </div>
        </div>
      ) : (
        <Maintenace />
      )}
    </div>
  );
}
