// CameraApp.js
import React, { useState, useRef, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import { BiSolidXCircle } from "react-icons/bi";
import { initializeApp } from 'firebase/app';
import 'firebase/storage';
import "./CameraApp.css";

const firebaseConfig = {
  apiKey: "AIzaSyAcCBS9ovlwg_Lg_yGKPILSsc_ETBb3_eE",
  authDomain: "fb-storage-49d33.firebaseapp.com",
  projectId: "fb-storage-49d33",
  storageBucket: "fb-storage-49d33.appspot.com",
  messagingSenderId: "327363193304",
  appId: "1:327363193304:web:88b1cf55edee2322b6eaad",
  measurementId: "G-2J1T6GN9R0"
};

initializeApp(firebaseConfig);

const CameraApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [facingMode, setFacingMode] = useState('user');

  useEffect(() => {
    startCamera();
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
      console.error('Error accessing camera:', error);
    }
  };

  const uploadImageToFirebase = async (blob) => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${Date.now()}_photo.png`);

    try {
      await imageRef.put(blob);
      const imageUrl = await imageRef.getDownloadURL();
      console.log('Image uploaded to Firebase:', imageUrl);
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
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

      const aspectRatio = video.videoWidth / video.videoHeight;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        uploadImageToFirebase(blob);
      }, 'image/png', 1);
    }
  };

  const handleCanvasClick = (event) => {
    if (mediaStream) {
      const video = videoRef.current;
  
      const { offsetX, offsetY } = event.nativeEvent;
      const clickX = offsetX / video.clientWidth;
      const clickY = offsetY / video.clientHeight;
  
      const track = mediaStream.getVideoTracks()[0];
      if (track && 'applyConstraints' in track) {
        // Check if applyConstraints is supported
        track.applyConstraints({
          advanced: [{ focusPointOfInterest: { x: clickX, y: clickY } }],
        })
          .then(() => console.log('Camera focused successfully'))
          .catch((error) => console.error('Error focusing camera:', error));
      } else {
        console.log('Applying constraints not supported on this device');
      }
    }
  };

  const switchCamera = () => {
    setFacingMode((prevFacingMode) => (prevFacingMode === 'user' ? 'environment' : 'user'));
    stopCamera();
    startCamera();
  };

  

  return (
    <div className="camera-container">
      <video ref={videoRef} autoPlay playsInline className="video-preview" />

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          className="hidden-canvas"
          onClick={handleCanvasClick}
        />
      </div>

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
