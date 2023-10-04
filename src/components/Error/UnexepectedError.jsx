import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

export function UnexpectedError (props) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.access);

    const handleButtonClick = () => {
      if (user) {
        navigate("/home");
      } else {
        navigate("/");
      }
    };
    return (
        <div className="global-container">
            <h1 className="global-card-title">Oops, try again</h1>
            <button className="global-button" onClick={handleButtonClick}>Go Back To Login</button>
        </div>
    )
}