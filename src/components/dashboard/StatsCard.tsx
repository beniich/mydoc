import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  variant?: "default" | "gradient" | "accent";
  chart?: React.ReactNode;
  breakdown?: { label: string; value: number }[];
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  variant = "default",
  chart,
  breakdown,
}: StatsCardProps) {
  const isPositive = change && change > 0;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-soft",
        variant === "gradient" && "gradient-coral text-primary-foreground",
        variant === "accent" && "gradient-sunset text-primary-foreground",
        variant === "default" && "bg-card border border-border shadow-card"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p
            className={cn(
              "text-sm font-medium",
              variant === "default" ? "text-muted-foreground" : "text-primary-foreground/80"
            )}
          >
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
        </div>

        <button
          className={cn(
            "p-1.5 rounded-lg transition-colors",
            variant === "default"
              ? "hover:bg-muted text-muted-foreground"
              : "hover:bg-primary-foreground/10 text-primary-foreground/70"
          )}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1.5">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-400" />
          )}
          <span
            className={cn(
              "text-sm font-medium",
              variant === "default"
                ? isPositive
                  ? "text-emerald-600"
                  : "text-red-600"
                : isPositive
                ? "text-emerald-300"
                : "text-red-300"
            )}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span
            className={cn(
              "text-sm",
              variant === "default" ? "text-muted-foreground" : "text-primary-foreground/70"
            )}
          >
            vs last month
          </span>
        </div>
      )}

      {breakdown && (
        <div className="mt-4 flex items-center gap-4">
          {breakdown.map((item, i) => (
            <div key={i} className="text-center">
              <p
                className={cn(
                  "text-xs",
                  variant === "default" ? "text-muted-foreground" : "text-primary-foreground/70"
                )}
              >
                {item.label}
              </p>
              <p className="text-lg font-semibold">%{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {chart && <div className="mt-4">{chart}</div>}

      {Icon && (
        <div
          className={cn(
            "absolute -bottom-4 -right-4 h-24 w-24 opacity-10",
            variant !== "default" && "opacity-20"
          )}
        >
          <Icon className="h-full w-full" />
        </div>
      )}
    </div>
  );
}
