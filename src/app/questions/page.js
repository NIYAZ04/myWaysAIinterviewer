import Navbar from '@/components/navbar'
import InterviewPage from '@/components/interviewPage' 
import React from 'react'
import { PermissionProvider } from '../../../Contexts/PermissionContexts'

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      <PermissionProvider>
        <InterviewPage />
      </PermissionProvider>
    </div>
  )
}

export default Page
