# Kambio

Kambio is a mobile-first frontend prototype for an asynchronous peer-to-peer skill exchange platform.

The project explores a credit-based alternative to direct bartering. Instead of requiring two people to want each other's skills at the same time, users earn skill credits by teaching or completing micro-tasks, then spend those credits to learn from others.

## Prototype Scope

This is a presentation-ready UI prototype. It uses local mock data and React state to simulate a working marketplace, wallet, dashboard, and skill-credit economy without a backend.

Implemented demo flows:

- Loading/splash screen
- Onboarding flow
- Frontend-only login/register flow
- Browse skill listings
- Compare delivery models: async help, video call, face-to-face, or mini course
- Filter and search the marketplace
- Open a skill detail screen
- Request a session and spend credits
- Complete micro-tasks and earn credits
- Add a temporary skill listing
- Track learning progress and teaching requests
- Show non-credit rewards such as reputation, badges, and portfolio proof
- View updated wallet and transaction activity

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- lucide-react
- Local mock data and React hooks

## Getting Started

```bash
npm install
npm run dev
```

The local app normally runs at:

```text
http://127.0.0.1:5173
```

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
```

## Project Structure

```text
src/
  components/
  data/
  hooks/
  pages/
  styles/
  App.tsx
  main.tsx
```

## Version-Control Flow

This repository uses:

- `main` for stable presentation-ready code
- `dev` for integrated development work
- `feature/*` branches for focused features

See `docs/git-workflow.md` for the full team workflow.

For teammate handoff and implementation guidance, see
`docs/continuation-guide.md`.

## Notes

Kambio is frontend-only. There is no authentication, database, API, or permanent persistence. Temporary changes reset when the browser refreshes, which is intentional for the thesis presentation prototype.
