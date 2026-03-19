# Styling

## Tailwind v4 Theme

Defined in `app/app.css:4` under `@theme`. Always reference these variables — never hardcode values.

**Colors:**

| Variable | Value | Tailwind class |
|----------|-------|----------------|
| `--color-dark` | `#1a1a1a` | `text-dark`, `bg-dark`, `border-dark` |
| `--color-light` | `#f0f0f0` | `bg-light` |
| `--color-crimson` | `#DC143C` | `text-crimson`, `bg-crimson` |

**Fonts:**

| Variable | Family | Tailwind class |
|----------|--------|----------------|
| `--font-brawler` | Brawler, serif | `font-brawler` |
| `--font-source` | Source Serif 4, serif | `font-source` (body default) |
| `--font-caption` | Old Standard TT, serif | `font-caption` |
| `--font-gothic` | UnifrakturMaguntia, cursive | `font-gothic` |

## Custom Utilities

Defined in `app/app.css` — usable as Tailwind utility classes.

| Class | Line | Purpose |
|-------|------|---------|
| `duotone-crimson` | `app/app.css:14` | Grayscale + crimson tint filter on images |
| `drop-cap` | `app/app.css:64` | Gothic first letter on first paragraph |
| `custom-caption` | `app/app.css:70` | Caption below images — italic, gray, border-bottom |

## Newspaper Design Conventions

Global layout and content classes defined in `app/app.css`:

| Class | Line | Purpose |
|-------|------|---------|
| `.newspaper-page` | `app/app.css:79` | Max-width page wrapper with shadow |
| `.pull-quote` | `app/app.css:236` | Bordered top/bottom, centered italic blockquote |
| `.article-meta` | `app/app.css:218` | Byline / meta info — uppercase Brawler |
| `.blog-card` | `app/app.css:286` | Review card in masonry list |
| `.news-button` | `app/app.css:184` | Double-border newspaper-style button |
| `.divider` | `app/app.css:364` | Double-rule horizontal divider |
| `.featured-image` | `app/app.css:227` | Full-width grayscale image |

**Images are grayscale by default** — `filter: grayscale(100%)` applied via `.featured-image`, `.blog-card img`, `.review-card img`. The `Reveal` component (`app/components/ui/Reveal.tsx`) transitions images from grayscale to color on scroll using IntersectionObserver.

**Prose content** (markdown review body): wrap in `prose` class from `@tailwindcss/typography`. Custom prose overrides in `app/app.css:20`.
