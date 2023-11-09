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
                const result = await props.obtenerJSON("get_wo")
                if (result) {
                    setData(result);
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
        <div>
            <label>Download WO</label>
                <SelectCustomer data={data} />
                <SelectWO data={data} />
                <DetailsWO data={data} />
                

        </div>
    )
}