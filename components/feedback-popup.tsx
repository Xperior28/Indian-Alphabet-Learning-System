"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Confetti from "@/components/confetti"
import Balloons from "@/components/balloons"

interface FeedbackPopupProps {
  onClose: () => void
  nextUrl: string
}

const feedbackMessages = [
  "Great job! 🎉",
  "Wonderful! 🌟",
  "Amazing work! 👏",
  "Fantastic! 🥳",
  "You did it! 🚀",
  "Excellent! 🏆",
  "Perfect! ⭐",
  "Brilliant! 💫",
  "Superb! 🌈",
  "Awesome! 🎊",
]

export default function FeedbackPopup({ onClose, nextUrl }: FeedbackPopupProps) {
  const [message] = useState(() => {
    const randomIndex = Math.floor(Math.random() * feedbackMessages.length)
    return feedbackMessages[randomIndex]
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative">
        {/* Confetti animation */}
        <Confetti />

        {/* Balloon animation */}
        <Balloons />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-xl border-8 border-yellow-300 max-w-md w-full"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-600 mb-4">{message}</h2>

            <p className="text-xl text-gray-700 mb-8">You've done a great job drawing this letter!</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={nextUrl}>
                <Button className="rounded-full bg-green-500 hover:bg-green-600 px-6 py-2 text-lg" onClick={onClose}>
                  {nextUrl.includes("alphabets") ? "Back to Alphabet List" : "Next Letter"}
                </Button>
              </Link>

              <Button variant="outline" className="rounded-full px-6 py-2 text-lg" onClick={onClose}>
                Try Again
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

