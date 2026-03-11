import Link from "next/link";
import { AlertCircle } from "lucide-react";

type LinkLimitWarningProps = {
  allowed: boolean;
  reason: string;
};

export default function LinkLimitWarning({
  allowed,
  reason,
}: LinkLimitWarningProps) {
  if (allowed) {
    return null;
  }

  return (
    <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
      <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-yellow-900 mb-1">
          Limite de links atingido
        </p>
        <p className="text-sm text-yellow-800 mb-2">{reason}</p>
        <Link
          href="/planos"
          className="text-sm font-semibold text-yellow-900 hover:underline"
        >
          Fazer upgrade →
        </Link>
      </div>
    </div>
  );
}
