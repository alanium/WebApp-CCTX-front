import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setAccess, setUser } from "../../redux/actions";
import styles from "./ManageProjects.module.css";
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

export function ManageProjects(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state);
  const handleOnClick = (event) => {
    const targetButton = event.target.closest("button");

    if (targetButton) {
      console.log(targetButton.name);
      navigate(`/home/manage_projects/${targetButton.name}`);
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
            name="view_projects"
            onClick={handleOnClick}
          >
            <BiSolidFileFind name="view_wo" className={styles.icon} />
          </button>
          <label>View Projects</label>
        </div>
        </div>
      </div>
  );
}