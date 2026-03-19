# Strapi API

## Base URLs

| Environment | URL |
|-------------|-----|
| Local | `http://localhost:1337/api` |
| Production | `https://cinefile-be-production.up.railway.app/api` |

Accessed via `VITE_API_URL` env var in all loaders.

## Content Types

| Endpoint | Description |
|----------|-------------|
| `/movies` | Movie reviews — main content type |
| `/genres` | Genre taxonomy |
| `/homepage` | Homepage featured content (singleton) |

## Query Patterns

**Full populate (list view):**
```
/movies?populate=*
```
Used in: `app/routes/blog/index.tsx:25`

**Selective populate (detail view):**
```
/movies?filters[documentId][$eq]={id}
  &populate=next_movie.movie
  &populate=next_movie.movie.img
  &populate=genres
  &populate=img
  &populate=availability
  &populate=spotify_episodes
  &populate=further_reading
  &populate=sims_scenario
```
Used in: `app/routes/blog/detail.tsx:50`

**Sorting:**
```
?sort=rating:desc
```

**Pagination:**
```
?pagination[limit]=100
```

## Image Handling

Strapi returns images with multiple format sizes. Always use the fallback chain:

```
img?.formats?.medium?.url || img?.url || ""
```

- Detail view: `app/routes/blog/detail.tsx:27`
- List view: `app/helpers.tsx:67`

Available formats: `thumbnail`, `small`, `medium`, `large`. Not all formats exist for every image — always fall back. Image paths are relative — prepend `VITE_STRAPI_URL` to construct the full URL.

## Data Flow

1. Content authored in Strapi (source of truth)
2. `body_blog` field stores review body as markdown
3. Lifecycle hook on movie content type triggers backup script after every save
4. Frontend fetches → maps via `app/helpers.tsx` → renders
