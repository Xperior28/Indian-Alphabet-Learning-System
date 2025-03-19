import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const languages = [
  { id: "hindi", name: "Hindi", image: "/hindi.png?height=120&width=120" },
  { id: "tamil", name: "Tamil", image: "/tamil.png?height=120&width=120" },
  { id: "bengali", name: "Bengali", image: "/bengali.png?height=120&width=120" },
  { id: "telugu", name: "Telugu", image: "/telegu.png?height=120&width=120" },
  { id: "kannada", name: "Kannada", image: "/kanada.png?height=120&width=120" },
  { id: "malayalam", name: "Malayalam", image: "/malayalam.png?height=120&width=120" },
]

export default function SelectLanguage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 font-delius">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-block mb-8">
          <Button variant="outline" className="rounded-full border border-black font-bold">
            ← Back to Home
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-600">Choose a Language</h1>
          <p className="text-xl text-gray-700">Which Indian language would you like to learn today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {languages.map((language) => (
            <Link
              key={language.id}
              href={`/alphabets/${language.id}`}
              className="transform transition-transform hover:scale-105"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-yellow-300 flex flex-col items-center">
                <div className="mb-4 relative w-[120px] h-[120px] flex items-center">
                  
                  <Image
                    src={language.image || "/placeholder.svg"}
                    alt={language.name}
                    width={120}
                    height={120}
                    className="relative z-10"
                  />
                </div>
                <h2 className="text-2xl font-bold text-purple-700">{language.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

