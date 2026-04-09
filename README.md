# Options Desk

> **Professional options and derivatives trading dashboard for Travis Averill**
>
> A comprehensive, Bloomberg Terminal-inspired analytics platform for options traders — featuring GEX/DIX/DEX analysis, quantitative models, strategy recommendations, 3D volatility surface visualization, and advanced portfolio analytics.

**Live Demo:** [https://optionsdash-lboupfxt.manus.space](https://optionsdash-lboupfxt.manus.space)

---

## ⚠️ Disclaimer

Options Desk is for **informational and educational purposes only**. Nothing on this platform constitutes financial advice, investment advice, trading advice, or any other sort of advice. Options trading involves substantial risk of loss. Past performance does not guarantee future results. Always consult a qualified financial professional before making investment decisions.

---

## Features

### Core Metrics Dashboard
- **GEX (Gamma Exposure)** — Dealer gamma positioning and market impact analysis
- **DIX (Dark Index)** — Dark pool short volume ratio with historical time series and divergence signals
- **DEX (Delta Exposure)** — Aggregate delta positioning across the options chain
- **Vanna Exposure** — Delta sensitivity to implied volatility changes
- **Charm Exposure** — Delta decay rate over time
- **Neuro Gamma Reflex** — Proprietary composite signal combining GEX, DIX, and volatility regime

### Market Intelligence
- **Unusual Options Flow** — Real-time-style detection of volume/OI spikes and large premium prints
- **Institutional Money Flow** — Dark pool and block trade aggregation with net flow tracking
- **Market Ticker Strip** — Live-style SPX, NDX, RUT, VIX, DXY, TNX quotes

### Analytics
- **Gamma Flip Zones** — Key price levels where dealer gamma flips from positive to negative
- **Support & Resistance Levels** — Multi-timeframe technical levels with strength scoring
- **VIX Term Structure** — Contango/backwardation visualization with slope analysis
- **Gap Analysis** — Historical gap up/down events with fill rate statistics
- **Volume Profile** — Horizontal volume-at-price visualization with POC, HVA, LVA identification
- **Statistical Arbitrage Signals** — Pairs trading z-scores, half-life, mean reversion triggers

### Quantitative Models
- **Hidden Markov Model (HMM)** — Regime detection (Low Vol Trending, High Vol Trending, Mean Reverting, Crisis)
- **Bayesian Inference** — Evidence-weighted probability updates with prior/posterior visualization
- **Markov Chain Analysis** — State transition probabilities and regime persistence modeling

### Strategy Recommendation Engine
- Specific strikes and expirations for each strategy
- Strategy types: **ratio spreads, credit spreads, debit spreads, broken wing butterflies, iron condors, calendar spreads**
- Full leg details with Greeks (delta, gamma, theta, vega, IV)
- Max profit / max loss / breakeven calculations
- Kelly-sized position recommendations
- GEX environment context (positive vs negative GEX vol logic)
- Rationale and risk narrative for each trade

### Position Sizing
- **Dynamic Kelly Criterion Calculator** — Full Kelly, fractional Kelly (10%, 25%, 50%), and custom fractions
- Growth rate optimization curves
- Account equity impact visualization
- Win rate / avg win / avg loss sensitivity analysis

### Advanced Analytics (Pro/Premium)
- **Backtesting Engine** — Equity curve, drawdown analysis, trade log with R-multiples, Sharpe/Sortino
- **Walk-Forward Analysis** — Rolling window in-sample vs out-of-sample optimization validation
- **Monte Carlo Simulation** — Probability cones, return distribution histograms, VaR/CVaR
- **Efficient Frontier** — Mean-variance portfolio optimization with Sharpe ratio tangent line
- **3D Volatility Surface** — Interactive Plotly 3D chart of implied volatility across strikes and expirations

---

## Monetization Tiers

| Feature | Free | Pro ($19.99/mo) | Premium ($49.99/mo) |
|---|:---:|:---:|:---:|
| GEX / DIX (delayed 15min) | ✓ | ✓ | ✓ |
| Gamma flip zones | ✓ | ✓ | ✓ |
| Basic Kelly calculator | ✓ | ✓ | ✓ |
| Real-time GEX / DIX | — | ✓ | ✓ |
| DEX / Vanna / Charm | — | ✓ | ✓ |
| VIX term structure | — | ✓ | ✓ |
| Volatility slope analysis | — | ✓ | ✓ |
| HMM regime detection | — | ✓ | ✓ |
| Unusual options flow | — | ✓ | ✓ |
| Gap analysis | — | ✓ | ✓ |
| Volume profile | — | ✓ | ✓ |
| Dynamic Kelly sizing | — | ✓ | ✓ |
| Backtesting engine | — | ✓ | ✓ |
| Walk-forward analysis | — | ✓ | ✓ |
| Stat arb signals | — | — | ✓ |
| Institutional money flow | — | — | ✓ |
| Neuro Gamma Reflex | — | — | ✓ |
| Bayesian inference | — | — | ✓ |
| Markov chain analysis | — | — | ✓ |
| Full strategy engine | — | — | ✓ |
| Monte Carlo simulation | — | — | ✓ |
| Efficient frontier | — | — | ✓ |
| 3D volatility surface | — | — | ✓ |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui + Radix UI |
| Charts | Recharts (2D), Plotly.js (3D vol surface) |
| Routing | Wouter |
| Animations | Framer Motion |
| Icons | Lucide React |
| Build | Vite + esbuild |
| Package Manager | pnpm |

---

## Project Structure

```
options-desk/
├── client/
│   ├── index.html              # App entry point with Google Fonts
│   └── src/
│       ├── App.tsx             # Root component with routing
│       ├── index.css           # Dark terminal theme + design tokens
│       ├── components/
│       │   ├── DashboardLayout.tsx   # Sidebar nav + market ticker + layout shell
│       │   ├── Disclaimer.tsx        # Legal disclaimer banner + footer
│       │   ├── TierGate.tsx          # Feature gating overlay component
│       │   └── ui/                   # shadcn/ui component library
│       ├── contexts/
│       │   ├── TierContext.tsx       # 3-tier access state management
│       │   └── ThemeContext.tsx      # Dark/light theme context
│       ├── lib/
│       │   ├── types.ts              # All TypeScript type definitions
│       │   └── mockData.ts           # Comprehensive realistic mock data
│       └── pages/
│           ├── Dashboard.tsx         # Main dashboard (GEX/DIX/flow/neuro gamma)
│           ├── Analytics.tsx         # Gamma flip, S/R, VIX, gaps, vol profile, stat arb
│           ├── QuantModels.tsx       # HMM, Bayesian inference, Markov chains
│           ├── Strategies.tsx        # Strategy recommendation engine
│           ├── PositionSizing.tsx    # Dynamic Kelly criterion calculator
│           ├── Backtesting.tsx       # Equity curve, drawdown, trade log [PRO]
│           ├── WalkForward.tsx       # Rolling window optimization [PRO]
│           ├── MonteCarlo.tsx        # Probability simulation [PREMIUM]
│           ├── EfficientFrontier.tsx # Mean-variance optimization [PREMIUM]
│           ├── VolSurface.tsx        # 3D implied vol surface [PREMIUM]
│           ├── Pricing.tsx           # 3-tier pricing comparison
│           └── NotFound.tsx          # 404 page
├── server/
│   └── index.ts                # Express static file server
├── shared/
│   └── const.ts                # Shared constants
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ (v22 recommended)
- **pnpm** v9+ (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/okcwade1-lab/options-desk.git
cd options-desk

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The app will be available at `http://localhost:3000`.

### Available Scripts

```bash
pnpm dev          # Start development server with HMR
pnpm build        # Build for production
pnpm start        # Start production server
pnpm preview      # Preview production build locally
pnpm check        # TypeScript type checking
pnpm format       # Format code with Prettier
```

### Environment Variables

No environment variables are required to run the app locally. The app uses mock data throughout.

For production deployment with real data, you would configure:

```env
# Market data provider (e.g., Polygon.io, Interactive Brokers)
VITE_MARKET_DATA_API_KEY=your_key_here
VITE_MARKET_DATA_URL=https://api.polygon.io

# Authentication (if adding user accounts)
VITE_OAUTH_PORTAL_URL=your_oauth_url

# Analytics
VITE_ANALYTICS_ENDPOINT=your_analytics_endpoint
VITE_ANALYTICS_WEBSITE_ID=your_website_id
```

---

## Design System

Options Desk uses a **Bloomberg Terminal Noir** design philosophy:

- **Background:** Deep space navy-black (`oklch(0.10 0.015 240)`) for eye-strain reduction during long sessions
- **Bullish signals:** Terminal green (`#00ff88`)
- **Bearish signals:** Hot pink-red (`#ff3366`)
- **Info/neutral:** Electric blue (`#00aaff`)
- **Warning:** Amber (`#ffaa00`)
- **Typography:** JetBrains Mono (numbers/tickers) + Space Grotesk (headings)
- **Data cards:** Subtle glass-morphism with `oklch` color space tokens

---

## Roadmap

### Near-term
- [ ] Connect to live market data APIs (Polygon.io, CBOE, IB)
- [ ] User authentication with JWT sessions
- [ ] Stripe billing integration for Pro/Premium tiers
- [ ] Email/SMS alerts for gamma flip zone breaches and unusual flow spikes

### Medium-term
- [ ] Options chain scanner with custom filters
- [ ] Portfolio Greeks aggregation (net delta, gamma, theta, vega)
- [ ] Earnings calendar integration with IV rank/percentile
- [ ] Custom watchlists and saved strategy templates

### Advanced (Future)
- [ ] Quantum Hidden Markov Models (QHMM) via PennyLane / Qiskit ML
- [ ] Transformer-based regime prediction engine
- [ ] Deep learning IV surface forecasting
- [ ] Real-time WebSocket data feeds
- [ ] Multi-asset support (futures, FX, crypto options)

---

## Contributing

This is a private project for Travis Averill. If you have access to this repository and want to contribute:

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes and ensure TypeScript passes: `pnpm check`
3. Format your code: `pnpm format`
4. Submit a pull request with a clear description

---

## License

Private — All rights reserved. © 2026 Travis Averill.

---

*Built with React + Vite + TypeScript. Deployed on [Manus](https://manus.im).*
