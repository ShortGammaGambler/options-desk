# Public / Private Boundary

This repository is deliberately structured as a mostly open-source project while keeping sensitive research and trading logic private.

## Public release contents

The following are safe to include in the public-facing repository:

- dashboard shell and layout
- user interface components and design system
- app routing and state management
- general analytics presentations
- mock market data and example datasets
- landing pages, docs, and marketing content
- open-source frameworks and app infrastructure
- general research tooling not tied to private trading advantage

## Not included in the public release

The following are considered proprietary and should remain in a private repository or restricted internal module:

- proprietary signal generation logic
- confidential alpha models or strategy formulas
- private backtesting and parameter search pipelines
- custom research notebooks and private research results
- customer or personal portfolio data
- internally held market microstructure insights
- premium-only trade logic that is not meant for public release

## Separation rules

1. Keep public app code in the main repo tree.
2. Keep proprietary logic in a private repository or a restricted internal path excluded from the public branch.
3. Do not publish private data, model weights, or customer-specific account information.
4. Treat any market edge or strategy research as confidential unless it is intentionally released.

## Standard for contributions

Contributions are welcome for open-source app work, UI improvements, docs, and general product infrastructure.

Contributions should not include:

- private research methods
- proprietary analytics intellectual property
- personal trade data
- non-public commercial trading logic

## License note

The public repo is covered by the MIT license. Anything omitted from the public release remains private by default unless licensed separately.
