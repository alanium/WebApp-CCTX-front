import React, { useEffect, useState } from "react";

export default function WoPayment(props) {
  const [worders, setWorders] = useState([]);
  const [worder, setWorder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await props.obtenerJSON("create_wo_payment");
      setWorders(response);
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
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
    );
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
      <label style={{color: "white", fontSize: "24px", marginBottom: "15px", alignContent:"center"}}>Create new Payment</label>
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
          <div>
            <label
              className="form-label"
              style={{ fontWeight: "bold", color: "white", fontSize: "14px" }}
            >
              Week:{" "}
            </label>
            <input
              className="global-input-1"
              onChange={changeHandler}
              type="number"
              name="week"
              max="51"
              value={worder.week || ""}
            />
          </div>

          <div>
            <label
              className="form-label"
              style={{ fontWeight: "bold", color: "white", fontSize: "14px" }}
            >
              Date:{" "}
            </label>
            <input
              className="global-input-1"
              onChange={changeHandler}
              type="date"
              name="date"
              value={worder.date || ""}
            />
          </div>

          <div>
            <label
              className="form-label"
              style={{ fontWeight: "bold", color: "white", fontSize: "14px" }}
            >
              Paid:{" "}
            </label>
            <input
              className="global-input-1"
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
