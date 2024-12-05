# AI Interview Platform Frontend  

This repository contains the frontend implementation of an **AI Interview Platform**, developed as part of the Frontend Intern Hiring Task. The project is built with **Next.js**, **Shadcn UI**, and **TailwindCSS**. It replicates the functionality and flow of the provided reference platform, including the instruction screen, permission checks, question and recording screens, and more.  

## Features  

### Instruction Screen  
- Displays test instructions to the user before beginning the interview.  
- Clean and minimal UI design.  

### Check Permission Screen  
- Prompts the user to grant necessary permissions for:  
  - Accessing their **camera** and **microphone** using `navigator.mediaDevices.getUserMedia()`.  
  - **Screen sharing** using `navigator.mediaDevices.getDisplayMedia()`.  
- Handles permission errors gracefully.  

### Question Screen  
- Displays questions one at a time, with the option to play the question's audio.  
- Uses `SpeechSynthesis` API for question playback.  

### Answer Recording Screen  
- Captures audio and video using the browser's Media APIs.  
- Displays a recording timer and a live video preview inside a styled frame.  
- Sends recorded chunks to the API for further processing.  

### Loader Screen & Test Completion Screen  
- Displays a loader during data processing.  
- Notifies the user upon successful completion of the test.  

## Bonus Improvements  
- Enhanced **UI/UX** using animations, polished layouts, and responsive design.  
- Integrated smooth transitions and dynamic effects for a professional feel.  
- Modular and reusable components for better scalability and maintainability.  

## Interface of Website 

![Screenshot From 2024-12-06 02-58-26](https://github.com/user-attachments/assets/be17632c-12c8-4cb4-a1df-8394d8cb2de1)
![Screenshot From 2024-12-06 02-59-23](https://github.com/user-attachments/assets/380d6f4f-b650-4982-b7fd-9a09d9c7e8b9)

![Screenshot From 2024-12-06 02-59-50](https://github.com/user-attachments/assets/c8cb5011-4b33-4bb4-8d65-3c763457c216)
