import { notFound } from "next/navigation";
import Link from "next/link";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "../../lib/prisma";
import CopyButton from "../components/copy-button";
import Image from "next/image";
import PixButton from "../components/pix-button";
interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function PublicProfile({ params }: PageProps) {
  const { username } = await params;

  // Fetch user with links from database
  const user = await prisma.user.findUnique({
    where: { username: username.toLowerCase() },
    include: { links: true },
  });

  // Return 404 if user not found
  if (!user) {
    notFound();
  }

  // Fetch Clerk user to get profile image
  const client = clerkClient();
  const clerkUser = await (await client).users.getUser(user.clerkId);

  // Get first letter for avatar (prefer name, fallback to username)
  const avatarLetter = (user.username || user.username)[0].toUpperCase();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex w-full max-w-2xl flex-col items-center justify-center px-6 py-20">
        <div className="card w-full">
          <div className="flex flex-col items-center gap-8 text-center w-full">
            {/* Avatar */}
            {clerkUser.imageUrl ?
              <Image
                width="200"
                height="200"
                src={clerkUser.imageUrl}
                alt={user.username}
                className="w-24 h-24 rounded-full object-cover"
              />
            : <div className="w-24 h-24 rounded-full bg-[#FFDD00] flex items-center justify-center">
                <span className="text-4xl font-bold text-black">
                  {avatarLetter}
                </span>
              </div>
            }

            {/* Username */}
            <h1 className="text-5xl font-bold leading-tight text-black">
              @{user.username}
            </h1>

            {/* Copy Link Button */}
            <CopyButton username={user.username} />

            {/* Links List */}
            {user.links.length > 0 ?
              <div className="flex flex-col gap-4 w-full mt-4">
                {user.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-8 py-4 rounded-full bg-[#FFDD00] text-black font-semibold hover:opacity-90 transition-opacity text-center"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            : <p className="text-[#6B7280] mt-4">Sem link no momento.</p>}
            {/* PIX Button - se tiver chave PIX configurada */}
            {user?.pixKey && (
              <PixButton pixKey={user?.pixKey} username={user.username} />
            )}
          </div>
        </div>

        {/* Create your own link - Outside card */}
        <div className="mt-8 w-full text-center">
          <Link
            href="/"
            className="text-[#6B7280] hover:text-black transition-colors"
          >
            Crie seu próprio Linktree →
          </Link>
        </div>
      </main>
    </div>
  );
}
