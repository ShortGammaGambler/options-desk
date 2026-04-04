/**
 * Backtesting — Equity curve, drawdown, trade log, performance metrics (Pro)
 */
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import TierGate from "@/components/TierGate";
import { backtestEquity, backtestTrades, backtestMetrics } from "@/lib/mockData";
import { Activity, TrendingDown } from "lucide-react";

export default function Backtesting() {
  return (
    <TierGate required="pro" label="Backtesting Engine">
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Backtesting Engine</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Historical strategy performance analysis</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {[
            { label: "Total Return", value: `${backtestMetrics.totalReturn.toFixed(1)}%`, color: backtestMetrics.totalReturn >= 0 ? "text-bullish" : "text-bearish" },
            { label: "Sharpe Ratio", value: backtestMetrics.sharpe.toFixed(2), color: backtestMetrics.sharpe >= 1 ? "text-bullish" : "text-warning" },
            { label: "Sortino Ratio", value: backtestMetrics.sortino.toFixed(2), color: "text-info" },
            { label: "Max Drawdown", value: `${backtestMetrics.maxDrawdown.toFixed(1)}%`, color: "text-bearish" },
            { label: "Win Rate", value: `${(backtestMetrics.winRate * 100).toFixed(0)}%`, color: "text-foreground" },
            { label: "Profit Factor", value: backtestMetrics.profitFactor.toFixed(2), color: backtestMetrics.profitFactor >= 1 ? "text-bullish" : "text-bearish" },
          ].map(m => (
            <div key={m.label} className="data-card text-center">
              <div className="text-[10px] text-muted-foreground">{m.label}</div>
              <div className={`text-lg font-bold mono ${m.color}`}>{m.value}</div>
            </div>
          ))}
        </div>
        <div className="data-card">
          <div className="flex items-center gap-2 mb-3"><Activity className="w-4 h-4 text-bullish" /><h2 className="text-sm font-bold">Equity Curve</h2></div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={backtestEquity}>
              <defs><linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#00ff88" stopOpacity={0.15} /><stop offset="95%" stopColor="#00ff88" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#888" }} interval={30} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Equity"]} />
              <ReferenceLine y={100000} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="equity" stroke="#00ff88" fill="url(#eqGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="data-card">
          <div className="flex items-center gap-2 mb-3"><TrendingDown className="w-4 h-4 text-bearish" /><h2 className="text-sm font-bold">Drawdown</h2></div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={backtestEquity}>
              <defs><linearGradient id="ddGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ff3366" stopOpacity={0.3} /><stop offset="95%" stopColor="#ff3366" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#888" }} interval={30} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} tickFormatter={(v: number) => `${v.toFixed(0)}%`} />
              <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} formatter={(v: number) => [`${v.toFixed(2)}%`, "Drawdown"]} />
              <Area type="monotone" dataKey="drawdown" stroke="#ff3366" fill="url(#ddGrad)" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="data-card">
          <h2 className="text-sm font-bold mb-3">Trade Log</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead><tr className="text-muted-foreground border-b border-border"><th className="text-left py-1.5 font-medium">Date</th><th className="text-left py-1.5 font-medium">Strategy</th><th className="text-left py-1.5 font-medium">Dir</th><th className="text-right py-1.5 font-medium">Entry</th><th className="text-right py-1.5 font-medium">Exit</th><th className="text-right py-1.5 font-medium">P&L</th><th className="text-right py-1.5 font-medium">R-Mult</th></tr></thead>
              <tbody>
                {backtestTrades.map((t, i) => (
                  <tr key={i} className="border-b border-border/30 hover:bg-muted/20">
                    <td className="py-1.5 mono">{t.date}</td>
                    <td className="py-1.5 font-semibold">{t.strategy}</td>
                    <td className={`py-1.5 font-bold ${t.direction === "long" ? "text-bullish" : "text-bearish"}`}>{t.direction.toUpperCase()}</td>
                    <td className="py-1.5 text-right mono">${t.entry.toFixed(2)}</td>
                    <td className="py-1.5 text-right mono">${t.exit.toFixed(2)}</td>
                    <td className={`py-1.5 text-right mono font-bold ${t.pnl >= 0 ? "text-bullish" : "text-bearish"}`}>{t.pnl >= 0 ? "+" : ""}${t.pnl.toFixed(0)}</td>
                    <td className={`py-1.5 text-right mono ${t.rMultiple >= 0 ? "text-bullish" : "text-bearish"}`}>{t.rMultiple >= 0 ? "+" : ""}{t.rMultiple.toFixed(1)}R</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TierGate>
  );
}
