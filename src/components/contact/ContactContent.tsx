"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug } from "@/data/projects";

const EASE = [0.25, 0, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

interface FormUi {
  fieldName: string;
  fieldEmail: string;
  fieldPhone: string;
  fieldPhoneOptional: string;
  fieldRegarding: string;
  fieldMessage: string;
  submit: string;
  submitting: string;
  successHeadline: string;
  successBody: string;
  successBack: string;
}

interface OfficeUi {
  label: string;
  address: string;
  hours: string;
  email: string;
  mapLabel: string;
}

interface ContactContentProps {
  hero: { label: string; headline: string; subline: string };
  form: FormUi;
  office: OfficeUi;
}

// ─── Tirana map placeholder ───────────────────────────────────────────────────
// PLACEHOLDER: replace this SVG with a real embedded map component once
// the office address is confirmed. Placeholder coordinates ~41.3275°N, 19.8187°E
// (Tirana city centre). Integrate OpenStreetMap or Mapbox when ready.
function TiranaMapPlaceholder({ mapLabel }: { mapLabel: string }) {
  return (
    <div className="relative w-full aspect-[4/3] bg-surface/60 border border-accent-secondary/15 overflow-hidden">
      <svg
        viewBox="0 0 360 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Office location map placeholder"
      >
        {/* Background */}
        <rect width="360" height="270" fill="#EFE4D5" />

        {/* City blocks — background fills */}
        <rect x="0"   y="0"   width="70"  height="60"  fill="#FAF6EE" fillOpacity="0.5" />
        <rect x="80"  y="0"   width="80"  height="60"  fill="#FAF6EE" fillOpacity="0.5" />
        <rect x="170" y="0"   width="90"  height="60"  fill="#FAF6EE" fillOpacity="0.5" />
        <rect x="270" y="0"   width="90"  height="60"  fill="#FAF6EE" fillOpacity="0.5" />
        <rect x="0"   y="70"  width="70"  height="50"  fill="#FAF6EE" fillOpacity="0.4" />
        <rect x="80"  y="70"  width="80"  height="50"  fill="#FAF6EE" fillOpacity="0.4" />
        <rect x="170" y="70"  width="90"  height="50"  fill="#FAF6EE" fillOpacity="0.4" />
        <rect x="270" y="70"  width="90"  height="50"  fill="#FAF6EE" fillOpacity="0.4" />
        <rect x="0"   y="140" width="70"  height="60"  fill="#FAF6EE" fillOpacity="0.35" />
        <rect x="80"  y="140" width="80"  height="60"  fill="#FAF6EE" fillOpacity="0.35" />
        <rect x="170" y="140" width="90"  height="60"  fill="#FAF6EE" fillOpacity="0.35" />
        <rect x="270" y="140" width="90"  height="60"  fill="#FAF6EE" fillOpacity="0.35" />
        <rect x="0"   y="210" width="70"  height="60"  fill="#FAF6EE" fillOpacity="0.3" />
        <rect x="80"  y="210" width="80"  height="60"  fill="#FAF6EE" fillOpacity="0.3" />
        <rect x="170" y="210" width="90"  height="60"  fill="#FAF6EE" fillOpacity="0.3" />
        <rect x="270" y="210" width="90"  height="60"  fill="#FAF6EE" fillOpacity="0.3" />

        {/* Street grid — horizontal boulevards */}
        <rect x="0" y="60"  width="360" height="10" fill="#EFE4D5" />
        <rect x="0" y="120" width="360" height="10" fill="#EFE4D5" />  {/* Rruga e Kavajës */}
        <rect x="0" y="200" width="360" height="10" fill="#EFE4D5" />

        {/* Street grid — vertical */}
        <rect x="70"  y="0" width="10" height="270" fill="#EFE4D5" />
        <rect x="160" y="0" width="10" height="270" fill="#EFE4D5" />
        <rect x="260" y="0" width="10" height="270" fill="#EFE4D5" />

        {/* Lana river — diagonal light sage band */}
        <path
          d="M 0 185 Q 90 175 180 165 Q 270 155 360 148"
          stroke="#C4CDB8"
          strokeWidth="12"
          strokeOpacity="0.7"
          fill="none"
        />
        {/* River label */}
        <text x="260" y="160" fontFamily="serif" fontSize="7" fill="#A98F6E" fillOpacity="0.5" fontStyle="italic">
          Lana
        </text>

        {/* Skanderbeg Square hint */}
        <circle cx="175" cy="125" r="8" stroke="#A98F6E" strokeWidth="0.6" fill="#EFE4D5" fillOpacity="0.6" />
        <text x="148" y="117" fontFamily="serif" fontSize="6" fill="#A98F6E" fillOpacity="0.55" textAnchor="middle">
          Skanderbeg
        </text>

        {/* Street labels */}
        <text x="8" y="118" fontFamily="sans-serif" fontSize="6.5" fill="#A98F6E" fillOpacity="0.55">
          Rr. e Kavajës
        </text>

        {/* Location pin — PLACEHOLDER coordinates */}
        {/* Pin body */}
        <path
          d="M 110 108 C 110 96 102 90 110 80 C 118 90 110 96 110 108 Z"
          fill="#B96A43"
        />
        <circle cx="110" cy="82" r="5" fill="#B96A43" />
        <circle cx="110" cy="82" r="2.5" fill="#FAF6EE" />

        {/* "Office" label next to pin */}
        <rect x="118" y="74" width="62" height="16" rx="2" fill="#FAF6EE" fillOpacity="0.92" />
        <text x="122" y="85" fontFamily="sans-serif" fontSize="6.5" fill="#B96A43">
          Sukaj Construction
        </text>
      </svg>

      {/* Map label */}
      <span className="absolute bottom-3 left-3 font-sans text-[8px] tracking-widest uppercase text-text/25">
        {mapLabel}
      </span>
    </div>
  );
}

// ─── Floating-label input ─────────────────────────────────────────────────────
function FloatingInput({
  id,
  label,
  type = "text",
  required = true,
  value,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <div className="relative pt-5 pb-0.5">
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "off"}
        className="
          peer block w-full bg-transparent
          border-0 border-b border-accent-secondary/30
          px-0 pt-2 pb-2
          font-sans text-sm text-text
          placeholder-transparent
          focus:border-accent focus:outline-none focus:ring-0
          transition-colors duration-200
        "
      />
      <label
        htmlFor={id}
        className="
          pointer-events-none
          absolute left-0 top-5
          font-sans text-sm text-text/40
          origin-left
          transition-all duration-200
          peer-focus:-translate-y-4 peer-focus:scale-[0.72]
          peer-focus:text-accent peer-focus:tracking-widest
          peer-[:not(:placeholder-shown)]:-translate-y-4
          peer-[:not(:placeholder-shown)]:scale-[0.72]
          peer-[:not(:placeholder-shown)]:text-text-soft
          peer-[:not(:placeholder-shown)]:tracking-widest
        "
      >
        {label}
        {hint && (
          <span className="ml-1.5 text-text/30 font-normal normal-case tracking-normal">
            — {hint}
          </span>
        )}
      </label>
    </div>
  );
}

