
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/libs/AuthContext';
// import { useTheme } from 'next-themes';
import {
  Shield,
  DollarSign,
  Search,
  Bell,
  Download,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
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
  Cell
} from 'recharts';

// --- Components ---

// MenuItem interface removed because it was unused

// Sidebar Component
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

// Stats Card Component
const StatsCard = ({ title, value, change, positive, comparison, icon: Icon, colorClass }: { title: string, value: string, change: string, positive: boolean, comparison: string, icon: React.ElementType, colorClass: string }) => (
  <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      {Icon && <Icon className={`w-4 h-4 ${colorClass}`} />}
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-foreground">{value}</span>
      <span className={`text-sm font-medium flex items-center ${positive ? 'text-emerald-500' : 'text-red-500'}`}>
        {positive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
        {change}
      </span>
    </div>
    <p className="text-xs text-muted-foreground mt-2">{comparison}</p>
  </div>
);

// Charts
const salesData = [
  { month: 'Jan', marketing: 400, cases: 240 },
  { month: 'Feb', marketing: 300, cases: 139 },
  { month: 'Mar', marketing: 200, cases: 980 },
  { month: 'Apr', marketing: 278, cases: 390 },
  { month: 'May', marketing: 189, cases: 480 },
  { month: 'Jun', marketing: 239, cases: 380 },
  { month: 'Jul', marketing: 349, cases: 430 },
  { month: 'Aug', marketing: 200, cases: 240 },
  { month: 'Sep', marketing: 278, cases: 390 },
  { month: 'Oct', marketing: 189, cases: 480 },
  { month: 'Nov', marketing: 239, cases: 380 },
  { month: 'Dec', marketing: 349, cases: 430 },
];

const SalesChart = () => (
  <div className="bg-card rounded-xl p-6 border border-border shadow-sm h-full">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-foreground">Sales Figure</h3>
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          Marketing Sales
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
          Cases Sales
        </span>
      </div>
    </div>
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
          />
          <Line type="monotone" dataKey="marketing" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="cases" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// Hit Rate Card
const HitRateCard = ({ percentage, label, color }: { percentage: number; label: string, color: string }) => {
  const data = [
    { name: 'Hit', value: percentage, fill: color },
    { name: 'Miss', value: 100 - percentage, fill: 'hsl(var(--muted))' },
  ];

  return (
    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
      <div className="relative w-16 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={22}
              outerRadius={30}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-foreground">{percentage}%</span>
        </div>
      </div>
      <div>
        <p className="text-xl font-bold text-foreground">{percentage}%</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

// Progress Circle
const ProgressCircle = ({ percentage, value, label, color }: { percentage: number; value: string; label: string, color: string }) => {
  const data = [
    { name: 'Val', value: percentage, fill: color },
    { name: 'Rem', value: 100 - percentage, fill: 'hsl(var(--muted))' },
  ];

  return (
    <div className="flex flex-col items-center">
       <div className="relative w-24 h-24 mb-2">
         <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={45}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
         </ResponsiveContainer>
         <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bold text-foreground" style={{ color }}>{percentage}%</span>
         </div>
       </div>
       <div className="text-center">
          <div className="text-xl font-bold text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
       </div>
    </div>
  );
}

// Stats Data
const stats = [
  { title: 'Sales', value: '$25,767', change: '2.5%', positive: true, comparison: 'Compared to ($23450 last year)', icon: DollarSign, colorClass: 'text-blue-500' },
  { title: 'Purchase', value: '$21,067', change: '2.5%', positive: true, comparison: 'Compared to ($23450 last year)', icon: Search, colorClass: 'text-emerald-500' },
  { title: 'Return', value: '$22,317', change: '3.5%', positive: false, comparison: 'Compared to ($23450 last year)', icon: ArrowUp, colorClass: 'text-red-500' },
  { title: 'Marketing', value: '$29,037', change: '2.5%', positive: true, comparison: 'Compared to ($23450 last year)', icon: Bell, colorClass: 'text-orange-500' },
];

// Toast Component
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <div className="fixed bottom-4 right-4 bg-foreground text-background px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-bottom-2 fade-in duration-300 z-[100] flex items-center gap-2">
    <span>{message}</span>
    <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">×</button>
  </div>
);

interface OverviewProps {
  onAction: (msg: string) => void;
}

const OverviewContent = ({ onAction }: OverviewProps) => (
  <div className="space-y-6 animate-in fade-in duration-500">
    {/* Page Title & Actions */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <span>Show:</span>
          <select className="bg-transparent border border-border rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer">
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>
      <button 
        onClick={() => onAction("Generating Report... Please wait.")}
        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors shadow-sm cursor-pointer active:scale-95"
      >
        <Download className="w-4 h-4" />
        Generate Report
      </button>
    </div>
{/* ... rest of OverviewContent ... */}


    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sales Chart */}
      <div className="lg:col-span-2">
        <SalesChart />
      </div>

      {/* Hit Rates */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col justify-between">
        <div className="space-y-4">
          <HitRateCard percentage={68} label="Hit rates this year" color="#3b82f6" />
          <HitRateCard percentage={70} label="Hit rates this year" color="#10b981" />
        </div>
        
        <div className="mt-6 p-4 bg-muted/30 rounded-xl">
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={salesData.slice(0, 7)}>
                  <Line type="monotone" dataKey="marketing" stroke="#3b82f6" strokeWidth={2} dot={false} />
               </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xl font-bold text-foreground">10,314</p>
            <span className="text-destructive text-sm flex items-center">-3.5% <ArrowDown className="w-3 h-3 ml-1"/></span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Compared to ($23450 last year)</p>
        </div>
      </div>
    </div>

    {/* Bottom Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Average Total Sales */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">Average Total Sales</h3>
        <div className="flex flex-wrap gap-8 justify-center items-center py-4">
            <ProgressCircle percentage={65} value="92,346" label="Cases" color="#3b82f6" />
            <ProgressCircle percentage={75} value="79,356" label="Applications" color="#10b981" />
            <ProgressCircle percentage={55} value="82,146" label="Products" color="#f97316" />
        </div>
      </div>

      {/* Sales Report */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Sales Report</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Online
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Offline
            </span>
          </div>
        </div>
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
                <Bar dataKey="online" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="offline" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} />
             </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

const PlaceholderContent = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in zoom-in duration-300">
    <div className="bg-muted p-4 rounded-full">
      <Shield className="w-12 h-12 text-muted-foreground" />
    </div>
    <div>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground">This page is under construction.</p>
    </div>
  </div>
);

import { DoctorDashboard, ClientDashboard } from "@/components/dashboard/RoleViews";
import { SalesContent, ScheduleContent } from "@/components/dashboard/AdditionalPages";
import { AdministrationContent } from '@/components/dashboard/Administration';
import { LeaderboardContent } from '@/components/dashboard/Leaderboard';
import { SpreadsheetsContent } from '@/components/dashboard/Spreadsheets';
import MedicalChat from '@/components/chat/MedicalChat';
import { LibraryContent, MessagesContent, SettingsContent } from '@/components/dashboard/InteractivePages';
import { DoctorsList } from '@/components/dashboard/DoctorsList';

// Main Dashboard Page
// Main Dashboard Page
export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState('overview');
  const { user } = useAuth();
  // const { theme, setTheme } = useTheme();
  
  // Use real user role or default to 'doctor' if undefined (safe fallback)
  const userRole = user?.role || 'doctor';
  
  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Toast Notification */}
        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

        {/* Sidebar */}
        <DashboardSidebar activeItem={activeItem} setActiveItem={setActiveItem} userRole={userRole} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Header */}
          <DashboardHeader />

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6 bg-background/50">
            {/* Overview - Role specific defaults, but accessible */}
            {activeItem === 'overview' && (
                userRole === 'patient' ? <ClientDashboard /> :
                userRole === 'doctor' ? <DoctorDashboard onAction={handleShowToast} /> :
                <OverviewContent onAction={handleShowToast} />
            )}

            {/* All Pages Accessible to Everyone */}
            {activeItem === 'schedule' && <ScheduleContent onAction={handleShowToast} />}
            {activeItem === 'messages' && <MessagesContent />}
            {activeItem === 'library' && <LibraryContent />}
            {activeItem === 'settings' && <SettingsContent onAction={handleShowToast} />}
            
            {activeItem === 'leaderboard' && <LeaderboardContent />}
            {activeItem === 'spreadsheets' && <SpreadsheetsContent onAction={handleShowToast} />}
            {activeItem === 'administration' && <AdministrationContent onAction={handleShowToast} />}
            {activeItem === 'sales' && <SalesContent onAction={handleShowToast} />}
            {activeItem === 'doctors' && <DoctorsList onAction={handleShowToast} />}
            
            {/* Fallback */}
            {['support'].includes(activeItem) && (
                <PlaceholderContent title={activeItem.charAt(0).toUpperCase() + activeItem.slice(1)} />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
