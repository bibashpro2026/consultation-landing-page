import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Thank You | Digital Bibash",
  robots: {
    index: false,
    follow: false,
  },
};

function getVimeoEmbedUrl(value: string | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "player.vimeo.com") {
      const match = url.pathname.match(/^\/video\/(\d+)/);
      return match ? `https://player.vimeo.com/video/${match[1]}` : null;
    }

    if (hostname === "vimeo.com") {
      const segments = url.pathname.split("/").filter(Boolean);
      const videoId = [...segments].reverse().find((segment) => /^\d+$/.test(segment));
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }
  } catch {
    return null;
  }

  return null;
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5 11.6a8.5 8.5 0 0 1-12.58 7.45L3 20.5l1.46-4.75A8.5 8.5 0 1 1 20.5 11.6Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.35 7.7c.2-.45.42-.46.72-.47h.32c.1 0 .27.04.41.35.14.32.5 1.22.55 1.3.05.09.08.2.02.32-.06.13-.1.2-.2.31-.1.11-.21.24-.3.32-.1.1-.2.2-.08.42.12.21.53.87 1.14 1.41.78.7 1.43.91 1.64 1.02.2.1.33.09.45-.05.13-.15.55-.64.7-.86.14-.21.28-.18.48-.1.2.07 1.25.59 1.46.7.22.1.36.16.41.25.06.09.06.52-.12 1.03-.17.5-1 1-1.39 1.06-.37.07-.85.1-1.37-.07-.32-.1-.74-.24-1.27-.47a10.66 10.66 0 0 1-4.02-3.55c-.42-.58-.9-1.3-.9-2.08 0-.78.4-1.16.55-1.32.14-.16.31-.2.42-.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ThankYouPage() {
  const vimeoUrl = getVimeoEmbedUrl(process.env.NEXT_PUBLIC_VIMEO_URL);
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  const message =
    "Hi, I just submitted the form for the Free Digital Marketing Consultation. I'd like to know the next steps.";
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : null;

  return (
    <main className="relative isolate min-h-screen overflow-hidden pb-16">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-32 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <Header />
      <section className="page-shell pt-8 text-center sm:pt-12">
        <div className="mx-auto max-w-3xl animate-fade-up">
          <p className="inline-flex items-center rounded-full border border-ink/10 bg-primary px-5 py-2 text-sm font-black uppercase tracking-[0.16em] text-ink shadow-button sm:text-base">
            Thank You!
          </p>
          <h1 className="mt-5 text-[2.35rem] font-extrabold leading-[1.08] tracking-[-0.055em] text-ink min-[375px]:text-[2.6rem] sm:mt-6 sm:text-6xl">
            Congratulations!{" "}
            <span className="marker-highlight">You&apos;re one step closer.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-7 text-muted sm:text-lg sm:leading-8">
            Watch the short video below, then message us on WhatsApp for the
            next steps.
          </p>

          <div className="mt-9 aspect-video w-full overflow-hidden rounded-3xl border border-primary/35 bg-white shadow-soft">
            {vimeoUrl ? (
              <iframe
                src={vimeoUrl}
                title="Digital Bibash next steps"
                className="h-full w-full"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-ink/[0.04] text-sm font-bold text-muted">
                Video placeholder
              </div>
            )}
          </div>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-extrabold text-ink shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-[#1fbd59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:w-auto"
            >
              <WhatsAppIcon />
              Message Us on WhatsApp
            </a>
          ) : (
            <p className="mt-6 text-sm font-semibold text-muted">
              Add NEXT_PUBLIC_WHATSAPP_NUMBER to show the WhatsApp button.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
