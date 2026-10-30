# Options Desk

A public-facing options analytics dashboard and launch site for a Bloomberg Terminal-inspired trading workspace.

This repository is intentionally organized as a mostly open-source codebase, with a clear separation between public application code and private proprietary research, signal logic, and trading IP. The public-facing project is free to use, inspect, and extend under the MIT license, while proprietary model logic and customer-sensitive analytical methods are documented as excluded from the public release.

## Why this is mostly open source

The project includes many general-purpose components that are safe to open source:

- dashboard layout and shell
- user interface components
- mock market data and data models
- routing and state management
- analytics UI and charts
- documentation and project structure
- landing/demo site and marketing pages

The following are treated as proprietary and intentionally kept outside the public release surface:

- proprietary signal generation logic
- private trading models and alpha rules
- confidential strategy research
- customer-specific or personal portfolio data
- commercial-only premium analytics flows

See PROPRIETARY.md for the full public/private split.

## Features

- GEX / DIX / DEX analytics dashboards
- option flow and volatility analysis panels
- strategy recommendation display
- position sizing calculator
- backtesting, walk-forward, Monte Carlo, and frontier views in the app experience
- market dashboard and terminal-inspired UI

## Project structure

```text
options-desk/
├── apps/
│   └── landing/
│       ├── index.html
│       └── styles.css
├── client/
│   ├── index.html
│   └── src/
├── server/
├── shared/
├── LICENSE
├── PROPRIETARY.md
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
└── pnpm-lock.yaml
```

## Local development

```bash
pnpm install
pnpm dev
```

Then open:

- http://localhost:3000

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm preview
pnpm check
pnpm format
```

## Landing page

The repository now includes a public landing page under `apps/landing/` that merges the spirit of the previous `okcwade1-lab` GitHub Pages project into the main repo while keeping the actual app logic in the public source tree and holding proprietary assets separate.

## License

This project is licensed under the MIT License. See LICENSE for details.

## Public/private policy

This repository is designed to be a transparent public project for the general app and UI layer, while preserving sensitive or proprietary research methods in a private or excluded layer. If you are contributing code that implements proprietary trading or risk models, keep it in a private repository or behind a restricted module boundary.

## Contributing

Contributions are welcome for:

- UI improvements
- app architecture
- documentation
- general analytics UX
- open-source tooling and utilities

Contributions are not appropriate for:

- confidential market signal engines
- private strategy IP
- customer or personal portfolio data
- unpublished proprietary research

---

Built to be public by default, but disciplined about proprietary IP.
