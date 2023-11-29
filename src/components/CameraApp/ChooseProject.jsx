import { useState } from "react";
import React from "react";

export default function ChooseProject (props) {

    const [selectId, setSelectId] = useState("")

    const selectHandler = (event) => {
        setSelectId(event.target.value)
    }

    const buttonHandler = (event) => {
        event.preventDefault()
        
        props.setProjectId(selectId)
        props.setRadius(true);
    }

    return (
        <div className="global-container">
            <label style={{fontSize:"24px" ,color: "white", marginBottom:"10px"}}>Multiple projects have been found near you, select the one you wish to work with</label>
            <select
                onChange={selectHandler}
            >
                <option value={null}>Select a Project</option>
                {props.response.content.map((project) => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                ))}
            </select>
            <button onClick={buttonHandler}>Select</button>
        </div>
    )
}