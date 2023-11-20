// CameraApp.js
import React, { useState, useRef, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import { BiSolidXCircle } from "react-icons/bi";
import "./CameraApp.css";

const CameraApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [facingMode, setFacingMode] = useState("user");

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
  
      const maxWidth = video.videoWidth;
      const maxHeight = video.videoHeight;
  
      // Establecer el tamaño del canvas a la resolución máxima del video
      canvas.width = maxWidth;
      canvas.height = maxHeight;
  
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, maxWidth, maxHeight);
  
      // Obtener la imagen en formato data URL con la máxima calidad
      const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
  
      // Crear un enlace para descargar la imagen
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "photo.jpg";
      link.click();
    }
  };

  const switchCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === "user" ? "environment" : "user"
    );
    stopCamera();
    startCamera();
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} autoPlay playsInline className="video-preview" />

      <div className="button-container">
        <button style={{ fontSize: "77px", color: "white" }} onClick={stopCamera}><BiSolidXCircle /></button>
        <button
          style={{ fontSize: "66px", color: "white" }}
          onClick={takePhoto}
        >
          <FaCircle />{" "}
        </button>
        <button style={{ fontSize: "77px", color: "white" }} onClick={switchCamera}>
          <MdChangeCircle />
        </button>
      </div>

      <div className="canvas-container">
        <canvas ref={canvasRef} className="hidden-canvas" />
      </div>
    </div>
  );
};

export default CameraApp;
