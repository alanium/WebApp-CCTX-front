import React from "react";

export function SelectMasterItems(props) {
  return (
    <div>
      <form>
        <label className="form-label" style={{ color: "white" }}>
          Select Master Items
        </label>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {props.worders.map((masters, index) => (
            <div>
              <label>Category</label>
              {masters.map((master) => (
                <div
                  key={master.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <input
                    type="checkbox"
                    id={master.id}
                    name={master.description}
                    data={JSON.stringify(master)}
                    onChange={props.masterChangeHandler}
                  />
                  <label
                    style={{
                      color: "white",
                      textAlign: "justify",
                      textJustify: "inter-word",
                      flex: "1",
                    }}
                  >
                    {master.description}
                  </label>
                </div>
              ))}
            </div>
          ))}

          <div>
            <button
              type="submit"
              className="global-button"
              onClick={props.handleSubmit}
            >
              Select Master Items
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
