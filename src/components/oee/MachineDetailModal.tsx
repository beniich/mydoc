import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { OeeKpiCard } from "./OeeKpiCard";
import { Activity, Clock, CheckCircle, Gauge } from "lucide-react";

interface MachineDetail {
  machine: string;
  oee: number;
  availability: number;
  performance: number;
  quality: number;
  status?: "running" | "stopped" | "maintenance";
  lastUpdate?: Date;
  operator?: string;
  product?: string;
  cycleTime?: number;
  targetCycleTime?: number;
}

interface MachineDetailModalProps {
  machine: MachineDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MachineDetailModal({ machine, open, onOpenChange }: MachineDetailModalProps) {
  if (!machine) return null;

  const statusColors = {
    running: "bg-emerald-500",
    stopped: "bg-red-500",
    maintenance: "bg-yellow-500",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl">{machine.machine}</DialogTitle>
            {machine.status && (
              <Badge variant="outline" className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${statusColors[machine.status]}`} />
                {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <OeeKpiCard
            title="OEE"
            value={machine.oee}
            target={85}
            icon={<Gauge className="h-5 w-5" />}
            variant="default"
          />
          <OeeKpiCard
            title="Availability"
            value={machine.availability}
            target={90}
            icon={<Clock className="h-5 w-5" />}
            variant="availability"
          />
          <OeeKpiCard
            title="Performance"
            value={machine.performance}
            target={95}
            icon={<Activity className="h-5 w-5" />}
            variant="performance"
          />
          <OeeKpiCard
            title="Quality"
            value={machine.quality}
            target={99}
            icon={<CheckCircle className="h-5 w-5" />}
            variant="quality"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-muted/50 rounded-lg">
          {machine.operator && (
            <div>
              <p className="text-sm text-muted-foreground">Operator</p>
              <p className="font-medium">{machine.operator}</p>
            </div>
          )}
          {machine.product && (
            <div>
              <p className="text-sm text-muted-foreground">Current Product</p>
              <p className="font-medium">{machine.product}</p>
            </div>
          )}
          {machine.cycleTime && (
            <div>
              <p className="text-sm text-muted-foreground">Cycle Time</p>
              <p className="font-medium">{machine.cycleTime}s / {machine.targetCycleTime}s target</p>
            </div>
          )}
          {machine.lastUpdate && (
            <div>
              <p className="text-sm text-muted-foreground">Last Update</p>
              <p className="font-medium">{machine.lastUpdate.toLocaleTimeString()}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
