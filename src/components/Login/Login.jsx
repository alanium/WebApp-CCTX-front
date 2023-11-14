import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuccess } from "../../redux/actions";
import { setAccess, setUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import { FaUser, FaKey } from "react-icons/fa6";
import { BiXCircle } from "react-icons/bi";
import "../../index.css";
import Maintenace from "../Maintenance/Maintenance";

function Login(props) {
  const access = useSelector((state) => state.access);
  const success = useSelector((state) => state.succes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAvaliable = true
  const [clickCount, setClick] = useState(0);

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const [data, setData] = useState({});

  const handleChangeUsername = (event) => {
    setInput({
      ...input,
      username: event.target.value.toLowerCase(),
    });
  };

  const handleChangePassword = (event) => {
    setInput({
      ...input,
      password: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const datos = await props.enviarDatos(input, "login");

      if (datos.response === "True") {
        console.log(datos);
        dispatch(setAccess(true));
        dispatch(setUser(datos));
        navigate("/home");
      } else {
        setAccess(false);
        setClick(clickCount + 1);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="global-container">
      {isAvaliable ? (
        <div>
          <div className={styles.titleDiv}>
            <label className="global-card-title">Sign In</label>
          </div>

          <form onSubmit={handleLogin}>
            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <input
                className="global-input-1"
                name="username"
                onChange={handleChangeUsername}
                type="text"
                placeholder="Username"
                style={{ marginTop: "10px" }}
              ></input>
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
                name="password"
                onChange={handleChangePassword}
                type="password"
                placeholder="Password"
                style={{ marginTop: "10px" }}
              ></input>
              <FaKey className="icon" />
            </div>
            {access === false && clickCount > 0 ? (
              <p style={{ color: "red" }}>
                {" "}
                <BiXCircle /> Invalid credentials
              </p>
            ) : null}
            <button
              className="global-button"
              onClick={handleLogin}
              type="submit"
            >
              Login
            </button>

            <div style={{ textAlign: "center" }}>
              <div className={styles.buttonsDiv}>
                <button
                  style={{
                    width: "calc(50% - 10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.300)",
                    color: "white",
                    height: "45px",
                  }}
                  onClick={() => navigate("/register")}
                  className="global-button"
                >
                  Register
                </button>

                <button
                  onClick={() => navigate("/recovery")}
                  className="global-button"
                  style={{
                    width: "calc(50% - 10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.300)",
                    color: "white",
                    height: "45px",
                  }}
                >
                  Recover
                </button>
              </div>
            </div>
          </form>
          {success ? (
            <div className={styles.popupContainer}>
              <div className="global-container">
                <label className="form-label" style={{ color: "white" }}>
                  Operation Successful
                </label>
                <button
                  className="global-button"
                  onClick={() => dispatch(setSuccess(false))}
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <Maintenace />
      )}
    </div>
  );
}

export default Login;
