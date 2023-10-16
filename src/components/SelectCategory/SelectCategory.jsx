import React from "react";

export function SelectCategory(props) {
  return (
    <div>
      <form>
        <label className="form-label" style={{ color: "white" }}>
          Select Category
        </label>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {props.worders.map((category) => (
            <div
              key={category.id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <input
                type="checkbox"
                id={category.id}
                name={category.category}
                data={JSON.stringify(category)}
                onChange={props.catChangeHandler}
              />
              <label
                style={{
                  color: "white",
                  textAlign: "justify",
                  textJustify: "inter-word",
                  flex: "1",
                }}
              >
                {category.category}
              </label>
            </div>
          ))}
          <div></div>
        </div>
        <button type="submit" className="global-button" onClick={props.handleSubmit}>
          Select Category
        </button>
      </form>
    </div>
  );
}
