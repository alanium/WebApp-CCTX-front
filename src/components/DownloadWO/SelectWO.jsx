import React, { useState, useEffect } from "react";
import { DetailsWO } from "./DetailsWO";
import { useDispatch, useSelector } from "react-redux";
import { setBar, setSuccess } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export function SelectWO(props) {
  const [worders, setWorders] = useState(props.worders);
  const [details, setDetails] = useState({});
  const [worder, setWorder] = useState(null);
  const [titles, setTitles] = useState([]);
  const [isWoReady, setIsWoReady] = useState(false);
  const dispatch = useDispatch();
  const [allIds, setAllIds] = useState([])

  const fullname = useSelector((state) => state.user.fullname)
  const email = useSelector((state) => state.user.email)
  const navigate = useNavigate()

  useEffect(() => {
    const worderIds = worders.map((worder) => worder.id);
    setAllIds(worderIds)
  }, [worders]);

  const changeHandler = (event) => {
    if (event.target.value !== null) {
      setWorder(event.target.value);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (event.target.value === "selected" && worder !== null) {
      props.setIsLoading(true);
      dispatch(setBar(true));
      try {
        const result = await props.enviarDatos(
          { id: worder, action: "get_wo_details" },
          "/download_wo"
        );
        if (result) {
          setDetails(result);
          console.log(details);
        } else {
          console.log("No funcionó");
        }
      } catch (error) {
        console.error("Error, ", error);
      } finally {
        props.setIsLoading(false);
        dispatch(setBar(false));
  
      }
    } else {
      try {
        props.setIsLoading(true);
        dispatch(setBar(true));
        const response = await fetch("http://3.145.79.50:5000/download_wo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "download_all",
            wo_id: allIds,
            user_data: { fullname: fullname, email: email },
          }),
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "all_pdfs.zip";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setTimeout(() => {
          props.setIsLoading(false);
          dispatch(setSuccess(true))
          dispatch(setBar(false));
          navigate("/home");
        }, 1000);
        
      } catch (error) {
        console.error("Error: ", error);
        props.setIsLoading(false);
        dispatch(setBar(false));
        props.setIsLoading(false);
        dispatch(setBar(false));
        
      }
    }
  }

  return (
    <div>
      <div>
        {isWoReady ? (
          <DetailsWO
            setIsLoading={props.setIsLoading}
            enviarDatos={props.enviarDatos}
            worder={worder}
            details={details}
          />
        ) : (
          <div>
            <form>
              <select className="global-input-1" onChange={changeHandler}>
                <option
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  value={null}
                >
                  Select a Work Order
                </option>
                {worders &&
                  worders.map((worder) => (
                    <option
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      key={worder.id}
                      value={worder.id}
                    >
                      {worder.id_title}
                    </option>
                  ))}
              </select>
            </form>

            <button
              value="selected"
              className="global-button"
              onClick={handleSubmit}
            >
              Download Selected
            </button>
            <button value="all" className="global-button" onClick={handleSubmit}>
              Download All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
