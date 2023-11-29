import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoMatches (event) {

    const navigate = useNavigate()

    const yesHandler = (event) => {
        props.setTemp(true)
        props.setRadius(true)
    } 

    return (
        <div>
            <label>No matches have been found, do you want to save the pictures in a temporal project?</label>
            <div>
                <button onClick={yesHandler} >Yes</button>
                <button onClick={() => navigate("/")}>No</button>
            </div>
        </div>
    )
}