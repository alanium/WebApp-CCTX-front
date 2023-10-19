import { useState } from "react";
import { BiXCircle } from "react-icons/bi";

export function SelectProject(props) {

  return (
    <div>
      <form>
        <label className="form-label" style={{ color: "white" }}>
        </label>
        <select
          name="projects"
          id="projects"
          className="global-input-1"
          onChange={props.changeHandler}
          style={{marginTop: "20px"}}
        >
          <option>Select a Project</option>
          {props.worders.map((project) => (
            <option
              key={project.id}
              id={project.id}
              name={project.name}
              data={JSON.stringify(project)}
              lead={project.lead_id}
            >
              {project.name}
            </option>
          ))}
        </select>
        <br />
        {
        props.project.selected_project !== null && 
        props.project.project_name !== null &&
        props.project.project_id !== null ? (
           <button className="global-button" type="submit" onClick={props.handleSubmit}>
           Submit
          </button>
        ) : (
          <p></p>
        )}
      </form>
    </div>
  );
}
