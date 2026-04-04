/**
 * Options Desk — Mock Data
 * Realistic simulated data for all dashboard features.
 */
import type * as T from "./types";

// ─── Market Ticker ───
export const marketTicker: T.MarketTicker[] = [
  { symbol: "SPX", price: 5755.20, change: -0.66 },
  { symbol: "NDX", price: 19842.50, change: -0.78 },
  { symbol: "RUT", price: 2048.60, change: -1.07 },
  { symbol: "VIX", price: 23.45, change: 6.11 },
  { symbol: "DXY", price: 103.82, change: 0.23 },
  { symbol: "TNX", price: 4.28, change: -0.70 },
];

// ─── Core Metrics ───
export const coreMetrics: T.CoreMetric[] = [
  { label: "GEX", value: -2.84, unit: "B", change: -65.1, description: "Gamma Exposure — Negative GEX implies dealer short gamma, amplifying moves", tier: "free" },
  { label: "DIX", value: 45.20, unit: "%", change: 4.2, description: "Dark Index — Dark pool short volume ratio. Higher = more bullish dark pool activity", tier: "free" },
  { label: "DEX", value: -1.92, unit: "B", change: -42.3, description: "Delta Exposure — Net dealer delta hedging pressure", tier: "pro" },
  { label: "VANNA", value: -3.15, unit: "B", change: -28.7, description: "Vanna Exposure — Sensitivity of delta to implied vol changes", tier: "pro" },
  { label: "CHARM", value: 1.42, unit: "B", change: 12.4, description: "Charm Exposure — Delta decay over time, supportive into OPEX", tier: "pro" },
];

// ─── Neuro Gamma Reflex ───
export const neuroGammaReflex = {
  score: -0.72,
  components: [
    { name: "GEX Momentum", value: -0.85, weight: 0.30 },
    { name: "DIX Divergence", value: 0.42, weight: 0.20 },
    { name: "Vanna Pressure", value: -0.91, weight: 0.20 },
    { name: "Charm Decay", value: 0.35, weight: 0.15 },
    { name: "Vol Regime", value: -0.68, weight: 0.15 },
  ],
  signal: "bearish" as const,
  history: Array.from({ length: 20 }, (_, i) => ({
    date: `Mar ${i + 1}`,
    score: -0.3 + Math.sin(i * 0.5) * 0.4 - (i > 12 ? 0.3 : 0),
  })),
};

// ─── GEX Time Series ───
export const gexTimeSeries = Array.from({ length: 20 }, (_, i) => {
  const d = new Date(2026, 1, 11 + i);
  return {
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    gex: (Math.sin(i * 0.4) * 3 - 1 + (i > 14 ? -2 : 0)) * 1e9,
    spx: 5900 - i * 8 + Math.sin(i * 0.6) * 30,
  };
});

// ─── GEX by Strike ───
export const gexByStrike: T.GexStrike[] = [
  { strike: 5500, gex: -1.2 }, { strike: 5550, gex: -0.8 }, { strike: 5600, gex: -0.5 },
  { strike: 5650, gex: -1.8 }, { strike: 5700, gex: -3.5 }, { strike: 5750, gex: -2.1 },
  { strike: 5800, gex: -0.3 }, { strike: 5820, gex: 0.0 }, { strike: 5850, gex: 1.5 },
  { strike: 5875, gex: 2.8 }, { strike: 5900, gex: 4.2 }, { strike: 5950, gex: 2.0 },
  { strike: 6000, gex: 1.1 },
];

// ─── DIX Time Series ───
export const dixTimeSeries = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  dix: 42 + Math.sin(i * 0.3) * 4 + (i > 20 ? 2 : 0),
  gex: (Math.sin(i * 0.4) * 3 - 1) * 1e9,
}));

// ─── Gamma Flip Zones ───
export const gammaLevels: T.GammaLevel[] = [
  { level: 5900, type: "resistance", gex: 4.2, strength: "strong" },
  { level: 5875, type: "resistance", gex: 2.8, strength: "moderate" },
  { level: 5850, type: "resistance", gex: 1.5, strength: "weak" },
  { level: 5820, type: "flip", gex: 0.0, strength: "strong" },
  { level: 5800, type: "support", gex: -1.2, strength: "weak" },
  { level: 5775, type: "support", gex: -2.5, strength: "moderate" },
  { level: 5750, type: "support", gex: -3.8, strength: "strong" },
  { level: 5700, type: "support", gex: -5.1, strength: "strong" },
];

