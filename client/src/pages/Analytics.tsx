/**
 * Analytics — Gamma Flip, S/R, VIX Term Structure, Gap Analysis, Volume Profile, Stat Arb
 */
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import TierGate from "@/components/TierGate";
import { TierBadge } from "@/components/TierGate";
import { gammaLevels, supportResistance, vixTermStructure, gapEvents, volumeProfile, statArbSignals } from "@/lib/mockData";
import { Crosshair, Layers, TrendingUp, ArrowUpDown, BarChart3, GitBranch } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Gamma structure, support/resistance, volatility, and market microstructure</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gamma Flip Zones */}
        <div className="data-card">
          <div className="flex items-center gap-2 mb-3">
            <Crosshair className="w-4 h-4 text-bullish" />
            <h2 className="text-sm font-bold">Gamma Flip Zones</h2>
          </div>
          <div className="space-y-1.5">
            {gammaLevels.map((g) => (
              <div key={g.level} className="flex items-center gap-3 text-[11px] py-1 border-b border-border/30">
                <span className="mono font-semibold w-14">{g.level}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${g.type === "resistance" ? "bg-red-500/15 text-bearish" : g.type === "support" ? "bg-green-500/15 text-bullish" : "bg-amber-500/15 text-warning"}`}>
                  {g.type === "flip" ? "FLIP" : g.type.slice(0, 3).toUpperCase()}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${g.gex >= 0 ? "bg-bullish" : "bg-bearish"}`} style={{ width: `${Math.min(Math.abs(g.gex) * 15, 100)}%` }} />
                </div>
                <span className={`mono w-12 text-right ${g.gex >= 0 ? "text-bullish" : "text-bearish"}`}>{g.gex > 0 ? "+" : ""}{g.gex.toFixed(1)}B</span>
                <span className={`text-[9px] px-1 rounded ${g.strength === "strong" ? "bg-white/10 text-foreground" : "text-muted-foreground/60"}`}>{g.strength}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-3">Gamma flip at <strong className="text-warning">5820</strong> — above = positive GEX (suppressed vol), below = negative GEX (amplified moves)</p>
        </div>

        {/* S/R Levels */}
        <div className="data-card">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-info" />
            <h2 className="text-sm font-bold">Support & Resistance</h2>
          </div>
          <div className="space-y-1.5">
            {supportResistance.map((sr) => (
              <div key={sr.price} className="flex items-center gap-3 text-[11px] py-1 border-b border-border/30">
                <span className="mono font-semibold w-14">{sr.price}</span>
                <span className={`text-[10px] font-medium w-20 ${sr.type === "resistance" ? "text-bearish" : sr.type === "flip" ? "text-warning" : "text-bullish"}`}>{sr.label}</span>
                <div className="flex-1 flex gap-0.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className={`h-2 flex-1 rounded-sm ${i < sr.strength ? (sr.type === "resistance" ? "bg-bearish/60" : sr.type === "flip" ? "bg-warning/60" : "bg-bullish/60") : "bg-muted/30"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VIX Term Structure */}
      <TierGate required="pro" label="VIX Term Structure">
        <div className="data-card">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-warning" />
            <h2 className="text-sm font-bold">VIX Term Structure</h2>
            <span className="text-[10px] bg-red-500/15 text-bearish px-1.5 py-0.5 rounded font-bold">BACKWARDATION</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={vixTermStructure}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="expiry" tick={{ fontSize: 10, fill: "#888" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#888" }} domain={[18, 25]} />
                  <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} />
                  <Line type="monotone" dataKey="vix" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4, fill: "#f59e0b" }} name="Current" />
                  <Line type="monotone" dataKey="prev" stroke="#f59e0b" strokeWidth={1} strokeDasharray="4 4" dot={false} name="Previous" strokeOpacity={0.4} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Term Structure</h3>
              {vixTermStructure.map((v) => {
                const slope = v.vix - v.prev;
                return (
                  <div key={v.expiry} className="flex items-center justify-between text-[11px] py-1 border-b border-border/30">
                    <span className="text-muted-foreground">{v.expiry}</span>
                    <span className="mono font-semibold">{v.vix.toFixed(2)}</span>
                    <span className={`mono ${slope >= 0 ? "text-bearish" : "text-bullish"}`}>{slope >= 0 ? "+" : ""}{slope.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </TierGate>

      {/* Gap Analysis + Volume Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TierGate required="pro" label="Gap Analysis">
          <div className="data-card">
            <div className="flex items-center gap-2 mb-3">
              <ArrowUpDown className="w-4 h-4 text-warning" />
              <h2 className="text-sm font-bold">Gap Analysis</h2>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-muted/30 rounded p-2 text-center">
                <div className="text-lg font-bold mono">{gapEvents.filter(g => g.filled).length}/{gapEvents.length}</div>
                <div className="text-[10px] text-muted-foreground">Gaps Filled</div>
              </div>
              <div className="bg-muted/30 rounded p-2 text-center">
                <div className="text-lg font-bold mono text-bearish">{gapEvents.filter(g => g.direction === "down").length}</div>
                <div className="text-[10px] text-muted-foreground">Gap Downs</div>
              </div>
              <div className="bg-muted/30 rounded p-2 text-center">
                <div className="text-lg font-bold mono text-bullish">{gapEvents.filter(g => g.direction === "up").length}</div>
                <div className="text-[10px] text-muted-foreground">Gap Ups</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="text-muted-foreground border-b border-border">
                    <th className="text-left py-1.5 font-medium">Date</th>
                    <th className="text-left py-1.5 font-medium">Dir</th>
                    <th className="text-right py-1.5 font-medium">Gap%</th>
                    <th className="text-left py-1.5 font-medium">Filled</th>
                    <th className="text-left py-1.5 font-medium">Fill Time</th>
                    <th className="text-left py-1.5 font-medium">Catalyst</th>
                  </tr>
                </thead>
                <tbody>
                  {gapEvents.map((g, i) => (
                    <tr key={i} className="border-b border-border/30 hover:bg-muted/20">
                      <td className="py-1.5 mono">{g.date}</td>
                      <td className={`py-1.5 font-bold ${g.direction === "up" ? "text-bullish" : "text-bearish"}`}>{g.direction === "up" ? "UP" : "DN"}</td>
                      <td className={`py-1.5 text-right mono ${g.gapPct >= 0 ? "text-bullish" : "text-bearish"}`}>{g.gapPct > 0 ? "+" : ""}{g.gapPct.toFixed(1)}%</td>
                      <td className="py-1.5">{g.filled ? <span className="text-bullish">Yes</span> : <span className="text-muted-foreground">No</span>}</td>
                      <td className="py-1.5 mono text-muted-foreground">{g.fillTime}</td>
                      <td className="py-1.5 text-muted-foreground truncate max-w-[120px]">{g.catalyst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TierGate>

        <TierGate required="pro" label="Volume Profile">
          <div className="data-card">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-info" />
              <h2 className="text-sm font-bold">Volume Profile</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeProfile} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#888" }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="price" tick={{ fontSize: 10, fill: "#888" }} width={45} />
                <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} />
                <Bar dataKey="volume" radius={[0, 3, 3, 0]}>
                  {volumeProfile.map((entry, i) => (
                    <Cell key={i} fill={entry.type === "poc" ? "#f59e0b" : entry.type === "hva" ? "#4f8ff7" : entry.type === "lva" ? "#ff3366" : "#666"} fillOpacity={entry.type === "poc" ? 1 : 0.6} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-500" /> POC</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-500" /> HVA</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-500" /> LVA</span>
            </div>
          </div>
        </TierGate>
      </div>

      {/* Stat Arb */}
      <TierGate required="premium" label="Statistical Arbitrage">
        <div className="data-card">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-bold">Statistical Arbitrage Signals</h2>
            <TierBadge tier="premium" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left py-2 font-medium">Pair</th>
                  <th className="text-right py-2 font-medium">Z-Score</th>
                  <th className="text-right py-2 font-medium">Half-Life</th>
                  <th className="text-left py-2 font-medium">Signal</th>
                  <th className="text-right py-2 font-medium">p-Value</th>
                  <th className="text-left py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {statArbSignals.map((s, i) => (
                  <tr key={i} className="border-b border-border/30 hover:bg-muted/20">
                    <td className="py-2 font-semibold mono">{s.pair}</td>
                    <td className={`py-2 text-right mono font-bold ${Math.abs(s.zScore) > 2 ? "text-warning" : "text-muted-foreground"}`}>{s.zScore > 0 ? "+" : ""}{s.zScore.toFixed(2)}</td>
                    <td className="py-2 text-right mono">{s.halfLife.toFixed(1)}d</td>
                    <td className={`py-2 font-bold uppercase ${s.signal === "long" ? "text-bullish" : s.signal === "short" ? "text-bearish" : "text-muted-foreground"}`}>{s.signal}</td>
                    <td className="py-2 text-right mono">{s.pValue.toFixed(3)}</td>
                    <td className="py-2">
                      {Math.abs(s.zScore) > 2 ? <span className="text-[10px] bg-amber-500/15 text-warning px-1.5 py-0.5 rounded font-bold">ACTIVE</span> :
                       Math.abs(s.zScore) > 1.5 ? <span className="text-[10px] bg-blue-500/15 text-info px-1.5 py-0.5 rounded font-bold">WATCH</span> :
                       <span className="text-[10px] text-muted-foreground">Neutral</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TierGate>
    </div>
  );
}
