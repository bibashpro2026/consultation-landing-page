"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type FieldName =
  | "fullName"
  | "email"
  | "whatsapp"
  | "businessName"
  | "website"
  | "message";

type FormValues = Record<FieldName, string> & { company: string };
type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  whatsapp: "",
  businessName: "",
  website: "",
  message: "",
  company: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your active email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.whatsapp.trim()) {
    errors.whatsapp = "Please enter your WhatsApp number.";
  } else if (values.whatsapp.replace(/\D/g, "").length < 7) {
    errors.whatsapp = "Please enter at least 7 digits.";
  }
  if (!values.businessName.trim()) {
    errors.businessName = "Please enter your business name.";
  }

  return errors;
}

const fields: Array<{
  name: Exclude<FieldName, "message">;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
  inputMode?: "email" | "tel" | "url";
  autoComplete?: string;
}> = [
  {
    name: "fullName",
    label: "Full Name",
    placeholder: "Your full name",
    type: "text",
    required: true,
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Active Email",
    placeholder: "you@example.com",
    type: "email",
    required: true,
    inputMode: "email",
    autoComplete: "email",
  },
  {
    name: "whatsapp",
    label: "WhatsApp Number",
    placeholder: "Your active WhatsApp number",
    type: "tel",
    required: true,
    inputMode: "tel",
    autoComplete: "tel",
  },
  {
    name: "businessName",
    label: "Business Name",
    placeholder: "Your business name",
    type: "text",
    required: true,
    autoComplete: "organization",
  },
  {
    name: "website",
    label: "Website or Facebook URL",
    placeholder: "https://",
    type: "url",
    inputMode: "url",
    autoComplete: "url",
  },
];

export default function CTAForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function updateField(name: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (name !== "company" && errors[name as FieldName]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstError = Object.keys(nextErrors)[0];
      document.getElementById(firstError)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { ok?: boolean };

      if (!response.ok || result.ok !== true) {
        throw new Error("Submission was not confirmed.");
      }

      router.push("/thank-you");
    } catch {
      const isLocalPreview =
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "localhost";

      if (isLocalPreview) {
        router.push("/thank-you");
        return;
      }

      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="form" className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div className="page-shell">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="section-title">
              Book the <span className="marker-highlight">Call</span>
            </h2>
            <p className="mt-4 font-semibold leading-7 text-muted">
              One-to-One Consultation. Customized Strategy for Your Business.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-10 rounded-[2rem] border border-primary/35 bg-white p-5 shadow-soft sm:p-9"
          >
            <div className="space-y-5">
              {fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="mb-2 block text-sm font-extrabold text-ink">
                    {field.label}
                    {field.required ? <span aria-hidden="true"> *</span> : null}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    inputMode={field.inputMode}
                    autoComplete={field.autoComplete}
                    required={field.required}
                    value={values[field.name]}
                    onChange={(event) => updateField(field.name, event.target.value)}
                    placeholder={field.placeholder}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                    className="min-h-14 w-full rounded-2xl border border-ink/20 bg-background px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-ink focus:ring-4 focus:ring-primary/35"
                  />
                  {errors[field.name] ? (
                    <p id={`${field.name}-error`} role="alert" className="mt-2 text-sm font-semibold text-red-700">
                      {errors[field.name]}
                    </p>
                  ) : null}
                </div>
              ))}

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-extrabold text-ink">
                  Anything You Want to Say
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Tell us anything that would help us prepare"
                  className="w-full resize-y rounded-2xl border border-ink/20 bg-background px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-ink focus:ring-4 focus:ring-primary/35"
                />
              </div>

              <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={(event) => updateField("company", event.target.value)}
                />
              </div>
            </div>

            {submitError ? (
              <p role="alert" className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {submitError}
              </p>
            ) : null}

            <button type="submit" disabled={isSubmitting} className="primary-button mt-7 w-full">
              {isSubmitting ? "Sending..." : "Book Free Consultation"}
            </button>
            <p className="mt-4 text-center text-sm font-semibold text-muted">
              We respect your privacy. No spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
