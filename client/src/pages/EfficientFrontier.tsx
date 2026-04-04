/**
 * Efficient Frontier — Mean-variance optimization with Sharpe tangent (Premium)
 */
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ZAxis } from "recharts";
import TierGate from "@/components/TierGate";
import { efficientFrontier } from "@/lib/mockData";
import { Crosshair } from "lucide-react";

export default function EfficientFrontier() {
  const optimal = efficientFrontier.find(p => p.isOptimal);
  const maxSharpe = optimal ? optimal.sharpe : Math.max(...efficientFrontier.map(p => p.sharpe));
  const frontierPoints = efficientFrontier.filter(p => !p.label);
  const assetPoints = efficientFrontier.filter(p => p.label);

  return (
    <TierGate required="premium" label="Efficient Frontier Optimization">
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Efficient Frontier</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Mean-variance optimization — optimal risk/return portfolio</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="data-card text-center">
            <div className="text-[10px] text-muted-foreground">Max Sharpe</div>
            <div className="text-lg font-bold mono text-bullish">{maxSharpe.toFixed(2)}</div>
          </div>
          {optimal && (
            <>
              <div className="data-card text-center">
                <div className="text-[10px] text-muted-foreground">Optimal Return</div>
                <div className="text-lg font-bold mono text-info">{optimal.return_.toFixed(1)}%</div>
              </div>
              <div className="data-card text-center">
                <div className="text-[10px] text-muted-foreground">Optimal Risk</div>
                <div className="text-lg font-bold mono text-warning">{optimal.risk.toFixed(1)}%</div>
              </div>
            </>
          )}
          <div className="data-card text-center">
            <div className="text-[10px] text-muted-foreground">Assets</div>
            <div className="text-lg font-bold mono">{assetPoints.length}</div>
          </div>
        </div>
        <div className="data-card">
          <div className="flex items-center gap-2 mb-3"><Crosshair className="w-4 h-4 text-info" /><h2 className="text-sm font-bold">Efficient Frontier</h2></div>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" dataKey="risk" name="Risk" tick={{ fontSize: 10, fill: "#888" }} label={{ value: "Risk (Vol %)", position: "bottom", offset: -5, fontSize: 10, fill: "#888" }} />
              <YAxis type="number" dataKey="return_" name="Return" tick={{ fontSize: 10, fill: "#888" }} label={{ value: "Return %", angle: -90, position: "insideLeft", fontSize: 10, fill: "#888" }} />
              <ZAxis type="number" dataKey="sharpe" range={[30, 200]} name="Sharpe" />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} formatter={(value: number, name: string) => { if (name === "Risk") return [`${value.toFixed(1)}%`, "Risk"]; if (name === "Return") return [`${value.toFixed(1)}%`, "Return"]; return [value.toFixed(2), name]; }} />
              <Scatter data={frontierPoints} fill="#4f8ff7" fillOpacity={0.5} />
              <Scatter data={assetPoints} fill="#f59e0b" shape="diamond" />
              {optimal && <Scatter data={[optimal]} fill="#00ff88" shape="star" />}
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Frontier</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rotate-45" /> Assets</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500" /> Optimal</span>
          </div>
        </div>
        {assetPoints.length > 0 && (
          <div className="data-card">
            <h2 className="text-sm font-bold mb-3">Asset Positions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead><tr className="text-muted-foreground border-b border-border"><th className="text-left py-1.5 font-medium">Asset</th><th className="text-right py-1.5 font-medium">Return</th><th className="text-right py-1.5 font-medium">Risk</th><th className="text-right py-1.5 font-medium">Sharpe</th></tr></thead>
                <tbody>
                  {assetPoints.map((a, i) => (
                    <tr key={i} className="border-b border-border/30 hover:bg-muted/20">
                      <td className="py-1.5 font-semibold">{a.label}</td>
                      <td className={`py-1.5 text-right mono ${a.return_ >= 0 ? "text-bullish" : "text-bearish"}`}>{a.return_.toFixed(1)}%</td>
                      <td className="py-1.5 text-right mono text-warning">{a.risk.toFixed(1)}%</td>
                      <td className={`py-1.5 text-right mono ${a.sharpe >= 1 ? "text-bullish" : ""}`}>{a.sharpe.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </TierGate>
  );
}
