import homeImg from "./assets/home.png";
import activeWorkoutImg from "./assets/active-workout.png";
import historyImg from "./assets/history.png";
import { useState } from "react";

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
  ];

  const links = {
    github: "https://github.com/DiegoRuiz8",
    linkedin: "https://www.linkedin.com/in/d-ruizm/",
    email: "mailto:diegoruiz55@hotmail.com",
    resume: "/CVRuizDiego_portfolio.pdf",
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
              Frontend Developer
            </p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Diego Ruiz
            </h1>
          </div>
          <nav className="hidden gap-6 text-sm text-neutral-300 sm:flex">
            <a href="#projects" className="transition hover:text-white">
              Projects
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <section>
            <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
              Junior React / Frontend
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
             I build clean, practical user interfaces with React and TypeScript.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
              I’m a junior frontend developer focused on building responsive,
              user-friendly interfaces. Right now, I’m looking for a frontend
              role where I can keep improving by shipping real products and
              solving real UI problems.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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
          </section>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
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

      <section
        id="projects"
        className="mx-auto w-full max-w-6xl px-6 pb-20 sm:px-10 lg:px-12"
      >
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
            Projects
          </p>
          <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Selected Work
          </h3>
          <p className="mt-3 max-w-2xl text-neutral-300">
            I’m prioritizing solid, finished projects over filler. Right now,
            Lift Log is my strongest portfolio piece.
          </p>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-black/20"
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
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-300"
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
                        onClick={() => setSelectedImage(image)}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition hover:border-white/20 hover:scale-[1.01]"
                      >
                        <img
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="h-full max-h-72 w-full rounded-2xl border border-white/10 object-contain bg-black/20"
                        />
                      </button>
                    ))}
                  </div>

                  <ul className="mt-6 space-y-2 text-sm text-neutral-300">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-baseline gap-2">
                        <span className="text-cyan-400 leading-none">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="min-w-[220px] rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-medium text-white">
                    Project Links
                  </p>
                  <div className="mt-4 flex flex-col gap-3 text-sm">
                    <a
                      href={project.demo}
                      className="rounded-xl bg-cyan-400 px-4 py-2 text-center font-medium text-neutral-950 transition hover:scale-[1.02]"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.repo}
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

      <section
        id="about"
        className="mx-auto w-full max-w-6xl px-6 pb-20 sm:px-10 lg:px-12"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
              About
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              A practical builder, not a portfolio maximalist.
            </h3>
            <p className="mt-4 leading-7 text-neutral-300">
              I’m a junior frontend developer focused on React. I like building
              products that are clean, responsive, and easy to use. I care about
              shipping, iterating, and improving through real project work
              instead of getting stuck polishing forever.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
              What I’m looking for
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              Frontend opportunities where I can contribute early.
            </h3>
            <p className="mt-4 leading-7 text-neutral-300">
              I’m especially interested in junior frontend or React roles where
              I can work on real features, strengthen my UI fundamentals, and
              keep growing as an engineer.
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10 lg:px-12"
      >
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-transparent p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
            Contact
          </p>
          <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Let’s talk.
          </h3>
          <p className="mt-4 max-w-2xl leading-7 text-neutral-300">
            If you’re hiring for a frontend role or want to connect, feel free
            to reach out.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={links.email}
              className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-medium text-neutral-950"
            >
              Email
            </a>
            <a
              href={links.linkedin}
              className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white"
            >
              LinkedIn
            </a>
            <a
              href={links.github}
              className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-5xl">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-sm text-white"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Expanded project screenshot"
              className="max-h-[90vh] w-auto rounded-2xl border border-white/10 bg-black"
            />
          </div>
        </div>
      )}
    </main>
  );
}
