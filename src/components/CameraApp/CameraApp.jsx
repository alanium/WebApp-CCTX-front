// CameraApp.js
import React, { useState, useRef, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import { BiSolidXCircle } from "react-icons/bi";
import { initializeApp } from "firebase/app";
import "firebase/storage";
import "./CameraApp.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAcCBS9ovlwg_Lg_yGKPILSsc_ETBb3_eE",
  authDomain: "fb-storage-49d33.firebaseapp.com",
  projectId: "fb-storage-49d33",
  storageBucket: "fb-storage-49d33.appspot.com",
  messagingSenderId: "327363193304",
  appId: "1:327363193304:web:88b1cf55edee2322b6eaad",
  measurementId: "G-2J1T6GN9R0",
};

initializeApp(firebaseConfig);

const CameraApp = (props) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [mediaStream, setMediaStream] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [location, setLocation] = useState(null);
  const [permissions, setPermissions] = useState(false);
  const [url, setUrl] = useState([]);

  useEffect(() => {
    // Solicitar acceso a la ubicación cuando se monta el componente
    const requestLocationAccess = async () => {
      try {
        await navigator.geolocation.getCurrentPosition(
          (position) => {
            // Get the user's latitude and longitude coordinates
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            getLocation();
          }
        )
        
      } catch (error) {
        console.error("Error requesting location access:", error);
      }
    };

    // Iniciar la cámara y solicitar acceso a la ubicación
    const startCameraAndRequestLocation = async () => {
      await startCamera();
      await requestLocationAccess();
    };

    startCameraAndRequestLocation().then(setPermissions(true));

    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 4096 },
          height: { ideal: 2160 },
        },
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const uploadImageToFirebase = async (blob) => {
    const storage = getStorage();
    const imageRef = ref(storage, `images/${Date.now()}_photo.png`);

    try {
      await uploadBytes(imageRef, blob).then((snapshot) => {
        console.log("uploaded a blob");
      });
      const imageUrl = await getDownloadURL(ref(storage, `${imageRef}`));
      setUrl([...url, imageUrl]);
      console.log("Image uploaded to Firebase:", imageUrl);
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  const takePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      getLocation();
      const video = videoRef.current;
      const canvas = canvasRef.current;

      const aspectRatio = video.videoWidth / video.videoHeight;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      await canvas.toBlob(
        (blob) => {
          uploadImageToFirebase(blob);
        },
        "image/png",
        1
      ).then(
        props.enviarDatos({ location: location, image: url }, "camera")
      )

      
    }
  };

  const handleCanvasClick = (event) => {
    if (mediaStream) {
      const video = videoRef.current;

      const { offsetX, offsetY } = event.nativeEvent;
      const clickX = offsetX / video.clientWidth;
      const clickY = offsetY / video.clientHeight;

      const track = mediaStream.getVideoTracks()[0];
      if (track && "applyConstraints" in track) {
        // Check if applyConstraints is supported
        track
          .applyConstraints({
            advanced: [{ focusPointOfInterest: { x: clickX, y: clickY } }],
          })
          .then(() => console.log("Camera focused successfully"))
          .catch((error) => console.error("Error focusing camera:", error));
      } else {
        console.log("Applying constraints not supported on this device");
      }
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
    <div>
      {permissions ? (
        <div className="camera-container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="video-preview"
          />

          <div className="canvas-container">
            <canvas
              ref={canvasRef}
              className="hidden-canvas"
              onClick={handleCanvasClick}
            />
          </div>

          <div className="button-container">
            <button
              style={{ fontSize: "77px", color: "white" }}
              onClick={stopCamera}
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

          <div className="canvas-container">
            <canvas ref={canvasRef} className="hidden-canvas" />
          </div>
        </div>
      ) : (
        <div className="global-containter">
          <label>Grant location and camera permissions to use this component</label>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default CameraApp;