// ─── Floating-label textarea ──────────────────────────────────────────────────
function FloatingTextarea({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative pt-5">
      <textarea
        id={id}
        required
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="
          peer block w-full bg-transparent resize-none
          border-0 border-b border-accent-secondary/30
          px-0 pt-2 pb-2
          font-sans text-sm text-text
          placeholder-transparent
          focus:border-accent focus:outline-none focus:ring-0
          transition-colors duration-200
        "
      />
      <label
        htmlFor={id}
        className="
          pointer-events-none
          absolute left-0 top-5
          font-sans text-sm text-text/40
          origin-left
          transition-all duration-200
          peer-focus:-translate-y-4 peer-focus:scale-[0.72]
          peer-focus:text-accent peer-focus:tracking-widest
          peer-[:not(:placeholder-shown)]:-translate-y-4
          peer-[:not(:placeholder-shown)]:scale-[0.72]
          peer-[:not(:placeholder-shown)]:text-text-soft
          peer-[:not(:placeholder-shown)]:tracking-widest
        "
      >
        {label}
      </label>
    </div>
  );
}

// ─── Success state ────────────────────────────────────────────────────────────
function SuccessState({ ui }: { ui: Pick<FormUi, "successHeadline" | "successBody" | "successBack"> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="py-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7L6 11L12 3" stroke="#B96A43" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="font-display text-2xl md:text-3xl text-text">{ui.successHeadline}</h2>
      </div>
      <p className="font-sans text-sm text-text-soft leading-relaxed max-w-sm mb-8">
        {ui.successBody}
      </p>
      <Link
        href="/"
        className="font-sans text-[9px] tracking-[0.24em] uppercase text-accent hover:text-accent-deep transition-colors duration-200"
      >
        ← {ui.successBack}
      </Link>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ContactContent({ hero, form, office }: ContactContentProps) {
  const searchParams  = useSearchParams();
  const projectSlug   = searchParams.get("project") ?? "";
  const projectTitle  = projectSlug ? (getProjectBySlug(projectSlug)?.title ?? projectSlug) : "";

  const [fields, setFields] = useState({
    name:      "",
    email:     "",
    phone:     "",
    regarding: projectTitle,
    message:   "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const set = (key: keyof typeof fields) => (v: string) =>
    setFields((f) => ({ ...f, [key]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    // TODO: connect to email/CRM service
    // Options: Resend (resend.com), Zoho CRM, Mailchimp, or a Next.js
    // Route Handler at app/api/contact/route.ts that calls an SMTP relay.
    // For now, simulate a short delay and show the success state.
    await new Promise((r) => setTimeout(r, 900));

    setStatus("success");
  }

  return (
    <>
      {/* Page hero */}
      <section className="px-6 md:px-14 pt-32 md:pt-44 pb-14 md:pb-20">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6, ease: EASE } } }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent">{hero.label}</span>
            <div className="h-px w-10 bg-accent/40" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display font-light text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.0] text-text"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-sans text-sm md:text-base text-text-soft mt-5 leading-relaxed max-w-sm"
          >
            {hero.subline}
          </motion.p>
        </motion.div>
      </section>

      <div className="border-t border-accent-secondary/20" />

      {/* Two-column: form left, office + map right */}
      <section className="px-6 md:px-14 py-14 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-28">

          {/* ── Left: form ─────────────────────────────────────────────── */}
          <div>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <SuccessState key="success" ui={form} />
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  noValidate
                >
                  <div className="space-y-6">
                    <FloatingInput
                      id="name"
                      label={form.fieldName}
                      value={fields.name}
                      onChange={set("name")}
                    />
                    <FloatingInput
                      id="email"
                      label={form.fieldEmail}
                      type="email"
                      value={fields.email}
                      onChange={set("email")}
                    />
                    <FloatingInput
                      id="phone"
                      label={form.fieldPhone}
                      type="tel"
                      required={false}
                      value={fields.phone}
                      onChange={set("phone")}
                      hint={form.fieldPhoneOptional}
                    />
                    {/* Regarding — pre-filled from ?project= query param */}
                    {(projectTitle || fields.regarding) && (
                      <FloatingInput
                        id="regarding"
                        label={form.fieldRegarding}
                        required={false}
                        value={fields.regarding}
                        onChange={set("regarding")}
                      />
                    )}
                    <FloatingTextarea
                      id="message"
                      label={form.fieldMessage}
                      value={fields.message}
                      onChange={set("message")}
                    />
                  </div>

                  <div className="mt-10">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="
                        inline-flex items-center gap-4
                        font-sans text-[9px] tracking-[0.24em] uppercase
                        bg-accent hover:bg-accent-deep disabled:opacity-60 text-bg
                        px-8 py-4
                        transition-colors duration-300
                      "
                    >
                      {status === "submitting" ? form.submitting : form.submit}
                      {status !== "submitting" && <span aria-hidden="true">→</span>}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: office info + map ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="space-y-8"
          >
            {/* Office details */}
            <div>
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent mb-4">
                {office.label}
              </p>
              <div className="space-y-1.5">
                <p className="font-sans text-sm text-text/70">{office.address}</p>
                <p className="font-sans text-sm text-text-soft">{office.hours}</p>
                <p className="font-sans text-sm text-text-soft">{office.email}</p>
              </div>
            </div>

            {/* Map placeholder */}
            <TiranaMapPlaceholder mapLabel={office.mapLabel} />
          </motion.div>

        </div>
      </section>
    </>
  );
}
