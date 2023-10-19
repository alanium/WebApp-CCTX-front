import React from "react";
import { BiXCircle } from "react-icons/bi";
export function SelectCategory(props) {
  return (
    <div>
      <form>
        <div style={{margin:"10px"}}>       
          <label className="form-label" style={{ color: "white" }}>

          </label>
        </div>
        <select
          name="categories"
          id="categories"
          className="global-input-1"
          onChange={props.catChangeHandler}
          style={{ color: "white", marginTop:"10px" }}
        >
          <option>Select a Category</option>
          {props.worders.map((category) => (
            <option
              key={category.id}
              id={category.id}
              name={category.category}
              data={JSON.stringify(category)}
            >
              {category.category}
            </option>
          ))}
        </select>
        {
          props.category.selected_category[0] !== null &&
          props.category.category_id[0] !== null &&
          props.category.category_name[0] !== null
        ? (
          <button
            type="submit"
            className="global-button"
            onClick={props.handleSubmit}
          >
            Select Category
          </button>
        ) : (
          <p></p>
        )}
      </form>
    </div>
  );
}