// ─── Support & Resistance ───
export const supportResistance: T.SupportResistance[] = [
  { price: 5950, label: "GEX Wall", type: "resistance", strength: 5 },
  { price: 5900, label: "Put Wall", type: "resistance", strength: 3 },
  { price: 5850, label: "Vol Trigger", type: "resistance", strength: 4 },
  { price: 5820, label: "Gamma Flip", type: "flip", strength: 2 },
  { price: 5750, label: "Call Wall", type: "support", strength: 3 },
  { price: 5700, label: "GEX Floor", type: "support", strength: 6 },
  { price: 5650, label: "Put Concentration", type: "support", strength: 2 },
  { price: 5600, label: "Max Pain", type: "support", strength: 1 },
];

// ─── VIX Term Structure ───
export const vixTermStructure: T.VixTerm[] = [
  { expiry: "Mar 11", dte: 0, vix: 23.45, prev: 22.10 },
  { expiry: "Mar 18", dte: 7, vix: 22.80, prev: 21.90 },
  { expiry: "Apr 15", dte: 35, vix: 21.50, prev: 20.80 },
  { expiry: "May 20", dte: 70, vix: 20.90, prev: 20.30 },
  { expiry: "Jun 17", dte: 98, vix: 20.40, prev: 19.90 },
  { expiry: "Jul 15", dte: 126, vix: 20.10, prev: 19.70 },
  { expiry: "Aug 19", dte: 161, vix: 19.85, prev: 19.50 },
  { expiry: "Sep 16", dte: 189, vix: 19.70, prev: 19.40 },
];

// ─── HMM Regimes ───
export const hmmRegimes: T.HmmRegime[] = [
  { regime: "High Volatility Sell-Off", probability: 0.62, color: "#ff3366", characteristics: ["VIX > 20, rising", "Negative GEX environment", "Dealer short gamma amplification", "Put skew steepening"], avgDuration: "8-14 trading days", currentStreak: 6 },
  { regime: "Low Vol Grind Higher", probability: 0.18, color: "#00ff88", characteristics: ["VIX < 16, declining", "Positive GEX suppression", "Call overwriting dominant", "Compressed realized vol"], avgDuration: "20-45 trading days", currentStreak: 0 },
  { regime: "Transition / Choppy", probability: 0.20, color: "#f59e0b", characteristics: ["VIX 16-20, directionless", "GEX near zero / flip zone", "Mixed dealer positioning", "Mean-reverting price action"], avgDuration: "5-10 trading days", currentStreak: 0 },
];

export const regimeLabels = ["High Vol Sell-Off", "Low Vol Grind", "Transition"];
export const regimeColors = ["#ff3366", "#00ff88", "#f59e0b"];

export const regimeHistory = Array.from({ length: 50 }, (_, i) => ({
  date: `W${Math.floor(i / 5) + 1}D${(i % 5) + 1}`,
  regime: i < 15 ? 1 : i < 25 ? 2 : i < 30 ? 1 : i < 38 ? 0 : i < 44 ? 2 : 0,
  spx: 5950 - i * 4 + Math.sin(i * 0.3) * 40,
}));

