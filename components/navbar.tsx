import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image src="/tiger.png?height=40&width=40" alt="Logo" width={40} height={40} />
            </div>
            <span className="font-bold text-xl text-purple-700">Sigma Kids</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
              Home
            </Link>
            <Link href="#features" className="text-gray-700 hover:text-purple-600 font-medium">
              Features
            </Link>
            <Link href="/select-language" className="text-gray-700 hover:text-purple-600 font-medium">
              Languages
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 font-medium">
              About
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium">
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/select-language">
              <Button className="rounded-full bg-purple-600 hover:bg-purple-700">Start Learning</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

