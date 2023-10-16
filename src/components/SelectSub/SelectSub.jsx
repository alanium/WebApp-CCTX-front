import React from "react";

export function SelectSub(props) {
  return (
    <div>
      <form>
        <label className="form-label" style={{ color: "white" }}>
          Select SubContractor
        </label>
        <select
          name="contractors"
          id="contractors"
          className="global-input-1"
          onChange={props.subChangeHandler}
        >
          <option>Select a Contractor</option>
          {props.worders.map((contractor) => (
            <option
              key={contractor.id}
              id={contractor.id}
              name={contractor.name}
              data={JSON.stringify(contractor)}
            >
              {contractor.name}
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
