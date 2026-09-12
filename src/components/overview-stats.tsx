import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { mockArgoApplications, mockDeployments, mockPods } from "@/lib/mock-data";

export function OverviewStats() {
  const outOfSync = mockArgoApplications.filter((a) => a.syncStatus !== "Synced").length;
  const unhealthy = mockArgoApplications.filter((a) => a.healthStatus !== "Healthy").length;
  const underReplicated = mockDeployments.filter(
    (d) => d.replicasReady < d.replicasDesired
  ).length;
  const notRunning = mockPods.filter((p) => p.status !== "Running").length;

  const stats = [
    { label: "ArgoCD apps", value: mockArgoApplications.length, hint: `${outOfSync} out of sync` },
    { label: "App health", value: `${mockArgoApplications.length - unhealthy}/${mockArgoApplications.length}`, hint: "healthy" },
    { label: "Deployments", value: mockDeployments.length, hint: `${underReplicated} under-replicated` },
    { label: "Pods", value: mockPods.length, hint: `${notRunning} not running` },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex flex-col gap-1">
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-2xl">{stat.value}</CardTitle>
            <span className="text-xs text-muted-foreground">{stat.hint}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
