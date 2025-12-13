import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Clock, 
  CheckCircle,
  XCircle,
  Download,
  Calendar
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const executionData = [
  { date: "Mon", success: 124, failed: 8 },
  { date: "Tue", success: 156, failed: 12 },
  { date: "Wed", success: 189, failed: 6 },
  { date: "Thu", success: 201, failed: 15 },
  { date: "Fri", success: 178, failed: 9 },
  { date: "Sat", success: 89, failed: 3 },
  { date: "Sun", success: 67, failed: 2 },
];

const workflowStats = [
  { name: "Jira → Slack", executions: 1247 },
  { name: "Gmail → Sheets", executions: 892 },
  { name: "GitHub → Notion", executions: 567 },
  { name: "Stripe → Slack", executions: 423 },
  { name: "Daily Report", executions: 180 },
];

const statusData = [
  { name: "Success", value: 85, color: "hsl(var(--chart-2))" },
  { name: "Failed", value: 10, color: "hsl(var(--destructive))" },
  { name: "Pending", value: 5, color: "hsl(var(--chart-4))" },
];

export function Analytics() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-3">
          <Select defaultValue="7d">
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <TrendingUp className="h-3 w-3 mr-1" />
                12%
              </Badge>
            </div>
            <p className="mt-3 text-2xl font-bold">3,309</p>
            <p className="text-sm text-muted-foreground">Total Executions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <TrendingUp className="h-3 w-3 mr-1" />
                5%
              </Badge>
            </div>
            <p className="mt-3 text-2xl font-bold">98.3%</p>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <Badge className="bg-destructive/10 text-destructive">
                <TrendingDown className="h-3 w-3 mr-1" />
                3%
              </Badge>
            </div>
            <p className="mt-3 text-2xl font-bold">1.2s</p>
            <p className="text-sm text-muted-foreground">Avg. Duration</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <TrendingDown className="h-3 w-3 mr-1" />
                8%
              </Badge>
            </div>
            <p className="mt-3 text-2xl font-bold">55</p>
            <p className="text-sm text-muted-foreground">Failed Executions</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Executions Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={executionData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="success" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="failed" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Top Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflowStats.map((wf, index) => (
              <div key={wf.name} className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground w-6">
                  #{index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{wf.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {wf.executions.toLocaleString()} runs
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(wf.executions / 1247) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
