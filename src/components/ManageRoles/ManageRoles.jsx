import React, { useState, useEffect } from "react";
import styles from "./ControlPanel.module.css";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiNoEntry, BiXCircle } from "react-icons/bi";
import { setSuccess } from "../../redux/actions";
import { ImSpinner8 } from "react-icons/im";
import Maintenace from "../Maintenance/Maintenance";

export function ManageRoles(props) {
  const [members, setMembers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [datos, setDatos] = useState({});
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [input, setInput] = useState({
    selected_user: "",
    new_role: "",
  });
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const isAvaliable = true;

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await props.obtenerJSON("control_panel");
        if (result) {
          console.log(result);
          setDatos(result);
          setMembers(result.users);
          setRoles(result["role_list"]);
        } else {
          console.log("No funcionó");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchData();
  }, []);

  const handleMemberChange = (event) => {
    setInput({ ...input, selected_user: event.target.value });
  };

  const handleRoleChange = (event) => {
    setInput({ ...input, new_role: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(false);
    if (
      input["new_role"] !== "Select a role" &&
      input["selected_user"] !== "Select"
    ) {
      props
        .enviarDatos(input, "control_panel")
        .then((datos) => {
          if (datos) {
            if (datos.response == "False") {
              setError(true);
            } else {
              dispatch(setSuccess(true));
              navigate("/home");
            }
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    } else {
      console.log("Please select a user and a role before clicking submit");
      setError(true);
    }
  };

  return (
    <div className="global-container">
      {isAvaliable ? (
        <div>
          {role === "owner" ? (
            <div>
              {isSubmitting ? (
                <div className={styles.spinContainer} style={{ zIndex: 1000 }}>
                  <div className={styles.spinContainer}>
                    <ImSpinner8 className={styles.spin} />
                  </div>
                </div>
              ) : null}
              <div className={styles.titleDiv}>
                <label
                  className="global-card-title"
                  style={{ marginBottom: "20px" }}
                >
                  Manage Roles
                </label>
              </div>
              {roles.length > 0 && members.length > 0 ? ( // Check if datos is not empty
                <form>
                  <label
                    htmlFor="selected_user"
                    className="form-label"
                    style={{ color: "white" }}
                  >
                    Select user:
                  </label>
                  <select
                    name="selected_user"
                    id="selected_user"
                    className="global-input-1"
                    onChange={handleMemberChange}
                    value={input["selected_user"]}
                  >
                    <option>Select a User</option>
                    {members.map((selected_user) => (
                      <option key={selected_user} value={selected_user}>
                        {selected_user}
                      </option>
                    ))}
                  </select>
                  <br />
                  <label
                    htmlFor="new_role"
                    className="form-label"
                    style={{ color: "white" }}
                  >
                    New role:
                  </label>
                  <select
                    name="new_role"
                    id="new_role"
                    className="global-input-1"
                    onChange={handleRoleChange}
                    value={input["new_role"]}
                  >
                    <option value="">Select a role</option>
                    {roles.map((new_role) => (
                      <option key={new_role} value={new_role}>
                        {new_role}
                      </option>
                    ))}
                  </select>
                  <br />
                  <div>
                    <button
                      className="global-button"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                    {error ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        <BiXCircle /> Please select a user and a role before
                        submitting the form
                      </p>
                    ) : null}
                  </div>
                </form>
              ) : (
                <div>
                  <div>
                    <p style={{ color: "white" }}>Loading data...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.titleDiv}>
              <div>
                <label className="global-card-title">
                  You Dont Have Access
                </label>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  marginBottom: "0px",
                }}
              >
                <label
                  className="global-card-title"
                  style={{ fontSize: "70px" }}
                >
                  <BiNoEntry />
                </label>
              </div>
              <div>
                <button className="global-button" onClick={() => navigate("/home")}>Go Back</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Maintenace />
      )}
    </div>
  );
}
