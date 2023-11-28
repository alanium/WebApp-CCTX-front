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
          getLocation();
          async () => {
            const result = props.enviarDatos(
              {
                location: { latitude: lat, longitude: lng },
                action: "find_project",
              },
              "camera"
            );
            props.setResponse(result);
            if (result.code === "A5") {
                props.setRadius(true);
              }
          };
        });
      } catch (error) {
        console.error("Error requesting location access:", error);
      } finally {
        setIsSearching(false);
      }
    };

    // Iniciar la cámara y solicitar acceso a la ubicación
    const startCameraAndRequestLocation = async () => {
      await requestLocationAccess();

      setPermissions(true);
    };

    startCameraAndRequestLocation();
    startCamera();
    return () => stopCamera();
  }, []);

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      {isSearching ? (
        <div>
          <label>Looking for a project near your location</label>
        </div>
      ) : (
        <div>
          {response.code === "A3" ? (
            <div>
              <div>
                <label>No project found, enter the project name below</label>
              </div>
              <input onChange={nameHandler} value={name} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
