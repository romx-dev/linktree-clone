import { Plan } from "../app/generated/prisma/client";

export const PLAN_LIMITS = {
  FREE: {
    maxLinks: 5,
    features: {
      customColors: false,
      analytics: false,
      customDomain: false,
      removeBranding: false,
    },
  },
  PRO: {
    maxLinks: Infinity,
    features: {
      customColors: true,
      analytics: true,
      customDomain: false,
      removeBranding: true,
    },
  },
  PREMIUM: {
    maxLinks: Infinity,
    features: {
      customColors: true,
      analytics: true,
      customDomain: true,
      removeBranding: true,
    },
  },
} as const;

export function getPlanLimits(plan: Plan) {
  return PLAN_LIMITS[plan];
}

export function canCreateLink(
  plan: Plan,
  currentLinkCount: number,
  planExpiresAt: Date | null
): { allowed: boolean; reason?: string } {
  // Check if plan is expired
  if (planExpiresAt && planExpiresAt < new Date() && plan !== "FREE") {
    return {
      allowed: false,
      reason: "Seu plano expirou. Faça upgrade para continuar criando links.",
    };
  }

  const limits = getPlanLimits(plan);

  if (currentLinkCount >= limits?.maxLinks) {
    return {
      allowed: false,
      reason: `Plano ${plan} permite até ${limits?.maxLinks} links. Faça upgrade para criar mais!`,
    };
  }

  return { allowed: true };
}

export const PLAN_PRICES = {
  PRO: {
    monthly: 19.9,
    yearly: 199.9, // ~16.66/mês
  },
  PREMIUM: {
    monthly: 49.9,
    yearly: 499.9, // ~41.66/mês
  },
} as const;
