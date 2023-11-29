import React, { useState } from "react";
import NoMatches from "./NoMatches";

export default function SelectProject (props) {

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
                <form onSubmit={handleButton}>
                    <label>
                    Matches have been found, please select the project you need
                </label>
                <select
                    onChange={handleSelect}
                >
                    <option value={null}>Select a Project</option>
                    {props.projects.content.map((project) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                </select>
                <button type="submit" >Select</button>
                </form>            
            ) : (
                <NoMatches setTemp={props.setTemp} setRadius={props.setRadius} />
            )}
            <label></label>
        </div>
    )
}