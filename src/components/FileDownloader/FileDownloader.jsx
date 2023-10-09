import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FileDownloader.module.css";
import { BiXCircle } from "react-icons/bi";
import { ImSpinner8 } from "react-icons/im";
import { useSelector } from "react-redux";
import { BiNoEntry } from "react-icons/bi";

export function FileDownloader(props) {
  const [worders, setWorders] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [input, setInput] = useState({
    selected_wo: "Select a Work Order",
  });
  const navigate = useNavigate();
  const [click, setClick] = useState(0);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await props.obtenerJSON("/wo");
        if (result) {
          setWorders(result);
        } else {
          console.log("No funcionó");
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setIsLoading(true);
      }
    }
    fetchData();
  }, []);

  const handleWordersChange = (event) => {
    setInput({ ...input, selected_wo: event.target.value });
  };

  const handleSubmit = async (event, action) => {
    event.preventDefault();
    setIsSubmitting(true);
    setClick(1);
    if (
      input["selected_wo"] === "Select a Work Order" &&
      action === "generate_single"
    ) {
      console.log("Please select a work order before clicking on submit.");
      setIsSubmitting(false);
      return; // Exit the function early
    } else {
      try {
        const response = await fetch("https://alanium.pythonanywhere.com/wo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: action,
            selected_wo: input["selected_wo"],
          }),
        });

        if (response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/pdf")) {
            // Si la respuesta es un PDF, descárgalo
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${worders[input["selected_wo"]]}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setIsSubmitting(false);
            console.log("Llegué 1");
          } else if (contentType.includes("application/zip")) {
            // Si la respuesta es un archivo ZIP, descárgalo
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "all_pdfs.zip";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setIsSubmitting(false);
            console.log("Llegué 2");
          } else {
            console.error("Tipo de archivo no compatible.");
            setIsSubmitting(false);
            console.log("Llegué 3");
          }
        } else {
          const errorResponse = await response.json();
          console.error(
            "Error al enviar la solicitud POST:",
            errorResponse.error
          );
          setIsSubmitting(false);
          console.log("Llegué 4");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };
  return (
    <div className="global-container">
      {role !== "member" ? (
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
              Download Work Orders
            </label>
          </div>
          {isLoading ? (
            <form>
              <label
                htmlFor="selected_wo"
                className="form-label"
                style={{ color: "white" }}
              >
                Select Work Order
              </label>
              <select
                name="selected_wo"
                id="selected_wo"
                className="global-input-1"
                onChange={handleWordersChange}
                value={input["selected_wo"]}
              >
                <option>Select a Work Order</option>
                {Object.keys(worders).map((key) => (
                  <option key={key} value={key}>
                    {worders[key]}
                  </option>
                ))}
              </select>
              {input["selected_wo"] === "Select a Work Order" && click > 0 && (
                <p style={{ color: "red" }}>
                  <BiXCircle /> Please select a work order before clicking on
                  Download Selected.
                </p>
              )}
              <br />
              <div>
                <button
                  className="global-button"
                  type="submit"
                  onClick={(event) => handleSubmit(event, "generate_single")}
                  disabled={isSubmitting}
                  value="Download Selected"
                >
                  Download Selected
                </button>
                <button
                  className="global-button"
                  type="submit"
                  onClick={(event) => handleSubmit(event, "generate")}
                  disabled={isSubmitting}
                  value="Download All"
                >
                  Download All
                </button>
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
      )}
    </div>
  );
}
