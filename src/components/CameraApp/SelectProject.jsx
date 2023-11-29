import React, { useState } from "react";
import NoMatches from "./NoMatches";

export default function SelectProject (props) {

    const [isReady, setIsReady] = useState(false)
    const [select, setSelect] = useState({})

    const handleSelect = (event) =>{
        if (event.target.value !== null) {
            setSelect( event.target.value );
          }
    }
    
    const handleButton = (event) => {
        event.preventDefault();
        props.setProjectId(select.value)
        props.setRadius(true)
    }

    return (
        <div>
            {!isReady ? (
                <form>
                    <label>
                    Matches have been found, please select the project you need
                </label>
                <select
                    onChange={handleSelect}
                >
                    <option value={null}>Select a Project</option>
                    {props.projects.content.map((project) => (
                        <option value={project.id}>{project.name}</option>
                    ))}
                </select>
                <button onClick={handleButton}>Select</button>
                </form>            
            ) : (
                <NoMatches setTemp={props.setTemp} setRadius={props.setRadius} />
            )}
            <label></label>
        </div>
    )
}