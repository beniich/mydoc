import { cn } from "@/lib/utils";
import { Search, Filter, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "All Apps", icon: "🔥" },
  { id: "communication", label: "Communication", icon: "💬" },
  { id: "productivity", label: "Productivity", icon: "📊" },
  { id: "development", label: "Development", icon: "💻" },
  { id: "crm", label: "CRM & Sales", icon: "💼" },
  { id: "ai", label: "AI & Data", icon: "🤖" },
  { id: "social", label: "Social Media", icon: "📱" },
  { id: "storage", label: "Storage", icon: "💾" },
];

interface IntegrationFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  view: "grid" | "list";
  onViewChange: (value: "grid" | "list") => void;
}

export function IntegrationFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  view,
  onViewChange,
}: IntegrationFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search and view toggle */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search integrations..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>

        <div className="flex items-center border border-border rounded-lg p-1">
          <button
            onClick={() => onViewChange("grid")}
            className={cn(
              "p-1.5 rounded transition-colors",
              view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={cn(
              "p-1.5 rounded transition-colors",
              view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              category === cat.id
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
