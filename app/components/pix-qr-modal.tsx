"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PixQrModalProps {
  pixKey: string;
  username: string;
  onClose: () => void;
}

export default function PixQrModal({ pixKey, username, onClose }: PixQrModalProps) {
  const [copied, setCopied] = useState(false);

  // Gera o código PIX copia-e-cola (formato simplificado)
  const pixCode = pixKey;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Fechar"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-black">
            Me pague um café ☕
          </h2>
          <p className="text-sm text-[#6B7280] text-center">
            Escaneie o QR Code ou copie a chave PIX
          </p>

          {/* QR Code */}
          <div className="p-4 bg-white border-2 border-[#E5E5E5] rounded-xl">
            <QRCodeSVG
              value={pixCode}
              size={200}
              level="M"
              includeMargin={false}
            />
          </div>

          {/* PIX Key */}
          <div className="w-full">
            <label className="text-sm font-semibold text-black mb-2 block">
              Chave PIX:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={pixCode}
                readOnly
                className="flex-1 px-4 py-3 rounded-xl border border-[#E5E5E5] bg-gray-50 text-black text-sm font-mono"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-3 rounded-xl border border-[#E5E5E5] bg-white hover:bg-[#F7F7F7] transition-colors flex items-center gap-2"
                aria-label="Copiar chave PIX"
              >
                {copied ? (
                  <>
                    <Check size={18} className="text-green-600" />
                    <span className="text-sm text-green-600">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} className="text-gray-600" />
                    <span className="text-sm text-gray-600">Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-[#6B7280] text-center">
            Após o pagamento, envie o comprovante para @{username}
          </p>
        </div>
      </div>
    </div>
  );
}