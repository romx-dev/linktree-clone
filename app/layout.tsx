import { type Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linktree",
  description: "Crie seu próprio Linktree",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="light">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        >
          <header className="flex justify-end items-center p-6">
            <SignedOut>
              <div className="flex gap-3">
                <SignInButton mode="modal">
                  <Button
                    variant="default"
                    className={cn(
                      "px-6 py-2 rounded-full border border-[#E5E5E5] bg-white text-black font-medium hover:bg-[#F7F7F7] transition-colors cursor-pointer"
                    )}
                  >
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    variant="default"
                    className={cn(
                      "px-8 py-4 rounded-full bg-[#ffdd00] text-gray-900 font-semibold hover:bg-transparent transition-opacity cursor-pointer"
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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
