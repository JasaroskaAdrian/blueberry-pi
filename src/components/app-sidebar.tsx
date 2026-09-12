"use client";

import { GitBranch, House, Stack, CirclesFour } from "@phosphor-icons/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Overview", href: "#overview", icon: House },
  { title: "ArgoCD Applications", href: "#argocd", icon: GitBranch },
  { title: "Deployments", href: "#deployments", icon: Stack },
  { title: "Pods", href: "#pods", icon: CirclesFour },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <span className="font-heading truncate text-sm font-semibold group-data-[collapsible=icon]:hidden">
            blueberry-pi
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Cluster</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton tooltip={item.title} render={<a href={item.href} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="truncate px-2 py-1.5 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          Raspberry Pi 5 cluster
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
