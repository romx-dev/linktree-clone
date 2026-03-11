import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function NotSignedInStage() {
  return (
    <div className="flex flex-col bg-white">
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center max-w-7xl mx-auto w-full">
        <h1 className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] tracking-[-0.05em] font-black uppercase mt-12 mb-6">
          Seu Link.
          <br />
          Sua História.
        </h1>

        <div className="flex flex-col items-center gap-8 max-w-xl">
          <p className="text-sm md:text-base text-[#4b5563] font-medium leading-relaxed">
            Crie sua árvore de links personalizada e conte sua história.
          </p>
          <div className="w-full flex flex-col items-center gap-4">
            <SignInButton mode="modal">
              <Button className="bg-[#FFE600] text-black font-black py-5 px-12 rounded-full text-xl uppercase tracking-tight shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200">
                Fazer Login
              </Button>
            </SignInButton>
          </div>
        </div>
      </main>
    </div>
  );
}