// ─── Bayesian Factors ───
export const bayesianFactors: T.BayesianFactor[] = [
  { factor: "GEX Environment", prior: 0.50, likelihood: 0.78, posterior: 0.72, weight: 0.25, direction: "bearish", evidence: "Negative GEX at -2.84B, dealer short gamma", tier: "free" },
  { factor: "DIX Signal", prior: 0.50, likelihood: 0.62, posterior: 0.58, weight: 0.15, direction: "bullish", evidence: "DIX at 45.2%, above 45% threshold", tier: "free" },
  { factor: "VIX Term Structure", prior: 0.50, likelihood: 0.71, posterior: 0.65, weight: 0.20, direction: "bearish", evidence: "Backwardation in front month, contango beyond 35 DTE", tier: "pro" },
  { factor: "Put/Call Skew", prior: 0.50, likelihood: 0.68, posterior: 0.63, weight: 0.15, direction: "bearish", evidence: "25-delta put skew at 8.2 vol points, elevated", tier: "pro" },
  { factor: "Dealer Vanna Flow", prior: 0.50, likelihood: 0.74, posterior: 0.69, weight: 0.15, direction: "bearish", evidence: "Negative vanna = dealers sell into vol expansion", tier: "premium" },
  { factor: "Charm Decay", prior: 0.50, likelihood: 0.55, posterior: 0.53, weight: 0.10, direction: "bullish", evidence: "Positive charm into OPEX, supportive near-term", tier: "premium" },
];

// ─── Markov Chain ───
export const markovTransitions: T.MarkovTransition[] = [
  { from: "High Vol Sell-Off", to: "High Vol Sell-Off", probability: 0.72 },
  { from: "High Vol Sell-Off", to: "Transition", probability: 0.22 },
  { from: "High Vol Sell-Off", to: "Low Vol Grind", probability: 0.06 },
  { from: "Transition", to: "High Vol Sell-Off", probability: 0.30 },
  { from: "Transition", to: "Transition", probability: 0.40 },
  { from: "Transition", to: "Low Vol Grind", probability: 0.30 },
  { from: "Low Vol Grind", to: "High Vol Sell-Off", probability: 0.08 },
  { from: "Low Vol Grind", to: "Transition", probability: 0.17 },
  { from: "Low Vol Grind", to: "Low Vol Grind", probability: 0.75 },
];

export const markovSteadyState: Record<string, number> = {
  "High Vol Sell-Off": 0.38, "Transition": 0.27, "Low Vol Grind": 0.35,
};

