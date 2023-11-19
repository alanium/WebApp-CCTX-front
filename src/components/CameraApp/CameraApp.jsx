import React, { useState, useRef } from 'react';
import './CameraApp.css';

const CameraApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [facingMode, setFacingMode] = useState('user'); // 'user' for front camera, 'environment' for back camera

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode }
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
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

      // Ajustar la resolución del canvas para mejorar la calidad
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convertir la imagen a Blob con calidad '1' (sin compresión)
      canvas.toBlob((blob) => {
        // Crear un enlace de descarga
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'photo.png';

        // Simular un clic en el enlace para iniciar la descarga
        link.click();

        // Liberar recursos
        URL.revokeObjectURL(link.href);
      }, 'image/png', 1); // Calidad '1' sin compresión
    }
  };

  const switchCamera = () => {
    setFacingMode((prevFacingMode) => (prevFacingMode === 'user' ? 'environment' : 'user'));
    stopCamera();
    startCamera();
  };

  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <video ref={videoRef} autoPlay playsInline />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div>
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={stopCamera}>Stop Camera</button>
        <button onClick={takePhoto}>Take Photo</button>
        <button onClick={switchCamera}>Switch Camera</button>
      </div>
    </div>
  );
};

export default CameraApp;
