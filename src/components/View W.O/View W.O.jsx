import React, { useState, useEffect } from "react";
import WorkOrder from "../WorkOrder/WorkOrder";
import styles from "./ViewWO.module.css";
import { ImSpinner8 } from "react-icons/im";
import { useSelector } from "react-redux";
import { BiNoEntry } from "react-icons/bi";

export default function ViewWorkOrder(props) {
  const [input, setInput] = useState({
    wo_id: null,
    action: "get_wo"
  })
  const [data, setData] = useState([]);
  const [worders, setWorders] = useState({
    wo_id: null,
    action: "get_wo",
  });
  const [loading, setLoading] = useState(true);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    // Fetch data when the component mounts
    props
      .obtenerJSON("view_wo")
      .then((responseData) => {
        // Update the local state with the fetched data
        console.log(responseData);
        setData(responseData);
        console.log(worders);
        setLoading(false);
        // Establecer el estado de carga en false cuando se complete la carga
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false); // En caso de error, también establecer el estado de carga en false
      });
  }, []);

  const wordersHandler = (event) => {

    setInput(
      {
        wo_id:
          event.target.options[event.target.selectedIndex].getAttribute("id"),
        action: "get_wo",
      }
    )
    console.log(input);

  };

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true);
      props.enviarDatos(input, "view_wo")
      .then((result) => {
        setWorders(result);
        console.log(worders)
        setLoading(false); // Set loading to false after the request is complete
      })
      .catch((error) => {
        console.error("Error fetching work order:", error);
        setLoading(false); // Handle errors and set loading to false
      })
  }

  return (
    <div className="global-container" style={{ color: "white" }}>
      {role !== "member" ? (
        <div>
         {loading ? (
        <div className={styles.spinContainer} style={{ zIndex: 1000 }}>
          <div className={styles.spinContainer}>
            <ImSpinner8 className={styles.spin} />
          </div>
        </div>
      ) : null}
            <div>
              <form>
                <div>
                  <select
                    name="workOrders"
                    id="workOrders"
                    className="global-input-1"
                    onChange={wordersHandler}
                    style={{ color: "white" }}
                  >
                    <option>Select a Work Order</option>
                    {data.map((workOder) => (
                      <option key={workOder} id={workOder} name={workOder}>
                        {workOder}
                      </option>
                    ))}
                  </select>
                  <button className="global-button" type="submit" onClick={handleSubmit}>View Selected</button>
                </div>
                {worders.wo_id !== null ? <WorkOrder worder={worders} /> : null}
              </form>
            </div>

        </div>
      ) : (
        <div className="global-container">
          <div className={styles.titleDiv}>
            <div>
              <label className="global-card-title">You Dont Have Access</label>
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "0px",
              }}
            >
              <label className="global-card-title" style={{ fontSize: "70px" }}>
                <BiNoEntry />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
