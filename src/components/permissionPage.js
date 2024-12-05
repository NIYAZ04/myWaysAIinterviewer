"use client";

import React from "react";
import CameraStream from "@/components/cameraController";
import { Button } from "@/components/reusables/button";
import { Camera, Mic, Speaker, ScreenShareIcon, LucideUniversity, Clock, Check } from 'lucide-react';
import { useRouter } from "next/navigation";
import { usePermissions } from "../../Contexts/PermissionContexts";

const PermissionScreen = () => {
  const {
    cameraPermission,
    microphonePermission,
    speakerPermission,
    screenSharePermission,//screen
    isAllPermissionsGranted,
    grantCameraPermission,
    grantMicrophonePermission,
    grantSpeakerPermission,
    grantScreenSharePermission,
  } = usePermissions();

  const router = useRouter();

  const instructions = [
    { id: 1, icon: <Camera />, content: "Check Camera", fn: grantCameraPermission, permissionState: cameraPermission },
    { id: 2, icon: <Mic />, content: "Check Microphone", fn: grantMicrophonePermission, permissionState: microphonePermission },
    { id: 3, icon: <Speaker />, content: "Check Speaker", fn: grantSpeakerPermission, permissionState: speakerPermission },
    { id: 4, icon: <ScreenShareIcon />, content: "Enable Screen Sharing", fn: grantScreenSharePermission, permissionState: screenSharePermission },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-gray-800 min-h-screen py-8 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto max-w-7xl space-y-12">
        <header className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-3xl font-extrabold text-white">
            Trainee Interview
          </div>
          <div className="flex items-center gap-4 text-white text-lg sm:text-xl">
            <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-xl shadow-md">
              <LucideUniversity className="text-orange-400" />
              <span>Zeko</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-xl shadow-md">
              <Clock className="text-orange-400" />
              <span>15 Minutes</span>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
              {cameraPermission && (
                <CameraStream
                  className="h-full w-full object-cover"
                  flipHorizontal={true}
                />
              )}
            </div>
          </div>

          {}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-semibold text-white mb-6">Permissions Check</h2>
            <div className="space-y-6">
              {instructions.map((instruction) => (
                <div
                  key={instruction.id}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl text-white">
                      {instruction.icon}
                    </div>
                    <span className="text-white text-lg">{instruction.content}</span>
                  </div>
                  {instruction.permissionState && (
                    <Check className="text-green-500 w-6 h-6" />
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={() => router.push("/InterviewInstructions")}
              className={`mt-8 w-full h-16 text-xl font-semibold text-white rounded-xl shadow-lg transition-all duration-300 ease-in-out ${
                isAllPermissionsGranted
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
              disabled={!isAllPermissionsGranted}
            >
              {isAllPermissionsGranted ? "Start Interview" : "Complete All Checks"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionScreen;
