import { useState } from "react";
import { ExecutionTable } from "@/components/executions/ExecutionTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, RefreshCw, Calendar } from "lucide-react";
import { toast } from "sonner";

const executions = [
  {
    id: "exec-001",
    workflowName: "Jira → Slack Notification",
    status: "success" as const,
    startedAt: "Today, 2:34 PM",
    duration: "1.2s",
    creditsConsumed: 2,
    trigger: "Webhook",
  },
  {
    id: "exec-002",
    workflowName: "Gmail → Google Sheets",
    status: "success" as const,
    startedAt: "Today, 2:30 PM",
    duration: "3.4s",
    creditsConsumed: 3,
    trigger: "Schedule",
  },
  {
    id: "exec-003",
    workflowName: "Multi-Channel Alert",
    status: "failed" as const,
    startedAt: "Today, 2:15 PM",
    duration: "0.8s",
    creditsConsumed: 1,
    trigger: "Webhook",
  },
  {
    id: "exec-004",
    workflowName: "Stripe → Slack Alert",
    status: "success" as const,
    startedAt: "Today, 1:45 PM",
    duration: "2.1s",
    creditsConsumed: 2,
    trigger: "Webhook",
  },
  {
    id: "exec-005",
    workflowName: "GitHub → Notion Sync",
    status: "running" as const,
    startedAt: "Today, 1:40 PM",
    duration: "—",
    creditsConsumed: 0,
    trigger: "Webhook",
  },
  {
    id: "exec-006",
    workflowName: "Daily Report Generator",
    status: "success" as const,
    startedAt: "Today, 9:00 AM",
    duration: "12.5s",
    creditsConsumed: 8,
    trigger: "Schedule",
  },
  {
    id: "exec-007",
    workflowName: "Jira → Slack Notification",
    status: "success" as const,
    startedAt: "Yesterday, 6:22 PM",
    duration: "1.1s",
    creditsConsumed: 2,
    trigger: "Webhook",
  },
  {
    id: "exec-008",
    workflowName: "Multi-Channel Alert",
    status: "failed" as const,
    startedAt: "Yesterday, 4:10 PM",
    duration: "0.5s",
    creditsConsumed: 1,
    trigger: "Manual",
  },
];

export function Executions() {
  const [search, setSearch] = useState("");

  const filteredExecutions = executions.filter((exec) =>
    exec.workflowName.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (id: string) => {
    toast.info(`Opening execution details`, { description: `ID: ${id}` });
  };

  const handleReplay = (id: string) => {
    toast.success(`Replaying execution`, { description: `ID: ${id}` });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search executions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-sm text-muted-foreground">Total Executions</p>
          <p className="text-2xl font-bold text-foreground">{executions.length}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-sm text-muted-foreground">Success Rate</p>
          <p className="text-2xl font-bold text-emerald-600">87.5%</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-sm text-muted-foreground">Avg Duration</p>
          <p className="text-2xl font-bold text-foreground">2.8s</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-sm text-muted-foreground">Credits Used</p>
          <p className="text-2xl font-bold text-foreground">19</p>
        </div>
      </div>

      {/* Table */}
      <ExecutionTable
        executions={filteredExecutions}
        onView={handleView}
        onReplay={handleReplay}
      />
    </div>
  );
}
