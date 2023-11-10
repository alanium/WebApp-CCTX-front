import React, { useState, useEffect } from "react";
import { DetailsWO } from "./DetailsWO";

export function SelectWO(props) {
  const [worders, setWorders] = useState(props.worders);

  const [details, setDetails] = useState({})

  const [worder, setWorder] = useState(null);

  const [titles, setTitles] = useState([]);

  const [isWoReady, setIsWoReady] = useState(false);

  useEffect(() => {}, []);

  const changeHandler = (event) => {
    if (event.target.value !== null) {
      setWorder(event.target.value);
    }
    
  };

  async function handleSubmit(event) {
    event.preventDefault();
    props.setIsLoading(true)
    if (worder !== null) {
      try {
        const result = await props.enviarDatos(
          { id: worder, action: "get_wo_details" },
          "/download_wo"
        );
        if (result) {
          setDetails(result);
          console.log(details);
        } else {
          console.log("No funcionó");
        }
      } catch (error) {
        console.error("Error, ", error);
      } finally {
        props.setIsLoading(false)
        setIsWoReady(true);
      }
    }
    
  }

  return (
    <div>
      <div>
      {isWoReady ? (
        <DetailsWO 
        setIsLoading={props.setIsLoading}
        enviarDatos={props.enviarDatos} 
        worder={worder} 
        details={details}/>
      ) : (
        <div>
          <form>
            <select className="global-input-1" onChange={changeHandler}>
              <option value={null}>Select a Work Order</option>
              {worders &&
                worders.map((worder) => (
                  <option key={worder.id} value={worder.id}>
                    {worder.id_title}
                  </option>
                ))}
            </select>
          </form>

          <button className="global-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
    </div>
    
  );
}
