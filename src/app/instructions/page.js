import InstructionScreen from '@/components/instructionPage'
import Navbar from '@/components/navbar'
import React from 'react'


const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      <InstructionScreen />
    </div>
  );
};

export default Page;