import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "../lib/prisma";
import { claimUsername } from "./actions";

export default async function Home() {
  const user = await currentUser();

  // State 1: Not logged in
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <main className="flex w-full max-w-2xl flex-col items-center justify-center px-6 py-20">
          <div className="flex flex-col items-center gap-8 text-center w-full">
            <h1 className="text-5xl font-bold leading-tight text-black">
              Welcome to Linktree
            </h1>
            <p className="text-lg text-[#6B7280] max-w-md">
              Sign in to create your personalized link tree
            </p>
            <SignInButton mode="modal">
              <button className="px-8 py-4 rounded-full bg-[#FFDD00] text-black font-semibold hover:opacity-90 transition-opacity">
                Sign In
              </button>
            </SignInButton>
          </div>
        </main>
      </div>
    );
  }

  // Check if user exists in database
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
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
    <div className="flex min-h-screen bg-white">
      <main className="flex w-full max-w-4xl flex-col px-6 py-12 mx-auto">
        <div className="flex flex-col gap-8 w-full">
          <div>
            <h1 className="text-5xl font-bold leading-tight text-black mb-3">
              Dashboard
            </h1>
            <p className="text-lg text-[#6B7280]">
              Welcome, @{dbUser.username}!
            </p>
          </div>
          
          <div className="bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-black">
              Your Profile
            </h2>
            <div className="flex flex-col gap-4 text-[#6B7280]">
              <div>
                <span className="font-semibold text-black">Username:</span>{" "}
                {dbUser.username}
              </div>
              <div>
                <span className="font-semibold text-black">Email:</span>{" "}
                {dbUser.email}
              </div>
              <div>
                <span className="font-semibold text-black">Links:</span>{" "}
                {dbUser.links?.length || 0}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}