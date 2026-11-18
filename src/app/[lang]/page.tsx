import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { images, type ImageKey } from "@/lib/images";
import { site } from "@/lib/site";
import { Header } from "@/components/header";
import { Faq } from "@/components/faq";
import { EnquiryForm } from "@/components/enquiry-form";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const img = (k: string) => images[k as ImageKey];

  const gallery: ImageKey[] = ["beachLunch", "beachGallop", "starlitDinner", "cypressHills", "oliveGroveLunch", "beachRiders", "loneTree", "valDOrcia"];
  const credits = Object.values(images).filter((p) => p.placeholder);

  return (
    <>
      <Header t={t.nav} lang={lang} />

      <main>
        {/* HERO */}
        <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-night text-sand">
          <Image
            src={images.beachGallop.src}
            alt={images.beachGallop.alt}
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[60%_center]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-night/35" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
            <p className="kicker reveal mb-5 text-sand/85">{t.hero.eyebrow}</p>
            <h1 className="display reveal max-w-4xl text-[3.1rem] sm:text-7xl lg:text-[6.2rem]" style={{ animationDelay: "120ms" }}>
              {t.hero.title}
            </h1>
            <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-sand/85 sm:text-lg" style={{ animationDelay: "240ms" }}>
              {t.hero.subtitle}
            </p>
            <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "360ms" }}>
              <a href="#enquire" className="btn btn-primary">{t.hero.primary}</a>
              <a href="#experiences" className="btn btn-ghost">{t.hero.secondary}</a>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
            <div>
              <p className="kicker text-terracotta">{t.intro.kicker}</p>
              <h2 className="display mt-4 text-4xl sm:text-6xl">{t.intro.title}</h2>
            </div>
            <p className="self-end text-lg leading-relaxed text-ink-soft">{t.intro.body}</p>
          </div>
          <div className="mt-16 grid gap-10 border-t border-stone pt-10 sm:grid-cols-3 sm:gap-8">
            {t.intro.pillars.map((p, i) => (
              <div key={p.title}>
                <p className="display text-terracotta text-2xl">0{i + 1}</p>
                <h3 className="display mt-2 text-3xl">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCES */}
        <section id="experiences" className="bg-linen py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="kicker text-terracotta">{t.experiences.kicker}</p>
              <h2 className="display mt-4 text-4xl sm:text-6xl">{t.experiences.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{t.experiences.intro}</p>
            </div>
            <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {t.experiences.items.map((x) => {
                const p = img(x.image);
                return (
                  <article key={x.id} className="group flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-stone">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        placeholder="blur"
                        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                      />
                      <span className="kicker absolute left-4 top-4 rounded-full bg-sand/90 px-3 py-1.5 text-[0.62rem] text-ink">{x.season}</span>
                    </div>
                    <h3 className="display mt-6 text-3xl sm:text-[2.1rem]">{x.name}</h3>
                    <p className="mt-1 italic text-ink-soft" style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem" }}>{x.tagline}</p>
                    <p className="mt-4 leading-relaxed text-ink-soft">{x.description}</p>
                    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-stone pt-5 text-sm">
                      <div><dt className="kicker text-[0.6rem] text-ink-soft">{t.experiences.whereLabel}</dt><dd className="mt-1">{x.where}</dd></div>
                      <div><dt className="kicker text-[0.6rem] text-ink-soft">{t.experiences.durationLabel}</dt><dd className="mt-1">{x.duration}</dd></div>
                      <div><dt className="kicker text-[0.6rem] text-ink-soft">{t.experiences.levelLabel}</dt><dd className="mt-1">{x.level}</dd></div>
                      <div><dt className="kicker text-[0.6rem] text-ink-soft">{t.experiences.priceLabel}</dt><dd className="mt-1">{t.experiences.price}</dd></div>
                      <div className="col-span-2"><dt className="kicker text-[0.6rem] text-ink-soft">{t.experiences.includesLabel}</dt><dd className="mt-1">{x.includes}</dd></div>
                    </dl>
                    <a href="#enquire" className="kicker mt-6 inline-flex items-center gap-2 self-start border-b border-terracotta pb-1 text-terracotta">
                      {t.experiences.cta} <span aria-hidden>→</span>
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="kicker text-terracotta">{t.process.kicker}</p>
          <h2 className="display mt-4 max-w-2xl text-4xl sm:text-6xl">{t.process.title}</h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {t.process.steps.map((s, i) => (
              <li key={s.title} className="border-t border-ink/80 pt-6">
                <span className="kicker text-terracotta">Step {i + 1}</span>
                <h3 className="display mt-3 text-3xl">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ABOUT */}
        <section id="about" className="bg-night text-sand">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            <figure className="relative min-h-[26rem] lg:min-h-[44rem]">
              <Image src={images.beachLunch.src} alt={images.beachLunch.alt} fill placeholder="blur" sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              <figcaption className="kicker absolute bottom-4 left-5 text-[0.62rem] text-sand/90">{t.about.imageCaption}</figcaption>
            </figure>
            <div className="flex flex-col justify-center px-5 py-16 sm:px-12 lg:px-20">
              <p className="kicker text-[#d9a27f]">{t.about.kicker}</p>
              <h2 className="display mt-4 text-4xl sm:text-6xl">{t.about.title}</h2>
              {t.about.body.map((p) => (
                <p key={p} className="mt-6 text-lg leading-relaxed text-sand/80">{p}</p>
              ))}
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {t.about.founders.map((f) => (
                  <li key={f.name} className="rounded-xl border border-sand/15 p-5">
                    <p className="display text-2xl">{f.name}</p>
                    <p className="kicker mt-1 text-[0.62rem] text-sand/60">{f.role}</p>
                    <a href={f.instagram} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-[#d9a27f] underline-offset-4 hover:underline">
                      Instagram
                    </a>
                  </li>
                ))}
              </ul>
              <p className="display mt-10 text-3xl italic text-sand/90">{t.about.signature}</p>
            </div>
          </div>
        </section>

        {/* TUSCANY */}
        <section id="tuscany" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-32">
          <div className="max-w-2xl">
            <p className="kicker text-terracotta">{t.tuscany.kicker}</p>
            <h2 className="display mt-4 text-4xl sm:text-6xl">{t.tuscany.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{t.tuscany.intro}</p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {t.tuscany.places.map((pl) => {
              const p = img(pl.image);
              return (
                <figure key={pl.name}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-stone md:aspect-[3/4]">
                    <Image src={p.src} alt={p.alt} fill placeholder="blur" sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-5">
                    <h3 className="display text-3xl">{pl.name}</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{pl.body}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="bg-linen py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="kicker text-terracotta">{t.gallery.kicker}</p>
                <h2 className="display mt-4 text-4xl sm:text-6xl">{t.gallery.title}</h2>
              </div>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="kicker self-start border-b border-terracotta pb-1 text-terracotta sm:self-auto">
                {t.gallery.follow} · {site.instagramHandle}
              </a>
            </div>
            <div className="mt-12 columns-2 gap-3 sm:gap-4 lg:columns-4">
              {gallery.map((k) => {
                const p = images[k];
                return (
                  <div key={k} className="mb-3 break-inside-avoid overflow-hidden rounded-lg bg-stone sm:mb-4">
                    <Image src={p.src} alt={p.alt} placeholder="blur" sizes="(min-width:1024px) 25vw, 50vw" className="h-auto w-full transition-transform duration-[1.2s] hover:scale-[1.04]" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-32 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="kicker text-terracotta">{t.faq.kicker}</p>
            <h2 className="display mt-4 text-4xl sm:text-6xl">{t.faq.title}</h2>
          </div>
          <Faq items={t.faq.items} />
        </section>

        {/* ENQUIRY */}
        <section id="enquire" className="relative overflow-hidden bg-night py-20 sm:py-32">
          <Image src={images.hillsDusk.src} alt="" fill placeholder="blur" sizes="100vw" className="object-cover opacity-45" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-night/60 to-night/80" />
          <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
            <div className="text-center text-sand">
              <p className="kicker text-[#e3b394]">{t.enquiry.kicker}</p>
              <h2 className="display mt-4 text-4xl sm:text-6xl">{t.enquiry.title}</h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-sand/80">{t.enquiry.intro}</p>
              <p className="mt-3 text-sm text-sand/70">
                {t.enquiry.emailLabel}{" "}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>
              </p>
            </div>
            <div className="mt-10">
              <EnquiryForm t={t.enquiry} experiences={t.experiences.items.map(({ id, name }) => ({ id, name }))} email={site.email} />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-sand px-5 pb-10 pt-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-b border-stone pb-12 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <p className="display text-5xl">Andante</p>
              <p className="mt-3 italic text-ink-soft" style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem" }}>{t.footer.tagline}</p>
            </div>
            <div>
              <p className="kicker text-ink-soft">{t.footer.contact}</p>
              <a href={`mailto:${site.email}`} className="mt-3 block break-all hover:text-terracotta">{site.email}</a>
              <p className="mt-1 text-ink-soft">Tuscany, Italy</p>
            </div>
            <div>
              <p className="kicker text-ink-soft">{t.footer.follow}</p>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="mt-3 block hover:text-terracotta">Instagram {site.instagramHandle}</a>
            </div>
          </div>
          <details className="mt-8 text-xs text-ink-soft">
            <summary className="cursor-pointer">{t.footer.photos}</summary>
            <p className="mt-3">{t.footer.photosNote}</p>
            <ul className="mt-2 space-y-1">
              {credits.map((c) => (
                <li key={c.credit.url}>
                  <a href={c.credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{c.alt}</a>{" "}
                  · {c.credit.author} · {c.credit.license}
                </li>
              ))}
            </ul>
          </details>
          <div className="mt-8 flex flex-col justify-between gap-2 text-xs text-ink-soft sm:flex-row">
            <p>© 2026 {t.footer.rights}</p>
            <p>{t.footer.preview}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
