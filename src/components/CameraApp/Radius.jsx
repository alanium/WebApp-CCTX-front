import React, { useEffect, useState } from "react";
import Search from "./Search";
import ChooseProject from "./ChooseProject";

export default function Radius(props) {
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Solicitar acceso a la ubicación cuando se monta el componente
    const requestLocationAccess = async () => {
      try {
        setIsSearching(true);
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
              if (result.code === "A5" && result.content.length === 0) {
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



  

  return (
    <div>
      <div className="global-container">
        <label className="global-card-title">Looking for a project near your location. Please Wait</label>
      </div>
      {isSearching ? null : (
        <div>
          {props.response.code === "A5" && props.response.content.length > 1 ? (
            <ChooseProject response={props.response} />
          ) : null}
          {props.response.code === "A3" ? (
            <Search setTemp={props.setTemp} setRadius={props.setRadius} setProjectId={props.setProjectId} response={props.response} enviarDatos={props.enviarDatos} />
          ) : null}
        </div>
      )}
    </div>
  );
}