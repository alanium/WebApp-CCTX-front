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
            setIsReady(true)
            if (result.code === "A5") {
                props.setRadius(false)
            } else if (result.code === "A3") {
                
            }
          }
        )
      }

    return (
        <div>
            {isReady ? (
                <SelectProject setTemp={props.setTemp} projects={searchResponse} setRadius={props.setRadius} setProjectId={props.setProjectId} enviarDatos={props.enviarDatos} />
            ) : (
                <form className="global-container">
                <div style={{alignContent: "center", marginBottom:"10px"}}>
                  <label style={{fontSize:"24px" ,color: "white"}}>No project found, enter the project name below</label>
                </div>
                <input className="global-input-1" onChange={nameHandler} value={name} />
                <button className="global-button" onClick={handleSearch}>Search</button>
          </form>  
            )}
           
        </div>
        
    )
}