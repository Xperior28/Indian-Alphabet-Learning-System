"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { words } from "@/lib/word-data"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "@/components/confetti"
import Balloons from "@/components/balloons"

export default function WordBuilder({ language }: { language: string }) {
  const [currentWord, setCurrentWord] = useState<{ id: string; word: string; meaning: string; characters: string[] } | null>(
    null
  )
  const [selectedLetters, setSelectedLetters] = useState<string[]>([])
  const [availableLetters, setAvailableLetters] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showBalloons, setShowBalloons] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    initializeGame()
  }, [language])

  const getNewLetterSet = (word: { characters: string[] }) => {
    const languageWords = words[language] || []
    const allCharacters = languageWords.flatMap((w) => w.characters)
    
    // Get 10 random characters, ensuring the current word's characters are included
    const extraCharacters = Array.from({ length: 10 - word.characters.length }, () => {
      return allCharacters[Math.floor(Math.random() * allCharacters.length)]
    })
    
    // Combine word characters with extra characters and shuffle
    const allLetters = [...word.characters, ...extraCharacters]
    return allLetters.sort(() => Math.random() - 0.5)
  }

  const initializeGame = () => {
    const languageWords = words[language] || []
    const randomWord = languageWords[Math.floor(Math.random() * languageWords.length)]
    setCurrentWord(randomWord)
    setAvailableLetters(getNewLetterSet(randomWord))
    setSelectedLetters([])
    setFeedback(null)
    setShowConfetti(false)
    setShowBalloons(false)
    setKey(prev => prev + 1)
  }

  const handleLetterClick = (letter: string, index: number) => {
    if (!currentWord || selectedLetters.length >= currentWord.characters.length) return

    const newSelectedLetters = [...selectedLetters, letter]
    setSelectedLetters(newSelectedLetters)

    // Remove the clicked letter from available letters
    const newAvailableLetters = [...availableLetters]
    newAvailableLetters.splice(index, 1)
    setAvailableLetters(newAvailableLetters)

    // Check if the word is complete
    if (newSelectedLetters.length === currentWord.characters.length) {
      const builtWord = newSelectedLetters.join("")
      if (builtWord === currentWord.word) {
        setScore((prev) => prev + 1)
        setFeedback("Correct! Well done! 🎉")
        setShowConfetti(true)
        setShowBalloons(true)
        setTimeout(() => {
          initializeGame()
        }, 2000)
      } else {
        setFeedback("Try again! The word is not correct.")
        setTimeout(() => {
          // Get a new random word and reset the game
          const languageWords = words[language] || []
          const randomWord = languageWords[Math.floor(Math.random() * languageWords.length)]
          setCurrentWord(randomWord)
          setAvailableLetters(getNewLetterSet(randomWord))
          setSelectedLetters([])
          setKey(prev => prev + 1)
        }, 1000)
      }
    }
  }

  const handleRemoveLetter = (index: number) => {
    const letterToRemove = selectedLetters[index]
    const newSelectedLetters = [...selectedLetters]
    newSelectedLetters.splice(index, 1)
    setSelectedLetters(newSelectedLetters)
    setAvailableLetters([...availableLetters, letterToRemove])
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-blue-100 p-8 font-delius">
      {showConfetti && <Confetti />}
      {showBalloons && <Balloons />}
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-green-700 mb-4">Word Builder</h1>
        <div className="bg-white rounded-xl p-6 shadow-lg mb-4 border-2 border-green-300">
          <p className="text-2xl font-bold text-green-700 mb-2">
            Word: {currentWord?.word}
          </p>
          <p className="text-xl text-gray-700">
            Meaning: {currentWord?.meaning}
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={initializeGame} 
            variant="outline" 
            className="rounded-full border-2 border-green-500 hover:bg-green-500 hover:text-white transition-colors"
          >
            New Word
          </Button>
          <div className="bg-white rounded-full px-6 py-2 shadow-lg border-2 border-green-300">
            <span className="text-green-700 font-bold">Score: {score}</span>
          </div>
        </div>
      </motion.div>

      {/* Selected letters display */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 mb-8 min-h-[60px]"
      >
        {selectedLetters.map((letter, index) => (
          <motion.div
            key={index}
            className="w-12 h-12 bg-white rounded-xl shadow-lg border-4 border-green-300 flex items-center justify-center text-2xl font-bold text-green-700 cursor-pointer"
            onClick={() => handleRemoveLetter(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {letter}
          </motion.div>
        ))}
      </motion.div>

      {/* Available letters */}
      <motion.div 
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-5 gap-4 max-w-2xl"
      >
        {availableLetters.map((letter, index) => (
          <motion.div
            key={`${key}-${index}`}
            className="w-12 h-12 bg-white rounded-xl shadow-lg border-4 border-blue-300 flex items-center justify-center text-2xl font-bold text-blue-700 cursor-pointer"
            onClick={() => handleLetterClick(letter, index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {letter}
          </motion.div>
        ))}
      </motion.div>

      {/* Feedback message */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 text-xl font-bold"
            style={{ color: feedback.includes("Correct") ? "#10b981" : "#ef4444" }}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 