import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const CameraRecorder = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);

  const handleStartRecording = () => {
    const stream = webcamRef.current.stream;
    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) setChunks((prev) => [...prev, event.data]);
    };
    mediaRecorderRef.current.start(10000); // collect 10-second chunks
    setRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);

    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "session_recording.webm";
    a.click();
    setChunks([]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        style={{ width: 480, height: 360 }}
      />
      <div>
        {!recording ? (
          <button onClick={handleStartRecording}>Start Recording</button>
        ) : (
          <button onClick={handleStopRecording}>Stop & Download</button>
        )}
      </div>
    </div>
  );
};

export default CameraRecorder;
