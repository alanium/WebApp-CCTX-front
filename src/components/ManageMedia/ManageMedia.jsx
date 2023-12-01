import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccess, setSuccess, setUser } from "../../redux/actions";
import styles from "./ManageMedia.module.css";
import {
  BiSolidUserCircle,
  BiLogOut,
  BiUpload,
} from "react-icons/bi";
import "../../index.css";
import Maintenace from "../Maintenance/Maintenance";
import { FaCamera, FaRegImages } from "react-icons/fa";

export default function ManageMedia(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const success = useSelector((state) => state.success);
  const isAvaliable = true
  const handleOnClick = (event) => {
    const targetButton = event.target.closest("button");

    if (targetButton && targetButton.name) {
      console.log(targetButton.name);
      navigate(`/home/manage_media/${targetButton.name}`);
    }
  };


  return (
    <div className={styles.homeContainer}>
      {isAvaliable ? (

      <div className={styles.buttonsDiv}>
        <div className={styles.btnDiv}>
          <button
            name="upload_image"
            onClick={handleOnClick}
            className={styles.homeButton}
          >
            <BiUpload className={styles.icon} />
          </button>
          <label>Upload Image</label>
        </div>
        <div className={styles.btnDiv}>
          <button
            name=""
            className={styles.homeButton}
            onClick={handleOnClick}
          >
            <FaRegImages
              name=""
              className={styles.icon}
              onClick={handleOnClick}
            />
          </button>
          <label>Gallery</label>
        </div>
        <div className={styles.btnDiv}>
          <button name="camera" className={styles.homeButton} onClick={handleOnClick}>
            <FaCamera 
              className={styles.icon}
              name="camera"
              onClick={handleOnClick}
            />
          </button>
          <label>Camera</label>
        </div>
      </div>
      ) : <Maintenace />}
    </div>
  );
}
