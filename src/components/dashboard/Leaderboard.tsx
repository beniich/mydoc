import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp, TrendingDown, Medal } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Alice Johnson", role: "Senior Sales", sales: 154000, deals: 45, trend: 12, avatar: "/avatars/01.png" },
  { rank: 2, name: "Bob Smith", role: "Account Executive", sales: 122000, deals: 38, trend: 8, avatar: "/avatars/02.png" },
  { rank: 3, name: "Carol White", role: "Sales Rep", sales: 98000, deals: 42, trend: -5, avatar: "/avatars/03.png" },
  { rank: 4, name: "David Brown", role: "Sales Rep", sales: 85000, deals: 31, trend: 2, avatar: "/avatars/04.png" },
  { rank: 5, name: "Eva Green", role: "Junior Sales", sales: 62000, deals: 25, trend: 15, avatar: "/avatars/05.png" },
];

export function LeaderboardContent() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground">Top performing team members this month</p>
        </div>
        <div className="flex gap-2">
            <Card className="p-3 flex items-center gap-3 bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/20">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <div>
                    <p className="text-xs text-muted-foreground">Top Sales</p>
                    <p className="font-bold text-foreground">$154k</p>
                </div>
            </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         {/* Top 3 Podium Cards */}
         {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map((user, idx) => {
             if (!user) return null;
             return (
             <Card key={user.name} className={`relative overflow-hidden ${idx === 1 ? 'border-primary/50 shadow-lg scale-105 z-10' : 'mt-4'}`}>
                 <CardContent className="pt-6 flex flex-col items-center text-center">
                     <div className="relative mb-4">
                        <Avatar className="h-20 w-20 border-4 border-card shadow-xl">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-xs font-bold text-white flex items-center gap-1
                            ${user.rank === 1 ? 'bg-yellow-500' : user.rank === 2 ? 'bg-gray-400' : 'bg-orange-500'}`}>
                            <Medal className="h-3 w-3" /> #{user.rank}
                        </div>
                     </div>
                     <h3 className="font-bold text-lg text-foreground">{user.name}</h3>
                     <p className="text-sm text-muted-foreground mb-4">{user.role}</p>
                     
                     <div className="grid grid-cols-2 gap-4 w-full border-t border-border pt-4">
                        <div>
                            <p className="text-xs text-muted-foreground">Sales</p>
                            <p className="font-bold text-lg text-foreground">${(user.sales / 1000).toFixed(1)}k</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Deals</p>
                            <p className="font-bold text-lg text-foreground">{user.deals}</p>
                        </div>
                     </div>
                 </CardContent>
             </Card>
             );
         })}
      </div>

      <Card>
        <CardHeader>
            <CardTitle>All Performers</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {leaderboardData.map((user) => (
                    <div key={user.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <span className={`font-bold w-6 text-center ${user.rank <= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                                #{user.rank}
                            </span>
                            <Avatar>
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium text-foreground">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right hidden sm:block">
                                <p className="font-bold text-foreground">${user.sales.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">Total Sales</p>
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${user.trend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {user.trend > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                {Math.abs(user.trend)}%
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
