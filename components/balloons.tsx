"use client"

import { useEffect, useRef } from "react"

interface Balloon {
  x: number
  y: number
  size: number
  color: string
  speed: number
  wobble: number
  wobbleSpeed: number
}

export default function Balloons() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to window size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create balloons
    const balloons: Balloon[] = []
    const colors = ["#ff6b6b", "#4ecdc4", "#ffbe0b", "#ff9f1c", "#a786df", "#ff66d8"]

    for (let i = 0; i < 15; i++) {
      balloons.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 50 + Math.random() * 100,
        size: 30 + Math.random() * 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 1 + Math.random() * 3,
        wobble: 0,
        wobbleSpeed: 0.03 + Math.random() * 0.05,
      })
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let stillRising = false

      balloons.forEach((balloon) => {
        // Update position
        balloon.y -= balloon.speed
        balloon.wobble += balloon.wobbleSpeed
        balloon.x += Math.sin(balloon.wobble) * 1.5

        // Draw balloon
        ctx.beginPath()
        ctx.fillStyle = balloon.color
        ctx.arc(balloon.x, balloon.y, balloon.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw string
        ctx.beginPath()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.moveTo(balloon.x, balloon.y + balloon.size)
        ctx.lineTo(balloon.x, balloon.y + balloon.size + 50)
        ctx.stroke()

        // Check if any balloons are still rising
        if (balloon.y + balloon.size + 50 > 0) {
          stillRising = true
        }
      })

      if (stillRising) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-40" />
}

