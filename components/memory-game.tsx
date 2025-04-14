"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { alphabets } from "@/lib/alphabet-data"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "@/components/confetti"
import Balloons from "@/components/balloons"
import { GameStats, DashboardStats, updateStats } from "@/lib/game-stats"
import Link from "next/link"

type Card = {
  id: string
  character: string
  pronunciation: string
  isFlipped: boolean
  isMatched: boolean
  type: 'letter' | 'pronunciation'
}

interface AlphabetLetter {
  id: string
  letter: string
  pronunciation: string
}

export default function MemoryGame({ language }: { language: string }) {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showBalloons, setShowBalloons] = useState(false)
  const [key, setKey] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [gameCompleted, setGameCompleted] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [language])

  const initializeGame = () => {
    const languageAlphabet = alphabets[language] || []
    // Take only first 6 letters to create 12 cards (6 pairs)
    const letters = languageAlphabet
      .slice(0, 6)
      .flatMap((letter) => [
        {
          id: `${letter.id}-letter`,
          character: letter.character,
          pronunciation: letter.pronunciation,
          isFlipped: false,
          isMatched: false,
          type: 'letter' as const
        },
        {
          id: `${letter.id}-pronunciation`,
          character: letter.character,
          pronunciation: letter.pronunciation,
          isFlipped: false,
          isMatched: false,
          type: 'pronunciation' as const
        }
      ])
    const shuffledPairs = letters.sort(() => Math.random() - 0.5)
    setCards(shuffledPairs)
    setFlippedCards([])
    setMoves(0)
    setShowConfetti(false)
    setShowBalloons(false)
    setStartTime(Date.now())
    setGameCompleted(false)
    setKey(prev => prev + 1)
  }

  const saveGameStats = () => {
    if (!startTime) return

    const gameStats: GameStats = {
      language,
      gameType: 'memory',
      moves,
      time: Math.floor((Date.now() - startTime) / 1000),
      date: new Date().toISOString()
    }

    // Get existing stats from localStorage
    const existingStats = localStorage.getItem('gameStats')
    const stats: DashboardStats = existingStats ? JSON.parse(existingStats) : {
      totalGames: 0,
      languages: {},
      recentGames: []
    }

    // Update stats
    const updatedStats = updateStats(stats, gameStats)

    // Save back to localStorage
    localStorage.setItem('gameStats', JSON.stringify(updatedStats))
  }

  const handleCardClick = (index: number) => {
    if (flippedCards.length >= 2 || cards[index].isFlipped || cards[index].isMatched) return

    const newCards = [...cards]
    newCards[index].isFlipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, index]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1)
      const [firstIndex, secondIndex] = newFlippedCards
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]
      
      // Check if one card is a letter and the other is its pronunciation
      if (
        (firstCard.type === 'letter' && secondCard.type === 'pronunciation' && firstCard.character === secondCard.character) ||
        (firstCard.type === 'pronunciation' && secondCard.type === 'letter' && firstCard.character === secondCard.character)
      ) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[firstIndex].isMatched = true
          matchedCards[secondIndex].isMatched = true
          setCards(matchedCards)
          setFlippedCards([])

          // Check if all pairs are matched
          if (matchedCards.every((card) => card.isMatched)) {
            setShowConfetti(true)
            setShowBalloons(true)
            setGameCompleted(true)
            saveGameStats()
          }
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards]
          resetCards[firstIndex].isFlipped = false
          resetCards[secondIndex].isFlipped = false
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 to-orange-100 p-4 font-delius">
      <div className="absolute top-12 left-10">
        <Link href={`/select-game?language=${language}`}>
          <Button 
            variant="outline" 
            className="rounded-full border-2 border-green-500 hover:bg-green-500 hover:text-white transition-colors font-delius"
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
        <h1 className="text-4xl font-bold text-orange-700 mb-4">Memory Match</h1>
        <div className="flex justify-center gap-4 items-center">
          <Button 
            onClick={initializeGame} 
            variant="outline" 
            className="rounded-full border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
          >
            New Game
          </Button>
          <div className="bg-white rounded-full px-4 py-2 shadow-lg border-2 border-orange-300">
            <span className="text-orange-700 font-bold">Moves: {moves}</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-3 gap-4 max-w-sm mx-auto"
      >
        {cards.map((card, index) => (
          <motion.div
            key={`${key}-${index}`}
            className={`w-20 h-20 cursor-pointer perspective-1000 ${card.isMatched ? 'bg-green-100' : ''}`}
            onClick={() => handleCardClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <motion.div
              className="relative w-full h-full preserve-3d transition-transform duration-500"
              animate={{
                rotateY: card.isFlipped || card.isMatched ? 0 : 180,
              }}
              initial={{ rotateY: 180 }}
            >
              {/* Front of card - always visible */}
              <div className={`absolute inset-0 rounded-xl shadow-lg border-4 ${card.isMatched ? 'bg-green-100 border-green-300' : 'bg-white border-orange-300'} flex items-center justify-center text-3xl font-bold text-orange-700 backface-hidden`}>
                ?
              </div>
              {/* Back of card - only visible when flipped */}
              <div className={`absolute inset-0 rounded-xl shadow-lg border-4 ${card.isMatched ? 'bg-green-100 border-green-300' : 'bg-white border-orange-300'} flex items-center justify-center text-orange-700 backface-hidden rotate-y-180`}>
                <AnimatePresence>
                  {(card.isFlipped || card.isMatched) && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className={card.type === 'letter' ? 'text-3xl font-bold' : 'text-xl'}
                    >
                      {card.type === 'letter' ? card.character : card.pronunciation}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {cards.every(card => card.isMatched) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-8 text-center max-w-md mx-4"
            >
              <h2 className="text-3xl font-bold text-orange-700 mb-4">Congratulations! 🎉</h2>
              <p className="text-lg text-gray-700 mb-6">
                You've matched all the pairs in {moves} moves!
              </p>
              <Button
                onClick={initializeGame}
                className="bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                Play Again
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 