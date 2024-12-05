"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const InterviewInstructions = () => {
  const router = useRouter();

  const instructions = [
    {
      img: "/websiteImage1.jpg",
      alt: "Respond promptly",
      text: "Answer questions without unnecessary delays or prolonged pauses.",
    },
    {
      img: "/websiteImage2.jpg",
      alt: "Maintain eye contact",
      text: "Keep your gaze on the camera and avoid looking away from the screen.",
    },
    {
      img: "/websiteImage3.jpg",
      alt: "Stay alone on screen",
      text: "Make sure only you are visible in the camera frame during the interview.",
    },
    {
      img: "/websiteImage5.jpg",
      alt: "Avoid minimizing the screen",
      text: "Minimizing the window will result in your session being terminated.",
    },
    {
      img: "/websiteImage4.jpg",
      alt: "Do not switch tabs",
      text: "Switching tabs during the interview is not allowed.",
    },
  ];
  
  return (
    <div className="bg-gray-900 text-white min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
      <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
        Interview Instructions <span className="text-red-500">!!</span>
      </div>
      <div className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 text-center max-w-2xl">
        You're in a proctored test environment. If caught in any suspicious behavior, you will be marked{" "}
        <span className="text-red-500">FAIL</span>.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-[1200px] justify-items-center">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex flex-col items-center justify-start w-full max-w-[250px]">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
              <Image
                src={instruction.img}
                alt={instruction.alt}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="mt-2 sm:mt-3 md:mt-4 text-center text-sm sm:text-base">
              {index + 1}. {instruction.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 sm:mt-8 md:mt-10 text-green-500 text-base sm:text-lg md:text-xl text-center">
        Stay focused and do your best!
      </div>
      <button
        onClick={() => router.push('/questions')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6 sm:mt-8 md:mt-10 text-sm sm:text-base md:text-lg transition-colors duration-200"
      >
        I Understand, start the interview
      </button>
    </div>
  );
};

export default InterviewInstructions;
