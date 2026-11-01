const benefits = [
  "Know why your posts get likes but no customers",
  "See what is and isn't working in your marketing",
  "Find where your leads are leaking",
  "Get a plan in plain language, with no confusing marketing talk",
  "Learn how AI can save you time while still sounding like you",
];

function CheckIcon() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-ink"
    >
      ✓
    </span>
  );
}

export default function Benefits() {
  return (
    <section className="section-space">
      <div className="page-shell">
        <h2 className="section-title">
          How You <span className="marker-highlight">Benefit</span>
        </h2>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <article
              key={benefit}
              className={`flex gap-4 rounded-3xl border border-primary/35 bg-surface p-6 shadow-soft sm:p-7 ${
                index === benefits.length - 1 ? "md:col-span-2 md:mx-auto md:w-1/2" : ""
              }`}
            >
              <CheckIcon />
              <p className="font-bold leading-7 text-ink">{benefit}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
