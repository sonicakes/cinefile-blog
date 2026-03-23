# 🎬 The Cinefile blog
**Movie reviews no one asked for.**

The Cinefile blog is a movie reviews site that is stylized to look like a newspaper. The premise is that this is a bloggy newspaper that a pretentious *Film Lady* - the author of the site & reviews (aka me) made about her precious movie opinions. She thinks her insights are awfully deep & unique.

The tone I was going for: fake pretentiousness, humour, self-deprecation.

I love writing, so tried to write some quirky pieces when inspiration hit. Film reviews are my own critique, images are primarily sourced from Unsplash, with addition of my own pics.

I also include podcasts that I've listened to, relevant to each review, that are related to that specific movies.

---

## Links

[The Cinefile Blog](https://cinefile-blog.netlify.app/) - deployed live on Netlify.

## 🚀 Features
* **Freeform Reviews:** Full Markdown support for beautiful, long-form film analysis.
* **Film Metadata:** All movie data — including ratings, genres, release years, and review body — is dynamically fetched from a Strapi CMS backend deployed on Railway.
* **Responsive Design:** Optimized for reading on the couch (mobile/tablet) or at the desk (laptop/desktop).
* **Search, Filter & Sort:** Quickly find reviews by their name or filter them by genres. Sort by oldest/newest or alphabetical reviews.
* **See only a portion of reviews at a time:** View the latest reviews first & keep exploring via site pagination.
* **Masonry-style Movie Grid:** See all movies presented in column-like-cards masonry look, each clickable through to the detail page.
* **Article-style Review Presentation:** Read a movie blog as a newspaper article or a page in a book. Completed with 'Related blogs' side-section to suggest a next review.
* **Distinguish Watched VS Watchlist:** Separate your watched movies from not yet seen ones by a simple toggle.
* **Rewatch & Recommendation Indicators:** Movies display metadata badges for "rewatchable", "recommend", and times watched count.
* **Contact Form:** Sends messages directly to the author via Formspree.
* **Router-based With A Choice Of Layouts:** Multi-page website running on React, React Router v7 & Typescript allows for potential SEO in the future.

## 🛠️ Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19 / Typescript |
| **Routing** | React Router v7 (SSR) |
| **Styling** | Tailwind v4 CSS / Tailwind Typography |
| **CMS / Backend** | Strapi v5 (deployed on Railway) |
| **Database** | Neon Postgres (prod) / SQLite (local) |
| **Image Storage** | Cloudinary (via Strapi upload provider) |
| **Content Backup** | GitHub repo (`cinefile-content`) via GitHub API |
| **Markdown Support** | React Markdown |
| **Reading Time/Word Count** | Reading Time |
| **Build tool & Dev Server** | Vite 7 |
| **FE Deployment** | Netlify |
| **Icons** | React Icons - Material Design |
| **Routing support on Netlify** | @netlify/vite-plugin-react-router |

## 🖥️ Running locally

### Prerequisites
* Node.js (v18.0.0 or higher)
* npm or yarn

### Installation
1.  **Clone the repository**
    ```bash
    git clone https://github.com/sonicakes/cinefile-blog
    cd cinefile-blog
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Run the development server**
    ```bash
npm run dev → uses .env (localhost URLs)
npm run dev:prod → uses .env.production (Railway URLs)

    ```
    Open http://localhost:5173 to see the magic happen.

## Evolution of Dev

The project started as a purely static setup — movie metadata lived in a hand-crafted `movies.json` file at the root of the repo, and review body content was stored as individual Markdown files in a `/posts` directory. The frontend read both directly, stitching them together at build time via React Router v7 loaders. It worked, but maintaining it manually was painful and not scalable.

**Moving to a CMS (Strapi v5)**
The first major architectural shift was migrating all content to a Strapi v5 headless CMS. Movie metadata and review body text (`body_blog`) now live in Strapi's `movies` content type, alongside a `genres` content type for taxonomy. The frontend fetches everything dynamically via the Strapi REST API, meaning new posts go live without a redeploy.

**Cloudinary for Image Storage**
Images moved out of the repo and into Cloudinary, connected to Strapi via the official upload provider. Strapi serves image URLs across multiple format sizes, which the frontend uses to pick the right resolution depending on context.

**Finding the Right Hosting for the Backend**
Getting the backend reliably hosted took a few iterations. Strapi Cloud was implemented as an available for Strapi specifically & free tier present. However, it had constant re-loads with unsaved data in the CMS fields being lost, plus cold starts added to the annoyance.

Render was tried next — free tier, easy deploys — but the cold starts on the free plan made the API painfully slow to respond after periods of inactivity, which wasn't a viable experience for a blog. One time it took 3 !!!!! MINUTES. And the next paid tier is ~ 29USD which is not acceptable for a personal proj.

Railway turned out to be the sweet spot: always-on, fast deploys, and reasonable pricing for a small project (currently on free trial or $5credit, happy to continue with $5 Hobby plan afterwards).

**Railway + Neon Postgres in Production**
The Strapi backend now runs on Railway, connected to a Neon Postgres database via `DATABASE_URL`. Locally it falls back to SQLite. Railway handles deploys automatically on every push to `main`.

**Automated Content Backup to GitHub**
To preserve content independently of the database, a lifecycle hook on the `movie` content type triggers a Node.js backup script (`scripts/backup-posts.mjs`) after every create or update. The script fetches all movies from Strapi and upserts them as Markdown files (with YAML frontmatter) to a dedicated `cinefile-content` GitHub repo via the GitHub API. This gives version-controlled, human-readable snapshots of all post content without relying on database backups alone.

## 📸 Screenshots

Desktop home
![desktop home](/public/images/home-desk.png)
Mobile home
![mobile home](/public/images/mobile-home.png)
Desktop reviews grid
![desktop reviews grid](/public/images/desktop-reviews-grid.png)
Desktop Hover When Color Returns
![desktop hover](/public/images/hovered-color-return.png)
Tablet Width with Genre Filter Selected
![tablet with genre](/public/images/tablet-width.png)
Mobile Reviews Grid
![mobile reviews grid](/public/images/mobile-blogs.png)
Desktop blog detail
![desktop blog detail](/public/images/desktop-detail-blog.png)
Desktop About page
![desktop about](/public/images/desktop-about.png)
Desktop Contact Page
![desktop contact](/public/images/desktop-contact.png)

## 🧺 Future Dev/Laundry List

1. ✅ ~~Wire Contact Form to send emails to a dedicated cinefile blog address.~~ — **Done!** Contact form is connected via Formspree.

2. 🔄 Research & implement the 'red standout' effect that will be present on mobile & tablet devices that do not have hover interaction. **Partially done** — the "Review Pending" flag on unwatched movie cards is now always visible on mobile/tablet (hover-only on desktop). Full color-return effect on images still to be explored.

3. Kind of bouncing from the previous point - it would be great to eventually creat unique cool poster-like art that actually has deep reds color-highlighted, similar to what [this podcast](https://www.nightvalepresents.com/rnghpn9) is doing for each of their movie discussion episode.

4. Document the Design System in Figma. My initial goal was to create full design in Figma but, as I like to do with pet projects, I dove into playing with dev while adjusting my design on the go (so that it underwent about 20 iterations and ofc, I'm like, I should've done design 1st!).

5. Currently all movies, regardless of their watched/not watched status, have 'review pending' if the value of ```'review_provided' = false```. But if I haven't even seen the movie, why there is even a mention of review pending? I believe 'review pending' should be reserved for when author is currently writing/editing a review only.

6. Connect to official data from TMDB & FE Management Tool (as described earlier).

7. Dynamic choice of 'Featured Reviews' to appear on the home page. I've commented out that section coz I don't quite like the design of it. Anyway, I was just passing them as an array of items to the respective component, but would be easy to maybe get the most rated or most recent 3-4 to appear as featured. Will def come back to it.

*Not a fan of current 'featured' section, so it's commented out for now.*
![desktop home](/public/images/desktop-home.png)

8. ✅ ~~Wire up the 'Relevant Blogs' `<aside>` section, currently hard-coded.~~ — **Done!** Related blogs are now fetched dynamically from Strapi — the blog detail page queries for movies sharing the same genre(s) and surfaces them in the sidebar.

9. ✅ ~~Writing movies meta data in json manually is hella annoying~~ — **Done!** All movie data now lives in Strapi CMS. Create/edit/delete via the Strapi admin panel, no more JSON wrangling.

10. 🔄 ~~Need to optimize those JPGs mate. They take hours to load.~~ — **Partially done.** Images are now served via Cloudinary through Strapi, currently using the `medium` format size. This is a significant improvement, but the approach needs further refinement — e.g. serving different sizes based on context (card vs. hero), and potentially using `srcset` for responsive image loading.

11. ✅ ~~Upload those said images through Cloudinary~~ — **Done!** Images are now uploaded and served via Cloudinary through the Strapi upload provider.

12. Fix slight white line on img hover.

13. Display pagination either stuck fixed to the top, or trigger scroll to the viewport top on page change.

14. If there no synopsis, remove double horizontal lines from BlogCard UI.

15. Style the watched/not watched movie toggle a bit more like Mubi one - just one thick lever that I like waay more that the dotted one I have here temporarily.

![mubi screenshot](/public/images//mubi-toggle.png)

16. ✅ ~~I'd like an ability to choose multiple genres~~ — **Done!** Genre filters are now multi-select — clicking genre pills toggles them on/off independently, and the movie list filters to posts that match any of the selected genres using `Array.some()`. A "Clear all filters" option resets the selection.

17. Add more sorting options - most rated, by director, by year etc.

18. ✅ ~~Want to do something else with the top main menu rather than just an awkward stack.~~ — **Done!** Mobile navigation now uses a hamburger menu with a smooth slide-in drawer.

---

## ❓ Why make this project?

Firstly, I have already been toying with the idea of making an organized interactive list of movies that I have seen, that I have not seen, their availability (whether I have them in my home collection or on streaming services), custom ranking, and a very important feature to me - visible presentation, e.g. large posters, plenty of illustrations to accompany the movie posts.

There is a project on my TODO list that includes a search tool to find a movie from TMDB, add it to my watchlist etc. I thought this could be a great FE tool to manage my film lists - I could easily search for new ones, I could see a list of HOT ones this month, I could move them from watch to watched easily. And I could get official meta data, including official film posters from TMDB.

The thing is, I have recently developed a passion for enjoying movies on a more profound level (duh, Film Lady 🙄...). I discovered I really enjoy expressing my opinion on the movies after I have watched them, and even rating them on my own scale.

Apart from discussing the movie itself, I realized I like to include anectodes, illustrations, and silly unrelated discussions.

So, I needed a space for both listing/organizing movies, as well as having enough freedom to create an article-style movie review for each item on my list.

Of course, one option was to add-on to the TMDB project mentioned earlier and attach blogs to those. But at the time I was in the middle of the React course, practicing React Router v7, where they go through a portfolio project that fetches your blogs stored in markdown format, combines them with custom meta data, puts it all together in a multi-page site. I like to practice my own mini-projects in-between the lessons, so here's how Cinefile blog was born. It seemed perfect for the scope and my goals.

I've decided to use the TMDB project as a search tool, but potentially also link through to the blog site. Oh, and I've got an amazing, detailed json file of my movie data that I will certainly re-use. The idea is:

1. Use TMDB search/discovery tool (with AUTH) to manage my DB(edit,delete...i.e., the CRUD actions).
2. Use Cinefile as a read-only, presentation-style blogs. I welcome comments and discussion generally, but in this case, following the newspaper principle, I don't see people writing on the margins to comment on an especially infuriating article.

## 👋 Um, Excuse me, Lady? [Letterboxd](https://letterboxd.com/) exists?..

 Exactly. I have heard about this platform and wondered if all I'm doing is just cloning it. I have [signed up](https://letterboxd.com/sonicakes/) and was pleased to see it had a few essentials I was looking for:

 1. Watchlist.
 2. Watched Movies.
 3. Poster-like presentation (although it took me a while to find out how to switch from teeny-tiny grid items to a slightly larger ones).
 4. Space to write reviews (albeit only a textarea...)
 5. Rating system (only 5 stars though - but you can make half-star ratings too).
 6. Ability to create lists (I have read others' lists but did not try to create my own yet).
 7. Diary/log style - you can view movies as calendar-sorted entries.
 7. Filter tools are there. If you know how to use them.
 7. This was not what I was after, but: a strong feature of social network, ability to follow ppl, like comments, etc.

 Now, there were certain things that I did not enjoy much and that motivated me to go ahead with my own thing.

 1. Review section is just a textarea. So, you are very much limited to the type of content you put, how it's styled etc. I wanted more Rich Text Content situation instead.
 2. I love my posters giant. I know. I'm weird.
 3. I prefer 10 rating system, and I wanted to choose items to rate with rather than stars.
 4. I wanted a clearer, simpler filtering system that you didn't spend time studying. Actually, I did not even get to that stage yet. I opened a filter dropdown, it was so long that I went *TL;DR* and just manually scrolled my 437 movies. I'm talking clearly visible toggle of watched/not watched, sorting by max 3 categories, indication of how many out of how many movies I've seen, and some pills that I can genre-sort by. Is that too much to ask for? 😀
 5. Main site navigation. Uh - what is the opposite of navigation? I felt *dis-navigated* so to say. I got lost.

 Anyway, not to turn a README file into Letterboxd criticism, I hope this is enough reasoning to create The Cinefile blog.

 ## Characters, Brand, Aesthetics, Inspiration

 The Cinefile blog accidentally misspells *Cinephile*, which is the official term for someone enjoying the art of cinema. But here we have a *Film Lady* character, who claims to be a Russian Royalty, and she thinks so highly of herself and her opinions; and yet she doesn't even know how to, neither is bothered to check how to, spell the name of her egocentric Gazette.

 I say accidentally misspells, because originally I just sat down to start the project of movie blogs, and the name came to my head. I thought I'd change it later, but realized it's perfect - it combines *CINE*ma *FILE*s & reflects the shallow nature of our fradulent film critic.

 Speaking about the brand themes, the Film Lady is the brand — as well as the way the site clearly makes fun of her antics. The site has a custom SVG logo and favicon that match the grayscale + crimson newspaper aesthetic — see *Evolution of Design* below for details.

So, why the newspaper aesthetics? I thought I wanted to make my blog reviews a bit 'upper-class' & vintage. I've recently done some pics dressed in my 1920 outfit, in an art deco hotel, and I realized in black and white those would look fantastic. A bit of playing around, 'hey gemini how would those pics look in a newspaper' & voila. The artistic design was decided on.

I have looked up a few websites that inspired me as well:

- [This Russian Site of media company](https://batenka.ru/)
- [This amazing portfolio that looks like a newspaper](https://www.niccolomiranda.com/)

There was a physical medie that had an influence - a good ol' newspaper, mate! The one and only, [Sydney Morning Herald](https://www.smh.com.au/). I was inspired for design of my Front Page by these issues (see screenshots below):

![issue 1](./public/images/smh-sm.jpg)
![issue 2](./public/images/smh-2.jpg)

I wanted to make use of grayscale & interaction effects of bringing color back (or parts of it). I really loved the site where only the reds come back, and I intend to research about that for my mobile interactions (currently on hover color fades in, but that's only good for desktop users). I knew I wanted crimson as my highlight (blood! Crimson Peak!). I've discovered crimson is actually fails the readability standard, so I might have to look for an alternative.

So yeah, there's a lot of fun to be had with the newspaper style site. On my future development list, you can see things like:

- effect of turning the pages when you switch routes (visual and potentially sound)
- effect of highlighting lines with a marker when you copy some content or maybe where your mouse traces
- using a library like Framer Motion or AOS alongside Tailwind, trigger the color return as the user scrolls down the page. I've seen this effect on one of the websites, its pretty neat.

## Evolution of Design

**Original logo & favicon**
The original logo was a colourful flat clapperboard icon sourced from Flaticon — functional, but it didn't match the grayscale + crimson newspaper aesthetic of the site at all.

**Custom SVG logo (`public/logo.svg`)**
Replaced with a custom-built SVG: a dark charcoal circle with a film reel sprocket ring border (12 evenly-spaced white perforation holes), a crimson outer ring accent, and a bold gothic blackletter "C" in the centre using the *UnifrakturMaguntia* font — already loaded globally. Ornamental crimson lines and a diamond flourish sit below the letter. The logo is rendered in grayscale by default in the header and returns to full color on hover (desktop), consistent with the site-wide grayscale interaction theme.

**Custom SVG favicon (`public/favicon.svg`)**
A simplified version of the logo for the browser tab: same dark charcoal palette, crimson border, two small film perforation notches at opposite corners, and a bold serif "C" in plain Georgia — legible and distinctive at 16–32px where the gothic font would become illegible.
