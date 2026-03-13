import type { Link as PrismaLink, User } from "@/app/generated/prisma/client";
import Image from "next/image";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type PreviewPhoneProps = {
  name: User["name"];
  username: User["username"];
  links: PrismaLink[];
};

export default async function PreviewPhone({
  name,
  username,
  links,
}: PreviewPhoneProps) {
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
    <aside className="hidden w-[380px] flex-shrink-0 items-center justify-center border-l border-gray-200 bg-[#F3F4F6] p-8 md:flex">
      <div className="relative w-[280px] h-[580px] rounded-[40px] border-4 border-gray-800 bg-black p-3">
        <div className="relative h-full overflow-hidden rounded-[32px] bg-[#FDF6D5] px-5 pt-16">
          <div className="absolute top-3 left-1/2 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-black"></div>
          <div className="flex flex-col items-center mb-8 space-y-1">
            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-white shadow-sm">
              {/* Avatar */}
              {clerkUser.imageUrl ? (
                <Image
                  width="200"
                  height="200"
                  src={clerkUser.imageUrl}
                  alt={user.username}
                  className="w-18 h-18 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#FFDD00] flex items-center justify-center">
                  <span className="text-4xl font-bold text-black">
                    {avatarLetter}
                  </span>
                </div>
              )}
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              {name ?? "Sem Nome"}
            </h2>
            <p className="text-sm text-gray-600">@{username}</p>
          </div>
          <div className="space-y-3">
            {links.map((link) => (
              <a
                key={`preview-${link.id}`}
                className="block rounded-full bg-white py-3.5 px-4 text-center text-sm font-semibold text-gray-800 shadow-xl transition-transform hover:scale-[1.01]"
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
