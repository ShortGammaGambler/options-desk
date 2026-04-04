/**
 * Volatility Surface — 3D interactive vol surface using Plotly.js (Premium)
 * Also includes vol term structure and vol slope analysis
 */
import { useEffect, useRef, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import TierGate from "@/components/TierGate";
import { generateVolSurface } from "@/lib/mockData";
import { Box, TrendingUp } from "lucide-react";

function VolSurface3D({ data }: { data: { strike: number; dte: number; iv: number }[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const strikes = Array.from(new Set(data.map(d => d.strike))).sort((a, b) => a - b);
    const dtes = Array.from(new Set(data.map(d => d.dte))).sort((a, b) => a - b);
    const z: number[][] = [];
    for (const dte of dtes) {
      const row: number[] = [];
      for (const strike of strikes) {
        const point = data.find(d => d.strike === strike && d.dte === dte);
        row.push(point ? point.iv : 0);
      }
      z.push(row);
    }
    import("plotly.js-dist-min").then((Plotly) => {
      if (!containerRef.current) return;
      const plotData = [{
        type: "surface" as const,
        x: strikes, y: dtes, z: z,
        colorscale: [[0,"#0a0e17"],[0.2,"#1a237e"],[0.4,"#4f8ff7"],[0.6,"#00ff88"],[0.8,"#f59e0b"],[1,"#ff3366"]],
        contours: { z: { show: true, usecolormap: true, highlightcolor: "#fff", project: { z: true } } },
        hovertemplate: "Strike: %{x}<br>DTE: %{y}<br>IV: %{z:.1f}%<extra></extra>",
      }];
      const layout = {
        paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)",
        font: { color: "#888", family: "JetBrains Mono, monospace", size: 10 },
        scene: {
          xaxis: { title: "Strike", gridcolor: "rgba(255,255,255,0.05)", color: "#888" },
          yaxis: { title: "DTE", gridcolor: "rgba(255,255,255,0.05)", color: "#888" },
          zaxis: { title: "IV %", gridcolor: "rgba(255,255,255,0.05)", color: "#888" },
          bgcolor: "rgba(0,0,0,0)",
          camera: { eye: { x: 1.8, y: -1.8, z: 0.8 } },
        },
        margin: { l: 0, r: 0, t: 0, b: 0 }, autosize: true,
      };
      Plotly.default.newPlot(containerRef.current, plotData, layout, { responsive: true, displayModeBar: true, modeBarButtonsToRemove: ["toImage","sendDataToCloud"], displaylogo: false });
    });
    return () => {
      if (containerRef.current) {
        import("plotly.js-dist-min").then((Plotly) => { if (containerRef.current) Plotly.default.purge(containerRef.current); });
      }
    };
  }, [data]);

  return <div ref={containerRef} className="w-full h-[450px]" />;
}

export default function VolSurface() {
  const surfaceData = useMemo(() => generateVolSurface(), []);
  const termStructure = useMemo(() => {
    const byDte = new Map<number, number[]>();
    surfaceData.forEach(d => { if (!byDte.has(d.dte)) byDte.set(d.dte, []); byDte.get(d.dte)!.push(d.iv); });
    return Array.from(byDte.entries()).map(([dte, ivs]) => ({ dte, avgIV: ivs.reduce((a, b) => a + b, 0) / ivs.length })).sort((a, b) => a.dte - b.dte);
  }, [surfaceData]);
  const nearestDte = Math.min(...surfaceData.map(d => d.dte));
  const volSlope = useMemo(() => surfaceData.filter(d => d.dte === nearestDte).sort((a, b) => a.strike - b.strike).map(d => ({ strike: d.strike, iv: d.iv })), [surfaceData, nearestDte]);

  return (
    <TierGate required="premium" label="3D Volatility Surface">
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Volatility Surface</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Interactive 3D implied volatility across strikes and expirations</p>
        </div>
        <div className="data-card">
          <div className="flex items-center gap-2 mb-3"><Box className="w-4 h-4 text-purple-400" /><h2 className="text-sm font-bold">3D Vol Surface</h2><span className="text-[10px] text-muted-foreground ml-auto">Drag to rotate, scroll to zoom</span></div>
          <VolSurface3D data={surfaceData} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="data-card">
            <div className="flex items-center gap-2 mb-3"><TrendingUp className="w-4 h-4 text-info" /><h2 className="text-sm font-bold">Vol Term Structure</h2></div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={termStructure}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="dte" tick={{ fontSize: 10, fill: "#888" }} label={{ value: "DTE", position: "bottom", offset: -5, fontSize: 10, fill: "#888" }} />
                <YAxis tick={{ fontSize: 10, fill: "#888" }} tickFormatter={(v: number) => `${v.toFixed(0)}%`} />
                <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} formatter={(v: number) => [`${v.toFixed(1)}%`, "Avg IV"]} />
                <Line type="monotone" dataKey="avgIV" stroke="#4f8ff7" strokeWidth={2} dot={{ r: 3, fill: "#4f8ff7" }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-muted-foreground mt-2">{termStructure.length > 1 && termStructure[termStructure.length - 1].avgIV > termStructure[0].avgIV ? "Contango — longer-dated vol higher (normal)" : "Backwardation — near-term vol elevated (fear/event)"}</p>
          </div>
          <div className="data-card">
            <div className="flex items-center gap-2 mb-3"><TrendingUp className="w-4 h-4 text-amber-400" /><h2 className="text-sm font-bold">Vol Slope (Skew) — {nearestDte} DTE</h2></div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={volSlope}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="strike" tick={{ fontSize: 10, fill: "#888" }} label={{ value: "Strike", position: "bottom", offset: -5, fontSize: 10, fill: "#888" }} />
                <YAxis tick={{ fontSize: 10, fill: "#888" }} tickFormatter={(v: number) => `${v.toFixed(0)}%`} />
                <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #2a2f3e", borderRadius: 6, fontSize: 11 }} formatter={(v: number) => [`${v.toFixed(1)}%`, "IV"]} />
                <Line type="monotone" dataKey="iv" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: "#f59e0b" }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-muted-foreground mt-2">Typical put skew — OTM puts carry higher IV reflecting crash protection demand.</p>
          </div>
        </div>
      </div>
    </TierGate>
  );
}
