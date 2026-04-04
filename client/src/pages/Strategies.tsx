/**
 * Strategies — Strategy Recommendation Engine with full leg details, Greeks, breakevens
 */
import { useState } from "react";
import TierGate from "@/components/TierGate";
import { TierBadge } from "@/components/TierGate";
import { strategies } from "@/lib/mockData";
import { Target, ChevronDown, ChevronUp } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028667545/LboUpFxToKh4cncoZM3B32/hero-options_0e81e8af.png";

function StrategyCard({ s }: { s: typeof strategies[0] }) {
  const [expanded, setExpanded] = useState(false);
  const confColor = s.confidence === "high" ? "text-bullish" : s.confidence === "medium" ? "text-warning" : "text-muted-foreground";

  const inner = (
    <div className="data-card">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-info" />
          <h3 className="text-sm font-bold">{s.name}</h3>
          <TierBadge tier={s.tier} />
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold ${confColor}`}>{s.confidence.toUpperCase()}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px]">
        <span className="bg-muted/50 px-1.5 py-0.5 rounded">{s.type}</span>
        <span className="bg-muted/50 px-1.5 py-0.5 rounded">{s.ticker}</span>
        <span className="bg-muted/50 px-1.5 py-0.5 rounded">{s.regime}</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mt-3">
        <div className="bg-muted/20 rounded p-2 text-center">
          <div className="text-[10px] text-muted-foreground">Max Profit</div>
          <div className="text-sm font-bold mono text-bullish">${s.maxProfit.toLocaleString()}</div>
        </div>
        <div className="bg-muted/20 rounded p-2 text-center">
          <div className="text-[10px] text-muted-foreground">Max Loss</div>
          <div className="text-sm font-bold mono text-bearish">${s.maxLoss.toLocaleString()}</div>
        </div>
        <div className="bg-muted/20 rounded p-2 text-center">
          <div className="text-[10px] text-muted-foreground">Breakevens</div>
          <div className="text-sm font-bold mono">{s.breakevens.map(b => b.toFixed(0)).join(" / ")}</div>
        </div>
        <div className="bg-muted/20 rounded p-2 text-center">
          <div className="text-[10px] text-muted-foreground">POP</div>
          <div className="text-sm font-bold mono">{(s.pop * 100).toFixed(0)}%</div>
        </div>
        <div className="bg-muted/20 rounded p-2 text-center">
          <div className="text-[10px] text-muted-foreground">Kelly Size</div>
          <div className="text-sm font-bold mono">${s.kellySize.toLocaleString()}</div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3 border-t border-border pt-3">
          <div>
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Leg Details</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="text-muted-foreground border-b border-border">
                    <th className="text-left py-1.5 font-medium">Action</th>
                    <th className="text-left py-1.5 font-medium">Qty</th>
                    <th className="text-left py-1.5 font-medium">Type</th>
                    <th className="text-right py-1.5 font-medium">Strike</th>
                    <th className="text-left py-1.5 font-medium">Expiry</th>
                    <th className="text-right py-1.5 font-medium">Prem</th>
                    <th className="text-right py-1.5 font-medium">Delta</th>
                    <th className="text-right py-1.5 font-medium">Gamma</th>
                    <th className="text-right py-1.5 font-medium">Theta</th>
                    <th className="text-right py-1.5 font-medium">Vega</th>
                    <th className="text-right py-1.5 font-medium">IV</th>
                  </tr>
                </thead>
                <tbody>
                  {s.legs.map((leg, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className={`py-1.5 font-bold ${leg.action === "BUY" ? "text-bullish" : "text-bearish"}`}>{leg.action}</td>
                      <td className="py-1.5 mono">{leg.quantity}</td>
                      <td className={`py-1.5 font-semibold ${leg.type === "CALL" ? "text-blue-400" : "text-amber-400"}`}>{leg.type}</td>
                      <td className="py-1.5 text-right mono font-semibold">{leg.strike}</td>
                      <td className="py-1.5 mono">{leg.expiry}</td>
                      <td className="py-1.5 text-right mono">${leg.premium.toFixed(2)}</td>
                      <td className="py-1.5 text-right mono">{leg.delta.toFixed(3)}</td>
                      <td className="py-1.5 text-right mono">{leg.gamma.toFixed(4)}</td>
                      <td className="py-1.5 text-right mono text-bearish">{leg.theta.toFixed(2)}</td>
                      <td className="py-1.5 text-right mono">{leg.vega.toFixed(2)}</td>
                      <td className="py-1.5 text-right mono">{leg.iv.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="bg-muted/10 rounded p-3">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Rationale</h4>
              <p className="text-[11px] text-foreground/80 leading-relaxed">{s.rationale}</p>
            </div>
            <div className="bg-muted/10 rounded p-3">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">GEX Context</h4>
              <p className="text-[11px] text-foreground/80 leading-relaxed">{s.gexContext}</p>
            </div>
            <div className="bg-muted/10 rounded p-3">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Vol Logic</h4>
              <p className="text-[11px] text-foreground/80 leading-relaxed">{s.volLogic}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (s.tier === "free") return inner;
  return <TierGate required={s.tier} label={s.name}>{inner}</TierGate>;
}

export default function Strategies() {
  const [filter, setFilter] = useState<string>("all");
  const types = ["all", ...Array.from(new Set(strategies.map(s => s.type)))];
  const filtered = filter === "all" ? strategies : strategies.filter(s => s.type === filter);

  return (
    <div className="space-y-5">
      <div className="relative rounded-lg overflow-hidden h-28">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative z-10 p-6 flex flex-col justify-center h-full">
          <h1 className="text-xl font-bold tracking-tight">Strategy Engine</h1>
          <p className="text-sm text-muted-foreground mt-0.5">AI-driven strategy recommendations with full Greeks and risk analysis</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${filter === t ? "bg-info/20 text-info" : "bg-muted/30 text-muted-foreground hover:text-foreground"}`}>
            {t === "all" ? "All Strategies" : t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(s => <StrategyCard key={s.id} s={s} />)}
      </div>
    </div>
  );
}
