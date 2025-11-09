import React, { Component, createRef } from "react";
import CameraStream from "./CameraStream";
import { sharedPoseDetector } from "./PoseDetector";

class CameraPreview extends Component {
  constructor(props) {
    super(props);
    this.videoRef = createRef();
    this.canvasRef = createRef();
    this.state = {
      visible: false,
      isStreaming: false,
      isRecording: false,
      message: null,
    };
    this.cameraStream = null;
    this._hiddenVideo = null;
    this._drawRaf = null;
    this._poseDetector = null;
    this.mediaRecorder = null;
    this.recordedChunks = [];
  }

  componentDidUpdate(prevProps) {
    if (prevProps.poseEnabled !== this.props.poseEnabled) {
      try {
        sharedPoseDetector.setEnabled(!!this.props.poseEnabled);
      } catch (e) {}

      if (this.props.poseEnabled && this.cameraStream && CameraStream.getCurrentStream()) {
        if (!this._poseDetector) {
          try {
            this._poseDetector = sharedPoseDetector;
            this._poseDetector.videoElement = this._hiddenVideo;
            this._poseDetector.canvasElement = this.canvasRef.current;
            this._poseDetector.onResult = (det) => {
              if (this.props.onPoseResult) this.props.onPoseResult(det);
            };
            this._poseDetector.init().then(() => this._poseDetector.start()).catch(() => {});
          } catch (err) {
            console.error("Pose detector error:", err);
          }
        }
      }

      if (!this.props.poseEnabled && this._poseDetector) {
        try { this._poseDetector.stop(); } catch (e) {}
        this._poseDetector = null;
      }
    }
  }

  async startCamera() {
    try {
      if (!this.cameraStream) this.cameraStream = new CameraStream(this.videoRef.current);

      const s = await this.cameraStream.start();
      if (!s) throw new Error("No camera stream available.");

      if (this.props.onStreamReady) this.props.onStreamReady(s);
      this.setState({ isStreaming: true, message: null });
      this._ensureHiddenVideoAndLoop(s);

      if (this.props.poseEnabled !== false && sharedPoseDetector.getEnabled()) {
        try {
          this._poseDetector = sharedPoseDetector;
          this._poseDetector.videoElement = this._hiddenVideo;
          this._poseDetector.canvasElement = this.canvasRef.current;
          this._poseDetector.onResult = (det) => {
            if (this.props.onPoseResult) this.props.onPoseResult(det);
          };
          await this._poseDetector.init();
          await this._poseDetector.start();
        } catch (err) {
          console.error("Pose detector start error:", err);
        }
      }
    } catch (err) {
      console.error("Camera start error:", err);
      this.setState({ message: "Camera unavailable or permission denied.", isStreaming: false });
    }
  }

  stopCamera() {
    try {
      if (this._poseDetector) {
        try { this._poseDetector.stop(); } catch (e) {}
        this._poseDetector = null;
      }

      if (this._drawRaf) {
        cancelAnimationFrame(this._drawRaf);
        this._drawRaf = null;
      }

      if (this._hiddenVideo) {
        try { this._hiddenVideo.pause(); } catch (e) {}
        this._hiddenVideo.srcObject = null;
        this._hiddenVideo = null;
      }

      if (this.cameraStream) this.cameraStream.stop();
      this.setState({ isStreaming: false });
    } catch (err) {
      console.error("Camera stop error:", err);
      this.setState({ message: "Failed to stop camera." });
    }
  }

  _ensureHiddenVideoAndLoop(stream) {
    if (!this.canvasRef.current) return;
    if (!this._hiddenVideo) {
      this._hiddenVideo = document.createElement("video");
      this._hiddenVideo.muted = true;
      this._hiddenVideo.playsInline = true;
      this._hiddenVideo.style.display = "none";
      document.body.appendChild(this._hiddenVideo);
    }
    this._hiddenVideo.srcObject = stream;
    this._hiddenVideo.play().catch(() => {});

    const drawLoop = () => {
      const canvas = this.canvasRef.current;
      const ctx = canvas && canvas.getContext("2d");
      if (ctx && this._hiddenVideo && this._hiddenVideo.readyState >= 2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        try { ctx.drawImage(this._hiddenVideo, 0, 0, canvas.width, canvas.height); } catch (e) {}

        try {
          if (this.props.poseEnabled !== false && sharedPoseDetector.getEnabled()) {
            const lm = sharedPoseDetector.latestLandmarks;
            if (lm) sharedPoseDetector.drawPose(ctx, lm);
          }
        } catch (e) {}
      }
      this._drawRaf = requestAnimationFrame(drawLoop);
    };

    if (!this._drawRaf) this._drawRaf = requestAnimationFrame(drawLoop);
  }

