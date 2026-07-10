import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import founderImg from "@/assets/founder.jpg";
import artisanImg from "@/assets/artisan.jpg";
import craftImg from "@/assets/craft.jpg";
import visionImg from "@/assets/vision.jpg";
import colBridal from "@/assets/col-bridal.jpg";
import colEvening from "@/assets/col-evening.jpg";
import colOccasion from "@/assets/col-occasion.jpg";
import colContemporary from "@/assets/col-contemporary.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ------------------------------- utilities ------------------------------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("reveal-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return scrolled;
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { d, h, m, s };
}

/* -------------------------------- nav ------------------------------------ */

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#vision", label: "Vision" },
  { href: "#founder", label: "Founders" },
  { href: "#artisan", label: "Master" },
  { href: "#collections", label: "Collections" },
  { href: "#craftsmanship", label: "Craftsmanship" },
  { href: "#launch", label: "Launch" },
  { href: "#contact", label: "Contact" },
];

function Nav() {
  const scrolled = useScrolled(30);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "backdrop-blur-md bg-[color-mix(in_oklab,var(--ivory)_78%,transparent)] border-b border-[color-mix(in_oklab,var(--ink)_10%,transparent)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10 h-16 md:h-20">
        {/* left menu (desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-[10.5px] font-button text-[color:var(--ink)]/80">
          {NAV.slice(0, 5).map((n) => (
            <a key={n.href} href={n.href} className="hover:text-[color:var(--gold)] transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        {/* mobile menu toggle */}
        <button
          aria-label="Open menu"
          className="lg:hidden justify-self-start p-2 -ml-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 h-px bg-[color:var(--ink)] mb-1.5" />
          <span className="block w-6 h-px bg-[color:var(--ink)] mb-1.5" />
          <span className="block w-4 h-px bg-[color:var(--ink)]" />
        </button>

        {/* logo centered */}
        <a href="#home" className="justify-self-center flex flex-col items-center leading-none">
          <span className="font-display text-[1.35rem] md:text-[1.6rem] tracking-luxury text-[color:var(--ink)]">
            ANCHHI
          </span>
          <span className="mt-1 hidden md:block font-serif-elegant italic text-[10px] tracking-[0.28em] text-[color:var(--gold)]">
            est. South Delhi
          </span>
        </a>

        {/* right menu */}
        <nav className="hidden lg:flex items-center gap-7 justify-self-end text-[10.5px] font-button text-[color:var(--ink)]/80">
          {NAV.slice(5).map((n) => (
            <a key={n.href} href={n.href} className="hover:text-[color:var(--gold)] transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="lg:hidden justify-self-end">
          <a
            href="#launch"
            className="font-button text-[10px] tracking-[0.28em] text-[color:var(--ink)] border-b border-[color:var(--gold)] pb-0.5"
          >
            Notify
          </a>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 bg-[color:var(--ivory)] border-t border-[color:var(--border)] ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-8 py-8 gap-5">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="font-serif-elegant text-2xl text-[color:var(--ink)] hover:text-[color:var(--gold)] transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* -------------------------------- sections ------------------------------- */

function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[color:var(--ink)] text-[color:var(--ivory)]"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${y * 0.3}px, 0) scale(1.08)` }}
      >
        <img
          src={heroImg}
          alt="An Anchhi couture gown, gold hand embroidery on ivory silk"
          width={1600}
          height={1920}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <div className="reveal">
          <p className="font-button text-[10px] tracking-[0.5em] text-[color:var(--gold)]">
            Luxury Fashion House
          </p>
        </div>

        <h1 className="reveal mt-6 font-display text-[15vw] leading-[0.95] md:text-[9rem] lg:text-[11rem] tracking-[0.06em]">
          ANCHHI
        </h1>

        <div className="reveal mt-6 flex items-center gap-4">
          <span className="hairline w-16 md:w-24" />
          <span className="font-serif-elegant italic text-sm md:text-base tracking-[0.2em]">
            South Delhi
          </span>
          <span className="hairline w-16 md:w-24" />
        </div>

        <p className="reveal mt-10 max-w-xl font-serif-elegant text-lg md:text-xl leading-relaxed text-[color:var(--ivory)]/85 px-4">
          A refined destination for couture, occasion wear and handcrafted designer dresses —
          Timeless Elegance. Crafted Before Its Time.
        </p>

        <div className="reveal mt-12 flex flex-col sm:flex-row items-center gap-4">
          <a href="#launch" className="btn-outline-gold">Notify Me</a>
          <a
            href="#collections"
            className="font-button text-[11px] tracking-[0.32em] text-[color:var(--gold)] border-b border-[color:var(--gold)]/60 pb-1 hover:border-[color:var(--gold)] transition"
          >
            Discover the House
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="font-button text-[9px] tracking-[0.5em] text-[color:var(--ivory)]/60">
          Scroll
        </span>
        <span className="relative block h-10 w-px bg-[color:var(--ivory)]/25 overflow-hidden">
          <span className="absolute left-1/2 -translate-x-1/2 top-0 h-4 w-px bg-[color:var(--gold)] scroll-dot" />
        </span>
      </div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-button text-[10px] tracking-[0.5em] text-[color:var(--gold)]">{children}</p>
  );
}

function About() {
  return (
    <section id="about" className="relative py-28 md:py-40 px-6 md:px-10">
      <div className="mx-auto max-w-3xl text-center reveal">
        <SectionEyebrow>The House</SectionEyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] text-[color:var(--ink)]">
          About Anchhi
        </h2>
        <span className="mt-8 mx-auto block hairline w-24" />
      </div>

      <div className="mx-auto mt-16 max-w-2xl space-y-8 font-serif-elegant text-[color:var(--charcoal)] text-lg md:text-xl leading-[1.9]">
        {[
          "Anchhi was founded with a simple belief: exceptional fashion should feel personal, timeless, and unforgettable.",
          "Based in the heart of South Delhi, Anchhi is a luxury couture house dedicated to creating handcrafted fancy dresses, occasion wear, designer gowns, festive ensembles, and bespoke fashion pieces that celebrate individuality.",
          "Every silhouette is thoughtfully designed to combine contemporary elegance with traditional craftsmanship. From intricate embroidery and luxurious fabrics to precise tailoring and artistic detailing, every creation reflects countless hours of skilled workmanship.",
          "Rather than producing fashion for seasons, Anchhi creates pieces intended to be remembered. Every garment represents patience, precision, and an uncompromising commitment to quality.",
          "As we prepare for our official launch, our atelier continues refining collections that embody sophistication, confidence, and timeless beauty.",
        ].map((p, i) => (
          <p key={i} className="reveal">
            {p}
          </p>
        ))}

        <p className="reveal font-display italic text-2xl md:text-3xl text-center text-[color:var(--ink)] pt-6">
          Anchhi is not simply creating clothing. It is creating wearable art.
        </p>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section
      id="vision"
      className="relative bg-[color:var(--ink)] text-[color:var(--ivory)] overflow-hidden"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[60vh] lg:min-h-[80vh] overflow-hidden">
          <img
            src={visionImg}
            alt="Draped silk in the Anchhi atelier"
            loading="lazy"
            width={1400}
            height={1600}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/60" />
        </div>
        <div className="px-8 md:px-16 py-20 lg:py-32 flex flex-col justify-center reveal">
          <SectionEyebrow>Our Vision</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
            Beyond trends.<br />
            <span className="italic font-serif-elegant text-[color:var(--gold)]">Beyond seasons.</span>
          </h2>
          <span className="mt-8 hairline w-24" />
          <p className="mt-10 font-serif-elegant text-lg md:text-2xl leading-[1.8] text-[color:var(--ivory)]/85">
            “Our vision is to redefine modern Indian couture through exceptional craftsmanship,
            timeless silhouettes, and uncompromising attention to detail. We aspire to become one
            of India's most respected luxury fashion houses — where every creation carries elegance
            beyond trends.”
          </p>
          <p className="mt-10 font-button text-[10px] tracking-[0.5em] text-[color:var(--gold)]">
            — The House of Anchhi
          </p>
        </div>
      </div>
    </section>
  );
}

function PortraitFrame({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  // Mobile: use aspect ratio + object-contain to guarantee the entire portrait
  // is visible and never crops the face. Desktop: elegant cover framing.
  return (
    <div className="relative w-full">
      <div className="absolute -inset-3 md:-inset-5 border border-[color:var(--gold)]/40 pointer-events-none" />
      <div className="relative bg-[color:var(--ivory)] w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className="h-full w-full object-contain object-top md:object-cover md:object-[center_20%]"
        />
      </div>
    </div>
  );
}

function Founder() {
  return (
    <section id="founder" className="relative py-28 md:py-40 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="text-center reveal">
          <SectionEyebrow>Founders</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] text-[color:var(--ink)]">
            The Visionary
          </h2>
          <span className="mt-8 mx-auto block hairline w-24" />
        </div>

        <div className="mt-20 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 lg:gap-20 items-center">
          <div className="reveal">
            <PortraitFrame
              src={founderImg}
              alt="Naresh Kumar, Co-Founder of Anchhi"
              width={1200}
              height={1600}
            />
          </div>
          <div className="reveal">
            <p className="font-serif-elegant italic text-[color:var(--gold)] tracking-[0.28em] text-xs">
              Co-Founder
            </p>
            <h3 className="mt-4 font-display text-4xl md:text-5xl text-[color:var(--ink)]">
              Naresh Kumar
            </h3>
            <span className="mt-6 block hairline w-20" />
            <p className="mt-8 font-serif-elegant text-lg md:text-xl leading-[1.9] text-[color:var(--charcoal)]">
              Naresh Kumar envisioned Anchhi as more than a fashion label. With a deep appreciation
              for timeless craftsmanship and refined design, he founded the brand to celebrate
              individuality through luxury couture.
            </p>
            <p className="mt-6 font-serif-elegant text-lg md:text-xl leading-[1.9] text-[color:var(--charcoal)]">
              His vision focuses on creating garments that combine modern elegance with meticulous
              artistry, ensuring every collection reflects sophistication, confidence, and enduring
              style.
            </p>
            <p className="mt-10 font-display italic text-2xl text-[color:var(--ink)]">
              “A dress must never merely be worn — it must be remembered.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Artisan() {
  return (
    <section
      id="artisan"
      className="relative py-28 md:py-40 px-6 md:px-10 bg-[color:color-mix(in_oklab,var(--ivory)_60%,white)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center reveal">
          <SectionEyebrow>The Atelier</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] text-[color:var(--ink)]">
            Master 
          </h2>
          <span className="mt-8 mx-auto block hairline w-24" />
        </div>

        <div className="mt-20 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 lg:gap-20 items-center">
          <div className="reveal order-2 lg:order-1">
            <p className="font-serif-elegant italic text-[color:var(--gold)] tracking-[0.28em] text-xs">
              Master 
            </p>
            <h3 className="mt-4 font-display text-4xl md:text-5xl text-[color:var(--ink)]">
              Mir Irfan
            </h3>
            <span className="mt-6 block hairline w-20" />
            <p className="mt-8 font-serif-elegant text-lg md:text-xl leading-[1.9] text-[color:var(--charcoal)]">
              With years of experience mastering intricate embroidery, garment construction, and
              couture finishing techniques, Mir Irfan leads the craftsmanship behind Anchhi's
              creations.
            </p>
            <p className="mt-6 font-serif-elegant text-lg md:text-xl leading-[1.9] text-[color:var(--charcoal)]">
              His dedication to precision and attention to detail ensures every piece embodies the
              highest standards of luxury tailoring and excellence.
            </p>

            <dl className="mt-12 grid grid-cols-3 gap-6">
              {[
                ["25+", "Years of Craft"],
                ["400h", "Per Couture Piece"],
                ["1 of 1", "Every Garment"],
              ].map(([n, l]) => (
                <div key={l} className="text-center border-t border-[color:var(--border)] pt-4">
                  <dt className="font-display text-2xl md:text-3xl text-[color:var(--ink)]">{n}</dt>
                  <dd className="mt-2 font-button text-[9px] tracking-[0.28em] text-[color:var(--charcoal)]/70">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="reveal order-1 lg:order-2">
            <PortraitFrame
              src={artisanImg}
              alt="Mir Irfan, Master of Anchhi"
              width={1200}
              height={1600}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const COLLECTIONS = [
  { title: "Bridal Couture", tag: "Chapter I", img: colBridal },
  { title: "Evening Elegance", tag: "Chapter II", img: colEvening },
  { title: "Luxury Occasion Wear", tag: "Chapter III", img: colOccasion },
  { title: "Contemporary Ethnic", tag: "Chapter IV", img: colContemporary },
];

function Collections() {
  return (
    <section id="collections" className="relative py-28 md:py-40 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center reveal">
          <SectionEyebrow>The Collections</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] text-[color:var(--ink)]">
            Chapters of the House
          </h2>
          <span className="mt-8 mx-auto block hairline w-24" />
          <p className="mt-8 mx-auto max-w-xl font-serif-elegant text-lg text-[color:var(--charcoal)]/85">
            Four bodies of work — each a study in silhouette, texture, and the poise of
            handcrafted couture.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-14">
          {COLLECTIONS.map((c, i) => (
            <article
              key={c.title}
              className={`reveal group ${i % 2 === 1 ? "sm:mt-16" : ""}`}
            >
              <div className="relative overflow-hidden bg-[color:var(--ink)]">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="h-[520px] md:h-[640px] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="absolute top-6 left-6 font-button text-[10px] tracking-[0.4em] text-[color:var(--gold)]">
                  {c.tag}
                </span>
              </div>
              <div className="mt-6 flex items-end justify-between gap-6">
                <h3 className="font-display text-2xl md:text-3xl text-[color:var(--ink)]">
                  {c.title}
                </h3>
                <span className="font-button text-[10px] tracking-[0.32em] text-[color:var(--charcoal)]/70 pb-1 border-b border-[color:var(--gold)]/50">
                  Coming Soon
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- craftsmanship ---- */

const CRAFT_PILLARS = [
  { t: "Hand Embroidery", d: "Zardozi, aari and thread work — worked over hundreds of hours by a single hand." },
  { t: "Premium Fabrics", d: "Silks, organzas and hand-woven cloths sourced from India's most careful mills." },
  { t: "Tailored Construction", d: "Bespoke pattern-making and hand-finishing built for the body it is made for." },
  { t: "Luxury Finishing", d: "Hand-rolled hems, invisible seams, and considered inner linings." },
  { t: "Attention to Detail", d: "Buttons, closures and beadwork placed by hand, considered by name." },
  { t: "Quality Inspection", d: "Every garment undergoes extensive inspection before it reaches the client." },
];

function Craftsmanship() {
  return (
    <section
      id="craftsmanship"
      className="relative py-28 md:py-40 bg-[color:var(--ink)] text-[color:var(--ivory)] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-16 items-start">
          <div className="reveal">
            <SectionEyebrow>Craftsmanship</SectionEyebrow>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[1] text-[color:var(--ivory)]">
              Made by hand.<br />
              <span className="italic font-serif-elegant text-[color:var(--gold)]">Made to last.</span>
            </h2>
            <span className="mt-8 hairline w-24 block" />
            <p className="mt-8 font-serif-elegant text-lg md:text-xl leading-[1.85] text-[color:var(--ivory)]/80 max-w-lg">
              Every Anchhi creation begins as a conversation between designer, artisan and cloth —
              and ends with a garment that carries its story quietly. Every piece is inspected in
              full before it ever leaves the atelier.
            </p>

            <div className="mt-10 relative overflow-hidden">
              <img
                src={craftImg}
                alt="Gold zardozi hand embroidery"
                loading="lazy"
                width={1400}
                height={1000}
                className="w-full h-72 md:h-96 object-cover"
              />
              <div className="absolute inset-0 border border-[color:var(--gold)]/40" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
            {CRAFT_PILLARS.map((p, i) => (
              <div key={p.t} className="reveal">
                <span className="font-display text-[color:var(--gold)] text-lg">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl text-[color:var(--ivory)]">{p.t}</h3>
                <span className="mt-4 block hairline w-10" />
                <p className="mt-4 font-serif-elegant text-base leading-[1.8] text-[color:var(--ivory)]/75">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const WHYS = [
  ["Handcrafted Excellence", "No shortcuts. No machines where a hand will do."],
  ["Premium Fabrics", "Sourced from the finest weavers across India."],
  ["South Delhi Atelier", "A private studio, made for personal fittings."],
  ["Bespoke Experience", "Each client is met — and dressed — by name."],
  ["Timeless Design", "Silhouettes made to outlast the season they were born in."],
  ["Attention to Detail", "Everything you can see. And everything you cannot."],
];

function WhyAnchhi() {
  return (
    <section className="relative py-28 md:py-40 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="text-center reveal">
          <SectionEyebrow>Why Anchhi</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] text-[color:var(--ink)]">
            A quiet promise.
          </h2>
          <span className="mt-8 mx-auto block hairline w-24" />
        </div>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--border)]">
          {WHYS.map(([t, d]) => (
            <div
              key={t}
              className="reveal bg-[color:var(--ivory)] p-10 md:p-12 group transition-colors duration-500 hover:bg-white"
            >
              <span className="hairline w-8 block group-hover:w-16 transition-all duration-700" />
              <h3 className="mt-6 font-display text-2xl md:text-3xl text-[color:var(--ink)]">
                {t}
              </h3>
              <p className="mt-5 font-serif-elegant text-base md:text-lg leading-[1.8] text-[color:var(--charcoal)]/85">
                {d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Launch() {
  const target = useMemo(() => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(d.getHours() + 20);
  return d;
}, []);
  const { d, h, m, s } = useCountdown(target);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section
      id="launch"
      className="relative py-28 md:py-44 px-6 md:px-10 bg-[color:var(--ink)] text-[color:var(--ivory)] overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/60 to-transparent" />
      <div className="mx-auto max-w-3xl text-center">
        <div className="reveal">
          <SectionEyebrow>Pre-Launch</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
            Our first collection<br />
            <span className="italic font-serif-elegant text-[color:var(--gold)]">arrives soon.</span>
          </h2>
          <span className="mt-8 mx-auto block hairline w-24" />
          <p className="mt-10 font-serif-elegant text-lg md:text-xl leading-[1.9] text-[color:var(--ivory)]/85">
            Join our exclusive launch list to receive early access, previews, and special
            announcements before the official unveiling.
          </p>
        </div>

        <div className="reveal mt-14 grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
          {[
            [d, "Days"],
            [h, "Hours"],
            [m, "Minutes"],
            [s, "Seconds"],
          ].map(([n, l]) => (
            <div key={l as string} className="text-center">
              <div className="font-display text-4xl md:text-6xl text-[color:var(--gold)] tabular-nums shimmer">
                {String(n).padStart(2, "0")}
              </div>
              <div className="mt-3 font-button text-[9px] md:text-[10px] tracking-[0.4em] text-[color:var(--ivory)]/60">
                {l as string}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setDone(true);
          }}
          className="reveal mt-16 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
        >
          <input
            type="email"
            required
            aria-label="Email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent border-b border-[color:var(--ivory)]/40 focus:border-[color:var(--gold)] outline-none px-1 py-4 font-serif-elegant text-lg placeholder:text-[color:var(--ivory)]/40 transition-colors"
          />
          <button type="submit" className="btn-luxury !bg-[color:var(--gold)] !text-[color:var(--ink)] !border-[color:var(--gold)] hover:!bg-[color:var(--ivory)]">
            {done ? "Thank You" : "Notify Me"}
          </button>
        </form>
        <p className="reveal mt-6 font-serif-elegant italic text-sm text-[color:var(--ivory)]/50">
          By subscribing, you become part of the private circle of Anchhi.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="text-center reveal">
          <SectionEyebrow>Contact</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] text-[color:var(--ink)]">
            Visit the House.
          </h2>
          <span className="mt-8 mx-auto block hairline w-24" />
        </div>

        <div className="mt-20 grid md:grid-cols-4 gap-10 md:gap-12">
          {[
            { l: "Atelier", v: "South Delhi\nNew Delhi, India" },
            { l: "Email", v: "Soon" },
            { l: "Instagram", v: "Soon" },
            { l: "Telephone", v: "+Soon" },
          ].map((c) => (
            <div key={c.l} className="reveal text-center md:text-left">
              <p className="font-button text-[10px] tracking-[0.4em] text-[color:var(--gold)]">
                {c.l}
              </p>
              <p className="mt-4 font-serif-elegant text-xl md:text-2xl text-[color:var(--ink)] whitespace-pre-line leading-[1.6]">
                {c.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-[color:var(--ink)] text-[color:var(--ivory)] px-6 md:px-10 pt-20 pb-10">
      <div className="mx-auto max-w-6xl text-center">
        <div className="reveal">
          <p className="font-display text-4xl md:text-6xl tracking-[0.1em]">ANCHHI</p>
          <p className="mt-6 font-serif-elegant italic text-lg md:text-xl text-[color:var(--gold)]">
            Timeless Elegance. Crafted Before Its Time.
          </p>
          <span className="mt-10 mx-auto block hairline w-32" />
          <div className="mt-10 flex justify-center gap-8 font-button text-[10px] tracking-[0.4em] text-[color:var(--ivory)]/70">
            <a href="#" className="hover:text-[color:var(--gold)] transition">Instagram</a>
            <a href="mailto:hello@anchhi.com" className="hover:text-[color:var(--gold)] transition">Email</a>
            <a href="#" className="hover:text-[color:var(--gold)] transition">Pinterest</a>
          </div>
          <p className="mt-16 font-button text-[10px] tracking-[0.4em] text-[color:var(--ivory)]/40">
            © {new Date().getFullYear()} Anchhi Couture · South Delhi · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- page --------------------------------- */

function Index() {
  useReveal();
  return (
    <main className="bg-[color:var(--ivory)] text-[color:var(--charcoal)] antialiased">
      <Nav />
      <Hero />
      <About />
      <Vision />
      <Founder />
      <Artisan />
      <Collections />
      <Craftsmanship />
      <WhyAnchhi />
      <Launch />
      <Contact />
      <Footer />
    </main>
  );
}
