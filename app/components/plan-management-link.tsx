import Link from "next/link";

type PlanManagementLinkProps = {
  plan: "FREE" | "PRO" | "PREMIUM" | string;
};

export default function PlanManagementLink({
  plan,
}: PlanManagementLinkProps) {
  return (
    <Link href="/planos" className="text-sm hover:underline font-semibold">
      {plan === "FREE" ? "Fazer Upgrade" : "Gerenciar Plano"}
    </Link>
  );
}
