import React from "react";
export function SelectCategory(props) {
  return (
    <div>
      <form>
        <label className="form-label" style={{ color: "white" }}>
          Select Category
        </label>
        <select 
        name="categories"
        id="categories"
        className="global-input-1"
        onChange={props.catChangeHandler}
        style={{ color: "white"}}>
        <option>Select a Category</option>
          {props.worders.map((category) => (
            <option
              key={category.id}
              id={category.id}
              name={category.name}
              data={JSON.stringify(category)}
            >{category.category}
            </option>
          ))}
        </select>
        <button type="submit" className="global-button" onClick={props.handleSubmit}>
          Select Category
        </button>
      </form>
    </div>
  );
}
