import { useState } from "react";

export function WoPreview(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [click, setClick] = useState(0);
  const [input, setInput] = useState({
    selected_wo: "Select a Work Order",
  });
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
            a.download = `.pdf`;
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
    <div>
      <div
        style={{
          margin: "10px",
          justifyContent: "center",
        }}
      >
        <label
          className="form-label"
          style={{ fontSize: "30px", color: "white" }}
        >
          Preview
        </label>
      </div>
      <div
        style={{
          margin: "10px",
        }}
      >
        <label style={{ fontSize: "20px", color: "white" }}>
          Selected Project:{" "}
        </label>
        <div
          style={{
            margin: "5px",
          }}
        >
          <label style={{ color: "white" }}>{props.project.project_name}</label>
        </div>
      </div>
      <div
        style={{
          margin: "10px",
        }}
      >
        <label style={{ color: "white" }}>Subcontractor: </label>
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
          margin: "5px",
        }}
      >
        <label style={{ fontSize: "20px", color: "white" }}>
          Selected Tasks:
        </label>
        <div style={{ maxHeight: "100px", overflowY: "auto" }}>
          {props.task.task_name.map((t, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: "0px"
              }}
              key={index}
            >
              <p style={{ color: "white" }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          className="global-button"
          type="submit"
          onClick={(event) => handleSubmit(event, "generate_single")}
          disabled={isSubmitting}
          value="Download Selected"
        >
          Download
        </button>
      </div>
    </div>
  );
}
