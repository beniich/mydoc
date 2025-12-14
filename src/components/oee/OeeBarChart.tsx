// @ts-nocheck
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Card } from "@/components/ui/card";

interface MachineOee {
  machine: string;
  oee: number;
  availability: number;
  performance: number;
  quality: number;
}

interface OeeBarChartProps {
  data: MachineOee[];
  title?: string;
  onBarClick?: (machine: MachineOee) => void;
}

const getBarColor = (oee: number) => {
  if (oee >= 85) return "hsl(142, 76%, 36%)";
  if (oee >= 70) return "hsl(45, 93%, 47%)";
  return "hsl(0, 84%, 60%)";
};

export function OeeBarChart({ data, title = "Machine Comparison", onBarClick }: OeeBarChartProps) {
  return (
    <Card className="p-5 bg-card border-border">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{data.length} machines</p>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} onClick={(e) => e?.activePayload && onBarClick?.(e.activePayload[0].payload)}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="machine" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'OEE']}
            />
            <Legend />
            <Bar dataKey="oee" name="OEE" radius={[4, 4, 0, 0]} cursor="pointer">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.oee)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground">≥85% Good</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-muted-foreground">70-84% Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-muted-foreground">&lt;70% Critical</span>
        </div>
      </div>
    </Card>
  );
}
