import React, { useEffect } from "react";
import { BiXCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styles from "./SelectSub.module.css"

export function SelectSub(props) {
  const navigate = useNavigate()
  const validSelection = () => {
    if (props.master.selected_master.length === 0 && props.process.selected_process.length === 0) {
      return false; // Both arrays are empty.
    } else {
      return true; // At least one of the arrays is not empty.
    }
  
    // If no property is null in both master and process, it's valid.

    }
  
    useEffect(() => {
      console.log (props.master, props.process)
    }, [])
  
  return (
    <div>
      {validSelection() ? (
        <form>
        <label className="form-label" style={{ color: "white" }}>
          Select Subcontractor
        </label>
        <select
          name="contractors"
          id="contractors"
          className="global-input-1"
          onChange={props.subChangeHandler}
        >
          <option>Select a subcontractor</option>
          {props.worders.map((contractor) => (
            <option
              key={contractor.id}
              id={contractor.id}
              name={contractor.name}
              data={JSON.stringify(contractor)}
            >
              {contractor.name}
            </option>
          ))}
        </select>
        <br />
        {props.sub.sub_name !== null &&
        props.sub.sub_id !== null &&
        props.sub.selected_sub !== null ? (
          <button
            className="global-button"
            type="submit"
            onClick={props.handleSubmit}
          >
            Submit
          </button>
        ) : (
          <p style={{ color: "red" }}>
            <BiXCircle /> Select a subcontractor before submitting
          </p>
        )}
      </form>
      ) : (
        <div className={styles.popupContainer}>
        <div className="global-container">
        <label className="form-label" style={{color: "white"}}>
          You have to select at least one master item or one process to continue
        </label>
        <button className="global-button" onClick={() => navigate("/home")}>Back to home</button>
        </div>
      </div>
      )}
    </div>
  );
}
