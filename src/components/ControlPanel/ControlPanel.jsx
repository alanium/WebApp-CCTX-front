import React, { useState } from "react";
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

export function ControlPanel(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state);
  const handleOnClick = (event) => {
    const targetButton = event.target.closest("button");

    if (targetButton) {
      console.log(targetButton.name);
      navigate(`/home/control_panel/${targetButton.name}`);
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
      </div>
  );
}