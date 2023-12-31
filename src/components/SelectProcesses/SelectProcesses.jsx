import React from "react";
import { BiXCircle } from "react-icons/bi";
import styles from "./Processes.module.css";
import Maintenace from "../Maintenance/Maintenance";

export function SelectProcesses(props) {
  const isAvaliable = true


  return (
    <div>
      {isAvaliable ? (
        <div>
          <form>
            <label className="form-label" style={{ color: "white" }}>
              Select Processes
            </label>
            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              <div>
                {props.worders.map((process) => (
                  <div
                    key={process.id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <input
                      type="checkbox"
                      id={process.id}
                      name={process.name}
                      data={JSON.stringify(process)}
                      onChange={props.processChangeHandler}
                    />
                    <label
                      style={{
                        color: "white",
                        textAlign: "justify",
                        textJustify: "inter-word",
                        flex: "1",
                      }}
                    >
                      {process.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="global-button"
              onClick={props.handleSubmit}
            >
              Select Processes
            </button>
          </form>
        </div>
      ) : (
        <Maintenace />
      )}
    </div>
  );
}
