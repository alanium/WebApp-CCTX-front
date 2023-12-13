import React, { useEffect, useState } from "react";
import styles from "./GetCategory.module.css";

export const GetCategory = ({ result, handleSubmit, saveData }) => {
  const [data, setData] = useState(result);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const handleCheckChange = (event, index) => {
    const isChecked = event.target.checked;

    setData((prevData) => {
      if (isChecked) {
        // If checked, add the item to data if it doesn't exist
        if (!prevData.some((item) => item.id === result[index].id)) {
          return [...prevData, result[index]];
        }
      } else {
        // If unchecked, filter out the item from data
        return prevData.filter((item) => item.id !== result[index].id);
      }

      return prevData;
    });
  };

  const handleDescription = (event, index) => {
    let aux = [...data];
    const selectedItem = aux.find((item) => item.id === result[index].id);

    if (selectedItem) {
      selectedItem.description = event.target.value;
      setData(aux);
    }
  };

  const handleCost = (event, index) => {
    let aux = [...data];
    const selectedItem = aux.find((item) => item.id === result[index].id);

    if (selectedItem) {
      selectedItem.cost = Number(event.target.value);
      selectedItem.sub_total =
        selectedItem.quantity * Number(selectedItem.cost);
      setData(aux);
    }
  };

  const handleAmount = (event, index) => {
    let aux = [...data];
    const selectedItem = aux.find((item) => item.id === result[index].id);

    if (selectedItem) {
      selectedItem.quantity = Number(event.target.value);
      selectedItem.sub_total =
        selectedItem.quantity * Number(selectedItem.cost);
      setData(aux);
    }
  };

  const handleForm = (event) => {
    event.preventDefault();
    saveData(data);
    handleSubmit(event);
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <div>
          <label
            style={{ marginRight: "64px" }}
            className={styles.columnLabel}
            htmlFor="description"
          >
            Description
          </label>
          <label className={styles.columnLabel} htmlFor="cost">
            Cost
          </label>
          <label className={styles.columnLabel} htmlFor="amount">
            Amount
          </label>
          <label style={{ marginLeft: "10px" }} className={styles.columnLabel}>
            Total
          </label>
        </div>
        <div style={{ maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }}>
          {result.map((masterItem, index) => (
            <div style={{display: "flex", marginBottom: "10px"}} key={index}>
              <input
                onChange={(event) => handleCheckChange(event, index)}
                name={`checkbox-${index}`}
                type="checkbox"
                checked={data.some((item) => item.id === masterItem.id)}
              />
              <input
                onChange={(event) => handleDescription(event, index)}
                name="description"
                value={masterItem.description}
                type="text"
                style={{borderRadius: "5px"}}
              />
              <input
                onChange={(event) => handleCost(event, index)}
                value={masterItem.cost}
                type="number"
                step="any"
                min={0}
                className={styles.smallNumericInput}
              />
              <input
                onChange={(event) => handleAmount(event, index)}
                value={masterItem.quantity}
                type="number"
                step="any"
                min={0}
                className={styles.smallNumericInput}
              />
              <div style={{display: "flex"}}>
                <div>
                  <label className={styles.totalAmountLabel}>
                    {(Number(masterItem.cost) * masterItem.quantity).toFixed(2)}
                  </label>
                </div>
                <label title={masterItem.category} className={styles.categoryLabel}>
                  {masterItem.category}
                  
                </label>
              </div>
            </div>
          ))}
        </div>

        <button className="global-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
