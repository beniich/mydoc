import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Plug,
  Workflow,
  Play,
  Settings,
  HelpCircle,
  ChevronLeft,
  Globe,
  Zap,
  BarChart3,
  Users,
  Bell,
  PenTool,
  CreditCard,
  ChevronDown,
  Calendar,
  CreditCard,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

const mainNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", href: "/" },
  { icon: BarChart3, label: "Leaderboard", href: "/leaderboard" },
  { icon: PenTool, label: "Spreadsheets", href: "/spreadsheets" },
  { icon: Users, label: "Administration", href: "/administration" },
  { icon: CreditCard, label: "Sales", href: "/sales" },
  { icon: Calendar, label: "Schedule", href: "/schedule" },
];

const secondaryNav: NavItem[] = [
  { icon: Bell, label: "Messages", href: "/messages", badge: 2 },
  { icon: Globe, label: "Library", href: "/library" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Support", href: "/support" },
];

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-foreground">
              AI Studio
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="p-3 space-y-1">
        {mainNav.map((item) => (
          <NavButton
            key={item.href}
            item={item}
            collapsed={collapsed}
            isActive={currentPage === item.href}
            onClick={() => onNavigate(item.href)}
          />
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-4 my-3 h-px bg-border" />

      {/* Secondary Navigation */}
      <nav className="p-3 space-y-1">
        {secondaryNav.map((item) => (
          <NavButton
            key={item.href}
            item={item}
            collapsed={collapsed}
            isActive={currentPage === item.href}
            onClick={() => onNavigate(item.href)}
          />
        ))}
      </nav>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border">
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors cursor-pointer",
            collapsed && "justify-center"
          )}
        >
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">JS</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                John Smith
              </p>
              <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
            </div>
          )}
          {!collapsed && (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>
    </aside>
  );
}

function NavButton({
  item,
  collapsed,
  isActive,
  onClick,
}: {
  item: NavItem;
  collapsed: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  const button = (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
        collapsed && "justify-center px-2",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary")} />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {!collapsed && item.badge && (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          {item.badge}
        </span>
      )}
    </button>
  );

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
