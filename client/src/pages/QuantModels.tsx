/**
 * Quant Models — HMM Regime Detection, Bayesian Inference, Markov Chain
 */
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import TierGate from "@/components/TierGate";
import { TierBadge } from "@/components/TierGate";
import { hmmRegimes, regimeHistory, bayesianFactors, markovTransitions, markovSteadyState } from "@/lib/mockData";
import { Brain, Scale, GitMerge } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028667545/LboUpFxToKh4cncoZM3B32/hero-quant_fd5749d6.png";

export default function QuantModels() {
  const states = ["High Vol Sell-Off", "Transition", "Low Vol Grind"];
  return (
    <div className="space-y-5">
      <div className="relative rounded-lg overflow-hidden h-28">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative z-10 p-6 flex flex-col justify-center h-full">
          <h1 className="text-xl font-bold tracking-tight">Quantitative Models</h1>
          <p className="text-sm text-muted-foreground mt-0.5">HMM regime detection, Bayesian inference, and Markov chain analysis</p>
        </div>
      </div>

      {/* HMM */}
      <div className="data-card">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-4 h-4 text-purple-400" />
          <h2 className="text-sm font-bold">Hidden Markov Model — Regime Detection</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
          {hmmRegimes.map((r) => (
            <div key={r.regime} className={`rounded-lg border p-3 ${r.probability > 0.5 ? "border-white/20 glow-red" : "border-border"}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                <span className="text-xs font-bold">{r.regime}</span>
              </div>
              <div className="text-2xl font-bold mono" style={{ color: r.color }}>{(r.probability * 100).toFixed(0)}%</div>
              <div className="text-[10px] text-muted-foreground mt-1">Avg duration: {r.avgDuration}</div>
              {r.currentStreak > 0 && <div className="text-[10px] text-warning mt-0.5">Current streak: {r.currentStreak} days</div>}
              <ul className="mt-2 space-y-0.5">
                {r.characteristics.map((c, i) => (
                  <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                    <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: r.color }} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={regimeHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#888" }} interval={9} />
            <YAxis tick={{ fontSize: 10, fill: "#888" }} />
            <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} />
            <Line type="monotone" dataKey="spx" stroke="#4f8ff7" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bayesian */}
      <div className="data-card">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="w-4 h-4 text-info" />
          <h2 className="text-sm font-bold">Bayesian Inference — Evidence Weighting</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left py-2 font-medium">Factor</th>
                <th className="text-right py-2 font-medium">Prior</th>
                <th className="text-right py-2 font-medium">Likelihood</th>
                <th className="text-right py-2 font-medium">Posterior</th>
                <th className="text-right py-2 font-medium">Weight</th>
                <th className="text-left py-2 font-medium">Direction</th>
                <th className="text-left py-2 font-medium">Evidence</th>
                <th className="text-left py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {bayesianFactors.map((f, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="py-2 font-semibold">{f.factor}</td>
                  <td className="py-2 text-right mono">{f.prior.toFixed(2)}</td>
                  <td className="py-2 text-right mono">{f.likelihood.toFixed(2)}</td>
                  <td className="py-2 text-right mono font-bold">{f.posterior.toFixed(2)}</td>
                  <td className="py-2 text-right mono">{(f.weight * 100).toFixed(0)}%</td>
                  <td className={`py-2 font-bold ${f.direction === "bullish" ? "text-bullish" : f.direction === "bearish" ? "text-bearish" : "text-muted-foreground"}`}>{f.direction.toUpperCase()}</td>
                  <td className="py-2 text-muted-foreground max-w-[200px] truncate">{f.evidence}</td>
                  <td className="py-2"><TierBadge tier={f.tier} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 p-3 bg-muted/20 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Composite Posterior:</span>
            <span className="text-lg font-bold mono text-bearish">0.65</span>
            <span className="text-xs font-bold text-bearish">BEARISH BIAS</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">Weighted average of all factor posteriors. Values above 0.55 indicate directional bias.</p>
        </div>
      </div>

      {/* Markov Chain */}
      <TierGate required="pro" label="Markov Chain Analysis">
        <div className="data-card">
          <div className="flex items-center gap-2 mb-4">
            <GitMerge className="w-4 h-4 text-bullish" />
            <h2 className="text-sm font-bold">Markov Chain — State Transition Probabilities</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Transition Matrix</h3>
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-medium text-muted-foreground">From \ To</th>
                    {states.map(s => <th key={s} className="text-center py-2 font-medium text-muted-foreground">{s.split(" ")[0]}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {states.map(from => (
                    <tr key={from} className="border-b border-border/30">
                      <td className="py-2 font-semibold">{from.split(" ")[0]}</td>
                      {states.map(to => {
                        const t = markovTransitions.find(tr => tr.from === from && tr.to === to);
                        const p = t?.probability ?? 0;
                        return (
                          <td key={to} className="py-2 text-center">
                            <span className={`mono font-bold px-2 py-0.5 rounded ${p > 0.5 ? "bg-white/10 text-foreground" : "text-muted-foreground"}`}>{(p * 100).toFixed(0)}%</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Steady-State Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={Object.entries(markovSteadyState).map(([name, value]) => ({ name: name.split(" ")[0], value: value * 100 }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#888" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#888" }} />
                  <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} formatter={(v: number) => [`${v.toFixed(1)}%`, "Probability"]} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    <Cell fill="#ff3366" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#00ff88" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </TierGate>
    </div>
  );
}
