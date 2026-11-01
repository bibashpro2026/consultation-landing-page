const steps = [
  "Fill out the short form below.",
  "We talk one-to-one about your business and your goals.",
  "You get a customized strategy to bring in more customers.",
];

export default function Process() {
  return (
    <section className="section-space border-y border-primary/20 bg-white">
      <div className="page-shell">
        <h2 className="section-title">
          Simple <span className="marker-highlight">3-Step</span> Process
        </h2>
        <ol className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <li key={step} className="relative text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-black text-ink shadow-button">
                {index + 1}
              </span>
              <p className="mt-5 font-bold leading-7 text-ink">
                <span className="sr-only">Step {index + 1}: </span>
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
