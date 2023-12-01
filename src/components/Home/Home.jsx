import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccess, setSuccess, setUser } from "../../redux/actions";
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
import Maintenace from "../Maintenance/Maintenance";
import { FaCamera } from "react-icons/fa";
import { MdOutlinePermMedia } from "react-icons/md";

export default function Home(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const success = useSelector((state) => state.success);
  const isAvaliable = true
  const handleOnClick = (event) => {
    const targetButton = event.target.closest("button");

    if (targetButton && targetButton.name) {
      console.log(targetButton.name);
      navigate(`/home/${targetButton.name}`);
    }
  };

  const logoutHandler = (event) => {
    window.location.reload();
  };

  return (
    <div className={styles.homeContainer}>
      {isAvaliable ? (
        <div>
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
            name="manage_wo"
            onClick={handleOnClick}
          >
            <BiSolidFileFind name="view_wo" className={styles.icon} />
          </button>
          <label>Manage WO</label>
        </div>
        <div className={styles.btnDiv}>
          <button
            name="manage_projects"
            onClick={handleOnClick}
            className={styles.homeButton}
          >
            <BiSolidCheckboxChecked className={styles.icon} />
          </button>
          <label>Manage Projects</label>
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
          <button name="manage_media" className={styles.homeButton} onClick={handleOnClick}>
            <MdOutlinePermMedia 
              className={styles.icon}
              name=""
              onClick={handleOnClick}
              style = {{fontSize: "24px"}}
            />
          </button>
          <label>Manage Media</label>
        </div>
        <div className={styles.btnDiv}>
          <button onClick={() => props.setLogout(true)} className={styles.homeButton}>
            <BiLogOut className={styles.icon} />
          </button>
          <label>Logout</label>
        </div>
      </div>
      {success ? (
        <div className={styles.popupContainer}>
          <div style={{maxWidth: "70%"}} className="global-container">
            <label className="form-label" style={{ color: "white" }}>
              Operation Successful
            </label>
            <button
              className="global-button"
              onClick={() => dispatch(setSuccess(false))}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
        </div>
      ) : <Maintenace />}
    </div>
  );
}
