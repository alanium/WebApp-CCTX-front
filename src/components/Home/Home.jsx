import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setAccess, setUser } from '../../redux/actions';
import styles from "./Home.module.css";
import {
  BiSolidUserCircle,
  BiSolidFileFind,
  BiSolidCheckboxChecked,
  BiSolidWrench,
  BiSolidStar,
  BiLogOut,
  BiDownload
} from "react-icons/bi";
import "../../index.css";

export default function Home(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state)
  const handleOnClick = (event) => {
    console.log(event.target.name);
    navigate(`/home/${event.target.name}`);
  };
  const logoutHandler = (event) => {
    window.location.reload()
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
        <button
          className={styles.homeButton}
          name="view_wo"
          onClick={handleOnClick}
        >
          <BiSolidFileFind
            name="view_wo"
            className={styles.icon}
          />
        </button>
        <button className={styles.homeButton}>
          <BiSolidStar
            className={styles.icon}
            />
        </button>
        <button className={styles.homeButton}>
          <BiSolidCheckboxChecked
            className={styles.icon}
            />
        </button>
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
        <button onClick={logoutHandler} className={styles.homeButton}>
        <BiLogOut className={styles.icon} />
        

        </button>
      </div>
    </div>
  );
}
