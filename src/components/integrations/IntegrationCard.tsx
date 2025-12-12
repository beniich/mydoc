import { cn } from "@/lib/utils";
import { Check, Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Integration {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  color: string;
  category: string;
  rating: number;
  installCount: number;
  isPremium: boolean;
  isConnected: boolean;
  actions: string[];
}

interface IntegrationCardProps {
  integration: Integration;
  onConnect?: () => void;
  onView?: () => void;
}

export function IntegrationCard({ integration, onConnect, onView }: IntegrationCardProps) {
  return (
    <div className="group relative bg-card rounded-2xl border border-border shadow-card hover:shadow-soft transition-all duration-300 overflow-hidden">
      {/* Header with gradient accent */}
      <div
        className="h-2"
        style={{ background: integration.color }}
      />

      <div className="p-5">
        {/* Logo and badges */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="h-14 w-14 rounded-xl flex items-center justify-center text-2xl shadow-sm"
            style={{ backgroundColor: `${integration.color}15` }}
          >
            {integration.logo}
          </div>
          <div className="flex gap-2">
            {integration.isConnected && (
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                <Check className="h-3 w-3 mr-1" /> Connected
              </Badge>
            )}
            {integration.isPremium && (
              <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                <Star className="h-3 w-3 mr-1" /> Premium
              </Badge>
            )}
          </div>
        </div>

        {/* Title and description */}
        <h3 className="font-semibold text-lg text-foreground mb-1">{integration.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {integration.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="font-medium">{integration.rating}</span>
          </div>
          <span className="text-muted-foreground">
            {integration.installCount.toLocaleString()} installs
          </span>
        </div>

        {/* Actions preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {integration.actions.slice(0, 3).map((action) => (
            <Badge key={action} variant="secondary" className="text-xs">
              {action}
            </Badge>
          ))}
          {integration.actions.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{integration.actions.length - 3} more
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={onConnect}
            className={cn(
              "flex-1",
              integration.isConnected
                ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                : "gradient-coral text-primary-foreground border-0"
            )}
          >
            {integration.isConnected ? "Manage" : "Connect"}
          </Button>
          <Button variant="outline" size="icon" onClick={onView}>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
