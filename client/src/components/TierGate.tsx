/**
 * TierGate — Overlay component for locked features
 * Shows blurred content with upgrade prompt for insufficient tier
 */
import { useTier } from "@/contexts/TierContext";
import type { TierRequirement } from "@/lib/types";
import { Lock, Crown, Zap } from "lucide-react";
import { useLocation } from "wouter";
import type { ReactNode } from "react";

interface TierGateProps {
  required: TierRequirement;
  children: ReactNode;
  label?: string;
}

const tierInfo: Record<string, { icon: typeof Lock; label: string; color: string }> = {
  pro: { icon: Zap, label: "PRO", color: "text-blue-400" },
  premium: { icon: Crown, label: "PREMIUM", color: "text-amber-400" },
};

export function TierBadge({ tier }: { tier: TierRequirement }) {
  if (tier === "free") return null;
  const info = tierInfo[tier];
  const Icon = info.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded ${tier === "pro" ? "bg-blue-500/15 text-blue-400" : "bg-amber-500/15 text-amber-400"}`}>
      <Icon className="w-3 h-3" />
      {info.label}
    </span>
  );
}

export default function TierGate({ required, children, label }: TierGateProps) {
  const { hasAccess } = useTier();
  const [, setLocation] = useLocation();

  if (hasAccess(required)) return <>{children}</>;

  const info = tierInfo[required] || tierInfo.pro;

  return (
    <div className="relative">
      <div className="blur-[6px] pointer-events-none select-none opacity-50">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg z-10">
        <div className="flex flex-col items-center gap-3 p-6 text-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${required === "pro" ? "bg-blue-500/20" : "bg-amber-500/20"}`}>
            <Lock className={`w-6 h-6 ${info.color}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {label || "This feature"} requires {info.label}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Upgrade to unlock full access
            </p>
          </div>
          <button
            onClick={() => setLocation("/pricing")}
            className={`px-4 py-2 rounded-md text-xs font-bold tracking-wide transition-all ${required === "pro" ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-amber-600 hover:bg-amber-500 text-white"}`}
          >
            Upgrade to {info.label}
          </button>
        </div>
      </div>
    </div>
  );
}
