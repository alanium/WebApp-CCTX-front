import React, {useEffect} from "react";
import { FaCircle } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import { BiSolidXCircle } from "react-icons/bi";
import { PiVideoCameraFill } from "react-icons/pi"

export default function TakePhoto(props) {

  useEffect(() => {
    // Solicitar acceso a la ubicación cuando se monta el componente
    const requestLocationAccess = async () => {
      try {
        await navigator.geolocation.getCurrentPosition((position) => {
          // Get the user's latitude and longitude coordinates
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          props.getLocation();
        });
      } catch (error) {
        console.error("Error requesting location access:", error);
      }
    };

    // Iniciar la cámara y solicitar acceso a la ubicación
    const startCameraAndRequestLocation = async () => {
      await props.startCamera();
      await requestLocationAccess();
      props.setPermissions(true);
    };

    startCameraAndRequestLocation();

    return () => props.stopCamera();
  }, []);

  const takePhoto = async () => {
    if (props.videoRef.current && props.canvasRef.current) {
      await props.getLocation();
      const video = props.videoRef.current;
      const canvas = props.canvasRef.current;

      const aspectRatio = video.videoWidth / video.videoHeight;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      await canvas.toBlob(async (blob) => {
        try {
          await props.uploadImageToFirebase(blob);
        } catch (error) {
          console.log(error);
        }
        "image/png", 1;
      });
    }
  };

  return (
    <div className="camera-container">
      <button className="mode-button"  onClick={() => props.setMode(false)}>
      <PiVideoCameraFill />
      </button>
      <video
        ref={props.videoRef}
        autoPlay
        playsInline
        className="video-preview"
      />

      <div className="canvas-container">
        <canvas
          ref={props.canvasRef}
          className="hidden-canvas"
          onClick={props.handleCanvasClick}
        />
      </div>

      <div className="button-container">
        <button
          style={{ fontSize: "77px", color: "white" }}
          onClick={props.stopCamera}
        >
          <BiSolidXCircle />
        </button>
        <button
          style={{ fontSize: "66px", color: "white" }}
          onClick={takePhoto}
        >
          <FaCircle />{" "}
        </button>
        <button
          style={{ fontSize: "77px", color: "white" }}
          onClick={props.switchCamera}
        >
          <MdChangeCircle />
        </button>
      </div>

      <div className="canvas-container">
        <canvas ref={props.canvasRef} className="hidden-canvas" />
      </div>
    </div>
  );
}
