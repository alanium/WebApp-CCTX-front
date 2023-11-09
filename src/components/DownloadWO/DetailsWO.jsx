import React, { useState, useEffect } from "react";

export function DetailsWO(props) {
  const [details, setDetails] = useState(props.details);
  const [more, setMore] = useState(false);
  const [extra, setExtra] = useState({})
  useEffect(() => {
    setDetails(props.details);
    console.log(details);
  }, [details]);

 async function moreDetails(event) {
    event.preventDefault()
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
        setMore(true);
    }
}
   
    
  

  return (
    <div>
      <div>
        <label>WO ID:</label>
        <label>{details.project_name}</label>
      </div>

      <div>
        <label>Project:</label>
        <label>{details.wo_id}</label>
      </div>

      <div>
        <label>Subcontractor:</label>
        <label>{details.subcontractor_name}</label>
      </div>
      {more ? 
      <div>
        {extra.tasks.map((task) => (
            <div>
                <label>task_name</label>
            </div>
        ))}
      </div> : null}
      <button onClick={moreDetails}>More Details</button>
      <button>Download</button>
    </div>
  );
}
