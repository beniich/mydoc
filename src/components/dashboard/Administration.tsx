// @ts-nocheck
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield, Users, CreditCard, Lock, Bell, UserPlus, Mail } from "lucide-react";

const users = [
    { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", avatar: "/avatars/06.png" },
    { name: "Sarah Smith", email: "sarah@example.com", role: "Editor", status: "Active", avatar: "/avatars/07.png" },
    { name: "Mike Johnson", email: "mike@example.com", role: "Viewer", status: "Inactive", avatar: "/avatars/08.png" },
];

export function AdministrationContent({ onAction }: { onAction?: (msg: string) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Administration</h1>
          <p className="text-muted-foreground">System settings and user management</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => onAction && onAction("Role creation dialog...")}>
                <Shield className="h-4 w-4" /> Add Role
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => onAction && onAction("User invitation sent!")}>
                <Users className="h-4 w-4" /> Invite User
            </Button>
        </div>
      </div>

        <div className="grid gap-6 md:grid-cols-2">
            {/* User Management */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        User Management
                    </CardTitle>
                    <CardDescription>Manage team access and roles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {users.map((user, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-foreground">{user.name}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Mail className="h-3 w-3" />
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>{user.role}</Badge>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                                        {user.status}
                                    </div>
                                    <Button variant="ghost" size="sm">Edit</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Security */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Security Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <p className="font-medium text-foreground">Two-Factor Auth</p>
                            <p className="text-sm text-muted-foreground">Secure your account with 2FA.</p>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                         <div className="space-y-0.5">
                            <p className="font-medium text-foreground">Login Alerts</p>
                            <p className="text-sm text-muted-foreground">Notify on new device login.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        Notifications
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <p className="font-medium text-foreground">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive daily summaries.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                         <div className="space-y-0.5">
                            <p className="font-medium text-foreground">Push Notifications</p>
                            <p className="text-sm text-muted-foreground">Real-time alerts.</p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            {/* Payment / Billing */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        Payment Methods
                    </CardTitle>
                    <CardDescription>Manage your billing details and invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg mb-4">
                         <div className="flex items-center gap-4">
                             <div className="w-12 h-8 bg-foreground rounded flex items-center justify-center text-background font-bold text-xs">VISA</div>
                             <div>
                                 <p className="font-medium text-foreground">Visa ending in 4242</p>
                                 <p className="text-sm text-muted-foreground">Expires 12/24</p>
                             </div>
                         </div>
                         <Badge>Default</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Payment Method
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
