import React, {useEffect} from "react";
import { setMaintenance } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function HandleMaintenance(props){

    const dispatch = useDispatch();
    const maintenance = useSelector((state) => state.underMaintenance)

    useEffect(() => {
        // Recuperar el estado desde localStorage al montar el componente
        const storedMaintenance = localStorage.getItem("underMaintenance");
        if (storedMaintenance) {
          dispatch(setMaintenance(JSON.parse(storedMaintenance)));
        }
      }, [dispatch]);
    
    const buttonHandler = (event) => {
        if (maintenance.includes(event.target.value)) {
            let aux = maintenance.slice(); // Create a copy of the array
            aux.splice(maintenance.indexOf(event.target.value), 1); // Remove the element
            dispatch(setMaintenance(aux));
            console.log("disabled: ", aux);
            localStorage.setItem("underMaintenance", JSON.stringify(aux));
            console.log("disabled: ", aux);
        } else {
            dispatch(setMaintenance([...maintenance, event.target.value]));
            console.log("disabled: ", [...maintenance, event.target.value]);
            localStorage.setItem(
                "underMaintenance",
                JSON.stringify([...maintenance, event.target.value])
              );
        }
    }

    return (
        <div className="global-container">
            <label className="global-card-title">Handle Maintenance</label>
            <div>
                <div>
                    <button onClick={buttonHandler} className="global-button" value="create_project">Create Project</button>
                </div>
                <div>
                    <button className="global-button">Placeholder</button>
                </div>
            </div>
        </div>
    )
}