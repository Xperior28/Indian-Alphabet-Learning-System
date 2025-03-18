"use client"

import type React from "react"

import { forwardRef, useImperativeHandle, useRef, useEffect } from "react"

interface DrawingCanvasProps {
  width?: number
  height?: number
  character?: string
}

const DrawingCanvas = forwardRef<{ clear: () => void }, DrawingCanvasProps>(
  ({ width = 300, height = 300, character = "" }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)
    const isDrawing = useRef(false)

    useImperativeHandle(ref, () => ({
      clear: () => {
        const canvas = canvasRef.current
        const context = contextRef.current
        if (canvas && context) {
          context.clearRect(0, 0, canvas.width, canvas.height)
          // Redraw the translucent character guide
          drawCharacterGuide(context, canvas.width, canvas.height, character)
        }
      },
    }))

    // Function to draw the translucent character guide
    const drawCharacterGuide = (
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      char: string,
    ) => {
      if (!char) return

      ctx.save()

      // Clear the canvas first
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      // Set translucent style for the guide
      ctx.globalAlpha = 0.2
      ctx.fillStyle = "#6d28d9" // Purple color
      ctx.font = "200px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Draw the character in the center
      ctx.fillText(char, canvasWidth / 2, canvasHeight / 2)

      ctx.restore()
    }

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      // Set canvas dimensions
      canvas.width = width
      canvas.height = height

      const context = canvas.getContext("2d")
      if (!context) return

      contextRef.current = context

      // Draw the translucent character guide
      drawCharacterGuide(context, width, height, character)
    }, [width, height, character])

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      isDrawing.current = true
      const canvas = canvasRef.current
      if (!canvas) return

      const context = canvas.getContext("2d")
      if (!context) return

      contextRef.current = context
      contextRef.current.lineWidth = 5
      contextRef.current.lineCap = "round"
      contextRef.current.strokeStyle = "#6d28d9" // Purple color

      // Get coordinates
      let x, y
      if ("touches" in e) {
        const rect = canvas.getBoundingClientRect()
        x = e.touches[0].clientX - rect.left
        y = e.touches[0].clientY - rect.top
      } else {
        x = e.nativeEvent.offsetX
        y = e.nativeEvent.offsetY
      }

      contextRef.current.beginPath()
      contextRef.current.moveTo(x, y)
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing.current || !contextRef.current || !canvasRef.current) return

      // Get coordinates
      let x, y
      if ("touches" in e) {
        const rect = canvasRef.current.getBoundingClientRect()
        x = e.touches[0].clientX - rect.left
        y = e.touches[0].clientY - rect.top
      } else {
        x = e.nativeEvent.offsetX
        y = e.nativeEvent.offsetY
      }

      contextRef.current.lineTo(x, y)
      contextRef.current.stroke()
    }

    const stopDrawing = () => {
      isDrawing.current = false
      if (contextRef.current) {
        contextRef.current.closePath()
      }
    }

    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="touch-none"
        />
      </div>
    )
  },
)

DrawingCanvas.displayName = "DrawingCanvas"

export default DrawingCanvas

