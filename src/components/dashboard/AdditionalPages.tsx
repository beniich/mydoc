import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Download, Calendar as CalendarIcon, TrendingUp } from "lucide-react";

export function SalesContent({ onAction }: { onAction?: (msg: string) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sales Analytics</h1>
          <p className="text-muted-foreground">Detailed transaction history and performance</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" /> This Month
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => onAction && onAction("Downloading Sales Report...")}>
                <Download className="h-4 w-4" /> Download Report
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Metric Cards */}
        {[
            { label: "Total Revenue", value: "$54,231.89", trend: "+12.5%", color: "text-blue-500" },
            { label: "Average Order Value", value: "$210.50", trend: "+2.1%", color: "text-emerald-500" },
            { label: "Conversion Rate", value: "3.2%", trend: "-0.4%", color: "text-red-500" }
        ].map((stat, i) => (
            <Card key={i}>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-foreground mt-2">{stat.value}</h3>
                        </div>
                        <div className={`p-2 rounded-full bg-muted ${stat.color}`}>
                            <TrendingUp className="h-5 w-5" />
                        </div>
                    </div>
                    <p className={`text-xs mt-2 font-medium ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stat.trend} from last month
                    </p>
                </CardContent>
            </Card>
        ))}
      </div>

      {/* Transactions List */}
      <Card>
          <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial activity from your store.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                  <DollarSign className="h-5 w-5" />
                              </div>
                              <div>
                                  <p className="font-medium text-foreground">Order #TRX-{2024000 + item}</p>
                                  <p className="text-sm text-muted-foreground">Oct {24 - item}, 2023 at 4:30 PM</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="font-bold text-foreground">+$ {(Math.random() * 500 + 50).toFixed(2)}</p>
                              <Badge variant="outline" className="text-xs">Completed</Badge>
                          </div>
                      </div>
                  ))}
              </div>
          </CardContent>
      </Card>
    </div>
  );
}

// Calendar / Schedule Component
export function ScheduleContent({ onAction }: { onAction?: (msg: string) => void }) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                <h1 className="text-2xl font-bold text-foreground">Schedule</h1>
                <p className="text-muted-foreground">Project timelines and team events</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                         Today
                    </Button>
                    <Button 
                        className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => onAction && onAction("Event creation dialog opening...")}
                    >
                        <CalendarIcon className="h-4 w-4" /> Add Event
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0 overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-8 border-b border-border">
                            <div className="p-4 border-r border-border bg-muted/30"></div>
                            {days.map(day => (
                                <div key={day} className="p-4 text-center font-medium text-muted-foreground border-r border-border last:border-r-0">
                                    {day}
                                </div>
                            ))}
                        </div>
                        {timeSlots.map(time => (
                            <div key={time} className="grid grid-cols-8 border-b border-border last:border-b-0 h-20">
                                <div className="p-2 text-xs text-muted-foreground text-right border-r border-border pr-4 pt-4">
                                    {time}
                                </div>
                                {days.map((day) => (
                                    <div key={`${day}-${time}`} className="border-r border-border last:border-r-0 p-1 relative hover:bg-muted/30 transition-colors">
                                        {/* Mock Events based on random logic for demo */}
                                        {(day === 'Mon' && time === '10:00') && (
                                            <div className="absolute inset-1 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded p-1 text-xs font-medium">
                                                Team Sync
                                            </div>
                                        )}
                                         {(day === 'Wed' && time === '14:00') && (
                                            <div className="absolute inset-1 bg-purple-500/10 border border-purple-500/20 text-purple-600 rounded p-1 text-xs font-medium">
                                                Product Review
                                            </div>
                                        )}
                                         {(day === 'Fri' && time === '11:00') && (
                                            <div className="absolute inset-1 bg-orange-500/10 border border-orange-500/20 text-orange-600 rounded p-1 text-xs font-medium">
                                                Client Meeting
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
