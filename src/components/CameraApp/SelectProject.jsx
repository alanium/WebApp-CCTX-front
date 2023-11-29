import React, { useEffect, useState } from "react";
import NoMatches from "./NoMatches";

export default function SelectProject (props) {

    useEffect(() => {
        if (props.projects.code === "A3") {
            setIsReady(true)
        }
    })

    const [isReady, setIsReady] = useState(false)
    const [selectId, setSelectId] = useState(null);

    const handleSelect = (event) =>{
        if (event.target.value !== null) {
            setSelectId( event.target.value );
          }
    }
    
    const handleButton = (event) => {
        event.preventDefault();
        props.setProjectId(selectId)
        props.setRadius(true)
    }

    return (
        <div>
            {!isReady ? (
                <form className="global-container" onSubmit={handleButton}>
                    <label style={{fontSize:"24px" ,color: "white", marginBottom:"10px"}} className="form-label">
                    Matches have been found, please select the project you need
                </label>
                <select className="global-input-1"
                    onChange={handleSelect}
                >
                    <option value={null}>Select a Project</option>
                    {props.projects.content.map((project) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                </select>
                <button className="global-button" type="submit" >Select</button>
                </form>            
            ) : (
                <NoMatches setTemp={props.setTemp} setRadius={props.setRadius} />
            )}
        </div>
    )
}