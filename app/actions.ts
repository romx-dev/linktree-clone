"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { canCreateLink } from "../lib/plan-limits";

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
    include: { links: true },
  });

  if (!dbUser) {
    throw new Error("User profile not found");
  }

  // Check plan limits
  const limitCheck = canCreateLink(
    dbUser.plan,
    dbUser.links.length,
    dbUser.planExpiresAt
  );

  if (!limitCheck.allowed) {
    throw new Error(limitCheck.reason || "Limite de links atingido");
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

export async function upgradePlan(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    throw new Error("User profile not found");
  }

  const plan = formData.get("plan") as "PRO" | "PREMIUM";
  const billing = formData.get("billing") as "monthly" | "yearly";

  if (!plan || !billing) {
    throw new Error("Plan and billing are required");
  }

  // Calculate expiration date
  const now = new Date();
  const expiresAt = new Date(now);
  if (billing === "monthly") {
    expiresAt.setMonth(expiresAt.getMonth() + 1);
  } else {
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
  }

  // In a real implementation, you would:
  // 1. Create payment intent with Mercado Pago/Stripe
  // 2. Redirect to payment page
  // 3. Handle webhook to update plan after payment
  
  // For now, we'll create a mock upgrade (remove in production!)
  // TODO: Replace with actual payment integration
  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      plan: plan,
      planExpiresAt: expiresAt,
    },
  });

  revalidatePath("/");
  revalidatePath("/planos");
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

export async function updatePixKey(formData: FormData) {
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

  const pixKey = formData.get("pixKey") as string;

  // Basic validation
  if (!pixKey || pixKey.trim().length === 0) {
    throw new Error("Chave PIX é obrigatória");
  }

  // Update PIX key
  await prisma.user.update({
    where: { id: dbUser.id },
    data: { pixKey: pixKey.trim() },
  });

  revalidatePath("/");
}

export async function removePixKey() {
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

  // Remove PIX key
  await prisma.user.update({
    where: { id: dbUser.id },
    data: { pixKey: null },
  });

  revalidatePath("/");
}
