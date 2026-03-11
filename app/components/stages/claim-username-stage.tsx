import { claimUsername } from "../../actions";

export default function ClaimUsernameStage() {
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
