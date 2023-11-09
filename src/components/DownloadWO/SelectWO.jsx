import React, { useEffect } from "react";

export function SelectWO() {
  const [worders, setWorders] = useState({});

  const [render, setRender] = useState(false)

  const [titles, setTitles] = useState([])

  useEffect(() => {
    setWorders(props.data);
    setTitles(Object.keys(props.data))
    setRender(true)
  }, []);

  return (
    <div>
      {render ? (
        <div>
          <select>
            <option>Select a Work Order</option>
            {worders.map((worder) => {
              <option value={{ id: worder.wo_id, name: worder.name }}>
                {worder.name}
              </option>;
            })}
          </select>
          <button onClick={handleSubmit}></button>
        </div>
      ) : null}
    </div>
  );
}
