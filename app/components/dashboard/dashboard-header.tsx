import LinkLimitCounter from "@/app/components/link-limit-counter";
import PlanBadge from "@/app/components/plan-badge";
import PlanManagementLink from "@/app/components/plan-management-link";
import PlanValidity from "@/app/components/plan-validity";
import type { User } from "@/app/generated/prisma/client";
import Link from "next/link";

type DashboardHeaderProps = {
  plan: User["plan"];
  username: User["username"];
  planExpiresAt: Date | null;
  totalLinks: number;
  maxLinks: number | null | undefined;
};

export default function DashboardHeader({
  plan,
  username,
  planExpiresAt,
  totalLinks,
  maxLinks,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-gray-200 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <PlanBadge plan={plan} />
          <PlanValidity plan={plan} planExpiresAt={planExpiresAt} />
        </div>
        <div className="hidden items-center gap-3 text-xs text-gray-500 md:flex">
          <LinkLimitCounter count={totalLinks} maxLinks={maxLinks} />
        </div>
        <div className="text-xs text-gray-500">
          <PlanManagementLink plan={plan} />
        </div>
        <div>
          <Link
            href={`/${username}`}
            className="w-full rounded-full text-center font-semibold text-black text-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
            target="_blank"
          >
            Ver página do usuário {">"}
          </Link>
        </div>
      </div>
    </header>
  );
}
