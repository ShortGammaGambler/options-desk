/** Options Desk — Type Definitions */

export type Tier = "free" | "pro" | "premium";
export type TierRequirement = "free" | "pro" | "premium";

export interface MarketTicker {
  symbol: string;
  price: number;
  change: number;
}

export interface CoreMetric {
  label: string;
  value: number;
  unit: string;
  change: number;
  description: string;
  tier: TierRequirement;
}

export interface GexStrike {
  strike: number;
  gex: number;
}

export interface GammaLevel {
  level: number;
  type: "resistance" | "support" | "flip";
  gex: number;
  strength: "strong" | "moderate" | "weak";
}

export interface SupportResistance {
  price: number;
  label: string;
  type: string;
  strength: number;
}

export interface VixTerm {
  expiry: string;
  dte: number;
  vix: number;
  prev: number;
}

export interface HmmRegime {
  regime: string;
  probability: number;
  color: string;
  characteristics: string[];
  avgDuration: string;
  currentStreak: number;
}

export interface BayesianFactor {
  factor: string;
  prior: number;
  likelihood: number;
  posterior: number;
  weight: number;
  direction: "bullish" | "bearish" | "neutral";
  evidence: string;
  tier: TierRequirement;
}

export interface MarkovTransition {
  from: string;
  to: string;
  probability: number;
}

export interface StrategyLeg {
  action: "BUY" | "SELL";
  quantity: number;
  type: "CALL" | "PUT";
  strike: number;
  expiry: string;
  premium: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  iv: number;
}

export interface Strategy {
  id: string;
  name: string;
  type: string;
  ticker: string;
  regime: string;
  confidence: "high" | "medium" | "low";
  tier: TierRequirement;
  legs: StrategyLeg[];
  maxProfit: number;
  maxLoss: number;
  breakevens: number[];
  riskReward: string;
  pop: number;
  kellySize: number;
  rationale: string;
  gexContext: string;
  volLogic: string;
}

export interface UnusualFlow {
  time: string;
  ticker: string;
  type: "CALL" | "PUT";
  strike: number;
  expiry: string;
  volume: number;
  oi: number;
  premium: number;
  sentiment: "bullish" | "bearish";
  tier: TierRequirement;
}

export interface InstitutionalFlow {
  date: string;
  darkPool: number;
  blockTrades: number;
  netFlow: number;
  sentiment: "bullish" | "bearish" | "neutral";
}

export interface GapEvent {
  date: string;
  direction: "up" | "down";
  gapPct: number;
  filled: boolean;
  fillTime: string;
  catalyst: string;
}

export interface StatArbSignal {
  pair: string;
  zScore: number;
  halfLife: number;
  signal: "long" | "short" | "neutral";
  pValue: number;
  tier: TierRequirement;
}

export interface VolumeProfileLevel {
  price: number;
  volume: number;
  type: "poc" | "hva" | "lva" | "normal";
}

export interface BacktestResult {
  date: string;
  equity: number;
  drawdown: number;
  benchmark: number;
}

export interface BacktestTrade {
  date: string;
  strategy: string;
  direction: "long" | "short";
  entry: number;
  exit: number;
  pnl: number;
  rMultiple: number;
}

export interface WalkForwardWindow {
  windowId: number;
  inSampleStart: string;
  inSampleEnd: string;
  outSampleStart: string;
  outSampleEnd: string;
  inSampleReturn: number;
  outSampleReturn: number;
  sharpe: number;
}

export interface MonteCarloPath {
  pathId: number;
  values: number[];
}

export interface FrontierPoint {
  risk: number;
  return_: number;
  sharpe: number;
  label?: string;
  isOptimal?: boolean;
}

export interface VolSurfacePoint {
  strike: number;
  dte: number;
  iv: number;
}
