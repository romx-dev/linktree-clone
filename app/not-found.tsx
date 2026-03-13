import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex w-full max-w-2xl flex-col items-center justify-center px-6 py-20">
        <div className="card">
          <div className="flex flex-col items-center gap-8 text-center w-full">
            <h1 className="text-5xl md:text-9xl font-bold leading-tight text-black">
              404
            </h1>
            <p className="text-lg text-[#6B7280] max-w-md">
              Página não encontrada. A página que você está procurando não
              existe.
            </p>
            <Link
              href="/"
              className="px-8 py-4 rounded-full bg-[#FFDD00] text-black font-semibold hover:opacity-90 transition-opacity"
            >
              Voltar
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
