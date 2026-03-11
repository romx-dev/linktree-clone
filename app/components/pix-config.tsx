import { Trash2 } from "lucide-react";
import { removePixKey, updatePixKey } from "../actions";

type PixConfigProps = {
  pixKey: string | null;
};

export default function PixConfig({ pixKey }: PixConfigProps) {
  if (pixKey) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between bg-white border border-[#E5E5E5] rounded-xl p-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-[#6B7280]">
              Chave PIX configurada:
            </span>
            <span className="font-mono text-sm text-black break-all">
              {pixKey}
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
    );
  }

  return (
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
          Configure sua chave PIX para receber doações dos seus visitantes
        </p>
      </div>
      <button
        type="submit"
        className="px-8 py-4 rounded-full bg-[#FFDD00] text-black font-semibold hover:opacity-90 transition-opacity"
      >
        Salvar Chave PIX
      </button>
    </form>
  );
}
