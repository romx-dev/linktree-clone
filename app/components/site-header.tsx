"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  return (
    <header className="flex justify-end items-center p-6">
      <SignedOut>
        <div className="flex gap-3">
          <SignInButton mode="modal">
            <Button
              variant="default"
              className={cn(
                "px-6 py-2 rounded-full border border-[#E5E5E5] bg-white text-black font-medium hover:bg-[#F7F7F7] transition-colors cursor-pointer",
              )}
            >
              Login
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button
              variant="default"
              className={cn(
                "px-8 py-4 rounded-full bg-[#ffdd00] text-gray-900 font-semibold hover:bg-transparent transition-opacity cursor-pointer",
              )}
            >
              Criar Conta
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          <Link
            href="/planos"
            className="text-sm font-semibold text-gray-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-yellow-50"
          >
            Planos
          </Link>
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
}
