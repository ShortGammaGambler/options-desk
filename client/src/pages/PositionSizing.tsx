/**
 * Position Sizing — Dynamic Kelly Criterion Calculator
 */
import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Area, AreaChart } from "recharts";
import TierGate from "@/components/TierGate";
import { kellyDefaults } from "@/lib/mockData";
import { Calculator, TrendingUp } from "lucide-react";

export default function PositionSizing() {
  const [winRate, setWinRate] = useState(kellyDefaults.winRate);
  const [avgWin, setAvgWin] = useState(kellyDefaults.avgWin);
  const [avgLoss, setAvgLoss] = useState(kellyDefaults.avgLoss);
  const [accountSize, setAccountSize] = useState(kellyDefaults.accountSize);
  const [fraction, setFraction] = useState(kellyDefaults.kellyFraction);

  const fullKelly = useMemo(() => {
    const b = avgWin / avgLoss;
    const q = 1 - winRate;
    return (winRate * b - q) / b;
  }, [winRate, avgWin, avgLoss]);

  const kellyPct = Math.max(0, fullKelly * fraction);
  const positionSize = accountSize * kellyPct;
  const edge = winRate * avgWin - (1 - winRate) * avgLoss;

  const growthCurve = useMemo(() => {
    const points = [];
    for (let f = 0; f <= 1; f += 0.02) {
      const b = avgWin / avgLoss;
      const g = winRate * Math.log(1 + f * b) + (1 - winRate) * Math.log(Math.max(1 - f, 0.001));
      points.push({ fraction: +(f * 100).toFixed(0), growth: +g.toFixed(6) });
    }
    return points;
  }, [winRate, avgWin, avgLoss]);

  const ruinCurve = useMemo(() => {
    const points = [];
    for (let f = 0.02; f <= 0.5; f += 0.02) {
      const q = 1 - winRate;
      const ruin = Math.pow(q / winRate, accountSize / (accountSize * f));
      points.push({ fraction: +(f * 100).toFixed(0), ruin: Math.min(+ruin.toFixed(4), 1) });
    }
    return points;
  }, [winRate, accountSize]);

  const inputClass = "w-full bg-muted/30 border border-border rounded px-3 py-2 text-sm mono text-foreground focus:border-info focus:outline-none";
  const labelClass = "text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1 block";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Position Sizing</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Kelly Criterion — optimize position sizes for geometric growth</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="data-card lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-4 h-4 text-info" />
            <h2 className="text-sm font-bold">Parameters</h2>
          </div>
          <div className="space-y-3">
            <div><label className={labelClass}>Win Rate (%)</label><input type="number" value={(winRate * 100).toFixed(0)} onChange={e => setWinRate(Number(e.target.value) / 100)} className={inputClass} min={0} max={100} step={1} /></div>
            <div><label className={labelClass}>Avg Win ($)</label><input type="number" value={avgWin} onChange={e => setAvgWin(Number(e.target.value))} className={inputClass} min={0} step={0.1} /></div>
            <div><label className={labelClass}>Avg Loss ($)</label><input type="number" value={avgLoss} onChange={e => setAvgLoss(Number(e.target.value))} className={inputClass} min={0} step={0.1} /></div>
            <div><label className={labelClass}>Account Size ($)</label><input type="number" value={accountSize} onChange={e => setAccountSize(Number(e.target.value))} className={inputClass} min={0} step={1000} /></div>
            <div>
              <label className={labelClass}>Kelly Fraction</label>
              <div className="flex items-center gap-2">
                <input type="range" min={0.05} max={1} step={0.05} value={fraction} onChange={e => setFraction(Number(e.target.value))} className="flex-1 accent-info" />
                <span className="mono text-sm w-12 text-right">{(fraction * 100).toFixed(0)}%</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">10% = conservative, 25% = moderate, 50% = aggressive</p>
            </div>
          </div>
        </div>

        <div className="data-card lg:col-span-2">
          <h2 className="text-sm font-bold mb-4">Results</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="bg-muted/20 rounded p-3 text-center">
              <div className="text-[10px] text-muted-foreground">Full Kelly</div>
              <div className="text-xl font-bold mono text-info">{(fullKelly * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-muted/20 rounded p-3 text-center">
              <div className="text-[10px] text-muted-foreground">Fractional ({(fraction * 100).toFixed(0)}%)</div>
              <div className="text-xl font-bold mono text-bullish">{(kellyPct * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-muted/20 rounded p-3 text-center">
              <div className="text-[10px] text-muted-foreground">Position Size</div>
              <div className="text-xl font-bold mono">${positionSize.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="bg-muted/20 rounded p-3 text-center">
              <div className="text-[10px] text-muted-foreground">Edge (EV)</div>
              <div className={`text-xl font-bold mono ${edge >= 0 ? "text-bullish" : "text-bearish"}`}>${edge.toFixed(2)}</div>
            </div>
          </div>
          {fullKelly <= 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
              <p className="text-sm text-bearish font-bold">Negative Edge — Do Not Trade</p>
              <p className="text-[11px] text-muted-foreground mt-1">Kelly criterion is negative. No positive expectancy.</p>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-[11px]">
            <div className="bg-muted/10 rounded p-3">
              <h4 className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-[10px]">Risk Metrics</h4>
              <div className="space-y-1">
                <div className="flex justify-between"><span className="text-muted-foreground">Win/Loss Ratio</span><span className="mono">{(avgWin / avgLoss).toFixed(2)}:1</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Expected Value</span><span className={`mono ${edge >= 0 ? "text-bullish" : "text-bearish"}`}>${edge.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Max DD (est)</span><span className="mono text-bearish">-{(kellyPct * 100 * 2.5).toFixed(0)}%</span></div>
              </div>
            </div>
            <div className="bg-muted/10 rounded p-3">
              <h4 className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-[10px]">Position Ladder</h4>
              <div className="space-y-1">
                {[0.10, 0.25, 0.50, 0.75, 1.0].map(f => (
                  <div key={f} className="flex justify-between">
                    <span className="text-muted-foreground">{(f * 100).toFixed(0)}% Kelly</span>
                    <span className={`mono ${f === fraction ? "text-info font-bold" : ""}`}>${(accountSize * Math.max(0, fullKelly) * f).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TierGate required="pro" label="Dynamic Kelly Growth Optimization">
        <div className="data-card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-bullish" />
            <h2 className="text-sm font-bold">Growth Rate Optimization Curve</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={growthCurve}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff88" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="fraction" tick={{ fontSize: 10, fill: "#888" }} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} formatter={(v: number) => [v.toFixed(6), "Growth Rate"]} />
              <ReferenceLine x={Math.round(fullKelly * 100)} stroke="#00ff88" strokeDasharray="4 4" label={{ value: `Kelly: ${(fullKelly * 100).toFixed(0)}%`, position: "top", fill: "#00ff88", fontSize: 10 }} />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" />
              <Area type="monotone" dataKey="growth" stroke="#00ff88" fill="url(#growthGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </TierGate>

      <TierGate required="pro" label="Ruin Probability Analysis">
        <div className="data-card">
          <h2 className="text-sm font-bold mb-3">Ruin Probability vs Bet Size</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ruinCurve}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="fraction" tick={{ fontSize: 10, fill: "#888" }} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} domain={[0, 1]} tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} formatter={(v: number) => [`${(v * 100).toFixed(2)}%`, "P(Ruin)"]} />
              <Line type="monotone" dataKey="ruin" stroke="#ff3366" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TierGate>
    </div>
  );
}
