import AsideMeta from "~/components/AsideMeta";

const AboutPage = () => {
  const genres = ["developer", "artist"];

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
      <div className="lg:col-span-2">
        <h2 className="text-5xl font-bold font-brawler mb-2 capitalize">
          Who is this film lady?
        </h2>
        <div className="text-sm text-neutral-500 font-semibold border-b border-neutral-300 mb-6 pb-1">
          BY ME, MYSELF & I | CHIEF FILM CRITIC
        </div>

        <div className="prose max-w-none leading-relaxed text-lg">
         

                            {/* FLOAT BOX START */}
          <div className="md:float-left w-full md:mr-6 md:w-72">
            <img
              src="./images/wannabe-actress.jpg"
              style={{margin: 0}}
              alt="Author Portrait"
              className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition duration-700"
            />
            <p className="text-sm mt-2 custom-caption italic leading-tight">
              Seen here at the Hydro Majestic Hotel in 2025.
            </p>
          </div>
          {/* FLOAT BOX END */}
          <p className="mb-4 first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            I am a descendant of Russian Royal family — this makes for a
            wonderful small (or medium-sized) talk. My maiden name in Russian
            translates literally to 'Of Princes' - hereby unofficially crowning
            me for life.
          </p>




          <p className="mb-4">
            <span className="italic">The Cinefile Blog</span> is a collection of
            <span className="font-semibold ml-1.5">
          
               movie reviews nobody asked for
            </span>
            . It is a digital archive of my recent obsession with not just
            watching a movie and forgetting about it, but also putting my
            thoughts on in on a digital paper (hey I've always dreamed to be on
            the front page of a newspaper!). The goal is to give my humblest
            opinion on a movie, rate it on a scale from 1 to 10 using some
            objects from the movie (I borrowed this concept from Random Horro
            Podcast).
          </p>

          
  

          <p className="mb-4">
            So whilst it's mostly for me, myself and I (don't forget the dog!),
            I'd be pleased if others read it too! I try to include my own photos
            that are funny or thematic (I love dressing up), plus occassional
            (yeah right) dog pics.
          </p>

               <p className="mb-4">
            Oh right - it was first created to practice React router v7 framework mode combining blogs content in 'md' format with their meta in json. Then I realised how much I enjoyed writing content for those blogs :)
          </p>

          <h3 className="text-2xl font-bold font-brawler mt-8 uppercase">
            The Horror & The Heavy Rotation
          </h3>
          <p className="mb-4 mt-2">
            While the average viewer seeks "escapism," I seek dread. My heart
            belongs to the <strong>horror genre</strong>—it captured me when I
            was 5 & binge-watched all Freddy Krueger's movies, and has not let
            go since. If I'm not watching a film, I'm likely deep-diving into{" "}
            <strong>horror podcasts</strong>, dissecting tropes and production
            lore like a forensic examiner of the macabre.
          </p>

          <p className="mb-4 mt-2">
            I am a giant bookworm too. I love Stephen King & horror/thriller
            genre as well. I enjoy a good sci-fi - Ray Bradbury is #1 there.
          </p>

          <blockquote>
            <p> Most imagery features the author herself and/or her dog.</p>
          </blockquote>
          <p>
            I know Letterboxd exists (and yes, I’m there), but I wanted a{" "}
            <strong>bloggy-style sanctuary</strong> to organize my watchlist &
            reviews for watched movies. I also wanted to include illustration in
            my reviews, have more freedom in content editing them, as well as
            providing their location (e.g. Mubi, Shudder or Home Collection).
          </p>

          <p className="mt-4">
            When I'm not at the Hydro Majestic Hotel pretending I'm in a Kubrick
            film, I'm developing, designing, and deploying this site. And many
            others.
          </p>
          <div className="inline-block text-dark hover:text-crimson transition duration-700 border-gray-600 group-hover:border-crimson border-t border-b border-dotted tracking-wider font-gothic text-2xl hover:scale-110 mt-6">
            see portfolio - coming soon
          </div>
        </div>

        <section className="mt-12 border-t-4 border-double border-dark pt-8">
          <h2 className="text-3xl font-brawler font-bold uppercase mb-6 tracking-tighter bg-dark text-white inline-block px-2">
            The Editorial & Classifieds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm uppercase">
            <div className="border border-dark p-4 bg-[#fdfdfd]">
              <h4 className="font-bold border-b border-dark mb-2">
                My All Time Fave Movies
              </h4>
              <ul className="list-inside list-disc space-y-1">
                <li>Requiem for a dream (2000)</li>
                <li>The Ring (2002)</li>
                <li>Twin Peaks - TV show but still...(1989)</li>
                <li>Nightmare on Elm St (1984)</li>
                <li>The Court Jester (1955)</li>
                <li>Mulholland Drive (2001)</li>
                <li>The Substance (2025)</li>
                <li>Parasite (2019)</li>
              </ul>
            </div>
            <div className="border border-dark p-4 border-l-4">
              <h4 className="font-bold border-b border-dark mb-2">
                Podcast Faves
              </h4>
              <ul className="list-inside list-disc space-y-1">
                <li> Evolution of Horror</li>
                <li> Faculty of Horror</li>
                <li> Horror Queers</li>
                <li> Random Number Generator Horror Podcast No. 9</li>
                <li> Final Girls</li>
                <li> Antiquarium of Sinister Happenings</li>
                <li> The No Sleep Podcast</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <aside>
        <AsideMeta
          postMeta={{
            id: "666",
            title: "Film Lady",
            excerpt:
              "No one asked for these - but now we're all have to suffer. This lady thinks she is some kind of royalty - worse, she thinks her opinons on film matter.",
            slug: "",
            availability: [
              {
                medium: "Work Experience",
                location: "7+ yrs as in Design & Dev",
              },
              {
                medium: "Uni Degree",
                location: "/media/movies/archive",
              },
            ],
            year: "early 90s - present",
            watched: null,
            director: "me & my dog",
            genres: [
              "Front End Developer",
              "Digital Designer",
              "Dog Owner",
              "Book Lover",
              "Film Enthusiast",
            ],
            run_time: "middle-aged",
            review_provided: false,
            rating: 10,
            rating_metric: "rustic Russian royalties",
            would_recommend: true,
            would_rewatch: true,
          }}
        />
      </aside>
    </main>
  );
};

export default AboutPage;
