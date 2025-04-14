"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { words } from "@/lib/word-data"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "@/components/confetti"
import Balloons from "@/components/balloons"
import { GameStats, DashboardStats, updateStats } from "@/lib/game-stats"
import Link from "next/link"

export default function WordBuilder({ language }: { language: string }) {
  const [currentWord, setCurrentWord] = useState<{ id: string; word: string; meaning: string; characters: string[] } | null>(
    null
  )
  const [selectedLetters, setSelectedLetters] = useState<string[]>([])
  const [availableLetters, setAvailableLetters] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [sessionScore, setSessionScore] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showBalloons, setShowBalloons] = useState(false)
  const [key, setKey] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [gameCompleted, setGameCompleted] = useState(false)

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
    if (!startTime) {
      setStartTime(Date.now())
    }
    setGameCompleted(false)
    setKey(prev => prev + 1)
  }

  const handleLetterClick = (letter: string, index: number) => {
    if (!currentWord) return

    const newSelectedLetters = [...selectedLetters, letter]
    setSelectedLetters(newSelectedLetters)

    // Remove the clicked letter from available letters
    const newAvailableLetters = [...availableLetters]
    newAvailableLetters.splice(index, 1)
    setAvailableLetters(newAvailableLetters)
  }

  const handleCheckWord = () => {
    if (!currentWord) return

    const builtWord = selectedLetters.join("")
    if (builtWord === currentWord.word) {
      const newScore = score + 1
      const newSessionScore = sessionScore + 1
      
      setScore(newScore)
      setSessionScore(newSessionScore)
      setFeedback("Correct! Well done! 🎉")
      setShowConfetti(true)
      setShowBalloons(true)
      setGameCompleted(true)
      
      setTimeout(() => {
        initializeGame()
      }, 2000)
    } else {
      setScore(0)
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

  const handleRemoveLetter = (index: number) => {
    const letterToRemove = selectedLetters[index]
    const newSelectedLetters = [...selectedLetters]
    newSelectedLetters.splice(index, 1)
    setSelectedLetters(newSelectedLetters)
    setAvailableLetters([...availableLetters, letterToRemove])
  }

  const handleNewGame = () => {
    // Save current game stats before resetting
    if (startTime) {
      saveGameStats()
    }
    
    // Reset all states
    setScore(0)
    setSessionScore(0)
    setStartTime(null)
    initializeGame()
  }

  const saveGameStats = () => {
    if (!startTime) return

    // Get existing stats from localStorage
    const existingStats = localStorage.getItem('gameStats')
    const stats: DashboardStats = existingStats ? JSON.parse(existingStats) : {
      totalGames: 0,
      languages: {},
      recentGames: []
    }

    // Create new game stats
    const gameStats: GameStats = {
      language,
      gameType: 'word-builder',
      moves: sessionScore,
      time: Math.floor((Date.now() - startTime) / 1000),
      date: new Date().toISOString()
    }

    // Update stats
    const updatedStats = updateStats(stats, gameStats)

    // Save back to localStorage
    localStorage.setItem('gameStats', JSON.stringify(updatedStats))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-blue-100 p-4 font-delius">
      <div className="absolute top-12 left-10">
        <Link href={`/select-game?language=${language}`}>
          <Button 
            variant="outline" 
            className="rounded-full border-2 border-green-500 hover:bg-green-500 hover:text-white transition-colors font-delius"
            onClick={() => {
              if (startTime) {
                saveGameStats()
              }
            }}
          >
            Back to Games
          </Button>
        </Link>
      </div>
      {showConfetti && <Confetti />}
      {showBalloons && <Balloons />}
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-green-700 mb-4">Word Builder</h1>
        <div className="flex justify-center gap-4 items-center">
          <Button 
            onClick={handleNewGame} 
            variant="outline" 
            className="rounded-full border-2 border-green-500 hover:bg-green-500 hover:text-white transition-colors font-delius"
          >
            New Game
          </Button>
          
          <div className="bg-white rounded-full px-4 py-2 shadow-lg border-2 border-green-300">
            <span className="text-green-700 font-bold">Score: {score}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 shadow-lg border-4 border-green-300 mb-8"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4">Current Word</h2>
        <p className="text-4xl font-bold text-green-600 mb-2">{currentWord?.word}</p>
        <p className="text-xl text-gray-600">{currentWord?.meaning}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 shadow-lg border-4 border-green-300 mb-8"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4">Your Word</h2>
        <div className="flex gap-2 mb-4 min-h-[60px]">
          {selectedLetters.map((letter, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-green-100 text-green-700 text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-lg border-2 border-green-300"
            >
              {letter}
            </motion.div>
          ))}
        </div>
        <Button 
          onClick={handleCheckWord}
          className="rounded-full bg-green-500 font-semibold hover:bg-green-600 px-8"
          disabled={selectedLetters.length !== currentWord?.characters.length}
        >
          Check Word
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 shadow-lg border-4 border-green-300 mb-8"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4">Available Letters</h2>
        <div className="grid grid-cols-5 gap-4">
          {availableLetters.map((letter, index) => (
            <motion.button
              key={`${key}-${index}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleLetterClick(letter, index)}
              className="bg-green-100 text-green-700 text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-lg border-2 border-green-300 hover:bg-green-200 transition-colors"
            >
              {letter}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-lg border-2 border-green-300"
          >
            <p className="text-green-700 font-semibold">{feedback}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 