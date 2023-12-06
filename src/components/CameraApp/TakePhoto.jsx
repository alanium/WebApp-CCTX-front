import React, { useEffect, useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import { BiSolidXCircle } from "react-icons/bi";
import { PiVideoCameraFill } from "react-icons/pi";

export default function TakePhoto(props) {
  const videoCaptureRef = useRef(null);
  const captureStreamRef = useRef(null);
  const [capturing, setCapturing] = useState(false)

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

    return () => {
      props.stopCamera();
      stopCapture();
    };
  }, []);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {facingMode: props.facingMode, width: { ideal: 4096 }, height: { ideal: 2160 } },
      });
      if (videoCaptureRef.current) {
        videoCaptureRef.current.srcObject = stream;
      }
      captureStreamRef.current = stream;
    } catch (error) {
      console.error("Error accessing camera for capture:", error);
    }
  };

  const stopCapture = () => {
    if (captureStreamRef.current) {
      const tracks = captureStreamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      captureStreamRef.current = null;
    }
  };

  const takePhoto = async () => {
    await props.stopCamera()
    setCapturing(true)
    await startCapture();
    setTimeout(async () => {
      if (videoCaptureRef.current && props.canvasRef.current) {
        await props.getLocation();
        const video = videoCaptureRef.current;
        const canvas = props.canvasRef.current;
  
        const aspectRatio = video.videoWidth / video.videoHeight;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
  
        const context = canvas.getContext("2d");
        await context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        await canvas.toBlob(async (blob) => {
          try {
            await props.uploadImageToFirebase(blob);
          } catch (error) {
            console.log(error);
          }
        }, "image/png", 1);
      }
      
      
    }, "100")
    stopCapture();
    setCapturing(false)
    await props.startCamera()
  };

  const switchCamera = async () => {
    await stopCapture();
    await props.stopCamera();

    
    props.setFacingMode((prevFacingMode) =>
      prevFacingMode === "user" ? "environment" : "user"
    );
  
    // Stop the camera and wait for it to complete before starting it again
   
  
    // Start the camera with the updated facingMode
    await startCapture();
    await props.startCamera();
  };

  return (
    <div className="camera-container">
      <button className="mode-button" onClick={() => props.setMode(false)}>
        <PiVideoCameraFill style={{ fontSize: "77px", color: "white" }} />
      </button>
      {capturing ? (
        <video 
        ref={videoCaptureRef}
        autoPlay
        playsInline
        className="video-preview"
        
        />
      ) : (
        <video
        ref={props.videoRef}
        autoPlay
        playsInline
        className="video-preview"
      />
      )}
      

      <div className="canvas-container">
        <canvas ref={props.canvasRef} className="hidden-canvas" />
      </div>

      <div className="button-container">
        <button
          style={{ fontSize: "77px", color: "white" }}
          onClick={() => props.navigate("/home")}
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
          onClick={switchCamera}
        >
          <MdChangeCircle />
        </button>
      </div>
    </div>
  );
}
