import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiXCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import Maintenace from "../Maintenance/Maintenance";
import styles from "../Recovery/Recovery.module.css";

export default function Recovery(props) {
  const navigate = useNavigate();
  const [validate, setValidate] = useState({});
  const [click, setClick] = useState(0);
  const isAvaliable = true;
  const [input, setInput] = useState({
    email: "",
    recovery_code: "",
    new_password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props
      .enviarDatos(input, "recover_password")
      .then((datos) => {
        if (datos.response === "True") {
          navigate("/");
        }
        setValidate(datos.response);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
    setClick(1);
  };

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    console.log(input);
  };

  return (
    <div className={styles.loginContainer}>
      {isAvaliable ? (
        <div className={styles.formContainer}>
          <div className="titleDiv">
            <label className="global-card-title">Recover</label>
          </div>
          <div className="titleDiv" style={{ marginBottom: "40px" }}>
            <label className="global-card-subtitle">your password</label>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <input
                style={{
                  marginTop: "10px",
                }}
                className="global-input-1"
                name="email"
                type="text"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                style={{ marginTop: "10px" }}
                className="global-input-1"
                name="recovery_code"
                type="text"
                placeholder="Recovery code"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                style={{ marginTop: "10px" }}
                className="global-input-1"
                name="new_password"
                type="password"
                placeholder="New password"
                onChange={handleChange}
              />
              {validate === "False" && click > 0 ? (
                <p style={{ color: "red" }}>
                  {" "}
                  <BiXCircle /> Invalid credentials
                </p>
              ) : null}
            </div>
            <button
              className="global-button"
              style={{ margonBottom: "20px" }}
              onClick={handleSubmit}
            >
              Send
            </button>
            <button
              className="global-button"
              style={{ marginBottom: "20px" }}
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </form>
        </div>
      ) : (
        <Maintenace />
      )}
    </div>
  );
}
