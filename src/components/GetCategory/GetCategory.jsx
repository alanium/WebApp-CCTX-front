import React, { useEffect, useState } from "react";
import styles from "./GetCategory.module.css"

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
      selectedItem.cost = event.target.value;
      selectedItem.sub_total = selectedItem.quantity * Number(selectedItem.cost)
      setData(aux);
    }
  };

  const handleAmount = (event, index) => {
    let aux = [...data];
    const selectedItem = aux.find((item) => item.id === result[index].id);

    if (selectedItem) {
      selectedItem.quantity = event.target.value;
      selectedItem.sub_total = selectedItem.quantity * Number(selectedItem.cost)
      setData(aux);
    }
  };

  const handleForm = (event) => {
    event.preventDefault();
    saveData(data);
    handleSubmit(event);
  };

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <form onSubmit={handleForm}>
        <div>
          <label htmlFor="description">Description</label>
          <label htmlFor="cost">Cost</label>
          <label htmlFor="amount">Amount</label>
          <label>Total</label>
        </div>
        {result.map((masterItem, index) => (
          <div key={index}>
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
            />
            <input
              onChange={(event) => handleCost(event, index)}
              value={masterItem.cost}
              type="number"
              className={styles.smallNumericInput}
            />
            <input
              onChange={(event) => handleAmount(event, index)}
              value={masterItem.quantity}
              type="number"
              className={styles.smallNumericInput}
            />
            <label>{Number(masterItem.cost) * masterItem.quantity}</label>
            <label>{masterItem.category}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
