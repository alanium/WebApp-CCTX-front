import React from "react";
import { BiXCircle } from "react-icons/bi";
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
          style={{ color: "white" }}
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
