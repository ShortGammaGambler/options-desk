/**
 * Dashboard — Core Metrics Overview
 * Prominent DIX, GEX, unusual flow, institutional flow, neuro gamma reflex
 */
import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Cell } from "recharts";
import { TierBadge } from "@/components/TierGate";
import TierGate from "@/components/TierGate";
import { coreMetrics, gexTimeSeries, dixTimeSeries, gexByStrike, unusualFlow, institutionalFlow, neuroGammaReflex } from "@/lib/mockData";
import { ArrowUpRight, ArrowDownRight, Zap, Eye, Building2, Brain } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028667545/LboUpFxToKh4cncoZM3B32/hero-dashboard_57463af5.png";

function MetricCard({ m }: { m: typeof coreMetrics[0] }) {
  const positive = m.change >= 0;
  return (
    <div className="data-card flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground font-medium tracking-wide uppercase">{m.label}</span>
        <TierBadge tier={m.tier} />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold mono">{m.value > 0 ? "+" : ""}{m.value.toFixed(2)}</span>
        <span className="text-sm text-muted-foreground mono">{m.unit}</span>
      </div>
      <div className={`flex items-center gap-1 text-xs ${positive ? "text-bullish" : "text-bearish"}`}>
        {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        <span className="mono">{positive ? "+" : ""}{m.change.toFixed(1)}%</span>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{m.description}</p>
    </div>
  );
}

export default function Dashboard() {
  const [dixTab, setDixTab] = useState<"chart" | "correlation">("chart");

  return (
    <div className="space-y-5">
      {/* Hero Banner */}
      <div className="relative rounded-lg overflow-hidden h-32 lg:h-40">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative z-10 p-6 flex flex-col justify-center h-full">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Options Desk</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time derivatives analytics for Travis Averill</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="pulse-dot live" />
            <span className="text-[11px] text-bullish mono">MARKET OPEN</span>
            <span className="text-[11px] text-muted-foreground mono ml-2">Last update: 15:45:12 ET</span>
          </div>
        </div>
      </div>

      {/* Core Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {coreMetrics.map((m) => (
          m.tier === "free" ? (
            <MetricCard key={m.label} m={m} />
          ) : (
            <TierGate key={m.label} required={m.tier} label={m.label}>
              <MetricCard m={m} />
            </TierGate>
          )
        ))}
      </div>

      {/* DIX Prominent Section + Neuro Gamma Reflex */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 data-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-info" />
              <h2 className="text-sm font-bold tracking-wide">Dark Index (DIX)</h2>
              <span className="text-[10px] bg-blue-500/15 text-blue-400 px-1.5 py-0.5 rounded mono">45.20%</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setDixTab("chart")} className={`text-[10px] px-2 py-0.5 rounded ${dixTab === "chart" ? "bg-info/20 text-info" : "text-muted-foreground"}`}>Time Series</button>
              <button onClick={() => setDixTab("correlation")} className={`text-[10px] px-2 py-0.5 rounded ${dixTab === "correlation" ? "bg-info/20 text-info" : "text-muted-foreground"}`}>DIX vs GEX</button>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mb-3">Dark pool short volume ratio. DIX above 45% historically signals bullish institutional positioning. Currently elevated — diverging from negative GEX.</p>
          <ResponsiveContainer width="100%" height={200}>
            {dixTab === "chart" ? (
              <AreaChart data={dixTimeSeries}>
                <defs>
                  <linearGradient id="dixGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f8ff7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f8ff7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#888" }} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: "#888" }} domain={[38, 50]} />
                <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} />
                <ReferenceLine y={45} stroke="#4f8ff7" strokeDasharray="4 4" label={{ value: "45% threshold", position: "right", fill: "#4f8ff7", fontSize: 10 }} />
                <Area type="monotone" dataKey="dix" stroke="#4f8ff7" fill="url(#dixGrad)" strokeWidth={2} />
              </AreaChart>
            ) : (
              <LineChart data={dixTimeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#888" }} interval={4} />
                <YAxis yAxisId="dix" tick={{ fontSize: 10, fill: "#888" }} domain={[38, 50]} />
                <YAxis yAxisId="gex" orientation="right" tick={{ fontSize: 10, fill: "#888" }} />
                <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} />
                <Line yAxisId="dix" type="monotone" dataKey="dix" stroke="#4f8ff7" strokeWidth={2} dot={false} />
                <Line yAxisId="gex" type="monotone" dataKey="gex" stroke="#00ff88" strokeWidth={2} dot={false} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        <TierGate required="premium" label="Neuro Gamma Reflex">
          <div className="data-card">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold">Neuro Gamma Reflex</h2>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className={`text-3xl font-bold mono ${neuroGammaReflex.score < 0 ? "text-bearish" : "text-bullish"}`}>
                {neuroGammaReflex.score.toFixed(2)}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded font-bold ${neuroGammaReflex.signal === "bearish" ? "bg-red-500/15 text-bearish" : "bg-green-500/15 text-bullish"}`}>
                {neuroGammaReflex.signal.toUpperCase()}
              </span>
            </div>
            <div className="space-y-1.5 mb-3">
              {neuroGammaReflex.components.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-[11px]">
                  <span className="text-muted-foreground w-24 truncate">{c.name}</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden relative">
                    <div
                      className={`absolute h-full rounded-full ${c.value < 0 ? "bg-bearish" : "bg-bullish"}`}
                      style={{
                        width: `${Math.abs(c.value) * 50}%`,
                        left: c.value < 0 ? `${50 - Math.abs(c.value) * 50}%` : "50%",
                      }}
                    />
                  </div>
                  <span className={`mono w-10 text-right ${c.value < 0 ? "text-bearish" : "text-bullish"}`}>{c.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={neuroGammaReflex.history}>
                <defs>
                  <linearGradient id="ngrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="score" stroke="#a855f7" fill="url(#ngrGrad)" strokeWidth={1.5} />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TierGate>
      </div>

      {/* GEX Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="data-card">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-bullish" />
            <h2 className="text-sm font-bold">GEX Time Series</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={gexTimeSeries}>
              <defs>
                <linearGradient id="gexGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff88" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ff3366" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#888" }} interval={3} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} tickFormatter={(v: number) => `${(v / 1e9).toFixed(1)}B`} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} formatter={(v: number) => [`${(v / 1e9).toFixed(2)}B`, "GEX"]} />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="gex" stroke="#00ff88" fill="url(#gexGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="data-card">
          <h2 className="text-sm font-bold mb-3">GEX by Strike</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={gexByStrike}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="strike" tick={{ fontSize: 10, fill: "#888" }} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" />
              <Bar dataKey="gex" radius={[2, 2, 0, 0]}>
                {gexByStrike.map((entry, i) => (
                  <Cell key={i} fill={entry.gex >= 0 ? "#00ff88" : "#ff3366"} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Unusual Flow + Institutional Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="data-card">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-warning" />
            <h2 className="text-sm font-bold">Unusual Options Flow</h2>
            <span className="pulse-dot live" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left py-1.5 font-medium">Time</th>
                  <th className="text-left py-1.5 font-medium">Ticker</th>
                  <th className="text-left py-1.5 font-medium">Type</th>
                  <th className="text-right py-1.5 font-medium">Strike</th>
                  <th className="text-right py-1.5 font-medium">Vol</th>
                  <th className="text-right py-1.5 font-medium">Premium</th>
                  <th className="text-left py-1.5 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {unusualFlow.slice(0, 6).map((f, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-1.5 mono text-muted-foreground">{f.time}</td>
                    <td className="py-1.5 font-semibold">{f.ticker}</td>
                    <td className={`py-1.5 font-bold ${f.type === "CALL" ? "text-bullish" : "text-bearish"}`}>{f.type}</td>
                    <td className="py-1.5 text-right mono">{f.strike}</td>
                    <td className="py-1.5 text-right mono">{(f.volume / 1000).toFixed(1)}K</td>
                    <td className="py-1.5 text-right mono">${(f.premium / 1e6).toFixed(1)}M</td>
                    <td className="py-1.5"><TierBadge tier={f.tier} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <TierGate required="pro" label="Institutional Money Flow">
          <div className="data-card">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-info" />
              <h2 className="text-sm font-bold">Institutional Money Flow</h2>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={institutionalFlow.slice(-15)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#888" }} interval={2} />
                <YAxis tick={{ fontSize: 10, fill: "#888" }} />
                <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" />
                <Bar dataKey="darkPool" fill="#4f8ff7" fillOpacity={0.7} radius={[2, 2, 0, 0]} name="Dark Pool" />
                <Bar dataKey="blockTrades" fill="#a855f7" fillOpacity={0.7} radius={[2, 2, 0, 0]} name="Block Trades" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TierGate>
      </div>
    </div>
  );
}
