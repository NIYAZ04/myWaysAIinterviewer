
"use client";
import React, { useRef, useEffect } from "react";

const CameraStream = ({ className, flipHorizontal, flipVertical }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream = null;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current
            .play()
            .catch((err) => console.error("Error playing video:", err));
        }
      })
      .catch((err) => console.error("Error accessing camera:", err));

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const transformStyles = [
    flipHorizontal ? "scaleX(-1)" : "",
    flipVertical ? "scaleY(-1)" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-lg ${className}`}>
     
      <video
        ref={videoRef}
        className="w-full h-full"
        style={{
          transform: transformStyles,
          objectFit: "cover",
        }}
        autoPlay
        muted
      />
      
      <div className="absolute inset-0 border-4 border-blue-500 rounded-2xl pointer-events-none" />
      
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-4/5 h-4/5 border border-white/50 rounded-lg" />
      </div>
    </div>
  );
};

export default CameraStream;
