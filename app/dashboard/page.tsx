"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DashboardStats, GameStats, LanguageStats, initializeLanguageStats, GameType } from "@/lib/game-stats"
import { alphabets } from "@/lib/alphabet-data"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalGames: 0,
    languages: initializeLanguageStats(),
    recentGames: []
  })

  const [progress, setProgress] = useState<Record<string, string[]>>({})

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem('gameStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }

    // Load progress for all languages
    const newProgress: Record<string, string[]> = {}
    Object.keys(alphabets).forEach(language => {
      const savedProgress = localStorage.getItem(`${language}-progress`)
      if (savedProgress) {
        newProgress[language] = JSON.parse(savedProgress)
      }
    })
    setProgress(newProgress)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getGameStats = (gameType: GameType) => {
    return stats.recentGames.filter(game => game.gameType === gameType)
  }

  const getLanguageStats = (language: string, gameType: GameType) => {
    const languageStats = stats.languages[language]
    if (!languageStats) return null

    const games = stats.recentGames.filter(
      game => game.language === language && game.gameType === gameType
    )

    if (gameType === 'word-builder') {
      // For Word Builder, we want to show the best score and total time
      const totalTime = games.reduce((sum, game) => sum + game.time, 0)
      const totalGames = games.length
      const totalMoves = games.reduce((sum, game) => sum + game.moves, 0)
      
      // Get the best score from all games
      const bestScore = Math.max(...games.map(game => game.moves), 0)
      
      return {
        totalGames,
        averageMoves: totalGames > 0 ? Math.round(totalMoves / totalGames) : 0,
        bestMoves: bestScore,
        averageTime: totalGames > 0 ? Math.round(totalTime / totalGames) : 0,
        bestTime: totalTime,
        lastPlayed: games[0]?.date || new Date().toISOString()
      }
    }

    if (gameType === 'drawing') {
      // For Drawing Game, we want to show progress and total time
      const totalTime = games.reduce((sum, game) => sum + game.time, 0)
      
      // Get progress from state instead of localStorage
      const progressArray = progress[language] || []
      const alphabetList = alphabets[language] || []
      const progressValue = Math.round((progressArray.length / alphabetList.length) * 100)
      
      return {
        totalGames: games.length,
        averageMoves: progressValue,
        bestMoves: progressValue,
        averageTime: totalTime,
        bestTime: totalTime,
        lastPlayed: games[0]?.date || new Date().toISOString()
      }
    }

    return {
      totalGames: games.length,
      averageMoves: games.reduce((sum, game) => sum + game.moves, 0) / (games.length || 1),
      bestMoves: Math.min(...games.map(game => game.moves)),
      averageTime: games.reduce((sum, game) => sum + game.time, 0) / (games.length || 1),
      bestTime: Math.min(...games.map(game => game.time)),
      lastPlayed: games[0]?.date || new Date().toISOString()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 p-8 font-delius">
      <Link href="/" className="inline-block mb-8">
        <Button variant="outline" className="rounded-full border border-black font-bold">
            ← Back to Home
        </Button>
      </Link>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold text-orange-700">Game Dashboard</h1>
          <Link href="/select-language">
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Play Games
            </Button>
          </Link>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Games</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.totalGames}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Languages Played</h3>
            <p className="text-3xl font-bold text-orange-600">{Object.keys(stats.languages).length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Recent Activity</h3>
            <p className="text-3xl font-bold text-orange-600">
              {stats.recentGames.length > 0 ? formatDate(stats.recentGames[0].date) : 'No games yet'}
            </p>
          </div>
        </motion.div>

        {/* Memory Match Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-orange-700 mb-4">Memory Match Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(stats.languages).map(([language, _]) => {
              const gameStats = getLanguageStats(language, 'memory')
              if (!gameStats) return null
              return (
                <div key={language} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-orange-600 mb-4 capitalize">{language}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Games Played:</span>
                      <span className="font-semibold">{gameStats.totalGames}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Moves:</span>
                      <span className="font-semibold">{gameStats.bestMoves === Infinity ? '-' : gameStats.bestMoves}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Time:</span>
                      <span className="font-semibold">{gameStats.bestTime === Infinity ? '-' : formatTime(gameStats.bestTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Played:</span>
                      <span className="font-semibold">{formatDate(gameStats.lastPlayed)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Word Builder Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-orange-700 mb-4">Word Builder Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(stats.languages).map(([language, _]) => {
              const gameStats = getLanguageStats(language, 'word-builder')
              if (!gameStats) return null
              
              // Get all games for this language
              const games = stats.recentGames.filter(
                game => game.language === language && game.gameType === 'word-builder'
              )
              
              // Calculate best score from all games
              const bestScore = Math.max(...games.map(game => game.moves), 0)
              
              return (
                <div key={language} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-orange-600 mb-4 capitalize">{language}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Games Played:</span>
                      <span className="font-semibold">{gameStats.totalGames}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Score:</span>
                      <span className="font-semibold">{bestScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Time:</span>
                      <span className="font-semibold">{formatTime(gameStats.bestTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Time:</span>
                      <span className="font-semibold">{formatTime(gameStats.averageTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Played:</span>
                      <span className="font-semibold">{formatDate(gameStats.lastPlayed)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Drawing Game Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-orange-700 mb-4">Drawing Game Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(stats.languages).map(([language, _]) => {
              const gameStats = getLanguageStats(language, 'drawing')
              if (!gameStats) return null
              return (
                <div key={language} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-orange-600 mb-4 capitalize">{language}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Games Played:</span>
                      <span className="font-semibold">{gameStats.totalGames}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-semibold">{gameStats.bestMoves}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Time:</span>
                      <span className="font-semibold">{formatTime(gameStats.bestTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Played:</span>
                      <span className="font-semibold">{formatDate(gameStats.lastPlayed)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Games */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-orange-700 mb-4">Recent Games</h2>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            {stats.recentGames.length > 0 ? (
              <div className="space-y-4">
                {stats.recentGames
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map((game, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div>
                      <span className="font-semibold capitalize">{game.language}</span>
                      <span className="text-gray-500 ml-2">({game.gameType})</span>
                    </div>
                    <div className="flex gap-4">
                      {game.gameType === 'memory' && (
                        <span className="text-gray-600">{game.moves} moves</span>
                      )}
                      {game.gameType === 'drawing' && (
                        <span className="text-gray-600">{game.moves}% progress</span>
                      )}
                      {game.gameType === 'word-builder' && (
                        <span className="text-gray-600">Score: {game.moves}</span>
                      )}
                      <span className="text-gray-600">
                        {game.gameType === 'drawing' ? `${game.time}s` : formatTime(game.time)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No games played yet</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 