import InterviewInstructions from '@/components/finalStart'
import InstructionScreen from '@/components/instructionPage'
import Navbar from '@/components/navbar'
import PermissionScreen from '@/components/permissionPage'
import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      <InterviewInstructions />
    </div>
  );
};

export default Page;