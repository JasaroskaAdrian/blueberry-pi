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
import { PodStatusBadge } from "@/components/status-badge";
import { mockPods } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function PodsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pods</CardTitle>
        <CardDescription>
          Read-only pod state — restarts happen at the Deployment level above.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pod</TableHead>
              <TableHead>Namespace</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Restarts</TableHead>
              <TableHead>Node</TableHead>
              <TableHead>Age</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPods.map((pod) => (
              <TableRow key={`${pod.namespace}/${pod.name}`}>
                <TableCell className="font-mono text-xs">{pod.name}</TableCell>
                <TableCell className="text-muted-foreground">{pod.namespace}</TableCell>
                <TableCell>
                  <PodStatusBadge status={pod.status} />
                </TableCell>
                <TableCell
                  className={cn(pod.restarts > 0 && "text-amber-600 dark:text-amber-400")}
                >
                  {pod.restarts}
                </TableCell>
                <TableCell className="text-muted-foreground">{pod.node}</TableCell>
                <TableCell className="text-muted-foreground">{pod.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
