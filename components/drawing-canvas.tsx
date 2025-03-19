"use client";

import type React from "react";
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

interface DrawingCanvasProps {
  width?: number;
  height?: number;
  character?: string;
}

const DrawingCanvas = forwardRef<{ clear: () => void }, DrawingCanvasProps>(
  ({ width = 300, height = 300, character = "" }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawing = useRef(false);

    useImperativeHandle(ref, () => ({
      clear: () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          // Redraw the translucent character guide
          drawCharacterGuide();
        }
      },
    }));

    // Function to draw the translucent character guide
    const drawCharacterGuide = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx || !character) return;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before drawing

      // Set translucent style for the guide
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#6d28d9"; // Purple color
      ctx.font = "150px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Draw the character in the center
      ctx.fillText(character, canvas.width / 2, canvas.height / 2);

      ctx.restore();
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      if (!context) return;

      contextRef.current = context;
      context.lineWidth = 5;
      context.lineCap = "round";
      context.strokeStyle = "#6d28d9"; // Purple color

      // Draw the translucent character guide
      drawCharacterGuide();
    }, [width, height, character]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      isDrawing.current = true;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      contextRef.current = context;

      // Get coordinates
      let x, y;
      if ("touches" in e) {
        const rect = canvas.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.nativeEvent.offsetX;
        y = e.nativeEvent.offsetY;
      }

      contextRef.current.beginPath();
      contextRef.current.moveTo(x, y);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing.current || !contextRef.current || !canvasRef.current) return;

      // Get coordinates
      let x, y;
      if ("touches" in e) {
        const rect = canvasRef.current.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.nativeEvent.offsetX;
        y = e.nativeEvent.offsetY;
      }

      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
    };

    const stopDrawing = () => {
      isDrawing.current = false;
      if (contextRef.current) {
        contextRef.current.closePath();
      }
    };

    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 relative">
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
    );
  }
);

DrawingCanvas.displayName = "DrawingCanvas";

export default DrawingCanvas;
