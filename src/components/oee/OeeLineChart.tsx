// @ts-nocheck
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface OeeDataPoint {
  time: string;
  oee: number;
  availability: number;
  performance: number;
  quality: number;
}

interface OeeLineChartProps {
  data: OeeDataPoint[];
  title?: string;
  target?: number;
  onPointClick?: (data: OeeDataPoint) => void;
}

export function OeeLineChart({ data, title = "OEE Trend", target = 85, onPointClick }: OeeLineChartProps) {
  const currentOee = data[data.length - 1]?.oee || 0;
  const previousOee = data[data.length - 2]?.oee || 0;
  const trend = currentOee - previousOee;

  return (
    <Card className="p-5 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">Target: {target}%</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">{currentOee.toFixed(1)}%</span>
          {trend !== 0 && (
            <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {trend > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{Math.abs(trend).toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} onClick={(e) => e?.activePayload && onPointClick?.(e.activePayload[0].payload)}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <ReferenceLine y={target} stroke="hsl(var(--primary))" strokeDasharray="5 5" label={{ value: 'Target', fill: 'hsl(var(--primary))' }} />
            <Line type="monotone" dataKey="oee" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))' }} name="OEE" />
            <Line type="monotone" dataKey="availability" stroke="hsl(142, 76%, 36%)" strokeWidth={2} dot={false} name="Availability" />
            <Line type="monotone" dataKey="performance" stroke="hsl(45, 93%, 47%)" strokeWidth={2} dot={false} name="Performance" />
            <Line type="monotone" dataKey="quality" stroke="hsl(199, 89%, 48%)" strokeWidth={2} dot={false} name="Quality" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
