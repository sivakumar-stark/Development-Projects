"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Download, RotateCw } from "lucide-react";

const defaultBrushSize = 5;

export default function Home() {
  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [brushSize, setBrushSize] = useState<number>(defaultBrushSize);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.lineCap = "round";
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.beginPath();
    context.moveTo(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    context.lineTo(x, y);
    context.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    saveCanvasState();
  };

  const handleMouseLeave = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([]); // Clear history when canvas is cleared
  };

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prevHistory) => [...prevHistory, imageData]);
  };

  const undo = () => {
    if (history.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const lastState = history[history.length - 1];
    setHistory((prevHistory) => prevHistory.slice(0, -1)); // Remove last state

    if (lastState) {
      context.putImageData(lastState, 0, 0);
    } else {
      // If no more history, clear the canvas
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "canvas_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
      <h1 className="text-2xl font-bold mb-4">Simple Canvas</h1>

      <div className="flex space-x-4 mb-4">
        <div>
          <Label htmlFor="colorPicker">Brush Color</Label>
          <Input
            type="color"
            id="colorPicker"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="h-10 w-20"
          />
        </div>

        <div>
          <Label htmlFor="brushSize">Brush Size ({brushSize})</Label>
          <Slider
            id="brushSize"
            defaultValue={[defaultBrushSize]}
            max={50}
            min={1}
            step={1}
            onValueChange={(value) => setBrushSize(value[0])}
            className="w-40"
          />
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="bg-white shadow-md rounded-md cursor-crosshair"
        style={{ border: "1px solid #008080" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />

      <div className="flex space-x-4 mt-4">
        <Button onClick={clearCanvas} variant="outline">
          <RotateCw className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button onClick={undo} disabled={history.length === 0} variant="outline">
          Undo
        </Button>
        <Button onClick={exportImage} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
