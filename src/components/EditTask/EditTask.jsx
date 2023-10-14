import React, { useState } from "react";

export function EditTask(props) {
  const { selected_master } = props.master;
  const [quantities, setQuantities] = useState(Array(selected_master.length).fill(1));
  const [types, setTypes] = useState(Array(selected_master.length).fill("labor"));

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(value, 10);
    setQuantities(newQuantities);
  };

  const handleTypeChange = (index, value) => {
    const newTypes = [...types];
    newTypes[index] = value;
    setTypes(newTypes);
  };

  const handlePrint = () => {
    const items = selected_master.map((item, index) => ({
      ...item,
      quantity: quantities[index],
      type: types[index],
    }));
    console.log(items);
  };

  const handlePreview = () => {
    console.log("Ir al preview");
  };

  return (
    <div>
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {selected_master.map((item, index) => (
          <div key={item.id}>
            <ul>
              <li style={{color : 'white'}}>{item.description}</li>
            </ul>
            <input
              type="number"
              value={quantities[index]}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
            />
            <select
              value={types[index]}
              onChange={(e) => handleTypeChange(index, e.target.value)}
            >
              <option value="labor">Labor</option>
              <option value="material">Material</option>
              <option value="all included">All Included</option>
            </select>
            <br />
          </div>
        ))}
      </div>
      <button onClick={handlePrint}>Imprimir por Consola</button>
      <button onClick={handlePreview}>Ir al Preview</button>
    </div>
  );
}
