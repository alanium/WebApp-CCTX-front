import React, {useEffect, useState} from "react";
import SelectProject from "./SelectProject";

export default function Search (props) {
    
    const [isReady, setIsReady] = useState(false)
    const [name, setName] = useState("");
    const [searchResponse, setSearchResponse] = useState({})

    const nameHandler = (event) => {
        setName(event.target.value);
      };

    const handleSearch = (event) => {
        event.preventDefault()
        props.enviarDatos({action: "search", entry: name}, "camera")
        .then(
          (result) => {
            setSearchResponse(result)
            setIsReady(false)
            if (result.code === "A5") {
                props.setRadius(false)
            }
          }
        )
      }

    return (
        <div>
            {isReady ? (
                <SelectProject setRadius={props.setRadius} setProjectId={props.setProjectId} enviarDatos={props.enviarDatos} />
            ) : (
                <form>
                <div>
                  <label className="global-card-title">No project found, enter the project name below</label>
                </div>
                <input className="global-input-1" onChange={nameHandler} value={name} />
                <button className="global-button" onClick={handleSearch}>Search</button>
          </form>  
            )}
           
        </div>
        
    )
}