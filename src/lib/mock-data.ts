// Placeholder data standing in for the Go backend's /api responses.
// Replace each of these with real fetches once the backend endpoints exist.

export type SyncStatus = "Synced" | "OutOfSync" | "Unknown";
export type HealthStatus = "Healthy" | "Progressing" | "Degraded" | "Missing" | "Unknown";
export type PodPhase = "Running" | "Pending" | "Succeeded" | "Failed" | "CrashLoopBackOff";

export interface ArgoApplication {
  name: string;
  namespace: string;
  project: string;
  syncStatus: SyncStatus;
  healthStatus: HealthStatus;
  targetRevision: string;
  lastSyncedAgo: string;
}

export interface DeploymentInfo {
  name: string;
  namespace: string;
  replicasReady: number;
  replicasDesired: number;
  image: string;
  age: string;
}

export interface PodInfo {
  name: string;
  namespace: string;
  status: PodPhase;
  restarts: number;
  node: string;
  age: string;
}

export const mockArgoApplications: ArgoApplication[] = [
  {
    name: "blueberry-pi",
    namespace: "argocd",
    project: "homelab",
    syncStatus: "Synced",
    healthStatus: "Healthy",
    targetRevision: "main",
    lastSyncedAgo: "4m ago",
  },
  {
    name: "grafana",
    namespace: "argocd",
    project: "monitoring",
    syncStatus: "Synced",
    healthStatus: "Progressing",
    targetRevision: "main",
    lastSyncedAgo: "1h ago",
  },
  {
    name: "plex",
    namespace: "argocd",
    project: "media",
    syncStatus: "OutOfSync",
    healthStatus: "Healthy",
    targetRevision: "main",
    lastSyncedAgo: "2d ago",
  },
  {
    name: "pihole",
    namespace: "argocd",
    project: "networking",
    syncStatus: "Synced",
    healthStatus: "Degraded",
    targetRevision: "main",
    lastSyncedAgo: "6h ago",
  },
];

export const mockDeployments: DeploymentInfo[] = [
  {
    name: "blueberry-pi",
    namespace: "blueberry-pi",
    replicasReady: 1,
    replicasDesired: 1,
    image: "ghcr.io/adrian/blueberry-pi:0.1.0",
    age: "3d",
  },
  {
    name: "grafana",
    namespace: "monitoring",
    replicasReady: 0,
    replicasDesired: 1,
    image: "grafana/grafana:11.2.0",
    age: "12d",
  },
  {
    name: "plex",
    namespace: "media",
    replicasReady: 1,
    replicasDesired: 1,
    image: "plexinc/pms-docker:1.40.5",
    age: "40d",
  },
  {
    name: "pihole",
    namespace: "networking",
    replicasReady: 1,
    replicasDesired: 1,
    image: "pihole/pihole:2024.07.0",
    age: "40d",
  },
];

export const mockPods: PodInfo[] = [
  {
    name: "blueberry-pi-7c9d4f8b6-x2z9k",
    namespace: "blueberry-pi",
    status: "Running",
    restarts: 0,
    node: "pi5-node-1",
    age: "3d",
  },
  {
    name: "grafana-5f6b7c9d8-m4n2p",
    namespace: "monitoring",
    status: "Pending",
    restarts: 0,
    node: "pi5-node-2",
    age: "2m",
  },
  {
    name: "plex-6d8f9c7b5-q7w1e",
    namespace: "media",
    status: "Running",
    restarts: 2,
    node: "pi5-node-1",
    age: "40d",
  },
  {
    name: "pihole-8b7c6d5f4-r3t5y",
    namespace: "networking",
    status: "CrashLoopBackOff",
    restarts: 14,
    node: "pi5-node-2",
    age: "40d",
  },
];
