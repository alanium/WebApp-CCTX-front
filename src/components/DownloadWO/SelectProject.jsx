import React, { useEffect } from "react";

export function SelectProject() {
  const [projects, setProjects] = useState({});
  const [project, setProject] = useState({});
  const [render, setRender] = useState(false)

  useEffect(() => {
    setCustomers(props.data);
  }, []);

  const handleChange = (event) => {
    setProject(event.target.value);
  };

  const handleSubmit = (event) => {
    props.setData(props.enviarDatos(project, "wo"));
  };

  return (
    <div>
      {render ? (
        <div>
          <select onChange={handleChange}>
            <option>Select a Project</option>
            {projects.map((customer) => {
              <option value={{ id: customer.id}}>
                {customer.name}
              </option>;
            })}
          </select>
          <button onClick={handleSubmit}></button>
        </div>
      ) : null}
    </div>
  );
}
