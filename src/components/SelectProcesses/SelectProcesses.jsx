import { BiXCircle } from "react-icons/bi";
import styles from "./Processes.module.css"



export function SelectProcesses(props) {

  return (
    <div>
      <form>
        <label className="form-label" style={{ color: "white" }}>
          Select Processes
        </label>
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {props.worders.map((processes, index) => (
            <div>
              {processes.map((process) => (
                <div
                  key={process.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <input
                    type="checkbox"
                    id={process.id}
                    name={process.name}
                    data={JSON.stringify(process)}
                    onChange={props.processChangeHandler}
                  />
                  <label
                    style={{
                      color: "white",
                      textAlign: "justify",
                      textJustify: "inter-word",
                      flex: "1",
                    }}
                  >
                    {process.name}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
          <button
            type="submit"
            className="global-button"
            onClick={props.handleSubmit}
          >
            Select Processes
          </button>
      </form>
    </div>
  );
}
