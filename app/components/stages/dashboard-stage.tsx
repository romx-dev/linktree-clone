import { Coffee, ExternalLink, Link as LinkIcon, Trash2 } from "lucide-react";
import {
  createLink,
  deleteLink,
  removePixKey,
  updatePixKey,
} from "../../actions";
import LinkLimitCounter from "@/app/components/link-limit-counter";
import LinkLimitWarning from "@/app/components/link-limit-warning";
import LinkSubmitButton from "@/app/components/link-submit-button";
import PlanBadge from "@/app/components/plan-badge";
import PlanManagementLink from "@/app/components/plan-management-link";
import PlanValidity from "@/app/components/plan-validity";
import type { Link as PrismaLink, User } from "@/app/generated/prisma/client";
import type { LinkLimitCheck, PlanLimits } from "@/lib/plan-limits";

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
  return (
    <div className="flex min-h-screen">
      <main className="flex w-full max-w-4xl flex-col px-6 py-12 mx-auto">
        <div className="flex flex-col gap-8 w-full">
          <div className="card">
            <h1 className="text-5xl font-bold leading-tight text-black mb-3">
              Dashboard
            </h1>
            <p className="text-lg text-[#6B7280]">
              Bem-vindo, @{dbUser.username}!
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <PlanBadge plan={dbUser.plan} />
            </div>
            <PlanValidity
              plan={dbUser.plan}
              planExpiresAt={dbUser.planExpiresAt}
            />
            <PlanManagementLink plan={dbUser.plan} />
          </div>
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
              <Coffee size={24} />
              Me pague um café (PIX)
            </h2>
            {dbUser.pixKey ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between bg-white border border-[#E5E5E5] rounded-xl p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-[#6B7280]">
                      Chave PIX configurada:
                    </span>
                    <span className="font-mono text-sm text-black break-all">
                      {dbUser.pixKey}
                    </span>
                  </div>
                  <form action={removePixKey}>
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-full border border-[#E5E5E5] bg-white text-black font-medium hover:bg-[#F7F7F7] transition-colors flex items-center justify-center gap-2"
                      aria-label="Remover chave PIX"
                    >
                      <Trash2 size={18} />
                      <span className="text-sm">Remover</span>
                    </button>
                  </form>
                </div>
                <p className="text-sm text-[#6B7280]">
                  ✓ Seu botão de PIX aparecerá na sua página pública
                </p>
              </div>
            ) : (
              <form action={updatePixKey} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black">
                    Chave PIX (CPF, Email, Telefone ou Chave Aleatória)
                  </label>
                  <input
                    type="text"
                    name="pixKey"
                    placeholder="Ex: 123.456.789-00 ou seu@email.com"
                    required
                    className="w-full px-6 py-4 rounded-xl border border-[#E5E5E5] bg-white text-black placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  />
                  <p className="text-xs text-[#6B7280]">
                    Configure sua chave PIX para receber doações dos seus
                    visitantes
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-[#FFDD00] text-black font-semibold hover:opacity-90 transition-opacity"
                >
                  Salvar Chave PIX
                </button>
              </form>
            )}
          </div>
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">Adicionar Link</h2>
              <LinkLimitCounter
                count={dbUser.links.length}
                maxLinks={planLimits?.maxLinks}
              />
            </div>
            <LinkLimitWarning
              allowed={limitCheck.allowed}
              reason={limitCheck.reason}
            />
            <form action={createLink} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Link do Titulo"
                required
                disabled={!limitCheck.allowed}
                className="w-full px-6 py-4 rounded-xl border border-[#E5E5E5] bg-white text-black placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input
                type="url"
                name="url"
                placeholder="https://example.com"
                required
                disabled={!limitCheck.allowed}
                className="w-full px-6 py-4 rounded-xl border border-[#E5E5E5] bg-white text-black placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <LinkSubmitButton allowed={limitCheck.allowed} />
            </form>
          </div>
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-black">Seus Links</h2>
            {dbUser.links.length === 0 ? (
              <div className="flex flex-col items-center gap-3 text-[#6B7280]">
                <LinkIcon size={24} className="opacity-50" />
                <p>Ainda não há links. Adicione seu primeiro link acima!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {dbUser.links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between bg-white border border-[#E5E5E5] rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex flex-col gap-1 flex-1">
                        <h3 className="font-semibold text-black">
                          {link.title}
                        </h3>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#6B7280] hover:text-black transition-colors flex items-center gap-1"
                        >
                          {link.url}
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                    <form action={deleteLink}>
                      <input type="hidden" name="linkId" value={link.id} />
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-full border border-[#E5E5E5] bg-white text-black font-medium hover:bg-[#F7F7F7] transition-colors flex items-center justify-center"
                        aria-label="Delete link"
                      >
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-black">Seu Perfil</h2>
            <div className="flex flex-col gap-4 text-[#6B7280]">
              <div>
                <span className="font-semibold text-black">Nickname:</span>{" "}
                {dbUser.username}
              </div>
              <div>
                <span className="font-semibold text-black">Email:</span>{" "}
                {dbUser.email}
              </div>
              <div>
                <span className="font-semibold text-black">Links:</span>{" "}
                {dbUser.links.length}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
