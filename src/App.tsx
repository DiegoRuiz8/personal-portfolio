import homeImg from "./assets/home.png";
import activeWorkoutImg from "./assets/active-workout.png";
import historyImg from "./assets/history.png";
import trafficDashboardImg from "./assets/traffic-dashboard.png";
import trafficStatsImg from "./assets/traffic-stats.png";
import trafficCamerasImg from "./assets/traffic-cameras.png";
import wcn1 from "./assets/wcn1.png";
import wcn2 from "./assets/wcn2.png";
import wcn3 from "./assets/wcn3.png";
import { useState, useEffect, useRef, useCallback } from "react";

const projects = [
  {
    title: "Lift Log",
    description:
      "Mobile-first workout tracker built with React, TypeScript, Zustand, and Vite. Includes active workout flow, session history, exercise variants, JSON import/export, and PWA support.",
    stack: [
      "React",
      "TypeScript",
      "Zustand",
      "Vite",
      "React Router",
      "CSS",
      "PWA",
      "Vercel",
    ],
    demo: "https://gym-tracker-v1.vercel.app/",
    repo: "https://github.com/DiegoRuiz8/gym-tracker-v1.git",
    highlights: [
      "Designed for a mobile-first experience",
      "Session-based workout logging and history",
      "Exercise variants and active workout swapping",
      "Local persistence and JSON backup flow",
    ],
    screenshots: [homeImg, activeWorkoutImg, historyImg],
  },
  {
    title: "Traffic Monitoring Dashboard",
    description:
      "Frontend dashboard for monitoring traffic flow at an urban intersection, including traffic volume analysis, vehicle distribution, camera monitoring, and map-based views.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "React Router",
      "CSS",
      "Charts",
      "Google Maps",
      "Vercel",
    ],
    demo: "https://traffic-monitoring-dashboard-omega.vercel.app/",
    repo: "https://github.com/DiegoRuiz8/traffic-monitoring-dashboard.git",
    highlights: [
      "Built the frontend dashboard UI for a collaborative traffic analysis project",
      "Designed metric cards, charts, and data views for traffic monitoring",
      "Used seeded/mock data to present expected traffic analysis flows",
      "Focused on usability, layout clarity, and dashboard-style information hierarchy",
    ],
    screenshots: [trafficDashboardImg, trafficStatsImg, trafficCamerasImg],
  },

  {
    title: "World Cup Nights",
    description:
      "Full-stack event booking platform for a double-decker party bus experience during FIFA World Cup 2026 in Guadalajara. Includes real-time ticket selection, multi-ticket checkout, and automated email confirmation.",
    stack: [
      "Next.js",
      "TypeScript",
      "MercadoPago",
      "Resend",
      "Google Sheets API",
      "Vercel",
    ],
    demo: "https://www.worldcupnights.lat/",
    repo: "https://github.com/DiegoRuiz8/worldcupnights",
    highlights: [
      "Integrated MercadoPago Checkout Pro with multi-ticket and mixed-tier ordering",
      "Webhook-driven confirmation flow: payment → Google Sheets log → email receipt",
      "Bilingual (EN/ES) landing page with date selector, upsell modal, and sticky booking bar",
      "Deployed on Vercel with custom domain and automated CI/CD via GitHub",
    ],
    screenshots: [wcn1, wcn2, wcn3],
  },
];

