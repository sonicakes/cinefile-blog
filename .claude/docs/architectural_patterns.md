# Architectural Patterns

## 1. Loader → useEffect → Map

Every route follows this three-step data fetching pattern:

**Step 1 — Loader (server-side):** Returns only env vars and route params. Never fetches data.
- `app/routes/blog/index.tsx:7` — loader returns `{ apiUrl }`
- `app/routes/blog/detail.tsx:14` — loader returns `{ id, apiUrl }`

**Step 2 — useEffect (client-side):** Component fetches from Strapi using loader data.
- `app/routes/blog/index.tsx:21`
- `app/routes/blog/detail.tsx:44`

**Step 3 — Map:** Raw Strapi response mapped through a helper before setting state.
- `mapStrapiToPosts()` — `app/helpers.tsx:49` — used for list views
- `mapDetailData()` — `app/routes/blog/detail.tsx:22` — used for detail view

**Why:** Loaders run on the server (SSR); Strapi is not accessible server-side in this setup. Keeping env vars in the loader and fetching client-side allows streaming/partial hydration.

---

## 2. Defensive Data Mapping

`mapDetailData()` (`app/routes/blog/detail.tsx:22`) handles missing or nested Strapi fields by always providing fallbacks:

- Image fallback chain: `img?.formats?.medium?.url || img?.url || ""` (`app/routes/blog/detail.tsx:27`)
- Relation fields default to empty arrays: `item.spotify_episodes || []`
- Nested relations normalized: `item.next_movie?.movie || null`

`mapStrapiToPosts()` (`app/helpers.tsx:49`) follows the same principle for list data.

**Why:** Strapi returns inconsistent shapes depending on populate depth and whether optional fields are set. Defensive mapping prevents runtime errors from missing nested properties.

---

## 3. Skeleton Loading

Every data-fetching route renders a dedicated skeleton component while `data === null`:

- `app/routes/blog/detail.tsx:104` → `<MovieDetailSkeleton />`
- `app/routes/blog/index.tsx:65` → `<MoviePageSkeleton />`

Skeleton components live in `app/components/movie/`.

---

## 4. No Global State

All state is local `useState()` per component. No context, Redux, or Zustand. Cross-component data sharing happens only via props. `useLoaderData()` is the only "shared" data mechanism — it passes env vars from loader to component.

---

## 5. Component Organization

- Feature-grouped under `app/components/`: `home/`, `layout/`, `movie/`, `ui/`
- Route components in `app/routes/` (kebab-case dirs with `index.tsx`)
- Layout wrappers in `app/routes/layouts/`
- Shared types in `app/types.ts`, helpers in `app/helpers.tsx`
- Extend `mapStrapiToPosts` / `mapDetailData` in `helpers.tsx` rather than mapping inline in components
