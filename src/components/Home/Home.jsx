import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setAccess, setUser } from "../../redux/actions";
import styles from "./Home.module.css";
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

export default function Home(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state);
  const handleOnClick = (event) => {
    const targetButton = event.target.closest("button");

    if (targetButton) {
      console.log(targetButton.name);
      navigate(`/home/${targetButton.name}`);
    }
  };

  const logoutHandler = (event) => {
    window.location.reload();
  };

  return (
    <div className={styles.homeContainer}>
      <div style={{ textAlign: "center" }}>
        <BiSolidUserCircle
          className={styles.icon}
          style={{ color: "white", fontSize: 200 }}
        />
        <div className={styles.titleDiv}>
          <label className="global-card-subtitle">Hello, {user.fullname}</label>
        </div>
      </div>
      <div className={styles.buttonsDiv}>
        <div className={styles.btnDiv}>
          <button
            className={styles.homeButton}
            name="view_wo"
            onClick={handleOnClick}
          >
            <BiSolidFileFind name="view_wo" className={styles.icon} />
          </button>
          <label>View WO</label>
        </div>
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
        <div className={styles.btnDiv}>
          <button className={styles.homeButton}>
            <BiSolidCheckboxChecked className={styles.icon} />
          </button>
          <label>Placeholder</label>
        </div>
        <div className={styles.btnDiv}>
          <button
            name="control_panel"
            className={styles.homeButton}
            onClick={handleOnClick}
          >
            <BiSolidWrench
              name="control_panel"
              className={styles.icon}
              onClick={handleOnClick}
            />
          </button>
          <label>Control Panel</label>
        </div>
        <div className={styles.btnDiv}>
          <button
            className={styles.homeButton}
            name="download_wo"
            onClick={handleOnClick}
          >
            <BiDownload
              className={styles.icon}
              name="download_wo"
              onClick={handleOnClick}
            />
          </button>
          <label>Download WO</label>
        </div>
        <div className={styles.btnDiv}>
          <button onClick={logoutHandler} className={styles.homeButton}>
            <BiLogOut className={styles.icon} />
          </button>
          <label>Logout</label>
        </div>
      </div>
    </div>
  );
}