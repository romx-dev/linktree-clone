import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { ExternalLink, Trash2, Link as LinkIcon } from "lucide-react";
import prisma from "../lib/prisma";
import { claimUsername, createLink, deleteLink } from "./actions";

import CopyButton from "./components/copy-button";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await currentUser();

  // State 1: Not logged in
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center relative overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] bg-white rounded-full blur-3xl opacity-50"></div>
        </div>

        <main className="relative z-10 flex w-full max-w-2xl flex-col items-center justify-center px-6 py-20">
          <div className="flex flex-col items-center gap-8 text-center w-full">
            <h1 className="text-5xl font-bold leading-tight text-black">
              Bem-vindo ao Linktree
            </h1>
            <p className="text-lg text-[#6B7280] max-w-md">
              Faça login para criar sua árvore de links personalizada.
            </p>
            <SignInButton mode="modal">
              <Button
                variant="default"
                className="rounded-full bg-[#FFDD00] text-black font-semibold  transition-opacity hover:bg-[#f3d985] cursor-pointer"
              >
                Fazer Login
              </Button>
            </SignInButton>
          </div>
        </main>
      </div>
    );
  }

  // Check if user exists in database
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: { links: true },
  });

  // State 2: Logged in but no DB profile
  if (!dbUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <main className="flex w-full max-w-2xl flex-col items-center justify-center px-6 py-20">
          <div className="flex flex-col items-center gap-8 text-center w-full max-w-md">
            <h1 className="text-5xl font-bold leading-tight text-black">
              Claim Your Username
            </h1>
            <p className="text-lg text-[#6B7280]">
              Choose a unique username to get started
            </p>
            <form action={claimUsername} className="w-full flex flex-col gap-4">
              <input
                type="text"
                name="username"
                placeholder="username"
                required
                minLength={3}
                pattern="[a-zA-Z0-9_]+"
                className="w-full px-6 py-4 rounded-xl border border-[#E5E5E5] bg-white text-black placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full px-8 py-4 rounded-full bg-[#FFDD00] text-black font-semibold hover:opacity-90 transition-opacity"
              >
                Claim Username
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // State 3: Has DB profile - Show dashboard
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

          {/* Add Link Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-black">
              Adicionar Link
            </h2>
            <form action={createLink} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Link do Titulo"
                required
                className="w-full px-6 py-4 rounded-xl border border-[#E5E5E5] bg-white text-black placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
              />
              <input
                type="url"
                name="url"
                placeholder="https://example.com"
                required
                className="w-full px-6 py-4 rounded-xl border border-[#E5E5E5] bg-white text-black placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-[#FFDD00] text-black font-semibold hover:opacity-90 transition-opacity"
              >
                Adicionar Link
              </button>
            </form>
          </div>

          {/* Links List */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-black">Seus Links</h2>
            {dbUser.links.length === 0 ?
              <div className="flex flex-col items-center gap-3 text-[#6B7280]">
                <LinkIcon size={24} className="opacity-50" />
                <p>Ainda não há links. Adicione seu primeiro link acima!</p>
              </div>
            : <div className="flex flex-col gap-4">
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
            }
          </div>

          {/* Profile Info */}
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
