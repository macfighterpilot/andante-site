"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  t: Dictionary["enquiry"];
  experiences: { id: string; name: string }[];
  email: string;
};

type Values = {
  name: string;
  email: string;
  country: string;
  dateFrom: string;
  dateTo: string;
  riders: string;
  level: string;
  experience: string;
  message: string;
};

const empty: Values = { name: "", email: "", country: "", dateFrom: "", dateTo: "", riders: "2", level: "", experience: "", message: "" };
const fill = (s: string, vars: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
// Only called from the submit handler: reading the clock during render breaks static prerendering.
const today = () => new Date().toISOString().slice(0, 10);

// Demo mode (agreed with the founder): validate, show a confirmation and open a pre-filled email to Andante.
// Nothing is stored and no automatic email is sent.
// TODO(andante): when approved, post to a form backend (e.g. a Next.js server action + email provider).
export function EnquiryForm({ t, experiences, email }: Props) {
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [sent, setSent] = useState<{ name: string; href: string } | null>(null);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  function validate(): Partial<Record<keyof Values, string>> {
    const e: Partial<Record<keyof Values, string>> = {};
    for (const k of ["name", "email", "country", "dateFrom", "level", "experience"] as const) if (!v[k].trim()) e[k] = t.errors.required;
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = t.errors.email;
    const n = Number(v.riders);
    if (!Number.isInteger(n) || n < 1 || n > 30) e.riders = t.errors.riders;
    if (v.dateFrom && v.dateFrom < today()) e.dateFrom = t.errors.datePast;
    if (v.dateTo && v.dateFrom && v.dateTo < v.dateFrom) e.dateTo = t.errors.dateOrder;
    return e;
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    const level = t.levels.find((l) => l.value === v.level)?.label ?? v.level;
    const exp = experiences.find((x) => x.id === v.experience)?.name ?? t.experienceOther;
    const dates = v.dateTo ? `${v.dateFrom} → ${v.dateTo}` : v.dateFrom;
    const body = [
      `${t.fields.name}: ${v.name.trim()}`,
      `${t.fields.email}: ${v.email.trim()}`,
      `${t.fields.country}: ${v.country.trim()}`,
      `${t.fields.dateFrom}: ${dates}`,
      `${t.fields.riders}: ${v.riders}`,
      `${t.fields.level}: ${level}`,
      `${t.fields.experience}: ${exp}`,
      "",
      v.message.trim(),
    ].join("\n");
    const href = `mailto:${email}?subject=${encodeURIComponent(fill(t.mailSubject, { experience: exp, date: dates }))}&body=${encodeURIComponent(body)}`;
    setSent({ name: v.name.trim().split(/\s+/)[0], href });
    window.location.href = href;
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-sand p-8 text-center sm:p-12" role="status" aria-live="polite">
        <p className="display text-4xl sm:text-5xl">{fill(t.success.title, { name: sent.name })}</p>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">{fill(t.success.body, { email })}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={sent.href} className="btn btn-primary">{t.success.openMail}</a>
          <button type="button" className="btn btn-ghost text-ink" onClick={() => { setSent(null); setV(empty); }}>
            {t.success.again}
          </button>
        </div>
      </div>
    );
  }

  const label = "mb-1.5 block text-sm font-medium text-ink";
  const err = (k: keyof Values) =>
    errors[k] ? <p id={`e-${k}`} className="mt-1.5 text-sm text-[#b42318]">{errors[k]}</p> : null;
  const aria = (k: keyof Values) => ({ id: `f-${k}`, "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 rounded-2xl bg-sand p-5 sm:grid-cols-2 sm:p-10">
      <div>
        <label htmlFor="f-name" className={label}>{t.fields.name}</label>
        <input {...aria("name")} className="field" autoComplete="name" value={v.name} onChange={set("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="f-email" className={label}>{t.fields.email}</label>
        <input {...aria("email")} type="email" inputMode="email" className="field" autoComplete="email" value={v.email} onChange={set("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="f-country" className={label}>{t.fields.country}</label>
        <input {...aria("country")} className="field" autoComplete="country-name" value={v.country} onChange={set("country")} />
        {err("country")}
      </div>
      <div>
        <label htmlFor="f-riders" className={label}>{t.fields.riders}</label>
        <input {...aria("riders")} type="number" min={1} max={30} inputMode="numeric" className="field" value={v.riders} onChange={set("riders")} />
        {err("riders")}
      </div>
      <div>
        <label htmlFor="f-dateFrom" className={label}>{t.fields.dateFrom}</label>
        <input {...aria("dateFrom")} type="date" className="field" value={v.dateFrom} onChange={set("dateFrom")} />
        {err("dateFrom")}
      </div>
      <div>
        <label htmlFor="f-dateTo" className={label}>{t.fields.dateTo}</label>
        <input {...aria("dateTo")} type="date" min={v.dateFrom || undefined} className="field" value={v.dateTo} onChange={set("dateTo")} />
        {err("dateTo")}
      </div>
      <div>
        <label htmlFor="f-level" className={label}>{t.fields.level}</label>
        <select {...aria("level")} className="field" value={v.level} onChange={set("level")}>
          <option value="" disabled>—</option>
          {t.levels.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
        </select>
        {err("level")}
      </div>
      <div>
        <label htmlFor="f-experience" className={label}>{t.fields.experience}</label>
        <select {...aria("experience")} className="field" value={v.experience} onChange={set("experience")}>
          <option value="" disabled>—</option>
          {experiences.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          <option value="unsure">{t.experienceOther}</option>
        </select>
        {err("experience")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-message" className={label}>{t.fields.message}</label>
        <textarea {...aria("message")} rows={4} className="field resize-y" placeholder={t.fields.messagePlaceholder} value={v.message} onChange={set("message")} />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">{t.privacy}<br /><span className="text-xs opacity-80">{t.demoNote}</span></p>
        <button type="submit" className="btn btn-primary w-full sm:w-auto">{t.submit}</button>
      </div>
    </form>
  );
}