// ─── Strategies ───
export const strategies: T.Strategy[] = [
  {
    id: "s1", name: "SPX Put Ratio Spread", type: "Ratio Spread", ticker: "SPX", regime: "High Volatility Sell-Off",
    confidence: "high", tier: "free",
    legs: [
      { action: "BUY", quantity: 1, type: "PUT", strike: 5750, expiry: "Mar 21", premium: 42.50, delta: -0.350, gamma: 0.0080, theta: -2.10, vega: 8.50, iv: 24.2 },
      { action: "SELL", quantity: 2, type: "PUT", strike: 5650, expiry: "Mar 21", premium: 18.80, delta: -0.180, gamma: 0.0050, theta: -1.40, vega: 6.20, iv: 26.8 },
    ],
    maxProfit: 10490, maxLoss: 94600, breakevens: [5745.1, 5554.9], riskReward: "1:0.11", pop: 0.64, kellySize: 3200,
    rationale: "Negative GEX environment favors downside acceleration. Ratio spread profits from continued sell-off while collecting premium from extra short put.",
    gexContext: "Negative GEX (-2.84B) = dealer short gamma, amplified downside moves. Sell vol into at 5650 (below GEX floor).",
    volLogic: "BUY vol at 5750 strike (near support), SELL 2x vol at 5650 (below GEX floor). Net credit structure benefits from vol crush on stabilization.",
  },
  {
    id: "s2", name: "SPX Iron Condor", type: "Iron Condor", ticker: "SPX", regime: "Transition / Choppy",
    confidence: "medium", tier: "free",
    legs: [
      { action: "SELL", quantity: 1, type: "PUT", strike: 5650, expiry: "Mar 21", premium: 18.80, delta: -0.180, gamma: 0.0050, theta: -1.40, vega: 6.20, iv: 26.8 },
      { action: "BUY", quantity: 1, type: "PUT", strike: 5600, expiry: "Mar 21", premium: 12.30, delta: -0.120, gamma: 0.0035, theta: -0.95, vega: 4.80, iv: 28.1 },
      { action: "SELL", quantity: 1, type: "CALL", strike: 5900, expiry: "Mar 21", premium: 15.20, delta: 0.200, gamma: 0.0055, theta: -1.60, vega: 7.10, iv: 22.5 },
      { action: "BUY", quantity: 1, type: "CALL", strike: 5950, expiry: "Mar 21", premium: 8.90, delta: 0.130, gamma: 0.0040, theta: -1.10, vega: 5.40, iv: 21.8 },
    ],
    maxProfit: 950, maxLoss: 4050, breakevens: [5640.5, 5909.5], riskReward: "1:4.26", pop: 0.72, kellySize: 1800,
    rationale: "Transition regime with mean-reverting price action. Iron condor collects premium from elevated IV while defining risk on both sides.",
    gexContext: "GEX near flip zone — range-bound behavior expected. Sell premium at extremes of expected range.",
    volLogic: "Sell elevated IV (VIX 23.45) via short strangles with protective wings. Theta decay accelerates into expiration.",
  },
  {
    id: "s3", name: "SPX Broken Wing Butterfly", type: "Broken Wing Butterfly", ticker: "SPX", regime: "High Volatility Sell-Off",
    confidence: "high", tier: "pro",
    legs: [
      { action: "BUY", quantity: 1, type: "PUT", strike: 5750, expiry: "Apr 17", premium: 62.30, delta: -0.380, gamma: 0.0065, theta: -1.80, vega: 12.40, iv: 23.8 },
      { action: "SELL", quantity: 2, type: "PUT", strike: 5700, expiry: "Apr 17", premium: 48.50, delta: -0.310, gamma: 0.0058, theta: -1.55, vega: 11.20, iv: 24.5 },
      { action: "BUY", quantity: 1, type: "PUT", strike: 5620, expiry: "Apr 17", premium: 28.90, delta: -0.200, gamma: 0.0042, theta: -1.10, vega: 8.80, iv: 26.2 },
    ],
    maxProfit: 4810, maxLoss: 2690, breakevens: [5726.9], riskReward: "1.79:1", pop: 0.45, kellySize: 4500,
    rationale: "Broken wing butterfly with downside skip strike for net credit. Profits if SPX settles near 5700 by April expiry.",
    gexContext: "5700 is GEX floor — strong dealer hedging support. Broken wing positioned to profit from pin at this level.",
    volLogic: "Skew advantage: buy lower IV at 5750, sell higher IV at 5700 (2x), buy tail protection at 5620.",
  },
  {
    id: "s4", name: "SPX Calendar Spread", type: "Calendar Spread", ticker: "SPX", regime: "Transition / Choppy",
    confidence: "medium", tier: "pro",
    legs: [
      { action: "SELL", quantity: 1, type: "CALL", strike: 5800, expiry: "Mar 21", premium: 22.40, delta: 0.280, gamma: 0.0070, theta: -2.30, vega: 8.90, iv: 23.1 },
      { action: "BUY", quantity: 1, type: "CALL", strike: 5800, expiry: "Apr 17", premium: 38.20, delta: 0.320, gamma: 0.0048, theta: -1.20, vega: 14.50, iv: 22.4 },
    ],
    maxProfit: 3200, maxLoss: 1580, breakevens: [5762.0, 5838.0], riskReward: "2.03:1", pop: 0.52, kellySize: 2800,
    rationale: "Calendar spread exploits term structure differential. Front-month theta decay faster than back-month.",
    gexContext: "5800 near gamma flip — expect price to oscillate around this level. Calendar profits from time decay differential.",
    volLogic: "Front-month IV (23.1%) > back-month IV (22.4%). Sell expensive near-term vol, own cheaper longer-dated vol.",
  },
  {
    id: "s5", name: "SPX Credit Put Spread", type: "Credit Spread", ticker: "SPX", regime: "High Volatility Sell-Off",
    confidence: "medium", tier: "free",
    legs: [
      { action: "SELL", quantity: 1, type: "PUT", strike: 5650, expiry: "Mar 21", premium: 18.80, delta: -0.180, gamma: 0.0050, theta: -1.40, vega: 6.20, iv: 26.8 },
      { action: "BUY", quantity: 1, type: "PUT", strike: 5600, expiry: "Mar 21", premium: 12.30, delta: -0.120, gamma: 0.0035, theta: -0.95, vega: 4.80, iv: 28.1 },
    ],
    maxProfit: 520, maxLoss: 4480, breakevens: [5644.8], riskReward: "1:8.62", pop: 0.82, kellySize: 1200,
    rationale: "High POP credit spread below GEX floor. Collect premium with defined risk below major support.",
    gexContext: "5650 below GEX floor (5700). Strong dealer hedging support above. High probability of expiring OTM.",
    volLogic: "Sell elevated put IV (26.8%) at support. Vol crush on any stabilization benefits position.",
  },
  {
    id: "s6", name: "QQQ Debit Call Spread", type: "Debit Spread", ticker: "QQQ", regime: "Low Vol Grind Higher",
    confidence: "low", tier: "premium",
    legs: [
      { action: "BUY", quantity: 1, type: "CALL", strike: 485, expiry: "Apr 17", premium: 12.40, delta: 0.450, gamma: 0.0120, theta: -0.85, vega: 3.20, iv: 21.5 },
      { action: "SELL", quantity: 1, type: "CALL", strike: 495, expiry: "Apr 17", premium: 7.80, delta: 0.300, gamma: 0.0095, theta: -0.65, vega: 2.60, iv: 20.8 },
    ],
    maxProfit: 860, maxLoss: 640, breakevens: [489.6], riskReward: "1.34:1", pop: 0.42, kellySize: 1500,
    rationale: "Low vol grind regime favors directional long exposure. Debit spread limits cost while capturing upside.",
    gexContext: "Positive GEX in QQQ suppresses volatility. Grind higher pattern supports bullish directional bias.",
    volLogic: "Buy lower IV call (21.5%), sell higher strike to reduce cost. Net long vega benefits from any vol expansion.",
  },
];

