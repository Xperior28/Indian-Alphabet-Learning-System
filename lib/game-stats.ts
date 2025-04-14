import { alphabets } from "./alphabet-data"

export type GameType = 'memory' | 'word-builder' | 'drawing'

export interface GameStats {
  language: string
  gameType: GameType
  moves: number
  time: number // in seconds
  date: string
}

export interface LanguageStats {
  totalGames: number
  averageMoves: number
  bestMoves: number
  averageTime: number
  bestTime: number
  lastPlayed: string
  memory?: {
    totalGames: number
    bestMoves: number
    bestTime: number
    lastPlayed: string
  }
  wordBuilder?: {
    totalGames: number
    bestMoves: number
    bestTime: number
    lastPlayed: string
  }
  drawing?: {
    totalGames: number
    bestMoves: number
    bestTime: number
    lastPlayed: string
  }
}

export interface DashboardStats {
  totalGames: number
  languages: {
    [key: string]: LanguageStats
  }
  recentGames: GameStats[]
}

// Initialize stats for each language
export function initializeLanguageStats(): { [key: string]: LanguageStats } {
  const stats: { [key: string]: LanguageStats } = {}
  Object.keys(alphabets).forEach(language => {
    stats[language] = {
      totalGames: 0,
      averageMoves: 0,
      bestMoves: Infinity,
      averageTime: 0,
      bestTime: Infinity,
      lastPlayed: new Date().toISOString()
    }
  })
  return stats
}

// Update stats with new game data
export function updateStats(stats: DashboardStats, gameStats: GameStats): DashboardStats {
  // Update total games
  const updatedStats = {
    ...stats,
    totalGames: stats.totalGames + 1
  }

  // Update language stats
  const language = gameStats.language
  const gameType = gameStats.gameType
  const languageStats = stats.languages[language] || initializeLanguageStats()[language]

  if (gameType === 'memory') {
    languageStats.memory = {
      totalGames: (languageStats.memory?.totalGames || 0) + 1,
      bestMoves: Math.min(languageStats.memory?.bestMoves || Infinity, gameStats.moves),
      bestTime: Math.min(languageStats.memory?.bestTime || Infinity, gameStats.time),
      lastPlayed: gameStats.date
    }
  } else if (gameType === 'word-builder') {
    languageStats.wordBuilder = {
      totalGames: (languageStats.wordBuilder?.totalGames || 0) + 1,
      bestMoves: Math.max(languageStats.wordBuilder?.bestMoves || 0, gameStats.moves),
      bestTime: Math.min(languageStats.wordBuilder?.bestTime || Infinity, gameStats.time),
      lastPlayed: gameStats.date
    }
  } else if (gameType === 'drawing') {
    languageStats.drawing = {
      totalGames: (languageStats.drawing?.totalGames || 0) + 1,
      bestMoves: Math.max(languageStats.drawing?.bestMoves || 0, gameStats.moves),
      bestTime: Math.min(languageStats.drawing?.bestTime || Infinity, gameStats.time),
      lastPlayed: gameStats.date
    }
  }

  updatedStats.languages[language] = languageStats

  // Add to recent games (store all games)
  updatedStats.recentGames = [...stats.recentGames, gameStats]

  return updatedStats
} 