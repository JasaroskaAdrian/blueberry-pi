"use client";

import { ArrowClockwise, DotsThreeVertical } from "@phosphor-icons/react";
import { Button, buttonVariants } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { mockDeployments } from "@/lib/mock-data";

const scalePresets = [0, 1, 2, 3];

export function DeploymentsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployments</CardTitle>
        <CardDescription>
          Live replica state from the Kubernetes API, across every watched namespace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deployment</TableHead>
              <TableHead>Namespace</TableHead>
              <TableHead>Replicas</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Age</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDeployments.map((deployment) => (
              <TableRow key={`${deployment.namespace}/${deployment.name}`}>
                <TableCell className="font-medium">{deployment.name}</TableCell>
                <TableCell className="text-muted-foreground">{deployment.namespace}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      deployment.replicasReady < deployment.replicasDesired &&
                        "text-amber-600 dark:text-amber-400"
                    )}
                  >
                    {deployment.replicasReady}/{deployment.replicasDesired}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{deployment.image}</TableCell>
                <TableCell className="text-muted-foreground">{deployment.age}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <ArrowClockwise />
                    Restart
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
                    >
                      <DotsThreeVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Scale replicas</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {scalePresets.map((count) => (
                          <DropdownMenuItem key={count}>Scale to {count}</DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
