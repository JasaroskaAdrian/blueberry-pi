import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { HealthStatus, PodPhase, SyncStatus } from "@/lib/mock-data";

const colorClasses = {
  green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  yellow: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  red: "bg-red-500/10 text-red-600 dark:text-red-400",
  gray: "bg-muted text-muted-foreground",
} as const;

function ColoredBadge({
  color,
  children,
}: {
  color: keyof typeof colorClasses;
  children: React.ReactNode;
}) {
  return (
    <Badge variant="outline" className={cn("border-transparent", colorClasses[color])}>
      {children}
    </Badge>
  );
}

export function SyncStatusBadge({ status }: { status: SyncStatus }) {
  const color = status === "Synced" ? "green" : status === "OutOfSync" ? "yellow" : "gray";
  return <ColoredBadge color={color}>{status}</ColoredBadge>;
}

export function HealthStatusBadge({ status }: { status: HealthStatus }) {
  const color =
    status === "Healthy"
      ? "green"
      : status === "Progressing"
        ? "yellow"
        : status === "Degraded"
          ? "red"
          : "gray";
  return <ColoredBadge color={color}>{status}</ColoredBadge>;
}

export function PodStatusBadge({ status }: { status: PodPhase }) {
  const color =
    status === "Running" || status === "Succeeded"
      ? "green"
      : status === "Pending"
        ? "yellow"
        : "red";
  return <ColoredBadge color={color}>{status}</ColoredBadge>;
}
