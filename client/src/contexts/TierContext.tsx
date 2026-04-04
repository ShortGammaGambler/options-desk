/**
 * Options Desk — 3-Tier Access Context
 * Free / Pro / Premium tier management
 */
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Tier, TierRequirement } from "@/lib/types";

interface TierContextValue {
  tier: Tier;
  setTier: (t: Tier) => void;
  hasAccess: (req: TierRequirement) => boolean;
}

const TierContext = createContext<TierContextValue | null>(null);

const TIER_LEVEL: Record<Tier, number> = { free: 0, pro: 1, premium: 2 };

export function TierProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<Tier>("free");
  const hasAccess = (req: TierRequirement) => TIER_LEVEL[tier] >= TIER_LEVEL[req];
  return (
    <TierContext.Provider value={{ tier, setTier, hasAccess }}>
      {children}
    </TierContext.Provider>
  );
}

export function useTier() {
  const ctx = useContext(TierContext);
  if (!ctx) throw new Error("useTier must be used within TierProvider");
  return ctx;
}
