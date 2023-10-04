import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FileDownloader.module.css";
import { ImSpinner8 } from 'react-icons/im'

export function FileDownloader(props) {
  const [worders, setWorders] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [input, setInput] = useState({
    selected_wo: "Select a Work Order",
  });
  const navigate = useNavigate();

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
    if (input["selected_wo"] === "Select a Work Order" && action === "generate_single") {
      console.log("Please select a work order before clicking on submit.");
      setIsSubmitting(false);
      return; // Exit the function early
    }

         else {
          try {
            const response = await fetch("http://alanium.pythonanywhere.com/wo", {
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
                    console.log("Llegué 1")
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
                    console.log("Llegué 2")
                } else {
                    console.error("Tipo de archivo no compatible.");
                    setIsSubmitting(false);
                    console.log("Llegué 3")
                }
            } else {
                const errorResponse = await response.json();
                console.error("Error al enviar la solicitud POST:", errorResponse.error);
                setIsSubmitting(false);
                console.log("Llegué 4")
            }
        } catch (error) {
            console.error("Error: ", error);
        }
        }
      }
;
  

  return (
    <div className="global-container">
      {isSubmitting ? (
        <div className={styles.spinContainer} style={{zIndex: 1000}}>
              <div className={styles.spinContainer}>
                <ImSpinner8 className={styles.spin} />
            </div>
        </div>) :(null) }
      <div className={styles.titleDiv}>
        <label className="global-card-title" style={{ marginBottom: "20px" }}>
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
  );
}