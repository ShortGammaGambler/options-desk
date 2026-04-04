/**
 * DashboardLayout — Sidebar navigation + market ticker + content area
 * Bloomberg Terminal Noir aesthetic
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTier } from "@/contexts/TierContext";
import { DisclaimerBanner, DisclaimerFooter } from "./Disclaimer";
import { TierBadge } from "./TierGate";
import { marketTicker } from "@/lib/mockData";
import type { TierRequirement } from "@/lib/types";
import {
  LayoutDashboard, BarChart3, Brain, Target, Calculator, CreditCard,
  ChevronLeft, ChevronRight, Activity, TrendingUp, Layers, FlaskConical,
  LineChart, Menu, X
} from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
  tier: TierRequirement;
}

const navItems: NavItem[] = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, tier: "free" },
  { path: "/analytics", label: "Analytics", icon: BarChart3, tier: "free" },
  { path: "/quant", label: "Quant Models", icon: Brain, tier: "free" },
  { path: "/strategies", label: "Strategies", icon: Target, tier: "free" },
  { path: "/sizing", label: "Position Sizing", icon: Calculator, tier: "free" },
  { path: "/backtest", label: "Backtesting", icon: Activity, tier: "pro" },
  { path: "/walkforward", label: "Walk-Forward", icon: TrendingUp, tier: "pro" },
  { path: "/montecarlo", label: "Monte Carlo", icon: FlaskConical, tier: "premium" },
  { path: "/frontier", label: "Efficient Frontier", icon: Layers, tier: "premium" },
  { path: "/volsurface", label: "Vol Surface 3D", icon: LineChart, tier: "premium" },
  { path: "/pricing", label: "Pricing", icon: CreditCard, tier: "free" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { tier, setTier } = useTier();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <DisclaimerBanner />

      {/* Market Ticker */}
      <div className="w-full bg-card/80 border-b border-border px-4 py-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 min-w-max">
          {marketTicker.map((t) => (
            <div key={t.symbol} className="flex items-center gap-2 mono text-xs">
              <span className="text-muted-foreground font-medium">{t.symbol}</span>
              <span className="text-foreground font-semibold">{t.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              <span className={t.change >= 0 ? "text-bullish" : "text-bearish"}>
                {t.change >= 0 ? "+" : ""}{t.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile menu button */}
        <button
          className="lg:hidden fixed top-20 left-3 z-50 bg-card border border-border rounded-md p-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Sidebar */}
        <aside className={`
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          fixed lg:relative z-40 lg:z-auto
          h-[calc(100vh-4.5rem)] lg:h-auto
          bg-sidebar border-r border-sidebar-border
          transition-all duration-200 flex flex-col
          ${collapsed ? "w-16" : "w-52"}
        `}>
          <div className="p-4 border-b border-sidebar-border flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            {!collapsed && <span className="font-bold text-sm tracking-wide">Options Desk</span>}
          </div>

          {!collapsed && (
            <div className="px-3 py-2 border-b border-sidebar-border">
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as "free" | "pro" | "premium")}
                className="w-full text-[11px] bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border rounded px-2 py-1 mono"
              >
                <option value="free">FREE TIER</option>
                <option value="pro">PRO TIER</option>
                <option value="premium">PREMIUM TIER</option>
              </select>
              <p className="text-[9px] text-muted-foreground mt-1">Demo: switch tiers to preview</p>
            </div>
          )}

          <nav className="flex-1 py-2 overflow-y-auto">
            {navItems.map((item) => {
              const active = location === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 mx-2 rounded-md text-xs font-medium transition-colors cursor-pointer
                      ${active ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"}
                    `}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        <TierBadge tier={item.tier} />
                      </>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center p-2 border-t border-sidebar-border text-muted-foreground hover:text-foreground"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}

        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1 p-4 lg:p-6">
            {children}
          </div>
          <DisclaimerFooter />
        </main>
      </div>
    </div>
  );
}
