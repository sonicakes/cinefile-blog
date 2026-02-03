const HeadlineBlock = () => {
  return (
    <section className="headline-block">
      <h2 className="text-5xl md:text-7xl leading-[1.1] tracking-tight font-bold font-brawler">Movie Reviews Nobody Asked For</h2>
      <div className="font-brawler pt-2 pb-5 text-neutral-600 uppercase text-xs border-t border-neutral-400">
        By Me, Myself & I | Chief film critic
      </div>
      <div className="columns-2 hyphens-auto text-justify gap-5">
        <p className="first-letter:text-7xl first-letter:font-gothic first-letter:float-left first-letter:mr-3 first-letter:leading-none">
         The Cinefile Blog has officially claimed the spotlight, pledging to offer a "new generation" of film criticism after a radical shift in the crowded landscape of stale movie reviews.
        </p>
        <p className="first-letter:ml-6">
          After outshining the predictable tropes of mainstream critics, the new voice of the blog has promised to unify "bruised and battered" cinema lovers everywhere. There’s a new seat in the director's chair, signaling a fresh start where even the most controversial cult classics will find a home without judgment.
        </p>
      </div>
      <button className="gothic-button">read all</button>
    </section>
  );
};

export default HeadlineBlock;
