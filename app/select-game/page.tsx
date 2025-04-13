"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

const games = [
  {
    id: "draw",
    title: "Drawing Practice",
    description: "Practice writing each letter with our interactive drawing canvas",
    image: "/pencil.svg",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "memory",
    title: "Memory Match",
    description: "Match letters with their pronunciations in this memory game",
    image: "/memory-game.svg",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "word-builder",
    title: "Word Builder",
    description: "Build words using the letters you've learned",
    image: "/word-builder.svg",
    color: "from-green-500 to-green-600",
  },
]

export default function SelectGame() {
  const searchParams = useSearchParams()
  const language = searchParams.get("language")

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-yellow-100 to-orange-100 font-delius">
      <div className="container mx-auto px-4 py-16">
        <Link href="/select-language" className="inline-block mb-8">
          <Button variant="outline" className="rounded-full border border-black font-bold">
            ← Back to Languages
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-600">Choose a Game</h1>
          <p className="text-xl text-gray-700">Select how you want to learn today!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {games.map((game) => (
            <Link
              key={game.id}
              href={game.id === "draw" ? `/alphabets/${language}` : `/games/${language}/${game.id}`}
              className="transform transition-transform hover:scale-105"
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-yellow-300 flex flex-col items-center h-full">
                <div className="w-24 h-24 mb-6 relative">
                  <Image
                    src={game.image}
                    alt={game.title}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold text-purple-700 mb-4">{game.title}</h2>
                <p className="text-gray-700 text-center mb-6">{game.description}</p>
                <Button className={`rounded-full bg-gradient-to-r ${game.color} text-white font-semibold px-6`}>
                  Play Now
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 