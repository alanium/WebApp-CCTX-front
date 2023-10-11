export function WoPreview(props) {
  return (
    <div>
      <div>
        <label
          className="form-label"
          style={{ fontSize: "30px", color: "white" }}
        >
          Preview
        </label>
        <div>
          <label style={{ fontSize: "20px", color: "white" }}>
            {" "}
            Selected Project:{" "}
          </label>
          <div>
            <label style={{ color: "white" }}>{props.project.project_name}</label>
          </div>
        </div>
        <div>
          <label style={{ color: "white" }}>
            Subcontractor: {props.sub.sub_name}
          </label>
        </div>
        <div>
          <label style={{ fontSize: "20px", color: "white" }}>
            Selected Tasks
          </label>
          {props.task.task_name.map((t, index) => (
            <div key={index}>
              <p>Task: {t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
