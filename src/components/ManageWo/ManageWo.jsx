import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setAccess, setUser } from "../../redux/actions";
import styles from "./ManageWo.module.css";
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

export default function ManageWo(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state);
  const handleOnClick = (event) => {
    const targetButton = event.target.closest("button");

    if (targetButton) {
      console.log(targetButton.name);
      navigate(`/home/manage_wo/${targetButton.name}`);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div style={{ textAlign: "center" }}>
        <BiSolidUserCircle
          className={styles.bigIcon}
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
          name="create_project"
          onClick={handleOnClick} 
          className={styles.homeButton}>
            <BiSolidCheckboxChecked className={styles.icon} />
          </button>
          <label>Create Project</label>
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
      </div>
    </div>
  );
}