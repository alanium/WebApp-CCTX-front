import React, { useState } from "react";
import { FaUser, FaKey, FaUserTag } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BiXCircle } from "react-icons/bi";
import styles from "./Register.module.css";
import "../../index.css";
import Maintenace from "../Maintenance/Maintenance";

export default function Register(props) {
  const navigate = useNavigate();
  const [validate, setValidate] = useState({});
  const [click, setClick] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isAvaliable = true;

  const [input, setInput] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    props
      .enviarDatos(input, "register")
      .then((datos) => {
        if (datos.response === "True") {
          navigate("/");
        }
        setValidate(datos.response);
      })
      .catch((error) => {
        console.error("Error: ", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    setClick(1);
    console.log(validate);
    console.log(click);
  };

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    console.log(input);
  };

  return (
    <div className="global-container">
      {isAvaliable ? (
        <div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <label className="global-card-title">Register</label>
          </div>

          <form>
            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <input
                className="global-input-1"
                name="fullname"
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                style={{
                  paddingLeft: "30px",
                  marginTop: "10px",
                }}
              />
              <FaUser className="icon" />
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <input
                className="global-input-1"
                name="username"
                onChange={handleChange}
                type="text"
                placeholder="Username"
                style={{
                  paddingLeft: "30px",
                  marginTop: "10px",
                }}
              />
              <FaUserTag
                className="icon"
                style={{ fontSize: "18px", bottom: "30%", right: "5px" }}
              />
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <input
                className="global-input-1"
                name="email"
                onChange={handleChange}
                type="text"
                placeholder="Email"
                style={{
                  paddingLeft: "30px",
                  marginTop: "10px",
                }}
              />
              <MdEmail className="icon" />
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <input
                className="global-input-1"
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Password"
                style={{
                  paddingLeft: "30px",
                  marginTop: "10px",
                }}
              />
              <FaKey className="icon" />
              {validate === "False" && click > 0 ? (
                <p style={{ color: "red" }}>
                  {" "}
                  <BiXCircle /> Username or email alredy in use
                </p>
              ) : null}
            </div>
            <button
              className="global-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Submit
            </button>
            <button
              className="global-button"
              disabled={isSubmitting}
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
