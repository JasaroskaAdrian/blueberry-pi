"use client";

import { ArrowsClockwise } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HealthStatusBadge, SyncStatusBadge } from "@/components/status-badge";
import { mockArgoApplications } from "@/lib/mock-data";

export function ArgoCdAppsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ArgoCD Applications</CardTitle>
        <CardDescription>
          Sync and health status reported by ArgoCD for every app on the cluster.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Sync</TableHead>
              <TableHead>Health</TableHead>
              <TableHead>Revision</TableHead>
              <TableHead>Last synced</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockArgoApplications.map((app) => (
              <TableRow key={app.name}>
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell className="text-muted-foreground">{app.project}</TableCell>
                <TableCell>
                  <SyncStatusBadge status={app.syncStatus} />
                </TableCell>
                <TableCell>
                  <HealthStatusBadge status={app.healthStatus} />
                </TableCell>
                <TableCell className="text-muted-foreground">{app.targetRevision}</TableCell>
                <TableCell className="text-muted-foreground">{app.lastSyncedAgo}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <ArrowsClockwise />
                    Sync
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
