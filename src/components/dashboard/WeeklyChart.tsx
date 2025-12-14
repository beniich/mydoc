// @ts-nocheck
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

interface WeeklyChartProps {
  title: string;
  data: { day: string; primary: number; secondary: number }[];
}

export function WeeklyChart({ title, data }: WeeklyChartProps) {
  const maxValue = Math.max(...data.map((d) => Math.max(d.primary, d.secondary)));

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {/* Chart area */}
        <div className="flex items-end justify-between gap-2 h-32">
          {data.map((item, i) => {
            const primaryHeight = (item.primary / maxValue) * 100;
            const secondaryHeight = (item.secondary / maxValue) * 100;

            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="relative w-full h-full flex items-end justify-center gap-1">
                  <div
                    className="w-3 rounded-full bg-primary transition-all duration-500"
                    style={{ height: `${primaryHeight}%` }}
                  />
                  <div
                    className="w-3 rounded-full bg-accent transition-all duration-500"
                    style={{ height: `${secondaryHeight}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between">
          {data.map((item, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-xs text-muted-foreground">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Executions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">Errors</span>
        </div>
      </div>
    </div>
  );
}