// ─── Unusual Options Flow ───
export const unusualFlow: T.UnusualFlow[] = [
  { time: "15:42", ticker: "SPY", type: "PUT", strike: 570, expiry: "Mar 21", volume: 28500, oi: 4200, premium: 8420000, sentiment: "bearish", tier: "free" },
  { time: "15:38", ticker: "AAPL", type: "CALL", strike: 230, expiry: "Apr 17", volume: 15200, oi: 2100, premium: 3850000, sentiment: "bullish", tier: "free" },
  { time: "15:31", ticker: "NVDA", type: "CALL", strike: 950, expiry: "Mar 28", volume: 12800, oi: 890, premium: 12200000, sentiment: "bullish", tier: "pro" },
  { time: "15:24", ticker: "TSLA", type: "PUT", strike: 170, expiry: "Mar 21", volume: 9400, oi: 1500, premium: 2100000, sentiment: "bearish", tier: "pro" },
  { time: "15:18", ticker: "QQQ", type: "PUT", strike: 480, expiry: "Mar 21", volume: 22100, oi: 5600, premium: 6800000, sentiment: "bearish", tier: "pro" },
  { time: "15:12", ticker: "META", type: "CALL", strike: 620, expiry: "Apr 17", volume: 8900, oi: 450, premium: 4500000, sentiment: "bullish", tier: "premium" },
  { time: "15:05", ticker: "AMZN", type: "CALL", strike: 210, expiry: "May 16", volume: 7200, oi: 320, premium: 2800000, sentiment: "bullish", tier: "premium" },
  { time: "14:58", ticker: "SPX", type: "PUT", strike: 5700, expiry: "Mar 14", volume: 18500, oi: 8900, premium: 15600000, sentiment: "bearish", tier: "premium" },
];

// ─── Institutional Money Flow ───
export const institutionalFlow: T.InstitutionalFlow[] = Array.from({ length: 20 }, (_, i) => ({
  date: `Mar ${i + 1}`,
  darkPool: Math.round((Math.random() - 0.3) * 500),
  blockTrades: Math.round((Math.random() - 0.4) * 300),
  netFlow: Math.round((Math.random() - 0.45) * 800),
  sentiment: (Math.random() > 0.55 ? "bearish" : Math.random() > 0.3 ? "bullish" : "neutral") as "bullish" | "bearish" | "neutral",
}));

