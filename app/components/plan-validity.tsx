type PlanValidityProps = {
  plan: "FREE" | "PRO" | "PREMIUM" | string;
  planExpiresAt: Date | null;
};

export default function PlanValidity({
  plan,
  planExpiresAt,
}: PlanValidityProps) {
  const planExpired = planExpiresAt && planExpiresAt < new Date();

  if (planExpired) {
    return (
      <span className="text-xs text-red-600 font-semibold">
        Plano Expirado
      </span>
    );
  }

  if (plan !== "FREE" && planExpiresAt) {
    return (
      <span className="text-xs text-[#6B7280]">
        Válido até {planExpiresAt.toLocaleDateString("pt-BR")}
      </span>
    );
  }

  return null;
}
