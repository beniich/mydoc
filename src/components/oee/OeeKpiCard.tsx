import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface OeeKpiCardProps {
  title: string;
  value: number;
  target?: number;
  unit?: string;
  trend?: number;
  icon?: React.ReactNode;
  variant?: "default" | "availability" | "performance" | "quality";
}

const variantStyles = {
  default: "from-primary/20 to-primary/5 border-primary/20",
  availability: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
  performance: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/20",
  quality: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
};

const variantColors = {
  default: "text-primary",
  availability: "text-emerald-500",
  performance: "text-yellow-500",
  quality: "text-blue-500",
};

export function OeeKpiCard({ title, value, target, unit = "%", trend, icon, variant = "default" }: OeeKpiCardProps) {
  const isAboveTarget = target ? value >= target : true;
  const progress = target ? Math.min((value / target) * 100, 100) : 100;

  return (
    <Card className={cn(
      "p-5 bg-gradient-to-br border",
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={cn("text-3xl font-bold", variantColors[variant])}>
              {value.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
        {icon && (
          <div className={cn("p-2 rounded-lg bg-background/50", variantColors[variant])}>
            {icon}
          </div>
        )}
      </div>

      {target && (
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Target: {target}{unit}</span>
            <span className={isAboveTarget ? "text-emerald-500" : "text-red-500"}>
              {isAboveTarget ? "On Track" : "Below Target"}
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all",
                isAboveTarget ? "bg-emerald-500" : "bg-red-500"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-3 text-sm">
          {trend > 0 ? (
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          ) : trend < 0 ? (
            <TrendingDown className="h-4 w-4 text-red-500" />
          ) : (
            <Minus className="h-4 w-4 text-muted-foreground" />
          )}
          <span className={trend > 0 ? "text-emerald-500" : trend < 0 ? "text-red-500" : "text-muted-foreground"}>
            {trend > 0 ? "+" : ""}{trend.toFixed(1)}% vs last shift
          </span>
        </div>
      )}
    </Card>
  );
}