const links = {
  github: "https://github.com/DiegoRuiz8",
  linkedin: "https://www.linkedin.com/in/d-ruizm/",
  email: "mailto:diegoruiz55@hotmail.com",
  resume: "/CV_DiegoRuiz.pdf",
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const heroAsideRef = useRef<HTMLElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const selectedImages =
    selectedProject !== null ? projects[selectedProject].screenshots : [];

  const openLightbox = (projectIndex: number, imageIndex: number) => {
    setSelectedProject(projectIndex);
    setSelectedImageIndex(imageIndex);
  };

  const closeLightbox = useCallback(() => {
    setSelectedProject(null);
    setSelectedImageIndex(0);
  }, []);

  const goToPrev = useCallback(() => {
    if (selectedProject === null) return;
    const total = projects[selectedProject].screenshots.length;
    setSelectedImageIndex((prev) => (prev - 1 + total) % total);
  }, [selectedProject]);

  const goToNext = useCallback(() => {
    if (selectedProject === null) return;
    const total = projects[selectedProject].screenshots.length;
    setSelectedImageIndex((prev) => (prev + 1) % total);
  }, [selectedProject]);

  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "instant" : "smooth" });
  };

  // Lightbox: keyboard navigation + focus trap
  useEffect(() => {
    if (selectedProject === null) return;

    // Move focus inside lightbox when it opens
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
        return;
      }
      if (e.key === "ArrowLeft") {
        goToPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        goToNext();
        return;
      }

      // Focus trap for Tab / Shift+Tab
      if (e.key === "Tab" && lightboxRef.current) {
        const focusable = Array.from(
          lightboxRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, closeLightbox, goToPrev, goToNext]);

  // Reveal, active-section tracking, scroll effects
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Reveal elements as they enter the viewport; unobserve after triggering once
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 80px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    // Active section indicator via IntersectionObserver
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );
    ["projects", "about", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Functional state — always update regardless of reduced motion
      setScrolled(scrollY > 50);
      setShowBackToTop(scrollY > 400);

      if (prefersReducedMotion) return;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Reading progress bar
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${(scrollY / docHeight) * 100}%`;
      }

      // Gentle parallax on hero aside
      if (heroAsideRef.current) {
        const offset = Math.min(scrollY * 0.06, 30);
        heroAsideRef.current.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-neutral-950 text-neutral-100">
      <div ref={progressBarRef} className="progress-bar" aria-hidden="true" />

      {/* ── Sticky header ─────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-neutral-950/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
          <div>
            <p className="section-label text-sm uppercase tracking-[0.2em] text-cyan-400">
              Frontend Developer
            </p>
            <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
              Diego Ruiz
            </h1>
          </div>
          <nav className="hidden gap-6 text-sm text-neutral-300 sm:flex">
            {(["projects", "about", "contact"] as const).map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`nav-link transition hover:text-white ${
                  activeSection === section ? "nav-active" : ""
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Hero section ──────────────────────────────────────── */}
      <section
  className="mx-auto flex w-full max-w-6xl flex-col justify-center px-6 sm:px-10 lg:px-12"
>
  <div className="grid items-center gap-12 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-16">
          <section className="relative">
            <div className="hero-glow-orb" aria-hidden="true" />

            <div className="relative z-10">
              <p className="hero-enter hero-enter-1 badge-pulse mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                Junior React / Frontend
              </p>
              <h2
                className="hero-enter hero-enter-2 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl"
                style={{ letterSpacing: "-0.02em" }}
              >
                I build clean, practical user interfaces with{" "}
                <span className="hero-gradient-text">
                  React and TypeScript.
                </span>
              </h2>
              <p className="hero-enter hero-enter-3 mt-6 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
                I'm a junior frontend developer focused on building responsive,
                user-friendly interfaces. Right now, I'm looking for a frontend
                role where I can keep improving by shipping real products and
                solving real UI problems.
              </p>

              <div className="hero-enter hero-enter-4 mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-medium text-neutral-950 transition hover:scale-[1.02]"
                >
                  View Projects
                </a>
                <a
                  href={links.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Resume
                </a>
                <a
                  href={links.github}
                  className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  GitHub
                </a>
              </div>
            </div>
          </section>

          {/* Hero aside — right column */}
          <aside
            ref={heroAsideRef}
            className="hero-enter hero-enter-5 hero-parallax hero-aside-glow rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
              Core Focus
            </p>
            <div className="mt-6 space-y-4 text-sm text-neutral-300">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="font-medium text-white">Frontend Stack</p>
                <p className="mt-2">
                  React, TypeScript, Vite, Zustand, React Router, CSS
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="font-medium text-white">What I care about</p>
                <p className="mt-2">
                  Clean UI, responsive UX, readable code, and shipping polished
                  MVPs quickly.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="font-medium text-white">Current Goal</p>
                <p className="mt-2">
                  Land a frontend / React role and keep building stronger
                  real-world projects.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Projects section ──────────────────────────────────── */}
      <section
        id="projects"
        className="mx-auto w-full max-w-6xl px-6 pb-20 sm:px-10 lg:px-12"
      >
        <div className="reveal mb-8">
          <p className="section-label text-sm uppercase tracking-[0.2em] text-cyan-400">
            Projects
          </p>
          <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Selected Work
          </h3>
          <p className="mt-3 max-w-2xl text-neutral-300">
            I'm prioritizing solid, practical projects over filler. These are
            the portfolio pieces that best represent my frontend work.
          </p>
        </div>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className={`card-hover reveal reveal-delay-${i + 1} rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-black/20`}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <h4 className="text-xl font-semibold text-white sm:text-2xl">
                    {project.title}
                  </h4>
                  <p className="mt-3 leading-7 text-neutral-300">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item, badgeIdx) => (
                      <span
                        key={item}
                        className="badge-stagger cursor-default rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                        style={
                          { "--badge-i": badgeIdx } as React.CSSProperties
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {project.screenshots?.map((image, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => openLightbox(i, index)}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition hover:scale-[1.01] hover:border-white/20"
                      >
                        <img
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="h-full max-h-72 w-full rounded-2xl border border-white/10 bg-black/20 object-contain"
                        />
                      </button>
                    ))}
                  </div>

                  <ul className="mt-6 space-y-2 text-sm text-neutral-300">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-baseline gap-2">
                        <span className="leading-none text-cyan-400">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project links panel */}
                <div className="min-w-[220px] rounded-2xl border border-white/10 bg-gradient-to-b from-cyan-400/5 to-black/20 p-4">
                  <p className="text-sm font-medium text-white">
                    Project Links
                  </p>
                  <div className="mt-4 flex flex-col gap-3 text-sm">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-cyan-400 px-4 py-2 text-center font-medium text-neutral-950 transition hover:scale-[1.02]"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-white/15 px-4 py-2 text-center text-white transition hover:border-white/30 hover:bg-white/5"
                    >
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── About section ─────────────────────────────────────── */}
      <section
        id="about"
        className="mx-auto w-full max-w-6xl px-6 pb-20 sm:px-10 lg:px-12"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="reveal rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="section-label text-sm uppercase tracking-[0.2em] text-cyan-400">
              About
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              A practical builder, not a portfolio maximalist.
            </h3>
            <p className="mt-4 leading-7 text-neutral-300">
              I'm a junior frontend developer focused on React. I like building
              products that are clean, responsive, and easy to use. I care about
              shipping, iterating, and improving through real project work
              instead of getting stuck polishing forever.
            </p>
          </div>

          <div className="reveal reveal-delay-1 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="section-label text-sm uppercase tracking-[0.2em] text-cyan-400">
              What I'm looking for
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              Frontend opportunities where I can contribute early.
            </h3>
            <p className="mt-4 leading-7 text-neutral-300">
              I'm especially interested in junior frontend or React roles where
              I can work on real features, strengthen my UI fundamentals, and
              keep growing as an engineer.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact section ───────────────────────────────────── */}
      <section
        id="contact"
        className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10 lg:px-12"
      >
        <div className="reveal contact-shimmer rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-transparent p-8">
          <p className="section-label text-sm uppercase tracking-[0.2em] text-cyan-400">
            Contact
          </p>
          <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Let's talk.
          </h3>
          <p className="mt-4 max-w-2xl leading-7 text-neutral-300">
            If you're hiring for a frontend role or want to connect, feel free
            to reach out.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={links.email}
              className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-cyan-300"
            >
              Email
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
            >
              LinkedIn
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      {selectedProject !== null && (
        <div
          ref={lightboxRef}
          className="lightbox-enter fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Project screenshot lightbox"
        >
          <div className="lightbox-content-enter relative flex items-center gap-4">
            {/* Previous image button */}
            {selectedImages.length > 1 && (
              <button
                type="button"
                onClick={goToPrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-sm transition hover:border-cyan-400/40 hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {/* Image container */}
            <div className="relative max-h-[90vh] max-w-4xl">
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeLightbox}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                aria-label="Close lightbox"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <img
                src={selectedImages[selectedImageIndex]}
                alt={`Project screenshot ${selectedImageIndex + 1} of ${selectedImages.length}`}
                className="max-h-[90vh] w-auto rounded-2xl border border-white/10 bg-black"
              />

              {selectedImages.length > 1 && (
                <p className="mt-2 text-center text-sm text-neutral-400">
                  {selectedImageIndex + 1} / {selectedImages.length}
                </p>
              )}
            </div>

            {/* Next image button */}
            {selectedImages.length > 1 && (
              <button
                type="button"
                onClick={goToNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-sm transition hover:border-cyan-400/40 hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Back to top ───────────────────────────────────────── */}
      <button
        type="button"
        onClick={handleBackToTop}
        className={`back-to-top ${showBackToTop ? "is-visible" : ""}`}
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </main>
  );
}
