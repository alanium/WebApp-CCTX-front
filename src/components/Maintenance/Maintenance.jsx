import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Maintenance.module.css"

export default function Maintenace (props) {

    const navigate = useNavigate()

    return (
        <div>
            <label className="global-card-title">This section is currently under Maintenace</label>
            <button className="global-button" onClick={() => navigate("/home")}>Go back to Home</button>
        </div>
    )
}