// ─── Gap Analysis ───
export const gapEvents: T.GapEvent[] = [
  { date: "Mar 10", direction: "down", gapPct: -1.8, filled: false, fillTime: "—", catalyst: "CPI miss, tariff escalation" },
  { date: "Mar 7", direction: "down", gapPct: -0.9, filled: true, fillTime: "2h 15m", catalyst: "Weak NFP data" },
  { date: "Mar 5", direction: "up", gapPct: 1.2, filled: true, fillTime: "4h 30m", catalyst: "Fed dovish comments" },
  { date: "Mar 3", direction: "down", gapPct: -2.1, filled: false, fillTime: "—", catalyst: "Geopolitical risk" },
  { date: "Feb 28", direction: "up", gapPct: 0.7, filled: true, fillTime: "1h 45m", catalyst: "Earnings beat (NVDA)" },
  { date: "Feb 26", direction: "down", gapPct: -1.4, filled: true, fillTime: "6h 10m", catalyst: "Bond yield spike" },
  { date: "Feb 24", direction: "up", gapPct: 0.5, filled: true, fillTime: "45m", catalyst: "Oversold bounce" },
  { date: "Feb 21", direction: "down", gapPct: -0.8, filled: true, fillTime: "3h 20m", catalyst: "PMI contraction" },
];

// ─── Stat Arb Signals ───
export const statArbSignals: T.StatArbSignal[] = [
  { pair: "SPY / QQQ", zScore: 2.34, halfLife: 5.2, signal: "short", pValue: 0.012, tier: "premium" },
  { pair: "XLF / XLK", zScore: -1.87, halfLife: 8.1, signal: "long", pValue: 0.028, tier: "premium" },
  { pair: "GLD / SLV", zScore: 1.56, halfLife: 12.4, signal: "short", pValue: 0.045, tier: "premium" },
  { pair: "IWM / SPY", zScore: -2.12, halfLife: 6.8, signal: "long", pValue: 0.018, tier: "premium" },
  { pair: "XLE / XOP", zScore: 0.43, halfLife: 3.2, signal: "neutral", pValue: 0.320, tier: "premium" },
];

// ─── Volume Profile ───
export const volumeProfile: T.VolumeProfileLevel[] = [
  { price: 5600, volume: 45000, type: "lva" }, { price: 5625, volume: 62000, type: "normal" },
  { price: 5650, volume: 78000, type: "normal" }, { price: 5675, volume: 95000, type: "hva" },
  { price: 5700, volume: 142000, type: "hva" }, { price: 5725, volume: 168000, type: "poc" },
  { price: 5750, volume: 135000, type: "hva" }, { price: 5775, volume: 98000, type: "hva" },
  { price: 5800, volume: 72000, type: "normal" }, { price: 5825, volume: 55000, type: "normal" },
  { price: 5850, volume: 38000, type: "lva" }, { price: 5875, volume: 28000, type: "lva" },
  { price: 5900, volume: 22000, type: "lva" },
];

// ─── Kelly Defaults ───
export const kellyDefaults = { winRate: 0.58, avgWin: 2.4, avgLoss: 1.0, accountSize: 100000, kellyFraction: 0.10 };

// ─── Backtest Results ───
export const backtestEquity: T.BacktestResult[] = Array.from({ length: 252 }, (_, i) => {
  const base = 100000;
  const growth = base * (1 + 0.0003 * i + Math.sin(i * 0.05) * 0.02);
  const dd = Math.max(0, Math.sin(i * 0.08) * 0.05);
  return { date: `Day ${i + 1}`, equity: Math.round(growth * (1 - dd * 0.3)), drawdown: -dd * 100, benchmark: Math.round(base * (1 + 0.0002 * i)) };
});

