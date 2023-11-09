import React, {useState, useEffect} from "react";
import { SelectProject } from "./SelectProject";
import { SelectWO } from "./SelectWO";
import { DetailsWO } from "./DetailsWO";

export function DownloadWo(props) {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await props.obtenerJSON("/download_wo")
                if (result) {
                    setData(result);
                    console.log(data)
                } else {
                    console.log("No funcionó")
                }
            } catch (error) {
                console.error("Error, ", error)
            } finally {
                setIsLoading(true);
            }
        }
        fetchData();
    }, [])
    



    return (
        <div className="global-container">
            <label className="global-card-title">Download WO</label>
            {isLoading ? (
                <SelectProject setData={setData} enviarDatos={props.enviarDatos} data={data} />
            ) : (
                <label>
                    LOADING DATA...
                </label>
            )}
        </div>
    )
}