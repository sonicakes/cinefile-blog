import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
type Fields = Record<"name" | "email" | "subject" | "message", string>;

const errorClass = "text-crimson text-[10px] font-bold uppercase tracking-widest mt-1";

const ContactPage = () => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [fields, setFields] = useState<Fields>({ name: "", email: "", subject: "", message: "" });

  const isComplete = Object.values(fields).every((v) => v.trim() !== "");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validate(data: FormData): FieldErrors {
    const errs: FieldErrors = {};
    if (!data.get("name")?.toString().trim()) errs.name = "Name is required.";
    const email = data.get("email")?.toString().trim() ?? "";
    if (!email) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email.";
    if (!data.get("subject")?.toString().trim()) errs.subject = "Subject is required.";
    if (!data.get("message")?.toString().trim()) errs.message = "Message is required.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setFormState("submitting");

    try {
      const res = await fetch("https://formspree.io/f/xnjgvozb", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setFormState("success");
        form.reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

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
          <span>{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span>Price: Your 2 Cents</span>
        </div>
      </header>

      {formState === "success" ? (
        <div className="border-2 border-dark bg-white p-8 space-y-3 text-sm leading-relaxed">
          <p className="font-brawler text-3xl font-bold uppercase border-b border-neutral-600 pb-3">Letter Received.</p>
          <p className="pb-2">Dearest <span className="font-bold capitalize">{fields.name}</span>,</p>
          <p>
            We have the utmost pleasure to receive your letter, which goes as follows:
          </p>
          <blockquote className="border-l-4 border-neutral-600 pl-4 italic text-neutral-600">
            "{fields.message.length > 160 ? fields.message.slice(0, 160).trimEnd() + "…" : fields.message}"
          </blockquote>
          <p>
            Your comment regarding <span className="font-bold">{fields.subject}</span> will be addressed in due course
            and a reply sent to <span className="font-bold">{fields.email}</span>.
          </p>
          <p>
            In the meantime, don't hesitate to connect on{" "}
            <a href="https://letterboxd.com/filmladyroyal/" target="_blank" rel="noopener noreferrer" className="underline hover:text-crimson transition-colors">Letterboxd</a>
            {" & "}
            <a href="https://bsky.app/profile/filmladyroyal.bsky.social" target="_blank" rel="noopener noreferrer" className="underline hover:text-crimson transition-colors">BlueSky</a>.
          </p>
          <p className="pt-2 italic">Good Morning, Good Afternoon and Good Night!</p>
          <button
            onClick={() => { setFormState("idle"); setFields({ name: "", email: "", subject: "", message: "" }); }}
            className="text-dark hover:text-crimson transition duration-700 border-neutral-600 hover:border-crimson border-t border-b border-dotted tracking-wider font-gothic text-xl cursor-pointer hover:scale-110 inline-block mt-2"
          >
            send another
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
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
              value={fields.name}
              onChange={handleChange}
              placeholder="John Doe, Esq."
              className="w-full border-b-2 border-dark bg-transparent px-1 py-2 focus:outline-none focus:bg-white text-black"
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
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
              value={fields.email}
              onChange={handleChange}
              placeholder="john_doe@cinefile.com"
              className="w-full border-b-2 border-dark bg-transparent px-1 py-2 focus:outline-none focus:bg-white text-black"
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
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
              name="subject"
              value={fields.subject}
              onChange={handleChange}
              placeholder="Fury/Repulsion/Atrocity"
              className="w-full border-2 border-dark bg-transparent p-2 italic focus:outline-none focus:bg-white"
            />
            {errors.subject && <p className={errorClass}>{errors.subject}</p>}
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
              value={fields.message}
              onChange={handleChange}
              placeholder="Your cinefiles are a pile of pup crap 💩, and here's why..."
              rows={6}
              className="w-full border-2 border-dark bg-transparent p-3 leading-relaxed focus:outline-none focus:bg-white"
            />
            {errors.message && <p className={errorClass}>{errors.message}</p>}
          </div>

          <div className="md:col-span-2 border-t-[3px] border-dark pt-6 mt-4 flex flex-col gap-3">
            {formState === "error" && (
              <p className="text-crimson text-sm font-bold uppercase tracking-widest">
                Transmission failed. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={!isComplete || formState === "submitting"}
              className="inline-block text-dark hover:text-crimson transition duration-700 border-neutral-600 hover:border-crimson border-t border-b border-dotted tracking-wider font-gothic text-2xl hover:scale-110 cursor-pointer disabled:opacity-50 disabled:pointer-events-none self-start"
            >
              {formState === "submitting" ? "transmitting..." : "submit form"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactPage;
