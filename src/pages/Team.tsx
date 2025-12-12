import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  Mail, 
  Shield, 
  Clock,
  Crown,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const teamMembers = [
  {
    id: "1",
    name: "John Smith",
    email: "john@company.com",
    role: "Owner",
    avatar: "",
    status: "active",
    lastActive: "Now",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Admin",
    avatar: "",
    status: "active",
    lastActive: "5 min ago",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@company.com",
    role: "Editor",
    avatar: "",
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@company.com",
    role: "Viewer",
    avatar: "",
    status: "pending",
    lastActive: "Invitation sent",
  },
];

const roleColors: Record<string, string> = {
  Owner: "bg-primary/10 text-primary",
  Admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Editor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Viewer: "bg-muted text-muted-foreground",
};

export function Team() {
  const [search, setSearch] = useState("");

  const filteredMembers = teamMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="gap-2 gradient-coral text-primary-foreground border-0">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{teamMembers.length}</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
              <Shield className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Admins</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <Mail className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Pending Invites</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team list */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{member.name}</p>
                      {member.role === "Owner" && (
                        <Crown className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {member.lastActive}
                  </div>
                  <Badge className={roleColors[member.role]}>{member.role}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Change Role</DropdownMenuItem>
                      <DropdownMenuItem>Resend Invite</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
