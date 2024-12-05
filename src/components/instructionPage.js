"use client";
import { CameraIcon, Clock, LucideUniversity, Microscope, NetworkIcon, Scale, User } from "lucide-react";
import React from "react";
import { Button } from "./reusables/button";
import CameraStream from "./cameraController";
import { useRouter } from "next/navigation";

const instructions = [
  {
    id: 1,
    icon: <NetworkIcon />,
    content: "Ensure a stable internet connection and select a quiet, clean environment.",
  },
  {
    id: 2,
    icon: <CameraIcon />,
    content: "Make sure to grant access to the camera, microphone, and screen sharing.",
  },
  {
    id: 3,
    icon: <User />,
    content: "Dress professionally and minimize any distractions during the session.",
  },
  {
    id: 4,
    icon: <Microscope />,
    content: "Provide comprehensive answers with relevant examples and detailed explanations.",
  },
  {
    id: 5,
    icon: <Scale />,
    content: "Refer to specific projects and give examples that highlight your skills.",
  },
];

const InstructionScreen = () => {
  const router = useRouter();
  return (
    <div className="min-h-[calc(100vh-56px)] bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-10 lg:p-14">
      <div className="container mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-3xl font-extrabold text-white md:text-4xl">
            Guildelines for Your Interview
          </h1>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-gray-500 p-3">
              <LucideUniversity className="text-yellow-400" />
              <span className="text-white text-sm sm:text-base">Zeko</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-500 p-3">
              <Clock className="text-yellow-400" />
              <span className="text-white text-sm sm:text-base">26 Minutes</span>
            </div>
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex items-center justify-center">
            <div className="h-[350px] w-full overflow-hidden rounded-xl shadow-xl">
              <CameraStream
                className="h-full w-full rounded-xl object-cover"
                flipHorizontal={true}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Important Instructions
            </h2>
            <div className="space-y-6">
              {instructions.map((instruction) => (
                <div
                  key={instruction.id}
                  className="flex items-center gap-5 rounded-2xl bg-gray-700 p-5 shadow-lg"
                >
                  <div className="text-2xl text-white">
                    {instruction.icon}
                  </div>
                  <div className="text-sm text-white sm:text-base lg:text-lg">
                    {instruction.content}
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => router.push("/permissions")}
              className="mt-6 h-16 w-full rounded-2xl bg-gradient-to-l from-blue-500 to-purple-600 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105"
            >
              Start Your Interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionScreen;
