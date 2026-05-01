# Continuation Guide

Use this guide when another member continues the Kambio prototype.

## Before Coding

1. Start from the integration branch:

```bash
git switch dev
git pull
```

2. Create a focused feature branch:

```bash
git switch -c feature/short-feature-name
```

Examples:

```text
feature/profile-polish
feature/applicant-details
feature/wallet-persistence
fix/mobile-spacing
```

## Run The App

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Project Map

```text
src/App.tsx
  Main app state and handlers.

src/data/mockData.ts
  Demo users, skills, teaching quests, tasks, and transactions.

src/types.ts
  Shared TypeScript types for tabs, skills, quests, requests, rewards, etc.

src/pages/
  Screen-level UI.

src/components/
  Reusable shell, navigation, badges, and empty states.

src/styles/index.css
  Global theme, animations, and shared gamified utility classes.
```

## How To Add A Feature

1. Add or update the data shape in `src/types.ts` if needed.
2. Add mock demo data in `src/data/mockData.ts`.
3. Keep shared state and cross-screen behavior in `src/App.tsx`.
4. Build the screen UI in the relevant file under `src/pages/`.
5. Reuse existing styles such as `quest-card`, `quest-button`, `reward-chip`, and `soft-input`.
6. Make every visible button do something: update state, open a modal, switch a view, show feedback, or disable clearly.

## Teaching Quest Flow

The Teach tab currently has three modes:

- `Open`: create or edit a teaching quest.
- `Quests`: view, edit, or delete quests opened by the current user.
- `Applicants`: view learner requests and accept applicants.

Quest state lives in `src/App.tsx`:

- `openedQuests`
- `incomingRequests`
- `handleAddSkill`
- `handleUpdateSkill`
- `handleDeleteSkill`
- `handleAcceptApplicant`

The Teach UI lives in `src/pages/TeachPage.tsx`.

## Before Committing

Run:

```bash
npm run build
npm run lint
```

Then commit with a clear message:

```bash
git add src docs
git commit -m "feat: describe the feature"
```

Merge back into `dev` only after checks pass:

```bash
git switch dev
git merge --no-ff feature/short-feature-name -m "merge: short feature name"
```

Only merge `dev` into `main` when the app is presentation-ready.
