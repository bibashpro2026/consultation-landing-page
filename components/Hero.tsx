export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-7 sm:pb-24 sm:pt-12 lg:pb-28 lg:pt-16">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl sm:h-[38rem] sm:w-[38rem]"
      />
      <div className="page-shell animate-fade-up text-center">
        <h1 className="mx-auto max-w-4xl text-[2.35rem] font-extrabold leading-[1.06] tracking-[-0.055em] text-ink min-[375px]:text-[2.6rem] sm:text-6xl lg:text-[4.4rem]">
          Stop the Feast-or-Famine Cycle.
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-2xl font-extrabold leading-tight tracking-[-0.035em] text-ink sm:mt-6 sm:text-3xl lg:text-4xl">
          Get a Clear Plan to Bring in{" "}
          <span className="marker-highlight">More Customers.</span>
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-7 text-ink sm:text-lg sm:leading-8">
          A free one-to-one consultation with a real strategist. No jargon. No
          long contracts. Just a plan built for your online store.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-7 text-muted sm:text-base">
          You post. You run ads. Still, the sales don&apos;t come. This free
          consultation is for online store owners who want more customers.
        </p>
        <a href="#form" className="primary-button mt-8 w-full sm:w-auto">
          Book Free Consultation
        </a>
      </div>
    </section>
  );
}
