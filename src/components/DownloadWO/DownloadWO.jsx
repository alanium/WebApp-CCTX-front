import React, { useState, useEffect } from "react";
import { SelectProject } from "./SelectProject";
import { SelectWO } from "./SelectWO";
import { DetailsWO } from "./DetailsWO";
import styles from "./DownloadWo.module.css"
import { ImSpinner8 } from "react-icons/im";

export function DownloadWo(props) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ready, setReady] = useState(false)

  useEffect(() => {
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
        setReady(true)
      }
    }
    fetchData();
  }, []);

  return (
    <div className="global-container">
        <label style={{marginBottom: "15px", textAlign: "center"}} className="global-card-title">Download WO</label>
      {isLoading ? (
        <div className={styles.spinContainer} style={{ zIndex: 1000 }}>
          <div className={styles.spinContainer}>
            <ImSpinner8 className={styles.spin} />
          </div>
        </div>
      ) : null}
      <div >
        {ready ? (
            <div>
                 
          <SelectProject
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            setData={setData}
            enviarDatos={props.enviarDatos}
            data={data}
          />
            </div>
        ) : null}
       
      </div>
    </div>
  );
}
