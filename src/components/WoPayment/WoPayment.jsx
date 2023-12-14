import React, { useEffect, useState } from "react";
import styles from "./WoPayment.module.css"

export default function WoPayment(props) {
  const [worders, setWorders] = useState([]);
  const [worder, setWorder] = useState(null);
  const [popup, setPopup] = useState(false)
  const [completePopup, setCompletePopup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await props.obtenerJSON("create_wo_payment");
      setWorders(response);
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Check if all required fields are filled out
    if (!worder || !worder.week || !worder.date || !worder.paid) {
      // Display an error message or take appropriate action
      setPopup(true)
      return;
    }
  
    let aux = parseFloat(worder.paid);
    let num = new Number(worder.week);
  
    // Pass the updated values directly to props.enviarDatos
    props.enviarDatos(
      {
        selected_wo: {
          ...worder,
          check_number: "test",
          paid: aux,
          week: num,
        },
        action: "set_wo",
      },
      "create_wo_payment"
    ).then((response) => {
      if (response.code === "A5") {
        setCompletePopup(true)
      }
    });
  };

  const handleSelectChange = (event) => {
    const selectedWorder = JSON.parse(event.target.value);
    setWorder(selectedWorder);
  };

  const changeHandler = (event) => {
    setWorder({
      ...worder,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className="global-container">
      {isLoading ? (
        <div className={styles.popupContainer}>
        <div style={{maxWidth: "70%"}}>
        <label style={{ color: "white", fontSize: "24px", marginBottom: "15px", textAlign: "center", }}> Loading</label>
        </div>
      </div>
      ) : null}
      {popup ? (
        <div className={styles.popupContainer}>
          <div style={{maxWidth: "70%"}}>
          <label style={{ color: "white", fontSize: "24px", marginBottom: "15px", textAlign: "center", }}> Please fill out the empty spaces before submitting</label>
         <button className="global-button" onClick={() => setPopup(false)}>Ok</button> 
          </div>
         
        </div>
      ) : 
        null
      }
      {
        completePopup ? (
          <div className={styles.popupContainer}>
          <div style={{maxWidth: "70%"}}>
          <label style={{ color: "white", fontSize: "24px", marginBottom: "15px", textAlign: "center", }}> Do you wish to create another payment or go back?</label>
          <button className="global-button" onClick={() => setCompletePopup(false)}>Create Another Payment</button> 
         <button className="global-button" onClick={() => navigate("/home")}>Go Back</button> 
          </div>
         
        </div>
        ) : null
      }
      <label style={{ color: "white", fontSize: "24px", marginBottom: "15px", textAlign: "center", }}>Create new Payment</label>
      <select className="global-input-1" onChange={handleSelectChange}>
        <option value={null}>Select a work order</option>
        {worders.map((worder) => (
          <option key={worder.wo_id} value={JSON.stringify(worder)}>
            {worder.wo_id}
          </option>
        ))}
      </select>
      {worder !== null ? (
        <div>
          <div style={{marginBottom: "15px"}}>
            <label
              className="form-label"
              style={{ width:"120px", fontWeight: "bold", color: "white", fontSize: "14px" , marginBottom:"15px"}}
            >
              Week:
            </label>
            <input
              className={styles.bgLabel}
              style={{width: "70%"}}
              onChange={changeHandler}
              type="number"
              name="week"
              max="51"
              value={worder.week || ""}
            />
          </div>

          <div style={{marginBottom: "15px"}}>
            <label
              className="form-label"
              style={{ width:"120px", fontWeight: "bold", color: "white", fontSize: "14px", marginBottom:"15px" }}
            >
              Date:
            </label>
            <input
            style={{width: "70%"}}
            className={styles.bgLabel}
              onChange={changeHandler}
              type="date"
              name="date"
              value={worder.date || ""}
            />
          </div>

          <div style={{marginBottom: "15px"}}>
            <label
              className="form-label"
              style={{ width:"120px", fontWeight: "bold", color: "white", fontSize: "14px", marginBottom:"15px" }}
            >
              Paid:
            </label>
            <input
            style={{width: "70%"}}
            className={styles.bgLabel}
              onChange={changeHandler}
              type="number"
              name="paid"
              value={worder.paid || ""}
            />
          </div>
          <button className="global-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : null}
    </form>
  );
}
