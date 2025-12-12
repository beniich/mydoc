import { useState, useEffect } from "react";
import { 
  DollarSign, 
  ShoppingCart, 
  RefreshCcw, 
  Megaphone, 
  MoreHorizontal, 
  Download,
  Calendar as CalendarIcon,
  Sun,
  Moon,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Mock Data
const salesData = [
  { month: "Jan", marketing: 400, cases: 240 },
  { month: "Feb", marketing: 300, cases: 139 },
  { month: "Mar", marketing: 200, cases: 980 },
  { month: "Apr", marketing: 278, cases: 390 },
  { month: "May", marketing: 189, cases: 480 },
  { month: "Jun", marketing: 239, cases: 380 },
  { month: "Jul", marketing: 349, cases: 430 },
  { month: "Aug", marketing: 200, cases: 240 },
  { month: "Sep", marketing: 278, cases: 390 },
  { month: "Oct", marketing: 189, cases: 480 },
  { month: "Nov", marketing: 239, cases: 380 },
  { month: "Dec", marketing: 349, cases: 430 },
];

const salesReportData = [
  { name: "Online Sales", value: 370, fill: "#3b82f6" },
  { name: "Offline Sales", value: 200, fill: "#22c55e" },
];

const avgSalesData = [
  { name: "Cases", value: 65, color: "#3b82f6" },
  { name: "Applications", value: 75, color: "#22c55e" },
  { name: "Products", value: 55, color: "#f97316" }, // Orange for 'Products'/Marketing match
];

const hitRateData = [
  { name: "Hit", value: 68, fill: "#3b82f6" },
  { name: "Miss", value: 32, fill: "#e5e7eb" },
];

const hitRateData2 = [
  { name: "Hit", value: 70, fill: "#22c55e" },
  { name: "Miss", value: 30, fill: "#e5e7eb" },
];

export function Dashboard() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check system preference or stored value
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">Show: This Year</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Download className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Sales" 
          value="$25,767" 
          change="+2.5%" 
          trend="up" 
          description="Compared to ($23450 last year)"
          icon={DollarSign}
          iconColor="text-blue-500"
        />
        <StatsCard 
          title="Purchase" 
          value="$21,067" 
          change="+2.5%" 
          trend="up" 
          description="Compared to ($23450 last year)"
          icon={ShoppingCart}
          iconColor="text-emerald-500"
        />
        <StatsCard 
          title="Return" 
          value="$22,317" 
          change="-3.5%" 
          trend="down" 
          description="Compared to ($23450 last year)"
          icon={RefreshCcw}
          iconColor="text-red-500"
        />
        <StatsCard 
          title="Marketing" 
          value="$29,037" 
          change="+2.5%" 
          trend="up" 
          description="Compared to ($23450 last year)"
          icon={Megaphone}
          iconColor="text-orange-500"
        />
      </div>

      {/* Middle Section: Sales Figure & Hit Rates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Figure Chart */}
        <div className="lg:col-span-2">
          <Card className="h-full shadow-md border-0 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sales Figure</CardTitle>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  Marketing Sales
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-500 dark:bg-gray-400"></span>
                  Cases Sales
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))', 
                        borderRadius: '8px' 
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="marketing" 
                      stroke="#3b82f6" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }} 
                      activeDot={{ r: 6 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cases" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: "hsl(var(--muted-foreground))", strokeWidth: 2, stroke: "#fff" }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hit Rates */}
        <div className="space-y-6">
           <Card className="shadow-md border-0 bg-card/50 backdrop-blur">
             <CardContent className="p-6 flex items-center gap-4">
               <div className="relative w-20 h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={hitRateData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={35}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                      >
                        {hitRateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-500">68%</span>
                  </div>
               </div>
               <div>
                  <h3 className="text-2xl font-bold">68%</h3>
                  <p className="text-sm text-muted-foreground">Hit rates this year</p>
               </div>
             </CardContent>
           </Card>

           <Card className="shadow-md border-0 bg-card/50 backdrop-blur">
             <CardContent className="p-6 flex items-center gap-4">
               <div className="relative w-20 h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={hitRateData2}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={35}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                      >
                        {hitRateData2.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-emerald-500">70%</span>
                  </div>
               </div>
               <div>
                  <h3 className="text-2xl font-bold">70%</h3>
                  <p className="text-sm text-muted-foreground">Hit rates this year</p>
               </div>
             </CardContent>
           </Card>

           <Card className="shadow-md border-0 bg-card/50 backdrop-blur mt-auto">
              <CardContent className="p-6">
                <div className="h-[100px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={salesData.slice(0, 7)}>
                        <Line type="monotone" dataKey="marketing" stroke="#3b82f6" strokeWidth={2} dot={false} />
                     </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between items-center mt-2">
                   <span className="text-2xl font-bold">10,314</span>
                   <span className="text-sm text-red-500 flex items-center">-3.5% <ArrowDown className="h-3 w-3 ml-1"/></span>
                </div>
                <p className="text-sm text-muted-foreground">Compared to ($23450 last year)</p>
              </CardContent>
           </Card>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md border-0 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Average Total Sales</CardTitle>
            <p className="text-sm text-muted-foreground">2023-24</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-8 justify-center items-center py-4">
               <CircularProgress value={65} label="Cases" amount="92,346" color="text-blue-500" ringColor="text-blue-500"/>
               <CircularProgress value={75} label="Applications" amount="79,356" color="text-emerald-500" ringColor="text-emerald-500"/>
               <CircularProgress value={55} label="Products" amount="82,146" color="text-orange-500" ringColor="text-orange-500"/>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between">
             <div>
                <CardTitle>Sales Report</CardTitle>
                <p className="text-sm text-muted-foreground">2023-24</p>
             </div>
             <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Online Sales</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Offline Sales</div>
             </div>
          </CardHeader>
          <CardContent>
             <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={[
                    {month: 'Jan', online: 300, offline: 100},
                    {month: 'Feb', online: 400, offline: 200},
                    {month: 'Mar', online: 200, offline: 400},
                    {month: 'Apr', online: 600, offline: 100},
                    {month: 'May', online: 400, offline: 200},
                    {month: 'Jun', online: 300, offline: 300},
                 ]}>
                    <Bar dataKey="online" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={10} />
                    <Bar dataKey="offline" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={10} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                    <Tooltip cursor={{fill: 'hsl(var(--muted)/0.2)'}} />
                 </BarChart>
              </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, change, trend, description, icon: Icon, iconColor }: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
  icon: any;
  iconColor: string;
}) {
  return (
    <Card className="border-0 shadow-md bg-card/50 backdrop-blur hover:translate-y-[-2px] transition-transform">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold flex items-baseline gap-2">
           {value}
           <span className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
              {trend === 'up' ? <ArrowUp className="inline h-3 w-3"/> : <ArrowDown className="inline h-3 w-3"/>}
              {change}
           </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

function CircularProgress({ value, label, amount, color, ringColor }: { value: number, label: string, amount: string, color: string, ringColor: string }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
       <div className="relative w-20 h-20 mb-2">
         {/* Background Circle */}
         <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-muted/20"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="40"
              cy="40"
            />
            <circle
              className={ringColor}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="40"
              cy="40"
            />
         </svg>
         <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-bold ${color}`}>{value}%</span>
         </div>
       </div>
       <div className="text-center">
          <div className="text-xl font-bold">{amount}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
       </div>
    </div>
  );
}