export const backtestTrades: T.BacktestTrade[] = [
  { date: "Jan 15", strategy: "Put Ratio", direction: "short", entry: 5820, exit: 5750, pnl: 4200, rMultiple: 2.1 },
  { date: "Jan 22", strategy: "Iron Condor", direction: "short", entry: 5780, exit: 5790, pnl: 850, rMultiple: 0.4 },
  { date: "Feb 3", strategy: "Calendar", direction: "long", entry: 5810, exit: 5830, pnl: -1200, rMultiple: -0.6 },
  { date: "Feb 10", strategy: "Credit Spread", direction: "short", entry: 5750, exit: 5720, pnl: 520, rMultiple: 0.3 },
  { date: "Feb 18", strategy: "BWB", direction: "short", entry: 5700, exit: 5690, pnl: 3800, rMultiple: 1.9 },
  { date: "Mar 1", strategy: "Put Ratio", direction: "short", entry: 5680, exit: 5620, pnl: 6100, rMultiple: 3.1 },
  { date: "Mar 5", strategy: "Iron Condor", direction: "short", entry: 5650, exit: 5670, pnl: -2100, rMultiple: -1.1 },
  { date: "Mar 8", strategy: "Debit Spread", direction: "long", entry: 5640, exit: 5700, pnl: 1800, rMultiple: 0.9 },
];

export const backtestMetrics = {
  totalReturn: 18.4, annualizedReturn: 24.2, sharpe: 1.85, sortino: 2.41,
  maxDrawdown: -8.3, winRate: 0.62, profitFactor: 2.14, avgWin: 2850, avgLoss: 1650,
  totalTrades: 147, expectancy: 0.82,
};

// ─── Walk-Forward ───
export const walkForwardWindows: T.WalkForwardWindow[] = Array.from({ length: 8 }, (_, i) => ({
  windowId: i + 1, inSampleStart: `Q${(i % 4) + 1} '${24 + Math.floor(i / 4)}`, inSampleEnd: `Q${((i + 1) % 4) + 1} '${24 + Math.floor((i + 1) / 4)}`,
  outSampleStart: `Q${((i + 1) % 4) + 1} '${24 + Math.floor((i + 1) / 4)}`, outSampleEnd: `Q${((i + 2) % 4) + 1} '${24 + Math.floor((i + 2) / 4)}`,
  inSampleReturn: 12 + Math.random() * 15, outSampleReturn: 5 + Math.random() * 12, sharpe: 1.2 + Math.random() * 1.5,
}));

// ─── Monte Carlo ───
export function generateMonteCarloPaths(n: number, steps: number): T.MonteCarloPath[] {
  return Array.from({ length: n }, (_, pathId) => {
    let val = 100000;
    const values = [val];
    for (let s = 0; s < steps; s++) {
      val *= 1 + 0.0003 + 0.015 * (Math.random() - 0.5) * 2;
      values.push(Math.round(val));
    }
    return { pathId, values };
  });
}

// ─── Efficient Frontier ───
export const efficientFrontier: T.FrontierPoint[] = (() => {
  const pts: T.FrontierPoint[] = Array.from({ length: 30 }, (_, i) => {
    const risk = 5 + i * 1.2;
    const ret = 2 + risk * 0.6 + Math.sin(i * 0.3) * 2 - (risk > 25 ? (risk - 25) * 0.3 : 0);
    return { risk, return_: ret, sharpe: ret / risk, isOptimal: i >= 8 && i <= 22 };
  });
  pts.push({ risk: 12.5, return_: 14.2, sharpe: 1.14, label: "Max Sharpe", isOptimal: true });
  pts.push({ risk: 8.0, return_: 8.5, sharpe: 1.06, label: "Min Variance", isOptimal: true });
  return pts;
})();

// ─── Vol Surface ───
export function generateVolSurface(): T.VolSurfacePoint[] {
  const strikes = Array.from({ length: 15 }, (_, i) => 5500 + i * 40);
  const dtes = [7, 14, 21, 30, 45, 60, 90, 120, 180];
  const points: T.VolSurfacePoint[] = [];
  for (const strike of strikes) {
    for (const dte of dtes) {
      const moneyness = (strike - 5755) / 5755;
      const baseIV = 22 + Math.abs(moneyness) * 80 + (moneyness < 0 ? -moneyness * 30 : 0);
      const termAdj = -5 * Math.exp(-dte / 30);
      const iv = baseIV + termAdj + (Math.random() - 0.5) * 2;
      points.push({ strike, dte, iv: Math.max(10, iv) });
    }
  }
  return points;
}
