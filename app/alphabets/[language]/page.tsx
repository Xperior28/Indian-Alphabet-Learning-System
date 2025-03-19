"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { alphabets } from "@/lib/alphabet-data"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CheckCircle } from "lucide-react"
import { useParams } from "next/navigation"

export default function AlphabetList() {
  const params = useParams<{ language: string }>()
  const language = params.language
  const alphabetList = alphabets[language] || []

  const [completedLetters, setCompletedLetters] = useState<string[]>([])
  const [completionPercentage, setCompletionPercentage] = useState(0)

  useEffect(() => {
    // Load completed letters from localStorage
    const saved = localStorage.getItem(`${language}-progress`)
    const progress = saved ? JSON.parse(saved) : []
    setCompletedLetters(progress)

    // Calculate completion percentage
    const percentage = Math.round((progress.length / alphabetList.length) * 100)
    setCompletionPercentage(percentage)
  }, [language, alphabetList.length])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-yellow-100 to-orange-100 font-delius">

      <main className="flex-grow container mx-auto px-4 py-8">
        <Link href="/select-language" className="inline-block mb-8">
          <Button variant="outline" className="rounded-full border border-black font-bold">
            ← Back to Languages
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-600 capitalize underline">{language} Alphabets</h1>
          <p className="text-xl text-gray-700 mb-2">Click on any letter to start learning!</p>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="bg-white rounded-full px-4 py-2 shadow-md border border-orange-200 flex items-center">
              <span className="text-orange-600 font-bold mr-2">Progress:</span>
              <span className="text-gray-700">
                {completedLetters.length} of {alphabetList.length} completed
              </span>
              <span className="ml-2 text-green-600 font-bold">({completionPercentage}%)</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-4 mb-8">
            <div
              className="bg-gradient-to-r from-orange-500 to-yellow-500 h-4 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {alphabetList.map((alphabet) => {
            const isCompleted = completedLetters.includes(alphabet.id)

            return (
              <Link
                key={alphabet.id}
                href={`/learn/${language}/${alphabet.id}`}
                className="transform transition-transform hover:scale-110 relative"
              >
                <div
                  className={`bg-white rounded-2xl p-4 shadow-lg border-4 ${isCompleted ? "border-green-300" : "border-pink-300"} flex flex-col items-center aspect-square`}
                >
                  <div className="flex items-center justify-center h-full">
                    <span className="text-5xl font-bold text-purple-700">{alphabet.character}</span>
                  </div>

                  {isCompleted && (
                    <div className="absolute -top-3 -right-3 bg-green-500 rounded-full p-1 shadow-md">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-center mt-2 font-bold text-gray-700">{alphabet.name}</p>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}

