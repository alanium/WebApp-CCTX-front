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
import Maintenace from "../Maintenance/Maintenance";
import { MdOutlinePayments } from "react-icons/md";

export default function ManageWo(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state);
  const isAvaliable = true;
  const handleOnClick = (event) => {
    const targetButton = event.target.closest("button");

    if (targetButton) {
      console.log(targetButton.name);
      navigate(`/home/manage_wo/${targetButton.name}`);
    }
  };

  return (
    <div className={styles.homeContainer}>
      {isAvaliable ? (
          <div className={styles.buttonsDiv}>
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
              <button
                className={styles.homeButton}
                name="wo_payment"
                onClick={handleOnClick}
              >
                <MdOutlinePayments
                  className={styles.icon}
                  name="wo_payment"
                  onClick={handleOnClick}
                />
              </button>
              <label>Create Payment</label>
            </div>
          </div>
      ) : (
        <Maintenace />
      )}
    </div>
  );
}
