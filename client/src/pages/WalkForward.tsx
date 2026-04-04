/**
 * Walk-Forward Analysis — Rolling window optimization (Pro)
 */
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import TierGate from "@/components/TierGate";
import { walkForwardWindows } from "@/lib/mockData";
import { TrendingUp } from "lucide-react";

export default function WalkForward() {
  const avgIS = walkForwardWindows.reduce((a, w) => a + w.inSampleReturn, 0) / walkForwardWindows.length;
  const avgOOS = walkForwardWindows.reduce((a, w) => a + w.outSampleReturn, 0) / walkForwardWindows.length;
  const efficiency = avgIS !== 0 ? avgOOS / avgIS : 0;

  return (
    <TierGate required="pro" label="Walk-Forward Analysis">
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Walk-Forward Analysis</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Rolling window optimization with in-sample / out-of-sample validation</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="data-card text-center">
            <div className="text-[10px] text-muted-foreground">Avg In-Sample</div>
            <div className="text-lg font-bold mono text-info">{avgIS.toFixed(1)}%</div>
          </div>
          <div className="data-card text-center">
            <div className="text-[10px] text-muted-foreground">Avg Out-of-Sample</div>
            <div className={`text-lg font-bold mono ${avgOOS >= 0 ? "text-bullish" : "text-bearish"}`}>{avgOOS.toFixed(1)}%</div>
          </div>
          <div className="data-card text-center">
            <div className="text-[10px] text-muted-foreground">WF Efficiency</div>
            <div className={`text-lg font-bold mono ${efficiency > 0.5 ? "text-bullish" : "text-warning"}`}>{(efficiency * 100).toFixed(0)}%</div>
          </div>
          <div className="data-card text-center">
            <div className="text-[10px] text-muted-foreground">Windows</div>
            <div className="text-lg font-bold mono">{walkForwardWindows.length}</div>
          </div>
        </div>

        <div className="data-card">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-info" />
            <h2 className="text-sm font-bold">In-Sample vs Out-of-Sample Returns</h2>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={walkForwardWindows.map(w => ({ ...w, window: `W${w.windowId}` }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="window" tick={{ fontSize: 10, fill: "#888" }} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} tickFormatter={(v: number) => `${v}%`} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} />
              <Bar dataKey="inSampleReturn" fill="#4f8ff7" fillOpacity={0.7} radius={[3, 3, 0, 0]} name="In-Sample" />
              <Bar dataKey="outSampleReturn" radius={[3, 3, 0, 0]} name="Out-of-Sample">
                {walkForwardWindows.map((w, i) => (
                  <Cell key={i} fill={w.outSampleReturn >= 0 ? "#00ff88" : "#ff3366"} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-500" /> In-Sample</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-green-500" /> OOS (+)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-500" /> OOS (-)</span>
          </div>
        </div>

        <div className="data-card">
          <h2 className="text-sm font-bold mb-3">Window Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left py-1.5 font-medium">Window</th>
                  <th className="text-left py-1.5 font-medium">IS Period</th>
                  <th className="text-left py-1.5 font-medium">OOS Period</th>
                  <th className="text-right py-1.5 font-medium">IS Return</th>
                  <th className="text-right py-1.5 font-medium">OOS Return</th>
                  <th className="text-right py-1.5 font-medium">Sharpe</th>
                  <th className="text-right py-1.5 font-medium">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {walkForwardWindows.map((w) => {
                  const eff = w.inSampleReturn !== 0 ? w.outSampleReturn / w.inSampleReturn : 0;
                  return (
                    <tr key={w.windowId} className="border-b border-border/30 hover:bg-muted/20">
                      <td className="py-1.5 font-semibold">W{w.windowId}</td>
                      <td className="py-1.5 mono text-muted-foreground">{w.inSampleStart} — {w.inSampleEnd}</td>
                      <td className="py-1.5 mono text-muted-foreground">{w.outSampleStart} — {w.outSampleEnd}</td>
                      <td className="py-1.5 text-right mono text-info">{w.inSampleReturn.toFixed(1)}%</td>
                      <td className={`py-1.5 text-right mono font-bold ${w.outSampleReturn >= 0 ? "text-bullish" : "text-bearish"}`}>{w.outSampleReturn >= 0 ? "+" : ""}{w.outSampleReturn.toFixed(1)}%</td>
                      <td className="py-1.5 text-right mono">{w.sharpe.toFixed(2)}</td>
                      <td className={`py-1.5 text-right mono ${eff > 0.5 ? "text-bullish" : eff > 0 ? "text-warning" : "text-bearish"}`}>{(eff * 100).toFixed(0)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TierGate>
  );
}
