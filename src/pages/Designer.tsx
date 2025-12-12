import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Square,
  Circle,
  Triangle,
  Type,
  ArrowRight,
  Trash2,
  Download,
  Upload,
  Layers,
  MousePointer,
  Pencil,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Grid3X3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Shape {
  id: string;
  type: "rectangle" | "circle" | "triangle" | "text" | "arrow";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  text?: string;
}

const tools = [
  { id: "select", icon: MousePointer, label: "Select" },
  { id: "rectangle", icon: Square, label: "Rectangle" },
  { id: "circle", icon: Circle, label: "Circle" },
  { id: "triangle", icon: Triangle, label: "Triangle" },
  { id: "text", icon: Type, label: "Text" },
  { id: "arrow", icon: ArrowRight, label: "Arrow" },
  { id: "pencil", icon: Pencil, label: "Draw" },
];

const colors = [
  "hsl(var(--primary))",
  "hsl(var(--coral))",
  "hsl(var(--sunset))",
  "hsl(var(--accent))",
  "hsl(var(--muted))",
  "hsl(210 100% 50%)",
  "hsl(142 76% 36%)",
  "hsl(47 100% 50%)",
];

export function Designer() {
  const [activeTool, setActiveTool] = useState("select");
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [shapes, setShapes] = useState<Shape[]>([
    { id: "1", type: "rectangle", x: 100, y: 100, width: 150, height: 100, color: "hsl(var(--primary))" },
    { id: "2", type: "circle", x: 300, y: 150, width: 80, height: 80, color: "hsl(var(--coral))" },
    { id: "3", type: "text", x: 450, y: 120, width: 200, height: 40, color: "hsl(var(--foreground))", text: "Workflow Step" },
  ]);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === "select") {
      setSelectedShape(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool !== "select" && activeTool !== "pencil") {
      const newShape: Shape = {
        id: Date.now().toString(),
        type: activeTool as Shape["type"],
        x,
        y,
        width: activeTool === "text" ? 150 : 100,
        height: activeTool === "text" ? 30 : activeTool === "arrow" ? 20 : 100,
        color: activeColor,
        text: activeTool === "text" ? "Text" : undefined,
      };
      setShapes([...shapes, newShape]);
    }
  };

  const deleteSelected = () => {
    if (selectedShape) {
      setShapes(shapes.filter((s) => s.id !== selectedShape));
      setSelectedShape(null);
    }
  };

  const clearCanvas = () => {
    setShapes([]);
    setSelectedShape(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Toolbar */}
      <Card className="border-border/50">
        <CardContent className="p-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Tools */}
            <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-xl">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={activeTool === tool.id ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-9 w-9 p-0",
                    activeTool === tool.id && "gradient-coral"
                  )}
                  onClick={() => setActiveTool(tool.id)}
                  title={tool.label}
                >
                  <tool.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            {/* Colors */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Color:</span>
              <div className="flex items-center gap-1">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      "h-7 w-7 rounded-lg border-2 transition-all",
                      activeColor === color
                        ? "border-foreground scale-110"
                        : "border-transparent hover:scale-105"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => setActiveColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Redo className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                onClick={() => setZoom(Math.max(50, zoom - 10))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground w-12 text-center">
                {zoom}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                onClick={() => setZoom(Math.min(200, zoom + 10))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3"
                onClick={deleteSelected}
                disabled={!selectedShape}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3"
                onClick={clearCanvas}
              >
                Clear
              </Button>
            </div>

            {/* Export */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button size="sm" className="h-9 gradient-coral">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* Canvas */}
        <Card className="border-border/50 overflow-hidden">
          <CardContent className="p-0">
            <div
              className="relative bg-[hsl(var(--muted)/0.3)] min-h-[600px] cursor-crosshair overflow-hidden"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--border)/0.3) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--border)/0.3) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
              onClick={handleCanvasClick}
            >
              <div
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "top left",
                }}
              >
                {shapes.map((shape) => (
                  <div
                    key={shape.id}
                    className={cn(
                      "absolute cursor-move transition-shadow",
                      selectedShape === shape.id && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    )}
                    style={{
                      left: shape.x,
                      top: shape.y,
                      width: shape.width,
                      height: shape.height,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedShape(shape.id);
                    }}
                  >
                    {shape.type === "rectangle" && (
                      <div
                        className="w-full h-full rounded-lg shadow-soft"
                        style={{ backgroundColor: shape.color }}
                      />
                    )}
                    {shape.type === "circle" && (
                      <div
                        className="w-full h-full rounded-full shadow-soft"
                        style={{ backgroundColor: shape.color }}
                      />
                    )}
                    {shape.type === "triangle" && (
                      <div
                        className="w-0 h-0"
                        style={{
                          borderLeft: `${shape.width / 2}px solid transparent`,
                          borderRight: `${shape.width / 2}px solid transparent`,
                          borderBottom: `${shape.height}px solid ${shape.color}`,
                        }}
                      />
                    )}
                    {shape.type === "text" && (
                      <div
                        className="text-sm font-medium px-2 py-1"
                        style={{ color: shape.color }}
                      >
                        {shape.text}
                      </div>
                    )}
                    {shape.type === "arrow" && (
                      <div className="flex items-center h-full">
                        <div
                          className="h-0.5 flex-1"
                          style={{ backgroundColor: shape.color }}
                        />
                        <div
                          className="w-0 h-0"
                          style={{
                            borderTop: "6px solid transparent",
                            borderBottom: "6px solid transparent",
                            borderLeft: `10px solid ${shape.color}`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties Panel */}
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Layers ({shapes.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="space-y-1">
                {shapes.map((shape, idx) => (
                  <button
                    key={shape.id}
                    className={cn(
                      "w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-colors text-left",
                      selectedShape === shape.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                    onClick={() => setSelectedShape(shape.id)}
                  >
                    {shape.type === "rectangle" && <Square className="h-4 w-4" />}
                    {shape.type === "circle" && <Circle className="h-4 w-4" />}
                    {shape.type === "triangle" && <Triangle className="h-4 w-4" />}
                    {shape.type === "text" && <Type className="h-4 w-4" />}
                    {shape.type === "arrow" && <ArrowRight className="h-4 w-4" />}
                    <span className="capitalize">{shape.type} {idx + 1}</span>
                  </button>
                ))}
                {shapes.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Click on canvas to add shapes
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Grid3X3 className="h-4 w-4" />
                Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="grid grid-cols-2 gap-2">
                {["Flowchart", "Diagram", "Wireframe", "Mind Map"].map((template) => (
                  <Button
                    key={template}
                    variant="outline"
                    size="sm"
                    className="h-20 flex-col gap-1"
                  >
                    <Grid3X3 className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs">{template}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
