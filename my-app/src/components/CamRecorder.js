import React, { useRef } from "react";

function CameraPreview() {
  const videoRef = useRef(null);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      console.log("Camera started successfully");
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  return (
    <div>
      <video ref={videoRef} width="480" height="360" autoPlay playsInline />
      <button onClick={openCamera}>Open Camera</button>
    </div>
  );
}

export default CameraPreview;
