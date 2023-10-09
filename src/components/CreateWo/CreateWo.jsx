import React, { useEffect, useState } from "react";


export function CreateWo(props) {
    const [worders, setWorders] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [input, setInput] = useState({
        name: "",
        id: "",
        email: "",
        fullname: "",
        scope: "",
        subcontratist: ""
    })

    useEffect(() => {
        async function fetchData() {
          try {
            const result = await props.obtenerJSON("create_wo");
            if (result) {
              console.log(result);
              setWorders(result);
            } else {
              console.log("No funcionó");
            }
          } catch (error) {
            console.error("Error: ", error);
          }
        }
    
        fetchData();
      }, []);

      const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true)
        if (
          input["new_worder"] !== "Select"
        ) {
          props
            .enviarDatos(input, "create_wo")
            .then((datos) => {
              if (datos) {
                console.log(datos);
                setIsSubmitting(false)
              }
            })
            .catch((error) => {
              console.error("Error: ", error);
              setIsSubmitting(false)
            });
        } else {
          console.log("Please fill in the form before submitting");
        }
        
      };

    return <div>Crete WO</div>
}