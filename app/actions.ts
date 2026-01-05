"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
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
