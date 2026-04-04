/**
 * Pricing — 3-Tier Comparison: Free / Pro / Premium
 */
import { useTier } from "@/contexts/TierContext";
import { Check, X, Zap, Crown, User } from "lucide-react";

interface Feature { name: string; free: boolean | string; pro: boolean | string; premium: boolean | string; }

const features: Feature[] = [
  { name: "GEX / DIX (delayed 15min)", free: true, pro: true, premium: true },
  { name: "Basic Gamma Flip Zones", free: true, pro: true, premium: true },
  { name: "Support & Resistance Levels", free: true, pro: true, premium: true },
  { name: "Basic 10% Kelly Calculator", free: true, pro: true, premium: true },
  { name: "HMM Regime Detection (basic)", free: true, pro: true, premium: true },
  { name: "Real-time GEX / DIX / DEX", free: false, pro: true, premium: true },
  { name: "Vanna & Charm Exposure", free: false, pro: true, premium: true },
  { name: "VIX Term Structure", free: false, pro: true, premium: true },
  { name: "Vol Slope Analysis", free: false, pro: true, premium: true },
  { name: "Gap Up/Down Analysis", free: false, pro: true, premium: true },
  { name: "Volume Profile", free: false, pro: true, premium: true },
  { name: "Unusual Options Flow", free: "Basic", pro: true, premium: true },
  { name: "Dynamic Kelly Sizing", free: false, pro: true, premium: true },
  { name: "Backtesting Engine", free: false, pro: true, premium: true },
  { name: "Walk-Forward Analysis", free: false, pro: true, premium: true },
  { name: "Markov Chain Analysis", free: false, pro: true, premium: true },
  { name: "3D Volatility Surface", free: false, pro: false, premium: true },
  { name: "Monte Carlo Simulation", free: false, pro: false, premium: true },
  { name: "Efficient Frontier Optimization", free: false, pro: false, premium: true },
  { name: "Statistical Arbitrage Signals", free: false, pro: false, premium: true },
  { name: "Neuro Gamma Reflex", free: false, pro: false, premium: true },
  { name: "Institutional Money Flow", free: false, pro: false, premium: true },
  { name: "Bayesian Inference (full)", free: false, pro: false, premium: true },
  { name: "Full Strategy Engine", free: false, pro: false, premium: true },
  { name: "Custom Alerts", free: false, pro: false, premium: true },
];

const tiers = [
  { name: "Free", price: "$0", period: "forever", description: "Basic delayed data and essential tools", icon: User, color: "border-border", btnClass: "bg-muted text-foreground hover:bg-muted/80", badge: null, tier: "free" as const },
  { name: "Pro", price: "$19.99", period: "/month", description: "Real-time data, advanced analytics, backtesting", icon: Zap, color: "border-blue-500/50", btnClass: "bg-blue-600 text-white hover:bg-blue-500", badge: "bg-blue-500/15 text-blue-400", tier: "pro" as const },
  { name: "Premium", price: "$49.99", period: "/month", description: "Everything — 3D vol surface, Monte Carlo, full strategy engine", icon: Crown, color: "border-amber-500/50", btnClass: "bg-amber-600 text-white hover:bg-amber-500", badge: "bg-amber-500/15 text-amber-400", tier: "premium" as const },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-bullish mx-auto" />;
  if (value === false) return <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />;
  return <span className="text-[10px] text-muted-foreground">{value}</span>;
}

export default function Pricing() {
  const { tier, setTier } = useTier();
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Choose Your Plan</h1>
        <p className="text-sm text-muted-foreground mt-1">Unlock the full power of Options Desk</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {tiers.map((t) => {
          const Icon = t.icon;
          const active = tier === t.tier;
          return (
            <div key={t.name} className={`data-card border-2 transition-all ${active ? t.color + " shadow-lg" : "border-border"} ${t.name === "Premium" ? "lg:scale-105 lg:z-10" : ""}`}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5" />
                <h2 className="text-lg font-bold">{t.name}</h2>
                {t.badge && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${t.badge}`}>{t.name.toUpperCase()}</span>}
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold mono">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mb-4">{t.description}</p>
              <button onClick={() => setTier(t.tier)} className={`w-full py-2 rounded-md text-sm font-bold tracking-wide transition-all ${active ? "bg-muted/50 text-muted-foreground cursor-default" : t.btnClass}`}>
                {active ? "Current Plan" : `Select ${t.name}`}
              </button>
            </div>
          );
        })}
      </div>
      <div className="data-card overflow-x-auto">
        <h2 className="text-sm font-bold mb-4">Feature Comparison</h2>
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 font-medium text-muted-foreground w-1/2">Feature</th>
              <th className="text-center py-2 font-medium w-1/6">Free</th>
              <th className="text-center py-2 font-medium text-blue-400 w-1/6">Pro</th>
              <th className="text-center py-2 font-medium text-amber-400 w-1/6">Premium</th>
            </tr>
          </thead>
          <tbody>
            {features.map((f) => (
              <tr key={f.name} className="border-b border-border/30 hover:bg-muted/20">
                <td className="py-2 font-medium">{f.name}</td>
                <td className="py-2 text-center"><FeatureCell value={f.free} /></td>
                <td className="py-2 text-center"><FeatureCell value={f.pro} /></td>
                <td className="py-2 text-center"><FeatureCell value={f.premium} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-muted-foreground text-center">Demo application — no actual payments processed. Use the tier selector in the sidebar to preview access levels.</p>
    </div>
  );
}
