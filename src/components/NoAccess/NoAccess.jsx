import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export function NoAccess() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.access);

    const handleButtonClick = () => {
        if (user) {
          navigate("/home");
        } else {
          navigate("/");
        }
      };

    return (
        <div>
            <label>Access Denied</label>
            <button onClick={handleButtonClick}>Go Back</button>
        </div>
    )
}