  startRecording = () => {
    try {
      if (!this._hiddenVideo || this.state.isRecording) return;
      const stream = this._hiddenVideo.srcObject;
      if (!stream) throw new Error("No video stream to record.");

      this.mediaRecorder = new MediaRecorder(stream);
      this.recordedChunks = [];

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.recordedChunks.push(e.data);
      };
      this.mediaRecorder.onstop = this.handleRecordingStop;
      this.mediaRecorder.start();

      this.setState({ isRecording: true, message: "Recording..." });
    } catch (err) {
      console.error("Start recording error:", err);
      this.setState({ message: "Failed to start recording." });
    }
  };

  stopRecording = () => {
    try {
      if (!this.mediaRecorder || !this.state.isRecording) return;
      this.mediaRecorder.stop();
      this.setState({ isRecording: false, message: "Stopped recording." });
    } catch (err) {
      console.error("Stop recording error:", err);
      this.setState({ message: "Failed to stop recording." });
    }
  };

  handleRecordingStop = () => {
    try {
      if (!this.recordedChunks.length) throw new Error("No recorded data available.");

      const blob = new Blob(this.recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      // Automatic download
      const a = document.createElement("a");
      a.href = url;
      a.download = "recording.webm";
      a.click();

      this.setState({ message: "Download complete." });
      setTimeout(() => this.setState({ message: null }), 2000);
    } catch (err) {
      console.error("Download error:", err);
      this.setState({ message: "Failed to download recording." });
    }
  };

  toggleVisibility = () => this.setState(prev => ({ visible: !prev.visible }));

  componentWillUnmount() {
    try { this.stopCamera(); } catch (e) {}
  }

  componentDidMount() {
    if (this.props.autoStart) this.startCamera();
  }

  render() {
    const { visible, isStreaming, isRecording, message } = this.state;

    return (
      <>
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "320px",
            height: "260px",
            backgroundColor: "#1e1e1e",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: visible ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "opacity 0.3s ease",
            opacity: visible ? 1 : 0,
          }}
        >
          <canvas
            ref={this.canvasRef}
            width={320}
            height={200}
            style={{ width: "100%", height: "100%", borderRadius: "6px", display: "block" }}
          />

          {message && (
            <div
              style={{
                color: "yellow",
                fontSize: "0.9em",
                textAlign: "center",
                marginTop: "4px",
              }}
            >
              {message}
            </div>
          )}

          <div style={{ marginTop: "6px" }}>
            {!isStreaming ? (
              <button
                onClick={() => this.startCamera()}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                ▶ Start
              </button>
            ) : (
              <button
                onClick={() => this.stopCamera()}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
              >
                ■ Stop
              </button>
            )}

            {isStreaming && !isRecording && (
              <button
                onClick={this.startRecording}
                style={{
                  backgroundColor: "#ffc107",
                  color: "black",
                  border: "none",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                ⏺ Record
              </button>
            )}
            {isRecording && (
              <button
                onClick={this.stopRecording}
                style={{
                  backgroundColor: "#17a2b8",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                ⏹ Stop
              </button>
            )}
          </div>
        </div>

        <button
          onClick={this.toggleVisibility}
          style={{
            position: "fixed",
            bottom: "20px",
            right: visible ? "360px" : "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "20px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            zIndex: 1001,
            transition: "right 0.3s ease",
          }}
        >
          {visible ? "×" : "📷"}
        </button>
      </>
    );
  }
}

export default CameraPreview;
