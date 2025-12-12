import { cn } from "@/lib/utils";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  views: string;
  change: number;
  image?: string;
}

interface ActivityListProps {
  items: ActivityItem[];
  title?: string;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function ActivityList({
  items,
  title = "Recent Activity",
  tabs,
  activeTab,
  onTabChange,
}: ActivityListProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{title}</h3>
          {tabs && (
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange?.(tab)}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg transition-colors",
                    activeTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="divide-y divide-border">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
          >
            {/* Image/Icon */}
            <div className="h-12 w-12 rounded-xl overflow-hidden bg-muted flex-shrink-0">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full gradient-coral" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground truncate">{item.title}</p>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              </div>
              <p className="text-sm text-muted-foreground truncate">{item.subtitle}</p>
            </div>

            {/* Category */}
            <Badge variant="secondary" className="hidden sm:flex">
              {item.category}
            </Badge>

            {/* Stats */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <p className="font-medium text-foreground">{item.views}</p>
              </div>
              <div
                className={cn(
                  "text-sm font-medium",
                  item.change > 0 ? "text-emerald-600" : "text-red-500"
                )}
              >
                {item.change > 0 ? "↑" : "↓"} {Math.abs(item.change)}%
              </div>
              <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
