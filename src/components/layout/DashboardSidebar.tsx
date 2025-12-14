import { 
  LayoutDashboard, 
  Trophy, 
  FileSpreadsheet, 
  Shield, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  HelpCircle,
  Stethoscope,
  LucideIcon
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  userRole: string;
}

interface SidebarItem {
    id: string;
    label: string;
    icon: LucideIcon;
    badge?: number;
}

export function DashboardSidebar({ activeItem, setActiveItem, userRole }: DashboardSidebarProps) {
  const { state } = useSidebar();

  const baseMains: SidebarItem[] = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: LayoutDashboard },
    { id: 'leaderboard', label: 'Classement', icon: Trophy },
    { id: 'spreadsheets', label: 'Tableurs', icon: FileSpreadsheet },
    { id: 'administration', label: 'Administration', icon: Shield },
    { id: 'sales', label: 'Ventes', icon: DollarSign },
    { id: 'schedule', label: 'Calendrier', icon: Calendar },
  ];

  const helpItems: SidebarItem[] = [
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
    { id: 'library', label: 'Bibliothèque', icon: BookOpen },
    { id: 'settings', label: 'Paramètres', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  let displayMains: SidebarItem[] = [...baseMains];

  if (userRole === 'patient') {
    displayMains = baseMains.filter(item => ['overview', 'schedule'].includes(item.id));
    displayMains.push({ id: 'doctors', label: 'Trouver un médecin', icon: Stethoscope });
  } else if (userRole === 'doctor') {
    displayMains = baseMains.filter(item => ['overview', 'schedule'].includes(item.id));
  }

  // Grouping for display
  const navigationGroups = [
    {
      label: "Principal",
      items: displayMains
    },
    {
      label: "Aide & Paramètres",
      items: helpItems
    }
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border/50">
        {state === "expanded" && (
          <div className="flex items-center gap-2 animate-in fade-in duration-300">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <span className="font-bold text-lg">W</span>
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">Workflow</span>
          </div>
        )}
        <SidebarTrigger className="text-sidebar-foreground/70 hover:text-sidebar-foreground ml-auto" />
      </div>

      <SidebarContent>
        {navigationGroups.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel className="text-sidebar-foreground/60">{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => setActiveItem(item.id)}
                      isActive={activeItem === item.id}
                      tooltip={item.label}
                      className={`
                        transition-all duration-200
                        ${activeItem === item.id 
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm' 
                          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                        }
                      `}
                    >
                      <item.icon className={`h-4 w-4 ${activeItem === item.id ? 'text-primary' : ''}`} />
                      <span>{item.label}</span>
                      {item.badge && state === "expanded" && (
                        <span className="ml-auto bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
