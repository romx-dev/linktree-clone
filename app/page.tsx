import { currentUser } from "@clerk/nextjs/server";
import prisma from "../lib/prisma";
import { canCreateLink, getPlanLimits } from "../lib/plan-limits";
import DashboardStage from "./components/stages/dashboard-stage";
import ClaimUsernameStage from "./components/stages/claim-username-stage";
import NotSignedInStage from "./components/stages/not-signed-in-stage";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return <NotSignedInStage />;
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: { links: true },
  });

  if (!dbUser) {
    return <ClaimUsernameStage />;
  }

  const planLimits = getPlanLimits(dbUser.plan);
  const limitCheck = canCreateLink(
    dbUser.plan,
    dbUser.links.length,
    dbUser.planExpiresAt,
  );

  return (
    <DashboardStage
      dbUser={dbUser}
      planLimits={planLimits}
      limitCheck={limitCheck}
    />
  );
}
