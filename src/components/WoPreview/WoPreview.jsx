import { useState } from "react";

export function WoPreview(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [click, setClick] = useState(0);
  const [input, setInput] = useState({
    
  });
  const handleSubmit = async (event, action) => {
    event.preventDefault();
    const nombre = await props.enviarDatos({
      action: "get_wo_id"
    }, "generate_wo");
    console.log(nombre);
    setIsSubmitting(true);
    setClick(1);
    try {
      const response = await fetch("https://alanium.pythonanywhere.com/generate_wo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "download",
          user: props.user,
          selected_project: props.selected_project,
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
          {props.master.master_name.map((t, index) => (
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
