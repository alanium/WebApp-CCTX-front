
import React, { useState } from "react";
import styles from "./WoPreview.module.css";
import { ImSpinner8 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSuccess } from "../../redux/actions";

export function WoPreview(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [click, setClick] = useState(0);
  const [input, setInput] = useState({});
  const success = useSelector((state) => state.success);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event, action) => {
    event.preventDefault();
    const nombre = await props.enviarDatos(
      {
        action: "get_wo_id",
      },
      "create_project"
    );
    console.log(nombre);
    setIsSubmitting(true);
    setClick(1);
    try {
      const response = await fetch("http://3.144.138.238:5000/create_project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "download",
          user: props.user,
          selected_customer: props.selected_customer,
          selected_master: props.selected_master,
          selected_sub: props.selected_sub,
          selected_processes: props.selected_processes,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const contentType = response.headers.get("content-type");

        // Check the content type and create objects accordingly
        if (contentType && contentType.includes("application/pdf")) {
          // If the response is a PDF, create a download link for the blob
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${nombre}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          setIsSubmitting(false);
          dispatch(setSuccess(true));
          navigate("/home");
        } else {
          console.error("Tipo de archivo no compatible.");
          setIsSubmitting(false);
        }
      } else {
        const errorResponse = await response.text();
        console.error("Error al enviar la solicitud POST:", errorResponse);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div
        style={{
          margin: "5px",
          justifyContent: "center",
        }}
      >
        <label
          className="form-label"
          style={{ fontSize: "30px", color: "white", marginTop: "0px" }}
        >
          Preview
        </label>
      </div>
      {isSubmitting ? (
        <div className={styles.spinContainer} style={{ zIndex: 1000 }}>
          <div className={styles.spinContainer}>
            <ImSpinner8 className={styles.spin} />
          </div>
        </div>
      ) : null}
      <div
        style={{
          marginTop: "25px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            margin: "12px",
          }}
        >
          <label style={{ fontSize: "18px", color: "white" }}>CUSTOMER:</label>
          <div
            style={{
              margin: "5px",
            }}
          >
            <label style={{ color: "white" }}>
              {props.customer.customer_name}
            </label>
          </div>
        </div>
        <div
          style={{
            margin: "12px",
          }}
        >
          <label style={{ fontSize: "18px", color: "white" }}>
            SUBCONTRACTOR:
          </label>
          <div
            style={{
              margin: "5px",
            }}
          >
            <label style={{ color: "white" }}>{props.sub.sub_name}</label>
          </div>
        </div>
        <div
          style={{
            margin: "12px",
          }}
        >
          <label style={{ fontSize: "18px", color: "white" }}>CATEGORY:</label>
          <div
            style={{
              margin: "5px",
            }}
          >
            {Array.from(new Set(props.category.category_name)).map(
              (element) => (
                <div>
                  <label style={{color: "white"}}>{element}</label>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          margin: "12px",
        }}
      >
        <label style={{ fontSize: "18px", color: "white" }}>
          SELECTED TASKS:
        </label>
        <div
          className={styles.selectedTasks}
          style={{
            marginTop: "10px",
            justifyContent: "center",
            maxHeight: "100px",
            overflowY: "auto",
          }}
        >
          <p style={{ marginLeft: "5px", color: "white" }}>MASTER ITEMS</p>
          {props.master.selected_master.map((t, index) => (
            <p style={{ marginLeft: "10px", color: "white" }}>•{t.description}</p>
          ))}
          <p style={{ marginLeft: "5px", color: "white" }}>PROCESSES</p>
          {props.process.process_name.map((n) => (
            <p style={{ marginLeft: "10px", color: "white" }}>•{n}</p>
          ))}
        </div>
      </div>
      <div>
        <button
          className="global-button"
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          value="Download Selected"
        >
          Download
        </button>
      </div>
    </div>
  );
}
