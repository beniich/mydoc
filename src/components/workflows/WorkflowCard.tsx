import { cn } from "@/lib/utils";
import { Play, Clock, Zap, MoreVertical, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface WorkflowStep {
  name: string;
  icon: string;
  color: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "error";
  executionCount: number;
  lastRun: string;
  interval: string;
  steps: WorkflowStep[];
}

interface WorkflowCardProps {
  workflow: Workflow;
  onToggle?: () => void;
  onEdit?: () => void;
  onRun?: () => void;
}

export function WorkflowCard({ workflow, onToggle, onRun }: WorkflowCardProps) {
  const isActive = workflow.status === "active";

  return (
    <div
      className={cn(
        "bg-card rounded-2xl border shadow-card transition-all duration-300 hover:shadow-soft overflow-hidden",
        workflow.status === "error" ? "border-destructive/50" : "border-border"
      )}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{workflow.name}</h3>
              <Badge
                variant={workflow.status === "active" ? "default" : "secondary"}
                className={cn(
                  workflow.status === "active" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                  workflow.status === "error" && "bg-destructive/10 text-destructive border-destructive/20"
                )}
              >
                {workflow.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {workflow.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Switch checked={isActive} onCheckedChange={onToggle} />
            <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Workflow steps visualization */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto py-2">
          {workflow.steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center text-lg shadow-sm flex-shrink-0"
                style={{ backgroundColor: `${step.color}20` }}
              >
                {step.icon}
              </div>
              {i < workflow.steps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground mx-2 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span>{workflow.executionCount.toLocaleString()} runs</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{workflow.interval}</span>
            </div>
          </div>

          <button
            onClick={onRun}
            disabled={!isActive}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            <Play className="h-3.5 w-3.5" />
            Run Now
          </button>
        </div>
      </div>

      {/* Footer with last run info */}
      <div className="px-5 py-3 bg-muted/50 border-t border-border text-xs text-muted-foreground">
        Last run: {workflow.lastRun}
      </div>
    </div>
  );
}
