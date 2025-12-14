// @ts-nocheck
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock, RefreshCw, Eye, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Execution {
  id: string;
  workflowName: string;
  status: "success" | "failed" | "running" | "pending";
  startedAt: string;
  duration: string;
  creditsConsumed: number;
  trigger: string;
}

interface ExecutionTableProps {
  executions: Execution[];
  onView?: (id: string) => void;
  onReplay?: (id: string) => void;
}

export function ExecutionTable({ executions, onView, onReplay }: ExecutionTableProps) {
  const getStatusIcon = (status: Execution["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "running":
        return <RefreshCw className="h-4 w-4 text-primary animate-spin" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  const getStatusBadge = (status: Execution["status"]) => {
    const styles = {
      success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      failed: "bg-destructive/10 text-destructive border-destructive/20",
      running: "bg-primary/10 text-primary border-primary/20",
      pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    };

    return (
      <Badge className={styles[status]}>
        {getStatusIcon(status)}
        <span className="ml-1.5 capitalize">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Workflow
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Trigger
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Started
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Duration
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Credits
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {executions.map((execution) => (
              <tr
                key={execution.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="px-5 py-4">
                  <span className="font-medium text-foreground">
                    {execution.workflowName}
                  </span>
                </td>
                <td className="px-5 py-4">{getStatusBadge(execution.status)}</td>
                <td className="px-5 py-4">
                  <span className="text-sm text-muted-foreground">
                    {execution.trigger}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-muted-foreground">
                    {execution.startedAt}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-foreground font-mono">
                    {execution.duration}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-foreground">
                    {execution.creditsConsumed}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView?.(execution.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {execution.status === "failed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onReplay?.(execution.id)}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Replay
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
