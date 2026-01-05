import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "../../lib/prisma";
import CopyButton from "../components/copy-button";

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

  // Get first letter for avatar (prefer name, fallback to username)
  const avatarLetter = (user.username || user.username)[0].toUpperCase();

  // Build the profile URL
  const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/${user.username}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <main className="flex w-full max-w-2xl flex-col items-center justify-center px-6 py-20">
        <div className="flex flex-col items-center gap-8 text-center w-full">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-[#FFDD00] flex items-center justify-center">
            <span className="text-4xl font-bold text-black">
              {avatarLetter}
            </span>
          </div>

          {/* Username */}
          <h1 className="text-5xl font-bold leading-tight text-black">
            @{user.username}
          </h1>

          {/* Name (if available) */}
          {user.username && (
            <p className="text-xl text-[#6B7280]">{user.username}</p>
          )}

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
          : <p className="text-[#6B7280] mt-4">No links yet.</p>}

          {/* Create your own link */}
          <div className="mt-12 pt-8 border-t border-[#E5E5E5] w-full">
            <Link
              href="/"
              className="text-[#6B7280] hover:text-black transition-colors"
            >
              Create your own →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
