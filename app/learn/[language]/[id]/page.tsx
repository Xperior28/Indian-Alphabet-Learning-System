"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { alphabets } from "@/lib/alphabet-data"
import DrawingCanvas from "@/components/drawing-canvas"
import FeedbackPopup from "@/components/feedback-popup"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useParams } from "next/navigation"

export default function LearnPage() {
  const params = useParams<{ language: string; id: string }>()
  const { language, id } = params
  const alphabetList = alphabets[language] || []
  const currentAlphabet = alphabetList.find((a) => a.id === id) || alphabetList[0]
  const currentIndex = alphabetList.findIndex((a) => a.id === id)
  const nextId = currentIndex < alphabetList.length - 1 ? alphabetList[currentIndex + 1].id : null

  const [showFeedback, setShowFeedback] = useState(false)
  const [progress, setProgress] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${language}-progress`)
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const canvasRef = useRef<any>(null)

  const handlePlaySound = () => {
    // In a real app, this would play the actual pronunciation
    console.log(`Playing sound for ${currentAlphabet.character}`)
  }

  const handleSubmit = () => {
    // In a real app, this would validate the drawing
    setShowFeedback(true)

    // Update progress
    if (!progress.includes(id)) {
      const newProgress = [...progress, id]
      setProgress(newProgress)
      localStorage.setItem(`${language}-progress`, JSON.stringify(newProgress))
    }
  }

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear()
    }
  }

  const progressPercentage = Math.round((progress.length / alphabetList.length) * 100)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-green-100 font-delius">

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <Link href={`/alphabets/${language}`}>
              <Button variant="outline" className="rounded-full mb-24 font-bold border border-black">
                ← Back to Alphabets
              </Button>
            </Link>

            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Letter Display Section */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-purple-300 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-purple-700 mb-16">Learn this letter</h2>

              <div className="text-9xl font-bold text-purple-800 mb-12">{currentAlphabet.character}</div>

              <div className="text-xl mb-6 flex gap-2">
                <p>Pronounced: </p>
                <p className=" underline font-extrabold text-gray-700"> {currentAlphabet.name}</p>
              </div>

              <Button onClick={handlePlaySound} className="rounded-full bg-blue-500 font-semibold hover:bg-blue-600 px-6 ">
                Listen
                <span className="ml-2">🔊</span>
              </Button>
            </div>

            {/* Drawing Section */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-green-300 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Draw the letter</h2>

              {/* Pass the character to DrawingCanvas */}
              <DrawingCanvas ref={canvasRef} character={currentAlphabet.character} />

              <div className="flex gap-4 mt-6">
                <Button onClick={handleClear} variant="outline" className="rounded-full px-6 border border-black font-semibold">
                  Clear
                </Button>

                <Button onClick={handleSubmit} className="rounded-full bg-green-500 font-semibold hover:bg-green-600 px-8">
                  Done!
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="text-xl font-bold text-purple-700 mb-4 ml-2">Progress: {progressPercentage}%</div>
            <div className="w-full bg-gray-200 rounded-full h-[25px] mb-8 border border-pink-300">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-[23px] rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </main>


      {showFeedback && (
        <FeedbackPopup
          onClose={() => setShowFeedback(false)}
          nextUrl={nextId ? `/learn/${language}/${nextId}` : `/alphabets/${language}`}
        />
      )}
    </div>
  )
}

