# Git Workflow

This project uses a simple branch flow suitable for a thesis prototype with multiple contributors.

## Main Branches

### `main`

Stable presentation-ready code only.

Use this branch for:

- Demo-ready versions
- Final thesis presentation builds
- Tagged milestones

Do not build features directly on `main`.

### `dev`

Integration branch for active development.

Use this branch for:

- Combining completed features
- Testing screens together
- Preparing the next stable version

Feature branches should start from `dev` and merge back into `dev`.

## Feature Branches

Use short, descriptive branch names:

```text
feature/app-shell
feature/marketplace
feature/wallet
feature/earn-credits
feature/add-skill-form
fix/mobile-layout
docs/update-readme
```

## Commit Style

Use clear commit messages with a type prefix:

```text
feat: add mobile app shell
fix: prevent negative credit balance
docs: add presentation walkthrough
style: polish marketplace cards
refactor: simplify transaction state
chore: configure vite project
```

## Working Flow

1. Start from `dev`.
2. Create a feature branch.
3. Make focused commits.
4. Merge the feature branch into `dev`.
5. Test the app from `dev`.
6. Merge `dev` into `main` only when it is demo-ready.

## Pull Request Checklist

- [ ] Branch name is descriptive.
- [ ] Changes are focused.
- [ ] App still runs locally.
- [ ] Mobile view was checked.
- [ ] README or docs were updated if needed.
- [ ] No unrelated files were changed.

## Suggested Milestones

- `v0.1-docs`: Planning and project documentation.
- `v0.2-shell`: Mobile app shell and navigation.
- `v0.3-marketplace`: Marketplace and skill detail flow.
- `v0.4-credits`: Earn/spend credit simulation.
- `v1.0-demo`: Presentation-ready prototype.
