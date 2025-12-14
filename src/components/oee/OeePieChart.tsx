// @ts-nocheck
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card } from "@/components/ui/card";

interface DowntimeReason {
  name: string;
  value: number;
  color: string;
}

interface OeePieChartProps {
  data: DowntimeReason[];
  title?: string;
  totalDowntime?: number;
}

export function OeePieChart({ data, title = "Downtime Analysis", totalDowntime }: OeePieChartProps) {
  const total = totalDowntime || data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="p-5 bg-card border-border">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">Total: {total} min</p>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: 'hsl(var(--muted-foreground))' }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [`${value} min`, 'Duration']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.slice(0, 4).map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground truncate">{item.name}</span>
            <span className="font-medium text-foreground ml-auto">{item.value}m</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
