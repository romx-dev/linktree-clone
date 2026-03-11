import { Crown, Zap } from "lucide-react";

type PlanBadgeProps = {
  plan: "FREE" | "PRO" | "PREMIUM" | string;
};

export default function PlanBadge({ plan }: PlanBadgeProps) {
  if (plan === "FREE") {
    return (
      <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm">
        Plano Grátis
      </span>
    );
  }

  if (plan === "PRO") {
    return (
      <span className="px-4 py-2 rounded-full bg-[#FFDD00] text-black font-semibold text-sm flex items-center gap-1">
        <Zap size={16} />
        Pro
      </span>
    );
  }

  return (
    <span className="px-4 py-2 rounded-full bg-[#FFDD00] text-black font-semibold text-sm flex items-center gap-1">
      <Crown size={16} />
      Premium
    </span>
  );
}
