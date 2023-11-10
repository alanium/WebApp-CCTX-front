import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSuccess } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import styles from "./DownloadWo.module.css"

export function DetailsWO(props) {
 
  const [more, setMore] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [extra, setExtra] = useState({})
  const fullname = useSelector((state) => state.user.fullname);
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  


  useEffect(() => {
    console.log(props.details.subcontractor_name)
  }, []);

 async function moreDetails(event) {
    event.preventDefault()
    props.setIsLoading(true)
    try {
        const result = await  props.enviarDatos(
            { id: props.worder, action: "get_more_details" },
            "/download_wo"
          );
        if (result) {
            setExtra(result);
            console.log(extra)
        } else {
            console.log("No funcionó")
        }
    } catch (error) {
        console.error("Error, ", error)
    } finally {
      props.setIsLoading(false)
        setMore(true);
    }
}
   
    
const handleSubmit = async (event, action) => {
  event.preventDefault();
  props.setIsLoading(true)
  if (
    !props.details.wo_id
  ) {
    props.setIsLoading(false)
    return; // Exit the function early
  } else {
    try {
      const response = await fetch("http://3.145.79.50:5000/download_wo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "download",
          wo_id: props.details.id,
          user_data: {fullname: fullname, email: email}
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
          a.download = `work_order_${props.details.wo_id}.pdf`;
          console.log(props.worder.id_title)
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          props.setIsLoading(false)
          dispatch(setSuccess(true))
          navigate("/home")
          console.log("Llegué 1");
        
        } else {
          console.error("Tipo de archivo no compatible.");
          props.setIsLoading(false)
     
        }
      } else {
        const errorResponse = await response.json();
        console.error(
          "Error al enviar la solicitud POST:",
          errorResponse.error
        );
        props.setIsLoading(false)
      
      }
    } catch (error) {
      console.error("Error: ", error);
      props.setIsLoading(false)
    }
  }
};

  return (
    <div>
      <div style={{marginBottom: "12px"}}>
        <label style={{width:"120px", color: "white"}}>WO ID:</label>
        <label className={styles.bgLabel }>{props.details.project_name}</label>
      </div>

      <div style={{marginBottom: "10px"}}>
        <label style={{width:"120px",  color: "white"}}>Project:</label>
        <label className={styles.bgLabel }>{props.details.wo_id}</label>
      </div>

      <div style={{marginBottom: "10px"}}>
        <label style={{width:"120px", color: "white"}}>Subcontractor:</label>
        <label className={styles.bgLabel }>{props.details.subcontractor_name}</label>
      </div>
      {more ? 
      <div style={{marginTop: "15px"}} className={styles.tasksCointainer}>
        {extra.tasks.map((task) => (
            <div >
                <label style={{marginTop: "15px", marginLeft:"10px", color: "white", fontWeight: "bold"}}>{task.task_name}</label>
                <div style={{marginBottom: "15px"}}>
                    {task.master_items.map((master_item) => (
                        <div>
                            <label style={{marginLeft:"20px", color: "white"}}>{master_item.name}</label>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div> : null}
      <button className="global-button" onClick={moreDetails}>More Details</button>
      <button className="global-button" onClick={handleSubmit}>Download</button>
    </div>
  );
}
