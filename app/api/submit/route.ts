import { NextResponse } from "next/server";

type Submission = {
  fullName?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  businessName?: unknown;
  website?: unknown;
  message?: unknown;
  company?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Submission;
  try {
    body = (await request.json()) as Submission;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    fullName: clean(body.fullName, 120),
    email: clean(body.email, 254),
    whatsapp: clean(body.whatsapp, 40),
    businessName: clean(body.businessName, 160),
    website: clean(body.website, 500),
    message: clean(body.message, 3000),
    timestamp: new Date().toISOString(),
    source: "landing-page",
  };

  if (!data.fullName || !data.email || !data.whatsapp || !data.businessName) {
    return NextResponse.json(
      { ok: false, error: "Please complete all required fields." },
      { status: 400 },
    );
  }

  if (!isEmail(data.email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (data.whatsapp.replace(/\D/g, "").length < 7) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid WhatsApp number." },
      { status: 400 },
    );
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    console.error("GOOGLE_SCRIPT_URL is not configured.");
    return NextResponse.json(
      { ok: false, error: "The form is temporarily unavailable." },
      { status: 500 },
    );
  }

  try {
    const upstream = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!upstream.ok) {
      console.error("Google Apps Script returned status", upstream.status);
      return NextResponse.json(
        { ok: false, error: "The submission could not be saved." },
        { status: 502 },
      );
    }

    const result = (await upstream.json()) as { ok?: boolean; error?: string };
    if (result.ok !== true) {
      console.error("Google Apps Script rejected the submission", result.error);
      return NextResponse.json(
        { ok: false, error: "The submission could not be saved." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Submission forwarding failed", error);
    return NextResponse.json(
      { ok: false, error: "The submission service is unavailable." },
      { status: 502 },
    );
  }
}
