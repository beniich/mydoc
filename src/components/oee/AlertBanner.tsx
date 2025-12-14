// @ts-nocheck
import { useState, useEffect } from "react";
import { AlertTriangle, X, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  message: string;
  machine?: string;
  value?: number;
  threshold?: number;
  timestamp: Date;
}

interface AlertBannerProps {
  alerts: Alert[];
  onDismiss?: (id: string) => void;
  onDismissAll?: () => void;
  enableSound?: boolean;
}

export function AlertBanner({ alerts, onDismiss, onDismissAll, enableSound = true }: AlertBannerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  const criticalAlerts = alerts.filter(a => a.type === "critical");
  const hasCritical = criticalAlerts.length > 0;

  useEffect(() => {
    if (hasCritical && !isMuted && enableSound) {
      // Play alert sound
      const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQsZP5ni6peZdlZSW3+ZqKGQe2VYXn+PnZmUh3ptY2BlfIiTlJSPh31ybWdpbnuFj5KRj4qCeXNubHB4goqOj4+MhoF6dHFwdHuDio2OjouGgXt1cnJ1e4KIjI2Ni4eBe3ZzcnV7gYiMjY2LiIF8d3NzdXuBh4uMjIqHgXx3c3R2e4GHi4yMioeAfHd0dHZ7gYeLjIyKh4F8d3R0dnuBh4uLi4qHgXx3dHR2e4CHi4uLioeAfHd0dXZ7gIeLi4uKh4F8d3R1dnuAh4uLi4qHgXx3dHV2e4CHi4uLioeBfHd0dXZ7gIeLi4uKh4F8d3R1d3uAh4qLi4qHgXx3dHV3e4CHiouLioeBfHd0dXd7gIeKi4uKh4F8d3R1d3t/h4qLi4qHgXx3dHV3e3+HiouLioeBfHd0dXd7f4eKi4qKh4F8d3R1d3t/h4qLioqHgXx3dHV3e3+HiouKioeBfHd1dXd7f4eKi4qKh4F8d3V1d3t/h4qKioqHgXx3dXV3e3+HioqKioeBfHd1dXd7f4eKioqKh4F8d3V1d3t/hoqKioqHgXx3dXV3e3+GioqKioeBfHd1dXd7f4aKioqKh4F9d3V1d3t/hoqKioqHgX13dXV3e3+GioqKioeBfXd1dXd7f4aKioqKh4F9d3V1d3t/hoqKioqHgX13dXV3e3+GioqKioeBfXd1dnd7f4aKioqKh4F9d3V2d3t/hoqKioqHgX13dXZ3e3+GioqKioeBfXd1dnd7f4aKioqKh4F9d3V2d3t/hoqKioqHgX13dXZ3e3+GioqKioeBfXd1dnd7f4aJioqKh4F9d3V2d3t/homKioqHgX13dXZ3e3+GiYqKioeBfXd1dnd7f4aJioqKh4F9d3V2d3t/homJioqHgX13dXZ3e3+GiYmKioeBfXd1dnd7f4aJiYqKh4F9d3V2d3t/homJioqHgX13dXZ3e3+GiYmJioeBfXd1dnd7f4aJiYmKh4F9d3V2d3t/homJiYqHgX13dXZ3fH+GiYmJioeBfXd1dnd8f4aJiYmKh4F9d3V2d3x/homJiYqHgX13dXZ3fH+GiYmJioeBfXd1dnd8f4aJiYmKh4F9d3V2d3x/homJiYmHgX13dXZ3fH+GiYmJiYeBfXd1dnd8f4aJiYmJh4F9d3V2d3x/homJiYmHgX13dXZ3fH+GiYmJiYeBfXd1dnd8f4aJiYmJh4F9d3V2d3x/homJiYmHgX13dXZ4fH+GiYmJiYeBfXd1dnh8f4aJiYmJh4F9d3V2eHx/homJiYmHgX13dXZ4fH+GiYmJiYeBfXd1dnh8f4aJiYmJh4F9d3V2eHx/homJiYmHgX13dXZ4fH+GiYmJiYeBfXd1dnh8f4aJiYmJh4F9d3V2eHx/homJiYmHgX13dnZ4fH+GiYmJiYeBfXd2dnh8f4aJiYmJh4F9d3Z2eHx/homJiYmHgX13dnZ4fH+GiYmJiYeBfXd2dnh8f4aJiYmJh4F9d3Z2eHx/homJiYmHgX13dnZ4fH+GiYmJiYeBfXd2dnh8f4aIiYmJh4F9d3Z2eHx/hoiJiYmHgX13dnZ4fH+GiImJiYeBfXd2dnh8f4aIiYmJh4F9d3Z2eHx/hoiJiYmHgX13dnZ4fH+GiImJiYeBfXd2dnh8f4aIiYmJh4F9d3Z2eHx/hoiJiYmHgX13dnZ4fH+GiImJiYeBfXd2dnh8f4aIiYmJh4F9d3Z2eHx/hoiJiYmHgX13dnZ4fH+GiImJiYeBfXd2dnh8f4aIiYmJh4F9d3Z2eHx/hoiJiYmHgX13dnZ4fH+GiImJiYeBfXd2d3h8f4aIiYmJh4F9d3Z3eHx/hoiJiYmHgX13dnd4fH+GiImJiYeBfXd2d3h8f4aIiYmJh4F9d3Z3eHx/hoiJiYmHgX13dnd4fH+GiImJiYeBfXd2d3h8f4aIiYmJh4F9d3Z3eHx/hoiIiYmHgX13dnd4fH+GiIiJiYeBfXd2d3h8f4aIiImJh4F9d3Z3eHx/hoiIiYmHgX13dnd4fH+GiIiJiYeBfXd2d3h8f4aIiImJh4F9d3Z3eHx/hoiIiYmHgX13dnd4fH+GiIiJiYeBfXd2d3h8f4aIiImJh4F9d3Z3eHx/hoiIiImHgX13dnd4fH+GiIiIiYeBfXd2d3h8f4aIiIiJh4F9d3Z3eHx/hoiIiImHgX13dnd4fH+GiIiIiYeBfXd2d3h8f4aIiIiJh4F9d3Z3eHx/hoiIiImHgQ==");
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }
  }, [criticalAlerts.length, isMuted, enableSound, hasCritical]);

  useEffect(() => {
    if (hasCritical) {
      const interval = setInterval(() => setIsBlinking(prev => !prev), 500);
      return () => clearInterval(interval);
    }
    setIsBlinking(false);
  }, [hasCritical]);

  if (alerts.length === 0) return null;

  return (
    <div className={cn(
      "rounded-xl border p-4 mb-6 transition-all",
      hasCritical 
        ? isBlinking 
          ? "bg-red-500/20 border-red-500" 
          : "bg-red-500/10 border-red-500/50"
        : "bg-yellow-500/10 border-yellow-500/50"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className={cn(
            "h-5 w-5",
            hasCritical ? "text-red-500" : "text-yellow-500"
          )} />
          <div>
            <p className="font-medium text-foreground">
              {hasCritical 
                ? `${criticalAlerts.length} Critical Alert${criticalAlerts.length > 1 ? 's' : ''}`
                : `${alerts.length} Warning${alerts.length > 1 ? 's' : ''}`
              }
            </p>
            <p className="text-sm text-muted-foreground">
              {alerts[0].message}
              {alerts[0].machine && ` - ${alerts[0].machine}`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="h-8 w-8"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          {onDismissAll && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismissAll}
              className="text-muted-foreground"
            >
              Dismiss All
            </Button>
          )}
          {onDismiss && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDismiss(alerts[0].id)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
