"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

export async function claimUsername(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const username = formData.get("username") as string;

  // Basic validation
  if (!username || username.length < 3) {
    throw new Error("Username must be at least 3 characters long");
  }

  // Alphanumeric + underscore validation
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new Error(
      "Username can only contain letters, numbers, and underscores"
    );
  }

  try {
    // Create user profile in database
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        username: username.toLowerCase(),
      },
    });

    redirect("/");
  } catch (error: any) {
    // Handle unique constraint violation (duplicate username or clerkId)
    if (error.code === "P2002") {
      throw new Error("Username is already taken");
    }
    throw error;
  }
}

export async function createLink(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Get user from database
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    throw new Error("User profile not found");
  }

  const title = formData.get("title") as string;
  const url = formData.get("url") as string;

  // Basic validation
  if (!title || !url) {
    throw new Error("Title and URL are required");
  }

  // Create link
  await prisma.link.create({
    data: {
      title,
      url,
      userId: dbUser.id,
    },
  });

  revalidatePath("/");
}

export async function deleteLink(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Get user from database
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    throw new Error("User profile not found");
  }

  const linkId = formData.get("linkId") as string;

  if (!linkId) {
    throw new Error("Link ID is required");
  }

  // Verify the link belongs to the user before deleting
  await prisma.link.deleteMany({
    where: {
      id: parseInt(linkId),
      userId: dbUser.id,
    },
  });

  revalidatePath("/");
}