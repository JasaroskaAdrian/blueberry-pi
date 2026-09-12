import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { OverviewStats } from "@/components/overview-stats";
import { ArgoCdAppsSection } from "@/components/argocd-apps-section";
import { DeploymentsSection } from "@/components/deployments-section";
import { PodsSection } from "@/components/pods-section";

export default function Home() {
  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="font-heading text-sm font-medium">Overview</h1>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <section id="overview" className="scroll-mt-20">
          <OverviewStats />
        </section>
        <section id="argocd" className="scroll-mt-20">
          <ArgoCdAppsSection />
        </section>
        <section id="deployments" className="scroll-mt-20">
          <DeploymentsSection />
        </section>
        <section id="pods" className="scroll-mt-20">
          <PodsSection />
        </section>
      </div>
    </SidebarInset>
  );
}
