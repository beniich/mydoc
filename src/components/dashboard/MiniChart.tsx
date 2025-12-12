import { cn } from "@/lib/utils";

interface MiniChartProps {
  data: number[];
  variant?: "line" | "bar";
  color?: "primary" | "accent" | "white";
  height?: number;
}

export function MiniChart({ data, variant = "line", color = "primary", height = 40 }: MiniChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  if (variant === "bar") {
    return (
      <div className="flex items-end gap-1" style={{ height }}>
        {data.map((value, i) => {
          const barHeight = ((value - min) / range) * 100;
          return (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-t transition-all duration-300",
                color === "primary" && "bg-primary",
                color === "accent" && "bg-accent",
                color === "white" && "bg-primary-foreground/60"
              )}
              style={{ height: `${Math.max(barHeight, 10)}%` }}
            />
          );
        })}
      </div>
    );
  }

  // Line chart as SVG path
  const width = 100;
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 4);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible" style={{ height }}>
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            className={cn(
              color === "primary" && "text-primary",
              color === "accent" && "text-accent",
              color === "white" && "text-primary-foreground"
            )}
            stopColor="currentColor"
            stopOpacity="0.3"
          />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#gradient-${color})`} />
      <path
        d={pathD}
        fill="none"
        className={cn(
          "stroke-2",
          color === "primary" && "stroke-primary",
          color === "accent" && "stroke-accent",
          color === "white" && "stroke-primary-foreground"
        )}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
