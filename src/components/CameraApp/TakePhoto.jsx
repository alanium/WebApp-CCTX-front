import React, { useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import { BiSolidXCircle } from "react-icons/bi";
import { PiVideoCameraFill } from "react-icons/pi";

export default function TakePhoto(props) {
  const videoCaptureRef = useRef(null);
  const captureStreamRef = useRef(null);
  useEffect(() => {
    const requestLocationAccess = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        props.getLocation();
      } catch (error) {
        console.error("Error requesting location access:", error);
      }
    };

    const startCameraAndRequestLocation = async () => {
      await props.startCamera();
      await requestLocationAccess();
      props.setPermissions(true);
    };

    const init = async () => {
      await startCameraAndRequestLocation();
      captureAndUpload();
    };

    init();

    return () => {
      props.stopCamera();
      stopCapture();
    };
  }, []);

  const captureAndUpload = async () => {
    try {
      if (videoCaptureRef.current && props.canvasRef.current) {
        await props.stopCamera();
        startCapture().then(() => {
          const video = videoCaptureRef.current;
          const canvas = props.canvasRef.current;
  
          const aspectRatio = video.videoWidth / video.videoHeight;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
  
          const context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
          canvas.toBlob(async (blob) => {
            try {
              await props.uploadImageToFirebase(blob);
            } catch (error) {
              console.log(error);
            }
          }, "image/png", 1);
  
          props.startCamera();
        }).catch(error => {
          console.error(error);
        });
      }
    } catch (error) {
      console.error("Error capturing and uploading:", error);
    }
  };

  const startCapture = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 4096 }, height: { ideal: 2160 } },
        });
        if (videoCaptureRef.current) {
          videoCaptureRef.current.srcObject = stream;
          captureStreamRef.current = stream;
          resolve(); // Resolve the promise after setting the stream
        } else {
          reject("videoCaptureRef.current is null or undefined");
        }
      } catch (error) {
        reject("Error accessing camera for capture: " + error);
      }
    });
  };
  

  const stopCapture = () => {
    if (captureStreamRef.current) {
      const tracks = captureStreamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      captureStreamRef.current = null;
    }
  };

  const takePhoto = async () => {
    try {
      await props.stopCamera();
      await startCapture();
      if (videoCaptureRef.current && props.canvasRef.current) {
        await props.getLocation();
        const video = videoCaptureRef.current;
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
      stopCapture();
      props.startCamera();
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  return (
    <div className="camera-container">
      <button className="mode-button" onClick={() => props.setMode(false)}>
        <PiVideoCameraFill style={{ fontSize: "77px", color: "white" }} />
      </button>
      <video
        ref={props.videoRef}
        autoPlay
        playsInline
        className="video-preview"
      />

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
