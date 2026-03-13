import type { Link as PrismaLink, User } from "@/app/generated/prisma/client";
import type { LinkLimitCheck, PlanLimits } from "@/lib/plan-limits";
import DashboardHeader from "@/app/components/dashboard/dashboard-header";
import DashboardSidebar from "@/app/components/dashboard/sidebar";
import LinksList from "@/app/components/dashboard/links-list";
import NewLinkCard from "@/app/components/dashboard/new-link-card";
import PixSupportCard from "@/app/components/dashboard/pix-support-card";
import PreviewPhone from "@/app/components/dashboard/preview-phone";

type DashboardStageProps = {
  dbUser: User & { links: PrismaLink[] };
  planLimits?: PlanLimits;
  limitCheck: LinkLimitCheck;
};

export default function DashboardStage({
  dbUser,
  planLimits,
  limitCheck,
}: DashboardStageProps) {
  const totalLinks = dbUser.links.length;
  const overviewStatus = limitCheck.allowed
    ? ""
    : (limitCheck.reason ?? "Limite atingido");

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(135deg,_#f8f9fa_0%,_#f8f9fa_50%,_#fced70_50%,_#fced70_100%)] p-6 md:p-10 flex items-center justify-center">
      <div className="flex w-full max-w-6xl flex-col rounded-3xl bg-white shadow-2xl shadow-black/10 overflow-hidden md:flex-row h-[800px]">
        <DashboardSidebar />
        <main className="flex flex-1 flex-col bg-[#F3F4F6] overflow-hidden">
          <DashboardHeader
            plan={dbUser.plan}
            username={dbUser.username}
            planExpiresAt={dbUser.planExpiresAt}
            totalLinks={totalLinks}
            maxLinks={planLimits?.maxLinks}
          />
          <div className="flex flex-1 flex-col overflow-y-auto p-8 pb-20">
            <LinksList links={dbUser.links} />
            <PixSupportCard username={dbUser.username} pixKey={dbUser.pixKey} />
            <NewLinkCard
              limitCheck={limitCheck}
              overviewStatus={overviewStatus}
            />
          </div>
        </main>

        <PreviewPhone
          name={dbUser.name}
          username={dbUser.username}
          links={dbUser.links}
        />
      </div>
    </div>
  );
}
