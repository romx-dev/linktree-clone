import { createLink } from "@/app/actions";
import LinkLimitWarning from "@/app/components/link-limit-warning";
import LinkSubmitButton from "@/app/components/link-submit-button";
import type { LinkLimitCheck } from "@/lib/plan-limits";

type NewLinkCardProps = {
  limitCheck: LinkLimitCheck;
  overviewStatus: string;
};

export default function NewLinkCard({
  limitCheck,
  overviewStatus,
}: NewLinkCardProps) {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg shadow-black/5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Conecte um novo link
        </h3>
        <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
          {overviewStatus}
        </span>
      </div>
      <div className="mt-4 space-y-4 text-sm text-gray-600">
        <p>Crie links com títulos curtos e URLs completas.</p>
        <LinkLimitWarning
          allowed={limitCheck.allowed}
          reason={limitCheck.reason}
        />
      </div>
      <form action={createLink} className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            Título
          </label>
          <input
            type="text"
            name="title"
            placeholder="Nome do link"
            required
            disabled={!limitCheck.allowed}
            className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            URL
          </label>
          <input
            type="url"
            name="url"
            placeholder="https://example.com"
            required
            disabled={!limitCheck.allowed}
            className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
        <LinkSubmitButton allowed={limitCheck.allowed} />
      </form>
    </div>
  );
}
