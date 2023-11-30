import React, { useState, useEffect } from "react";
import { SelectProject } from "./SelectProject";
import { SelectWO } from "./SelectWO";
import { DetailsWO } from "./DetailsWO";
import styles from "./DownloadWo.module.css";
import { ImSpinner8 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setBar } from "../../redux/actions";
import Maintenace from "../Maintenance/Maintenance";

export function DownloadWo(props) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const [isAvaliable, setIsAvaliable] = useState(true);
  const underMaintenance = useSelector((state) => state.underMaintenance);
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    if (underMaintenance.includes("download_wo")) {
      setIsAvaliable(false);
    }

    dispatch(setBar(true));
    async function fetchData() {
      try {
        const result = await props.obtenerJSON("/download_wo");
        if (result) {
          setData(result);
          console.log(data);
        } else {
          console.log("No funcionó");
        }
      } catch (error) {
        console.error("Error, ", error);
      } finally {
        setIsLoading(false);
        dispatch(setBar(false));
        setReady(true);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="global-container">
      {isAvaliable ? (
        <div>
          {popup ? (
            <div className={styles.popupContainer}>
              <div style={{maxWidth: "70%"}}>
                <label style={{ color: "white", fontSize: "24px", marginBottom: "15px", textAlign: "center", }}>Please select a project to before submitting</label>
                <button className="global-button" onClick={() => setPopup(false)}>Ok</button>
              </div>
            </div>
          ) : null}
          <label
            style={{ marginBottom: "15px", textAlign: "center", display: "block",
            margin: "0 auto", }}
            className="global-card-title"
          >
            Download WO
          </label>
          {isLoading ? (
            <div className={styles.spinContainer} style={{ zIndex: 1000 }}>
              <div className={styles.spinContainer}>
                <ImSpinner8 className={styles.spin} />
              </div>
            </div>
          ) : null}
          <div>
            {ready ? (
              <div>
                <SelectProject
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  setData={setData}
                  enviarDatos={props.enviarDatos}
                  data={data}
                  setPopup={setPopup}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <Maintenace />
      )}
    </div>
  );
}
