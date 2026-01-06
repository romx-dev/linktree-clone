import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Check, Crown, Zap } from "lucide-react";
import prisma from "../../lib/prisma";
import { upgradePlan } from "../actions";
import { PLAN_PRICES } from "../../lib/plan-limits";

export default async function PlanosPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: { links: true },
  });

  if (!dbUser) {
    redirect("/");
  }

  const isPro = dbUser.plan === "PRO" || dbUser.plan === "PREMIUM";
  const isPremium = dbUser.plan === "PREMIUM";
  const planExpired = dbUser.planExpiresAt && dbUser.planExpiresAt < new Date();

  return (
    <div className="flex min-h-screen">
      <main className="flex w-full max-w-6xl flex-col px-6 py-12 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4">
            Escolha seu Plano
          </h1>
          <p className="text-lg text-[#6B7280]">
            Desbloqueie recursos poderosos para sua página de links
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Plano FREE */}
          <div className="card border-2 border-[#E5E5E5]">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">Grátis</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-black">R$ 0</span>
                  <span className="text-[#6B7280]">/mês</span>
                </div>
              </div>

              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-2 text-[#6B7280]">
                  <Check size={18} className="text-green-600" />
                  <span>Até 5 links</span>
                </li>
                <li className="flex items-center gap-2 text-[#6B7280]">
                  <Check size={18} className="text-green-600" />
                  <span>Página pública personalizada</span>
                </li>
                <li className="flex items-center gap-2 text-[#6B7280]">
                  <Check size={18} className="text-green-600" />
                  <span>Botão PIX para doações</span>
                </li>
              </ul>

              {dbUser.plan === "FREE" ?
                <button
                  disabled
                  className="px-6 py-3 rounded-full border border-[#E5E5E5] bg-gray-100 text-gray-400 font-semibold cursor-not-allowed"
                >
                  Plano Atual
                </button>
              : <button
                  disabled
                  className="px-6 py-3 rounded-full border border-[#E5E5E5] bg-gray-100 text-gray-400 font-semibold cursor-not-allowed"
                >
                  Downgrade
                </button>
              }
            </div>
          </div>

          {/* Plano PRO */}
          <div
            className={`card border-2 ${
              isPro && !isPremium ?
                "border-[#FFDD00] bg-yellow-50"
              : "border-[#E5E5E5]"
            } relative`}
          >
            {isPro && !isPremium && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FFDD00] rounded-full text-sm font-semibold text-black">
                Plano Atual
              </div>
            )}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Zap size={24} className="text-[#FFDD00]" />
                <h3 className="text-2xl font-bold text-black">Pro</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-black">
                  R$ {PLAN_PRICES.PRO.monthly.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-[#6B7280]">/mês</span>
              </div>
              <div className="text-sm text-[#6B7280]">
                ou R${" "}
                {(PLAN_PRICES.PRO.yearly / 12).toFixed(2).replace(".", ",")}{" "}
                /mês (anual)
              </div>

              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-2 text-black">
                  <Check size={18} className="text-green-600" />
                  <span className="font-semibold">Links ilimitados</span>
                </li>
                <li className="flex items-center gap-2 text-[#6B7280]">
                  <Check size={18} className="text-green-600" />
                  <span>Analytics de cliques</span>
                </li>
                <li className="flex items-center gap-2 text-[#6B7280]">
                  <Check size={18} className="text-green-600" />
                  <span>Personalização de cores</span>
                </li>
                <li className="flex items-center gap-2 text-[#6B7280]">
                  <Check size={18} className="text-green-600" />
                  <span>Sem marca d'água</span>
                </li>
                <li className="flex items-center gap-2 text-[#6B7280]">
                  <Check size={18} className="text-green-600" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>

              {isPro && !isPremium ?
                <button
                  disabled
                  className="px-6 py-3 rounded-full bg-[#FFDD00] text-black font-semibold opacity-50 cursor-not-allowed"
                >
                  Plano Atual
                </button>
              : <form action={upgradePlan} className="flex flex-col gap-2">
                  <input type="hidden" name="plan" value="PRO" />
                  <input type="hidden" name="billing" value="monthly" />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-full text-black font-semibold hover:opacity-90 transition-opacity"
                  >
                    {planExpired ? "Renovar" : "Fazer Upgrade"}
                  </button>
                </form>
              }
            </div>
          </div>

          {/* Plano PREMIUM */}
          <div
            className={`card border-2 ${
              isPremium ? "border-[#FFDD00] bg-yellow-50" : "border-[#E5E5E5]"
            } relative`}
          >
            {isPremium && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FFDD00] rounded-full text-sm font-semibold text-black">
                Plano Atual
              </div>
            )}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Crown size={24} className="text-[#FFDD00]" />
                <h3 className="text-2xl font-bold text-black">Premium</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-black">
                  R$ {PLAN_PRICES.PREMIUM.monthly.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-[#6B7280]">/mês</span>
              </div>
              <div className="text-sm text-[#6B7280]">
                ou R${" "}
                {(PLAN_PRICES.PREMIUM.yearly / 12).toFixed(2).replace(".", ",")}{" "}
                /mês (anual)
              </div>

              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-2 text-black">
                  <Check size={18} className="text-green-600" />
                  <span className="font-semibold">Tudo do Pro</span>
                </li>
                <li className="flex items-center gap-2 text-black">
                  <Check size={18} className="text-green-600" />
                  <span className="font-semibold">Domínio customizado</span>
                </li>
                <li className="flex items-center gap-2 text-[#6B7280]">
                  <Check size={18} className="text-green-600" />
                  <span>Google Analytics integrado</span>
                </li>
                <li className="flex items-center gap-2 text-[#6B7280]">
                  <Check size={18} className="text-green-600" />
                  <span>A/B testing de links</span>
                </li>
                <li className="flex items-center gap-2 text-[#6B7280]">
                  <Check size={18} className="text-green-600" />
                  <span>API access</span>
                </li>
              </ul>

              {isPremium ?
                <button
                  disabled
                  className="px-6 py-3 rounded-full bg-[#FFDD00] text-black font-semibold opacity-50 cursor-not-allowed"
                >
                  Plano Atual
                </button>
              : <form action={upgradePlan} className="flex flex-col gap-2">
                  <input type="hidden" name="plan" value="PREMIUM" />
                  <input type="hidden" name="billing" value="monthly" />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-full bg-[#FFDD00] text-black font-semibold hover:opacity-90 transition-opacity"
                  >
                    {planExpired ? "Renovar" : "Fazer Upgrade"}
                  </button>
                </form>
              }
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-[#6B7280]">
            Todos os planos incluem suporte e atualizações gratuitas
          </p>
        </div>
      </main>
    </div>
  );
}
