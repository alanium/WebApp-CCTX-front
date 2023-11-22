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
    props.enviarDatos({ worder });
  };

  const handleSelectChange = (event) => {
    const selectedWorder = worders.find((w) => w.wo_id === event.target.value);
    setWorder(selectedWorder || {});
  };

  const changeHandler = (event) => {
    setWorder({
      ...worder,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className="global-container">
      <label className="gloabl-card-title">Create new Payment</label>
      <select className="global-input-1" onChange={handleSelectChange}>
        <option value={null}>Select a work order</option>
        {worders.map((worder) => (
          <option value={worder}>{worder.wo_id}</option>
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
              onChange={weekHandler}
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
              type="text"
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
