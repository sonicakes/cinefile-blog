import type { Route } from "./+types";

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  return (
    <div className="max-w-4xl mx-auto my-4 px-10 py-12 bg-light border-2 border-neutral-300 shadow-md">
      <header className="mb-10">
        <div className="text-center border-b-[3px] border-dark pb-4">
          <p className="text-xs uppercase tracking-[0.3em] font-bold">
            Est. {new Date().getFullYear()} · Dog-dependent film critique
          </p>
          <h1 className="text-4xl wrap-break-word hyphens-auto md:text-6xl font-bold uppercase font-brawler tracking-tigh leading-none my-2">
            Correspondence
          </h1>
          <p className="text-sm italic text-neutral-700">
            Letters to the Editor & Matters of Grave Importance
          </p>
        </div>

        <div className="flex justify-between text-[11px] font-bold flex-wrap uppercase border-b border-neutral-400 py-2 mt-2">
          <span className="grayscale">Vol. ♾️</span>
          <span>{new Date().toLocaleDateString()}</span>
          <span>Price: Your 2 Cents</span>
        </div>
      </header>

      <form
        action="https://formspree.io/f/xnnvdgvr"
        method="post"
        className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-[11px] font-bold uppercase tracking-widest mb-1"
          >
            I. Name of the Correspondent
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe, Esq."
            className="w-full border-b-2 border-dark bg-transparent px-1 py-2 focus:outline-none focus:bg-white text-black"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-[11px] font-bold uppercase tracking-widest mb-1"
          >
            II. Return Address (EMAIL)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john_doe@cinefile.com"
            className="w-full border-b-2 border-dark bg-transparent px-1 py-2 focus:outline-none focus:bg-white text-black"
          />
        </div>

        <div className="md:col-span-2 border-t border-neutral-400 pt-4">
          <label
            htmlFor="subject"
            className="block text-[11px] font-bold uppercase tracking-widest mb-1"
          >
            III. Subject of Inquiry
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Fury/Repulsion/Atrocity"
            name="subject"
            className="w-full border-2 border-dark bg-transparent p-2 italic focus:outline-none focus:bg-white"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="message"
            className="block text-[11px] font-bold uppercase tracking-widest mb-1"
          >
            IV. Full Particulars
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your cinefiles are a pile of pup crap 💩, and here's why..."
            rows={6}
            className="w-full border-2 border-dark bg-transparent p-3 leading-relaxed focus:outline-none focus:bg-white"
          />
        </div>

        <div className="md:col-span-2 border-t-[3px] border-dark pt-6 mt-4">
          <button
            type="submit"
            className="inline-block pointer-events-none text-dark cursor-pointer hover:text-crimson transition duration-700 border-neutral-600 hover:border-crimson border-t border-b border-dotted tracking-wider font-gothic text-2xl hover:scale-110 mt-6"
          >
            submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
