import React, { useEffect, useState } from "react";

export default function Radius(props) {
  const [isSearching, setIsSearching] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    // Solicitar acceso a la ubicación cuando se monta el componente
    setIsSearching(true);
    const requestLocationAccess = async () => {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          // Get the user's latitude and longitude coordinates
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          props.getLocation();

          const result = props
            .enviarDatos(
              {
                location: { latitude: lat, longitude: lng },
                action: "find_project",
              },
              "camera"
            )
            .then((result) => {
              console.log(result), props.setResponse(result);
              if (result.code === "A5") {
                props.setRadius(true);
                props.setPermissions(true);
                console.log("RADIUS");
              }
            });
        });
      } catch (error) {
        console.error("Error requesting location access:", error);
      } finally {
        setIsSearching(false);
      }
    };
    requestLocationAccess();
  }, []);

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      {isSearching ? (
        <div className="global-container">
          <label className="global-card-title">Looking for a project near your location. Please Wait</label>
        </div>
      ) : (
        <div>
          {props.response.code === "A3" ? (
            <div>
              <div>
                <label className="global-card-title">No project found, enter the project name below</label>
              </div>
              <input onChange={nameHandler} value={name} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
