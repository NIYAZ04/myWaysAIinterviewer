


"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "../../Contexts/questionsDataChangeable";
import CameraStream from "@/components/cameraController";

export default function InterviewPage() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [recordTimer, setRecordTimer] = useState(60);
  const [isCapturing, setIsCapturing] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [finalized, setFinalized] = useState(false);

  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const utteranceRef = useRef(null);

  const startMediaRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaStreamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" });
        setVideoData((prev) => [
          ...prev,
          { question: activeQuestionIndex, data: videoBlob },
        ]);
      };

      recorder.start();
      setIsCapturing(true);
      setRecordTimer(60);
    } catch (error) {
      console.error("Recording error:", error);
    }
  };

  const stopMediaRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    setIsCapturing(false);
  };

  const nextQuestionHandler = () => {
    stopMediaRecording();
    setCameraVisible(false);
    setActiveQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const submitHandler = () => {
    setSubmitted(true);
    setCameraVisible(false);
  };

  const finalSubmitHandler = () => setFinalized(true);

  const playVideo = (blob) => {
    const videoURL = URL.createObjectURL(blob);
    const video = document.createElement("video");
    video.src = videoURL;
    video.controls = true;

    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 flex items-center justify-center bg-black/60 z-50";
    modal.addEventListener("click", () => document.body.removeChild(modal));

    const wrapper = document.createElement("div");
    wrapper.className = "p-4 bg-gray-900 rounded-lg max-w-full max-h-full";
    wrapper.appendChild(video);

    modal.appendChild(wrapper);
    document.body.appendChild(modal);

    video.play();
  };

  useEffect(() => {
    if (utteranceRef.current) window.speechSynthesis.cancel();
  
    utteranceRef.current = new SpeechSynthesisUtterance(
      questions[activeQuestionIndex]?.question
    );
    utteranceRef.current.rate = 0.85;
    utteranceRef.current.pitch = 1.1;
  
    utteranceRef.current.onend = () => {
      setCameraVisible(true);
      startMediaRecording();
    };
  
    window.speechSynthesis.speak(utteranceRef.current);
  
    return () => {
      window.speechSynthesis.cancel();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [activeQuestionIndex, startMediaRecording]);  

  useEffect(() => {
    if (!isCapturing || recordTimer <= 0) return;

    const timer = setInterval(() => setRecordTimer((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isCapturing, recordTimer]);

  if (finalized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-3xl text-white font-bold">Submission Complete!</h1>
          <p className="text-gray-400 mt-4">
            Your responses have been recorded. We’ll review and get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen p-6 bg-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl text-white text-center mb-6">Review Submissions</h1>
          <div className="grid gap-4">
            {questions.map((q, i) => {
              const video = videoData.find((v) => v.question === i);
              return (
                <div key={i} className="p-4 bg-gray-700 rounded-lg">
                  <h2 className="text-lg text-white">{q.question}</h2>
                  {video ? (
                    <button
                      onClick={() => playVideo(video.data)}
                      className="mt-2 bg-blue-500 px-3 py-2 rounded-lg text-white"
                    >
                      Watch Response
                    </button>
                  ) : (
                    <p className="text-red-400">No response recorded</p>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={finalSubmitHandler}
            className="mt-6 w-full bg-green-600 text-white p-3 rounded-lg"
          >
            Submit
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-xl text-white">
          Question {activeQuestionIndex + 1}/{questions.length}:{" "}
          {questions[activeQuestionIndex]?.question}
        </p>

        {cameraVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <CameraStream />
            {activeQuestionIndex === questions.length - 1 ? (
              <button
                onClick={submitHandler}
                className="mt-4 bg-green-500 px-4 py-2 rounded-lg text-white"
              >
                Save & Review
              </button>
            ) : (
              <button
                onClick={nextQuestionHandler}
                className="mt-4 bg-blue-500 px-4 py-2 rounded-lg text-white"
              >
                Save & Next
              </button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
