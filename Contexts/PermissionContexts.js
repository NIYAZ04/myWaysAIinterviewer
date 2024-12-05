"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
const PermissionContext = createContext(undefined);
export const PermissionProvider = ({ children }) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState(false);
  const [speakerPermission, setSpeakerPermission] = useState(false);
  const [screenSharePermission, setScreenSharePermission] = useState(false);
  const [isAllPermissionsGranted, setIsAllPermissionsGranted] = useState(false);

  const grantCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission(true);
      return true;
    } catch (error) {
      console.error("Camera permission cancelled:", error);
      return false;
    }
  };

  const grantMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophonePermission(true);
      return true;
    } catch (error) {
      console.error("Microphone permission cancelled:", error);
      return false;
    }
  };

  const grantSpeakerPermission = async () => {
    try {
      setSpeakerPermission(true);
      return true;
    } catch (error) {
      console.error("Speaker permission cancelled:", error);
      return false;
    }
  };

  const grantScreenSharePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      stream.getVideoTracks()[0].onended = () => {
        setScreenSharePermission(false);
      };

      setScreenSharePermission(true);
      return true;
    } catch (error) {
      console.error("Screen sharing permission cancelled:", error);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const camera = await grantCameraPermission();
      const mic = await grantMicrophonePermission();
      const speaker = await grantSpeakerPermission();
      const screenShare = await grantScreenSharePermission();

      setIsAllPermissionsGranted(camera && mic && speaker && screenShare);
    })();
  }, []);

  return (
    <PermissionContext.Provider
      value={{
        cameraPermission,
        microphonePermission,
        speakerPermission,
        screenSharePermission,
        isAllPermissionsGranted,
        grantCameraPermission,
        grantMicrophonePermission,
        grantSpeakerPermission,
        grantScreenSharePermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("Please");
  }
  return context;
};
