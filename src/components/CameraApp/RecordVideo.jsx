import React, { useState, useRef, useEffect } from "react";
import { FaCircle, FaStopCircle } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import { BiSolidXCircle } from "react-icons/bi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { initializeApp } from "firebase/app";

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

export default function VideoRecorder (props)  {
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [location, setLocation] = useState(null);
  const [permissions, setPermissions] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    const requestLocationAccess = async () => {
      try {
       navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          getLocation();
        });
      } catch (error) {
        console.error("Error requesting location access:", error);
      }
    };

    const startCameraAndRequestLocation = async () => {
      await startCamera();
      initializeMediaRecorder();
      await requestLocationAccess();
      setPermissions(true);
    };

    startCameraAndRequestLocation();

    return () => stopCamera();
  }, []);

  const initializeMediaRecorder = () => {
    const stream = navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: facingMode,
        width: { ideal: 4096 },
        height: { ideal: 2160 },
        frameRate: { ideal: 30, max: 60 },
      },
    }); // Use captureStream instead of srcObject

    if (stream) {
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);
        uploadVideoToFirebase(blob)
        // Handle the video URL as needed (e.g., updating state, sending to parent component)
        console.log("Video URL created:", videoUrl);
      };

      setMediaRecorder(mediaRecorder);
    } else {
      console.error("Video reference not available.");
    }
  };
  

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 4096 },
          height: { ideal: 2160 },
          frameRate: { ideal: 30, max: 60 },
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

  const uploadVideoToFirebase = async (blob) => {
    const storage = getStorage();
    const videoRef = ref(storage, `videos/${Date.now()}_video.webm`);

    try {
      await uploadBytes(videoRef, blob);
      const videoUrl = await getDownloadURL(videoRef);

      // Handle the video URL as needed (e.g., updating state, sending to parent component)
      console.log("Video uploaded to Firebase:", videoUrl);
    } catch (error) {
      console.error("Error uploading video to Firebase:", error);
    }
  };

  const startRecording = () => {
    setRecordedChunks([]);
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  const handleCanvasClick = (event) => {
    // Your canvas click logic here
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
          <video ref={videoRef} autoPlay playsInline className="video-preview" />

          <div className="button-container">
            <button
              style={{ fontSize: "77px", color: "white" }}
              onClick={stopCamera}
            >
              <BiSolidXCircle />
            </button>
            <button
              style={{ fontSize: "66px", color: "white" }}
              onClick={recording ? stopRecording : startRecording}
            >
              {recording ? <FaStopCircle /> : <FaCircle />}
            </button>
            <button
              style={{ fontSize: "77px", color: "white" }}
              onClick={switchCamera}
            >
              <MdChangeCircle />
            </button>
          </div>
        </div>
      ) : (
        <div className="global-container">
          <label>
            Grant location and camera permissions to use this component
          </label>
          <button>Go Back</button>
        </div>
      )}
    </div>
  );
};
