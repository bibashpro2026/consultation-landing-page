const problems = [
  "Your posts get likes, but no customers.",
  "You spend on ads and don't know what you got for it.",
  "Some weeks sales come in. Then nothing.",
];

export default function Problem() {
  return (
    <section className="section-space bg-ink text-white">
      <div className="page-shell">
        <h2 className="section-title text-white">
          Sound <span className="rounded-lg bg-primary px-2 py-1 text-ink">familiar?</span>
        </h2>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {problems.map((problem, index) => (
            <article
              key={problem}
              className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 sm:p-7"
            >
              <span className="mb-5 block text-sm font-extrabold text-primary" aria-hidden="true">
                0{index + 1}
              </span>
              <p className="text-lg font-bold leading-7">{problem}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
