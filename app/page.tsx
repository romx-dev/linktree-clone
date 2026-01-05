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
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Welcome to Linktree
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Sign in to create your personalized link tree
            </p>
            <SignInButton mode="modal">
              <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
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
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
          <div className="flex flex-col items-center gap-6 text-center w-full max-w-md">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Claim Your Username
            </h1>
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
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
                className="w-full h-12 px-4 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#6c47ff]"
              />
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center rounded-full bg-[#6c47ff] text-white font-medium transition-colors hover:bg-[#5a3ae6]"
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col gap-6 w-full">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Dashboard
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Welcome, @{dbUser.username}!
          </p>
          <div className="mt-8 p-6 border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
              Your Profile
            </h2>
            <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <p>
                <span className="font-medium">Username:</span> {dbUser.username}
              </p>
              <p>
                <span className="font-medium">Email:</span> {dbUser.email}
              </p>
              <p>
                <span className="font-medium">Links:</span>{" "}
                {dbUser.links?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
