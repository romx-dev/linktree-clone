"use client";

import { useState } from "react";
import { Coffee } from "lucide-react";
import PixQrModal from "./pix-qr-modal";

interface PixButtonProps {
  pixKey: string;
  username: string;
}

export default function PixButton({ pixKey, username }: PixButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#FFDD00] to-[#FFC700] text-black font-semibold hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2 mt-2"
      >
        <Coffee size={20} />
        Me pague um café ☕
      </button>

      {showModal && (
        <PixQrModal
          pixKey={pixKey}
          username={username}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
