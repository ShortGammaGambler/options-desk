/**
 * Monte Carlo Simulation — Probability cones, VaR/CVaR, distribution (Premium)
 */
import { useMemo } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Cell } from "recharts";
import TierGate from "@/components/TierGate";
import { generateMonteCarloPaths } from "@/lib/mockData";
import { FlaskConical } from "lucide-react";

export default function MonteCarlo() {
  const paths = useMemo(() => generateMonteCarloPaths(200, 60), []);
  const finalValues = paths.map(p => p.values[p.values.length - 1]);
  const sorted = [...finalValues].sort((a, b) => a - b);
  const var5 = sorted[Math.floor(sorted.length * 0.05)];
  const var1 = sorted[Math.floor(sorted.length * 0.01)];
  const cvar5 = sorted.slice(0, Math.floor(sorted.length * 0.05)).reduce((a, b) => a + b, 0) / Math.floor(sorted.length * 0.05);
  const median = sorted[Math.floor(sorted.length * 0.5)];
  const mean = finalValues.reduce((a, b) => a + b, 0) / finalValues.length;
  const p95 = sorted[Math.floor(sorted.length * 0.95)];

  const bandData = useMemo(() => {
    const steps = paths[0].values.length;
    return Array.from({ length: steps }, (_, step) => {
      const vals = paths.map(p => p.values[step]).sort((a, b) => a - b);
      return {
        step,
        p5: vals[Math.floor(vals.length * 0.05)],
        p25: vals[Math.floor(vals.length * 0.25)],
        p50: vals[Math.floor(vals.length * 0.5)],
        p75: vals[Math.floor(vals.length * 0.75)],
        p95: vals[Math.floor(vals.length * 0.95)],
      };
    });
  }, [paths]);

  const histogram = useMemo(() => {
    const min = Math.floor(sorted[0] / 5000) * 5000;
    const max = Math.ceil(sorted[sorted.length - 1] / 5000) * 5000;
    const bucketSize = 5000;
    const buckets: { range: string; count: number; mid: number }[] = [];
    for (let b = min; b < max; b += bucketSize) {
      const count = finalValues.filter(v => v >= b && v < b + bucketSize).length;
      buckets.push({ range: `${(b / 1000).toFixed(0)}K`, count, mid: b + bucketSize / 2 });
    }
    return buckets;
  }, [finalValues, sorted]);

  return (
    <TierGate required="premium" label="Monte Carlo Simulation">
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Monte Carlo Simulation</h1>
          <p className="text-sm text-muted-foreground mt-0.5">200 simulated paths, 60-day horizon</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {[
            { label: "VaR (5%)", value: `$${(var5/1000).toFixed(1)}K`, color: "text-bearish" },
            { label: "VaR (1%)", value: `$${(var1/1000).toFixed(1)}K`, color: "text-bearish" },
            { label: "CVaR (5%)", value: `$${(cvar5/1000).toFixed(1)}K`, color: "text-bearish" },
            { label: "Median", value: `$${(median/1000).toFixed(1)}K`, color: "text-foreground" },
            { label: "Mean", value: `$${(mean/1000).toFixed(1)}K`, color: "text-info" },
            { label: "95th Pctl", value: `$${(p95/1000).toFixed(1)}K`, color: "text-bullish" },
          ].map(m => (
            <div key={m.label} className="data-card text-center">
              <div className="text-[10px] text-muted-foreground">{m.label}</div>
              <div className={`text-lg font-bold mono ${m.color}`}>{m.value}</div>
            </div>
          ))}
        </div>
        <div className="data-card">
          <div className="flex items-center gap-2 mb-3"><FlaskConical className="w-4 h-4 text-purple-400" /><h2 className="text-sm font-bold">Probability Cones</h2></div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="step" tick={{ fontSize: 10, fill: "#888" }} label={{ value: "Days", position: "bottom", offset: -5, fontSize: 10, fill: "#888" }} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
              <Line type="monotone" dataKey="p5" stroke="#ff3366" strokeWidth={1} strokeDasharray="4 4" dot={false} name="5th" />
              <Line type="monotone" dataKey="p25" stroke="#f59e0b" strokeWidth={1} strokeDasharray="3 3" dot={false} name="25th" />
              <Line type="monotone" dataKey="p50" stroke="#00ff88" strokeWidth={2} dot={false} name="Median" />
              <Line type="monotone" dataKey="p75" stroke="#f59e0b" strokeWidth={1} strokeDasharray="3 3" dot={false} name="75th" />
              <Line type="monotone" dataKey="p95" stroke="#4f8ff7" strokeWidth={1} strokeDasharray="4 4" dot={false} name="95th" />
              <ReferenceLine y={100000} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-500" /> 5th</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-amber-500" /> 25/75th</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-green-500" /> Median</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-500" /> 95th</span>
          </div>
        </div>
        <div className="data-card">
          <h2 className="text-sm font-bold mb-3">Terminal Value Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={histogram}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="range" tick={{ fontSize: 10, fill: "#888" }} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} />
              <Bar dataKey="count" radius={[3, 3, 0, 0]} name="Frequency">
                {histogram.map((entry, i) => (
                  <Cell key={i} fill={entry.mid < 100000 ? "#ff3366" : "#00ff88"} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </TierGate>
  );
}
