"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MemoryGame from "@/components/memory-game"
import WordBuilder from "@/components/word-builder"

export default function GamePage() {
  const params = useParams<{ language: string; game: string }>()
  const { language, game } = params

  const renderGame = () => {
    switch (game) {
      case "memory":
        return <MemoryGame language={language} />
      case "word-builder":
        return <WordBuilder language={language} />
      default:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-100 to-pink-100">
            <h1 className="text-4xl font-bold text-red-700 mb-4">Game Not Found</h1>
            <Link href={`/select-game?language=${language}`}>
              <Button className="rounded-full bg-red-600 hover:bg-red-700 px-6 py-2 text-lg">
                Back to Games
              </Button>
            </Link>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen">
      
      {renderGame()}
    </div>
  )
} 