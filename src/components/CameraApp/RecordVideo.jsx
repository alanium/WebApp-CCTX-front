import React, { useState, useRef, useEffect } from "react";
import { FaCircle, FaStopCircle, FaCamera } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import { BiSolidXCircle } from "react-icons/bi";
import { throttle } from "lodash";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import style from "./CameraApp.css"

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

export default function VideoRecorder(props) {
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [location, setLocation] = useState(null);
  const [permissions, setPermissions] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [url, setUrl] = useState([])

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

    const startCameraAndRequestLocation = throttle(async () => {
      await startCamera();
      await requestLocationAccess();
      setPermissions(true);
    }, 1000);

    startCameraAndRequestLocation();

    return () => stopCamera();
  }, []);

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  };

  const initializeMediaRecorder = async () => {
    const constraints = { video: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = stream;
  
    if (!stream) {
      console.error("Capture stream not available.");
      return;
    }
  
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = []; // Define chunks array
  
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
  
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
  
      const videoUrl = URL.createObjectURL(blob).replace(/^blob:/, '');
      setUrl((prevUrl) => [...prevUrl, videoUrl]);
  
      const updatedUrl = [...url, videoUrl];
  
      uploadVideoToFirebase(blob);
  
      console.log("Video URL created:", videoUrl);

            console.log("Video URL created:", videoUrl);
            if (props.projectId !== "") {
                props.enviarDatos({ project_id: props.projectId, action: "send_image", image: updatedUrl, user_data: props.user }, "camera")
            } else if (props.temp) {
                props.enviarDatos({ action: "temp", image: updatedUrl, user_data: props.user }, "camera")
            } else {
                props.enviarDatos({ action: "send_image", image: updatedUrl, user_data: props.user, project_id: props.response.content[0].id }, "camera")
            }
        };

        setMediaRecorder(mediaRecorder);
};
  

const startCamera = async () => {
  try {
    const constraints = { video: { facingMode } };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    setMediaStream(stream);

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      initializeMediaRecorder(); // Call initializeMediaRecorder directly
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
    console.log("Blob size:", blob.size); // Log the size to check if it's greater than 0
    const storage = getStorage();
    const videoRef = ref(storage, `videos/${Date.now()}_video.webm`);
  
    try {
      await uploadBytes(videoRef, blob);
      const videoUrl = await getDownloadURL(videoRef);
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

  const switchCamera = async () => {
    // Ensure that the current camera stream is stopped
    await stopCamera();
  
    // Switch the facing mode
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);
  
    try {
      // Start the camera with the new facingMode
      await startCamera();
    } catch (error) {
      console.error("Error starting camera:", error);
      // Handle any errors that may occur while starting the camera
    }
  };

  return (
    <div>
      {permissions ? (
        <div className="camera-container">
          <button className="mode-button" onClick={() => props.setMode(true)}>
            <FaCamera style={{fontSize: "40px", color: "white"}} />
          </button>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="video-preview"
          />

          <div className="button-container">
            <button
              style={{ fontSize: "77px", color: "white" }}
              onClick={() => props.navigate("/home")}
            >
              <BiSolidXCircle />
            </button>
            <button
              style={{ fontSize: "66px", color: "white" }}
              onClick={recording ? stopRecording : startRecording}
            >
              {recording ? <FaStopCircle style={{color: "red"}} /> : <FaCircle />}
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
}
