import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoMatches (props) {

    const navigate = useNavigate()

    const yesHandler = (event) => {
        props.setTemp(true)
        props.setRadius(true)
    } 

    return (
        <div className="global-container">
            <label style={{fontSize:"24px" ,color: "white"}}>No matches have been found, do you want to save the pictures in a temporal project?</label>
            <div>
                <button onClick={yesHandler} >Yes</button>
                <button onClick={() => navigate("/")}>No</button>
            </div>
        </div>
    )
}