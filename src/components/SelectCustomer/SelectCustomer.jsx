import React, { useState } from "react";
import { BiXCircle } from "react-icons/bi";
import Maintenace from "../Maintenance/Maintenance";

export function SelectCustomer(props) {
  const isAvaliable = true
  return (
    <div>
      {isAvaliable ? (
        <div>
          <form>
            <label className="form-label" style={{ color: "white" }}></label>
            <select
              name="projects"
              id="projects"
              className="global-input-1"
              onChange={props.changeHandler}
              style={{ marginTop: "20px" }}
            >
              <option>Select a Customer</option>
              {props.worders.map((customer) => (
                <option
                  key={customer.id}
                  id={customer.id}
                  name={customer.name}
                  data={JSON.stringify(customer)}
                  lead={customer.lead_id}
                >
                  {customer.name}
                </option>
              ))}
            </select>
            <br />
            {props.customer.selected_customer !== null &&
            props.customer.customer_name !== null &&
            props.customer.customer_id !== null ? (
              <button
                className="global-button"
                type="submit"
                onClick={props.handleSubmit}
              >
                Submit
              </button>
            ) : (
              <p></p>
            )}
          </form>
        </div>
      ) : (
        <Maintenace />
      )}
    </div>
  );
}
