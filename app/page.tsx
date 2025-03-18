import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-purple-100">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center max-w-4xl mx-auto relative">
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 md:-left-40 w-40 h-40 opacity-20">
              <Image
                src="/placeholder.svg?height=160&width=160"
                alt="Decorative shape"
                width={160}
                height={160}
                className="animate-pulse"
              />
            </div>

            <div className="absolute -bottom-20 -right-20 md:-right-40 w-40 h-40 opacity-20">
              <Image
                src="/placeholder.svg?height=160&width=160"
                alt="Decorative shape"
                width={160}
                height={160}
                className="animate-pulse"
              />
            </div>

            {/* Mascot */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <Image
                src="/placeholder.svg?height=160&width=160"
                alt="Cartoon mascot"
                width={160}
                height={160}
                className="animate-bounce"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-purple-600 tracking-tight">
              Learn Indian Alphabets!
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-2xl mx-auto">
              A fun and interactive way for kids to learn and practice writing Indian language alphabets through play
              and creativity!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/select-language">
                <Button className="text-xl px-8 py-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold shadow-lg transform transition-transform hover:scale-105">
                  Let's Start Learning!
                </Button>
              </Link>

              <Link href="#features">
                <Button
                  variant="outline"
                  className="text-xl px-8 py-6 rounded-full border-2 border-purple-400 text-purple-700 font-bold shadow-md transform transition-transform hover:scale-105"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-purple-600">Why Learn With Us?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-blue-50 rounded-3xl p-8 shadow-lg border-2 border-blue-200 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Interactive icon" width={40} height={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-700">Interactive Learning</h3>
                <p className="text-gray-700">
                  Learn by doing! Our interactive drawing exercises help children remember alphabets better.
                </p>
              </div>

              <div className="bg-pink-50 rounded-3xl p-8 shadow-lg border-2 border-pink-200 text-center">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Progress icon" width={40} height={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-pink-700">Track Progress</h3>
                <p className="text-gray-700">See your child's progress with our easy-to-understand tracking system.</p>
              </div>

              <div className="bg-green-50 rounded-3xl p-8 shadow-lg border-2 border-green-200 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Fun icon" width={40} height={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-700">Fun & Engaging</h3>
                <p className="text-gray-700">
                  Learning should be fun! Our colorful interface and rewards keep children motivated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-purple-700">Ready to Start Learning?</h2>
            <p className="text-xl mb-10 text-gray-700 max-w-2xl mx-auto">
              Choose from 6 Indian languages and start your learning journey today!
            </p>
            <Link href="/select-language">
              <Button className="text-xl px-8 py-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold shadow-lg transform transition-transform hover:scale-105">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

