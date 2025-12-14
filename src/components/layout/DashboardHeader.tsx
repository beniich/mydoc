import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Activity, Brain, Workflow, LogOut, Settings, User as UserIcon, Sun, Moon } from "lucide-react";
import { useAuth } from "@/libs/AuthContext";
import { useTheme } from "next-themes";
// import { useToast } from "@/hooks/use-toast";

export function DashboardHeader() {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  // const { toast } = useToast();

  if (!user) return null;

  const displayName = user.name || user.email.split("@")[0] || "Utilisateur";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header className="bg-background border-b border-border shadow-neu py-3 px-6 flex justify-between items-center sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <div className="font-bold text-lg text-foreground">
          Bienvenue, {displayName}
        </div>
        {user.organization && (
          <Badge variant="secondary" className="hidden md:inline-flex">
            {user.organization}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Stats rapides - Example placeholders if real stats aren't available globally */}
        <div className="hidden lg:flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Brain className="h-4 w-4 text-primary" />
            <span>0 requêtes IA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="h-4 w-4 text-orange-500" />
            <span>0 incidents</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Workflow className="h-4 w-4 text-green-500" />
            <span>0 workflows</span>
          </div>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-muted-foreground hover:text-foreground"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border border-border">
                {/* <AvatarImage src={undefined} alt={displayName} /> */}
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              Mon profil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
