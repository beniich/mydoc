import { useState } from "react";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const workflows = [
  {
    id: "1",
    name: "Jira → Slack Notification",
    description: "Send Slack message when new Jira issue is created",
    status: "active" as const,
    executionCount: 1247,
    lastRun: "2 minutes ago",
    interval: "Real-time",
    steps: [
      { name: "Jira", icon: "🎫", color: "#0052CC" },
      { name: "Transform", icon: "⚡", color: "#FF6B6B" },
      { name: "Slack", icon: "💬", color: "#4A154B" },
    ],
  },
  {
    id: "2",
    name: "Gmail → Google Sheets",
    description: "Log important emails to spreadsheet automatically",
    status: "active" as const,
    executionCount: 3842,
    lastRun: "15 minutes ago",
    interval: "Every 5 min",
    steps: [
      { name: "Gmail", icon: "📧", color: "#EA4335" },
      { name: "Filter", icon: "🔍", color: "#10A37F" },
      { name: "Sheets", icon: "📊", color: "#0F9D58" },
    ],
  },
  {
    id: "3",
    name: "GitHub → Notion Sync",
    description: "Create Notion page for each new pull request",
    status: "paused" as const,
    executionCount: 892,
    lastRun: "2 hours ago",
    interval: "Real-time",
    steps: [
      { name: "GitHub", icon: "🐙", color: "#24292E" },
      { name: "Notion", icon: "📝", color: "#000000" },
    ],
  },
  {
    id: "4",
    name: "Stripe → Slack Alert",
    description: "Notify team on successful payments over $100",
    status: "active" as const,
    executionCount: 567,
    lastRun: "45 minutes ago",
    interval: "Real-time",
    steps: [
      { name: "Stripe", icon: "💳", color: "#635BFF" },
      { name: "Condition", icon: "🔀", color: "#FF9F43" },
      { name: "Slack", icon: "💬", color: "#4A154B" },
    ],
  },
  {
    id: "5",
    name: "Multi-Channel Alert",
    description: "Send critical alerts to Slack, Email, and SMS",
    status: "error" as const,
    executionCount: 234,
    lastRun: "1 hour ago",
    interval: "On trigger",
    steps: [
      { name: "Webhook", icon: "🌐", color: "#FF6B6B" },
      { name: "Router", icon: "🔀", color: "#9B59B6" },
      { name: "Slack", icon: "💬", color: "#4A154B" },
      { name: "Gmail", icon: "📧", color: "#EA4335" },
    ],
  },
  {
    id: "6",
    name: "Daily Report Generator",
    description: "Generate and send daily analytics report",
    status: "active" as const,
    executionCount: 180,
    lastRun: "8 hours ago",
    interval: "Daily at 9 AM",
    steps: [
      { name: "Schedule", icon: "⏰", color: "#3498DB" },
      { name: "API", icon: "🌐", color: "#FF6B6B" },
      { name: "OpenAI", icon: "🤖", color: "#10A37F" },
      { name: "Gmail", icon: "📧", color: "#EA4335" },
    ],
  },
];

export function Workflows() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredWorkflows = workflows.filter(
    (wf) =>
      wf.name.toLowerCase().includes(search.toLowerCase()) ||
      wf.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (name: string) => {
    toast.success(`Workflow toggled`, { description: name });
  };

  const handleRun = (name: string) => {
    toast.info(`Running workflow...`, { description: name });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workflows..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border rounded-lg p-1">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "p-1.5 rounded transition-colors",
                view === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "p-1.5 rounded transition-colors",
                view === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <Button className="gap-2 gradient-coral text-primary-foreground border-0">
            <Plus className="h-4 w-4" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm">
        <div>
          <span className="text-muted-foreground">Total: </span>
          <span className="font-semibold">{workflows.length}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Active: </span>
          <span className="font-semibold text-emerald-600">
            {workflows.filter((w) => w.status === "active").length}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Paused: </span>
          <span className="font-semibold text-amber-600">
            {workflows.filter((w) => w.status === "paused").length}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Error: </span>
          <span className="font-semibold text-destructive">
            {workflows.filter((w) => w.status === "error").length}
          </span>
        </div>
      </div>

      {/* Workflows grid */}
      <div
        className={cn(
          "grid gap-4",
          view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}
      >
        {filteredWorkflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            onToggle={() => handleToggle(workflow.name)}
            onRun={() => handleRun(workflow.name)}
          />
        ))}
      </div>

      {filteredWorkflows.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No workflows found.</p>
        </div>
      )}
    </div>
  );
}
