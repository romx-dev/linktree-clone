import { Coffee } from "lucide-react";
import { removePixKey, updatePixKey } from "@/app/actions";
import type { User } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";

type PixSupportCardProps = {
  username: User["username"];
  pixKey: User["pixKey"];
};

export default function PixSupportCard({
  username,
  pixKey,
}: PixSupportCardProps) {
  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg shadow-black/5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-500">
          Support Me
        </h3>
        <span className="text-xs font-semibold text-gray-500">@{username}</span>
      </div>
      <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
        <Coffee size={18} />
        <p>
          Receba apoio com uma chave PIX e mantenha o seu Linktree atualizado.
        </p>
      </div>
      <div className="mt-4">
        {pixKey ? (
          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 focus:border-black focus:outline-none"
              readOnly
              value={pixKey}
            />
            <form action={removePixKey}>
              <button
                type="submit"
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-pink-500 transition hover:border-gray-400"
              >
                Remover
              </button>
            </form>
          </div>
        ) : (
          <form action={updatePixKey} className="flex flex-col gap-3">
            <input
              type="text"
              name="pixKey"
              placeholder="CPF, e-mail ou chave aleatória"
              required
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 focus:border-black focus:outline-none"
            />
            <Button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:opacity-90"
            >
              Salvar chave PIX
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
