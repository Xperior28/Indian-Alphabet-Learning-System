"use client";

import type React from "react";
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

interface DrawingCanvasProps {
  width?: number;
  height?: number;
  character?: string;
}

const DrawingCanvas = forwardRef<{ clear: () => void; getDataURL: () => string }, DrawingCanvasProps>(
  ({ width = 300, height = 300, character = "" }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const traceCanvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const traceContextRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawing = useRef(false);

    useImperativeHandle(ref, () => ({
      clear: () => {
        const canvas = canvasRef.current;
        const traceCanvas = traceCanvasRef.current;
        if (canvas && traceCanvas) {
          const ctx = canvas.getContext("2d");
          const traceCtx = traceCanvas.getContext("2d");
          if (ctx && traceCtx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            traceCtx.clearRect(0, 0, traceCanvas.width, traceCanvas.height);
            drawCharacterGuide();
          }
        }
      },
      getDataURL: () => {
        const traceCanvas = traceCanvasRef.current;
        if (!traceCanvas) return "";
        return traceCanvas.toDataURL("image/png");
      },
    }));

    const drawCharacterGuide = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx || !character) return;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#6d28d9";
      ctx.font = "150px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(character, canvas.width / 2, canvas.height / 2);
      ctx.restore();
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      const traceCanvas = traceCanvasRef.current;
      if (!canvas || !traceCanvas) return;

      canvas.width = width;
      canvas.height = height;
      traceCanvas.width = width;
      traceCanvas.height = height;

      const context = canvas.getContext("2d");
      const traceContext = traceCanvas.getContext("2d");
      if (!context || !traceContext) return;

      contextRef.current = context;
      traceContextRef.current = traceContext;
      traceContext.lineWidth = 5;
      traceContext.lineCap = "round";
      traceContext.strokeStyle = "#6d28d9";

      drawCharacterGuide();
    }, [width, height, character]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      isDrawing.current = true;
      const traceCanvas = traceCanvasRef.current;
      if (!traceCanvas) return;
      
      const traceContext = traceCanvas.getContext("2d");
      if (!traceContext) return;
      traceContextRef.current = traceContext;

      let x, y;
      if ("touches" in e) {
        const rect = traceCanvas.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.nativeEvent.offsetX;
        y = e.nativeEvent.offsetY;
      }
      traceContextRef.current.beginPath();
      traceContextRef.current.moveTo(x, y);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing.current || !traceContextRef.current || !traceCanvasRef.current) return;

      let x, y;
      if ("touches" in e) {
        const rect = traceCanvasRef.current.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.nativeEvent.offsetX;
        y = e.nativeEvent.offsetY;
      }
      traceContextRef.current.lineTo(x, y);
      traceContextRef.current.stroke();
    };

    const stopDrawing = () => {
      isDrawing.current = false;
      if (traceContextRef.current) {
        traceContextRef.current.closePath();
      }
    };

    return (
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        <canvas ref={traceCanvasRef} className="absolute top-0 left-0 z-0" width={width} height={height} />
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
          className="relative touch-none z-10"
        />
      </div>
    );
  }
);

DrawingCanvas.displayName = "DrawingCanvas";

export default DrawingCanvas;