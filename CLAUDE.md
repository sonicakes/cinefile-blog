# Cinefile Blog

Newspaper-themed movie review blog. Reviews are authored in Strapi CMS and rendered
with React Router v7 SSR. On every Strapi save, a lifecycle hook backs up content to a GitHub repo.

## Tech Stack

- React 19 + React Router 7 (SSR enabled — `react-router.config.ts`)
- Vite 7 / TypeScript 5 (strict)
- Tailwind CSS v4 — theme in `app/app.css:4`
- Strapi v5 CMS — sibling dir `../cinefile-be/` (has its own CLAUDE.md)
- Deployment: Netlify (frontend) · Railway (backend) · Neon Postgres (db)

## Key Directories & Files

| Path | Purpose |
|------|---------|
| `app/routes/` | Route components — kebab-case dirs, `index.tsx` per route |
| `app/routes/layouts/` | Layout wrappers (`home.tsx`, `main.tsx`, `detail.tsx`) |
| `app/components/` | Reusable components grouped by feature: `home/`, `layout/`, `movie/`, `ui/` |
| `app/types.ts:1` | Shared types: `Post`, `RawPost` (`:45`), `SortOption` (`:36`) |
| `app/helpers.tsx:49` | Data mappers: `mapStrapiToPosts` (`:49`), `calculateReadingTime` (`:84`), `getIconByMedium` (`:14`) |
| `app/constants.ts` | Genre list and other constants |
| `app/app.css` | Tailwind v4 theme + custom utilities |
| `.react-router/` | Auto-generated — do not modify |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Strapi API base URL — used in all loaders |
| `VITE_STRAPI_URL` | Strapi origin — used for image URL construction |

Set in `.env` (local) and `.env.production` (Railway URL).

## Commands

```bash
npm run dev          # dev server with HMR
npm run build        # production build
npm run typecheck    # generate RR types + tsc check
npm run start        # serve production build
```

## Behavior Instructions

- Before modifying anything, show the proposed solution and explain it in plain language.
- Ask clarifying questions on both minor and major decisions.
- When starting a new feature or bug fix: check the current branch, show it to the user, and ask if it's the correct one. If not, ask what branch to create based on the feature/bug/task name.
- When starting a new feature, bug fix, or architectural change: ask if the user wants to enter /plan mode before proceeding.
- After making changes, check if any `.claude/docs/` files are affected and update them accordingly.

## Additional Documentation

Check these when relevant:

| File | When to check |
|------|--------------|
| `.claude/docs/architectural_patterns.md` | Data fetching, component structure, state management, skeleton loading |
| `.claude/docs/strapi_api.md` | Strapi endpoints, query syntax, image handling, data flow |
| `.claude/docs/styling.md` | CSS variables, Tailwind theme, custom utilities, newspaper design conventions |
