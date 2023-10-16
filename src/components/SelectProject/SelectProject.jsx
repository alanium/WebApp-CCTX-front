export function SelectProject(props) {
  return (
    <div>
      <form>
        <label className="form-label" style={{ color: "white" }}>
          Select Project
        </label>
        <select
          name="projects"
          id="projects"
          className="global-input-1"
          onChange={props.changeHandler}
        >
          <option>Select a Project</option>
          {props.worders.map((project) => (
            <option
              key={project.id}
              id={project.id}
              name={project.name}
              data={JSON.stringify(project)}
            >
              {project.name}
            </option>
          ))}
        </select>
        <br />
        <button className="global-button" type="submit" onClick={props.handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
