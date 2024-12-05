import Link from "next/link";
import { Button } from "@/components/reusables/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-blue-900 via-gray-900 to-black px-6 py-12 relative overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse"></div>
       <div className="absolute bottom-16 right-1/4 w-96 h-96 bg-blue-500 opacity-25 rounded-full blur-[120px] animate-pulse"></div>
    </div>

     
      <div className="relative z-10 w-full max-w-xl bg-[#111827]/80 shadow-lg shadow-black/50 rounded-lg p-8 text-center transform hover:scale-[1.03] transition-transform duration-300">
     <div className="space-y-4">
         <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          AI Interview Assistant
         </h1>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Elevate your interview experience with cutting-edge AI technology.
            Your success starts here.
          </p>
        </div>


        <div className="mt-6">
          <Link href="/instructions">
            <Button
              size="lg"
              className="bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-full shadow-md hover:shadow-xl hover:from-purple-700 hover:to-blue-600 transition-all px-6 py-3"
            >
              <span className="flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 transition-transform transform hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
