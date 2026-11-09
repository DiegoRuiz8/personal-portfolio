import { lazy, Suspense, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import type { HeroState } from "./PhoneScene";
import luisFelipeSiteImg from "./assets/luisfelipe-site.jpg";
import espaxioSiteImg from "./assets/espaxio-site.jpg";
import liftLogHomeImg from "./assets/liftlog-home.png";
import liftLogWorkoutImg from "./assets/liftlog-workout.png";
import liftLogHistoryImg from "./assets/liftlog-history.png";
import trafficDashboardImg from "./assets/traffic-dashboard.png";
import trafficStatsImg from "./assets/traffic-stats.png";
import trafficCamerasImg from "./assets/traffic-cameras.png";
import wcn1 from "./assets/wcn1.png";
import wcn2 from "./assets/wcn2.png";
import wcn3 from "./assets/wcn3.png";

type Project = {
  title: string;
  description: string;
  stack: string[];
  demo: string;
  repo?: string;
  highlights: string[];
  screenshots: string[];
  placement: "left" | "right" | "wide";
  kind: "phone" | "site";
};

type Language = "en" | "es";
type ProjectMedia = Pick<Project, "stack" | "demo" | "repo" | "screenshots" | "placement" | "kind">;
type ProjectCopy = Pick<Project, "title" | "description" | "highlights">;

const PHONE_SCREENS = [liftLogHomeImg, liftLogWorkoutImg, liftLogHistoryImg];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smoothstep = (edge0: number, edge1: number, n: number) => {
  const t = clamp01((n - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

const PhoneScene = lazy(() => import("./PhoneScene"));

const heroState: HeroState = { rot: -25, progress: 0, opacity: [1, 0, 0] };
const heroListeners = new Set<() => void>();
const subscribeHero = (listener: () => void) => {
  heroListeners.add(listener);
  return () => {
    heroListeners.delete(listener);
  };
};

const phoneFallback = (
  <div className="phone-fallback">
    <img src={PHONE_SCREENS[0]} alt="" decoding="async" />
  </div>
);

const applyHeroProgress = (hero: HTMLElement, p: number, cover: number) => {
  const swapA = smoothstep(0.3, 0.36, p);
  const swapB = smoothstep(0.63, 0.69, p);
  heroState.rot = -25 + 385 * p;
  heroState.progress = p;
  heroState.opacity = [1 - swapA, swapA - swapB, swapB];
  hero.style.setProperty("--p", p.toFixed(4));
  hero.style.setProperty("--c", cover.toFixed(4));
  heroListeners.forEach((listener) => listener());
};

function SplitHeading({ id, className, text }: { id: string; className: string; text: string }) {
  return (
    <h2 id={id} className={`${className} reveal-split`} aria-label={text}>
      {text.split(/\s+/).map((word, i) => (
        <span key={`${word}-${i}`} className="word" aria-hidden="true">
          <span className="word-in" style={{ transitionDelay: `${i * 70}ms` }}>{word}</span>
        </span>
      ))}
    </h2>
  );
}

const projectMedia: ProjectMedia[] = [
  {
    stack: ["React", "TypeScript", "Zustand", "PWA", "Vite"],
    demo: "https://gym-tracker-v1.vercel.app/",
    repo: "https://github.com/DiegoRuiz8/gym-tracker-v1.git",
    screenshots: PHONE_SCREENS,
    placement: "left",
    kind: "phone",
  },
  {
    stack: ["Next.js", "TypeScript", "MercadoPago", "Resend"],
    demo: "https://www.worldcupnights.lat/",
    repo: "https://github.com/DiegoRuiz8/worldcupnights",
    screenshots: [wcn1, wcn2, wcn3],
    placement: "right",
    kind: "site",
  },
  {
    stack: ["React", "TypeScript", "Google Maps", "Charts", "Vite"],
    demo: "https://traffic-monitoring-dashboard-omega.vercel.app/",
    repo: "https://github.com/DiegoRuiz8/traffic-monitoring-dashboard.git",
    screenshots: [trafficDashboardImg, trafficStatsImg, trafficCamerasImg],
    placement: "wide",
    kind: "site",
  },
  {
    stack: ["Next.js", "Editorial design", "Content hub"],
    demo: "https://www.luisfelipeiv.com/",
    screenshots: [luisFelipeSiteImg],
    placement: "right",
    kind: "site",
  },
  {
    stack: ["Next.js", "Property catalog", "Responsive design"],
    demo: "https://www.espaxioinmobiliaria.com/es",
    screenshots: [espaxioSiteImg],
    placement: "left",
    kind: "site",
  },
];

const projectOrder = [0, 3, 2, 4, 1];

const projectCopy: Record<Language, ProjectCopy[]> = {
  en: [
    {
      title: "Lift Log",
      description: "A complete gym tracking app built for planning workouts, tracking progress, and reviewing past sessions.",
      highlights: ["Start and manage active workouts", "Keep routines and review session history", "Install it like an app and keep data on your device"],
    },
    {
      title: "World Cup Nights",
      description: "A bilingual ticket booking website for a World Cup 2026 party bus experience in Guadalajara.",
      highlights: ["Ticket selection and checkout", "Payment confirmation emails", "Simple date selection and booking flow"],
    },
    {
      title: "Traffic Monitoring Dashboard",
      description: "A dashboard that makes traffic data easier to understand with charts, maps, and camera views.",
      highlights: ["Clear traffic metrics and charts", "Map and camera views in one place", "Realistic data to show expected flows"],
    },
    {
      title: "Luis Felipe IV",
      description: "A storytelling website for a music creator, bringing together an archive, playlists, community stories, and direct contact.",
      highlights: ["Editorial experience with a distinct visual identity", "Music archive and curated playlists", "Community story and song-dedication flow"],
    },
    {
      title: "EspaXio Inmobiliaria",
      description: "A real estate website that connects property discovery, credit guidance, services, and direct contact in one clear journey.",
      highlights: ["Property catalog for CDMX and Estado de México", "Services for sales, rentals, and condo administration", "Credit tools and direct WhatsApp contact"],
    },
  ],
  es: [
    {
      title: "Lift Log",
      description: "Una aplicación completa para planear entrenamientos, registrar progreso y revisar sesiones anteriores.",
      highlights: ["Inicia y administra entrenamientos activos", "Guarda rutinas y revisa el historial de sesiones", "Instálala como una app y conserva tus datos en tu dispositivo"],
    },
    {
      title: "World Cup Nights",
      description: "Un sitio bilingüe para reservar boletos de una experiencia en party bus durante el Mundial 2026 en Guadalajara.",
      highlights: ["Selección de boletos y pago", "Correos de confirmación de pago", "Selección de fecha y flujo de reserva simple"],
    },
    {
      title: "Dashboard de monitoreo de tráfico",
      description: "Un dashboard que facilita entender datos de tráfico con gráficas, mapas y vistas de cámaras.",
      highlights: ["Métricas y gráficas claras", "Mapa y cámaras en un solo lugar", "Datos realistas para mostrar flujos esperados"],
    },
    {
      title: "Luis Felipe IV",
      description: "Un sitio de storytelling para un creador musical que une archivo, playlists, historias de la comunidad y contacto directo.",
      highlights: ["Experiencia editorial con identidad visual propia", "Archivo musical y playlists curadas", "Flujo para compartir historias y dedicar canciones"],
    },
    {
      title: "EspaXio Inmobiliaria",
      description: "Un sitio inmobiliario que une búsqueda de propiedades, asesoría de crédito, servicios y contacto directo en un solo recorrido claro.",
      highlights: ["Catálogo de propiedades en CDMX y Estado de México", "Servicios de venta, renta y administración de condominios", "Herramientas de crédito y contacto directo por WhatsApp"],
    },
  ],
};

const content: Record<Language, {
  skip: string;
  navWork: string;
  navAbout: string;
  navExperience: string;
  navContact: string;
  contact: string;
  sentence: string;
  workTitle: string;
  workRemark: string;
  liveSite: string;
  source: string;
  openPreview: (title: string) => string;
  aboutTitle: string;
  aboutCopy: string[];
  capabilityLabels: readonly string[];
  capabilityCopy: readonly string[];
  experienceTitle: string;
  experience: readonly { period: string; title: string; description: string }[];
  contactTitle: string;
  contactCopy: string;
  email: string;
  footer: string;
  backToTop: string;
  closePreview: string;
  previousImage: string;
  nextImage: string;
}> = {
  en: {
    skip: "Skip to selected work",
    navWork: "Work",
    navAbout: "About",
    navExperience: "Experience",
    navContact: "Contact",
    contact: "Contact",
    sentence: "Fullstack developer, frontend focused.",
    workTitle: "Work",
    workRemark: "Different problems.\nOne developer.",
    liveSite: "Live site",
    source: "Source",
    openPreview: (title) => `Open ${title} preview`,
    aboutTitle: "About",
    aboutCopy: [
      "I build web products that are useful and easy to use. My focus is on the frontend — turning ideas into clean, responsive experiences — with enough backend knowledge to connect a complete feature from start to finish.",
      "Currently working as a fullstack developer at Sensify, building our dashboard to monitor every machine in real time, and co-founding Krea Studio where I build and launch custom sites.",
    ],
    capabilityLabels: ["Frontend", "Backend", "Tools"],
    capabilityCopy: [
      "React, TypeScript, responsive design, and reusable components.",
      "Python, Odoo, APIs, databases, and connecting services together.",
      "Git, Vercel, deployment, and the everyday tools needed to ship a project.",
    ],
    experienceTitle: "Experience",
    experience: [
      {
        period: "2026 — Present",
        title: "Fullstack Developer · Sensify",
        description: "Building Sensify's dashboard to visualize every machine in real time.",
      },
      {
        period: "2026 — Present",
        title: "Co-founder & Developer · Krea Studio",
        description: "Building and launching custom React and Next.js websites from start to finish.",
      },
    ],
    contactTitle: "Interested in\nworking together?",
    contactCopy: "I'm currently looking for a frontend or fullstack role where I can keep building useful products and growing as a developer.",
    email: "Email me",
    footer: "Built with intent.",
    backToTop: "Back to top",
    closePreview: "Close preview",
    previousImage: "Previous image",
    nextImage: "Next image",
  },
  es: {
    skip: "Ir a proyectos seleccionados",
    navWork: "Proyectos",
    navAbout: "Sobre mí",
    navExperience: "Experiencia",
    navContact: "Contacto",
    contact: "Contacto",
    sentence: "Desarrollador fullstack, enfoque en frontend.",
    workTitle: "Proyectos",
    workRemark: "Problemas distintos.\nUn desarrollador.",
    liveSite: "Ver sitio",
    source: "Código",
    openPreview: (title) => `Abrir vista previa de ${title}`,
    aboutTitle: "Sobre mí",
    aboutCopy: [
      "Creo productos web que son útiles y fáciles de usar. Me enfoco en el frontend — convirtiendo ideas en experiencias claras y responsivas — con el conocimiento de backend necesario para conectar una funcionalidad completa de inicio a fin.",
      "Actualmente trabajo como desarrollador fullstack en Sensify, donde construyo nuestro dashboard para monitorear todas las máquinas en tiempo real, y cofundo Krea Studio donde construyo y lanzo sitios personalizados.",
    ],
    capabilityLabels: ["Frontend", "Backend", "Herramientas"],
    capabilityCopy: [
      "React, TypeScript, diseño responsivo y componentes reutilizables.",
      "Python, Odoo, APIs, bases de datos y conexión de servicios.",
      "Git, Vercel, despliegues y herramientas diarias para lanzar un proyecto.",
    ],
    experienceTitle: "Experiencia",
    experience: [
      {
        period: "2026 — Actualidad",
        title: "Desarrollador Fullstack · Sensify",
        description: "Construyo el dashboard de Sensify para visualizar todas las máquinas en tiempo real.",
      },
      {
        period: "2026 — Actualidad",
        title: "Cofundador y desarrollador · Krea Studio",
        description: "Creo y lanzo sitios personalizados en React y Next.js de principio a fin.",
      },
    ],
    contactTitle: "¿Te interesa\ntrabajar juntos?",
    contactCopy: "Actualmente busco un rol frontend o fullstack donde pueda seguir creando productos útiles y creciendo como desarrollador.",
    email: "Escríbeme",
    footer: "Hecho con intención.",
    backToTop: "Volver arriba",
    closePreview: "Cerrar vista previa",
    previousImage: "Imagen anterior",
    nextImage: "Siguiente imagen",
  },
};

const links = {
  github: "https://github.com/DiegoRuiz8",
  linkedin: "https://www.linkedin.com/in/d-ruizm/",
  email: "mailto:diegoruiz55@hotmail.com",
  resume: "/Diego_Ruiz_CV.pdf",
};

const navigationIds = ["work", "about", "experience", "contact"] as const;

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  let saved: string | null = null;
  try { saved = window.localStorage.getItem("portfolio-language"); } catch { saved = null; }
  if (saved === "en" || saved === "es") return saved;
  const lang = window.navigator.languages?.[0] ?? window.navigator.language;
  return lang.toLowerCase().startsWith("es") ? "es" : "en";
};

function ArrowUpRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 17 17 7" /><path d="M8 7h9v9" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

type RailProps = {
  language: Language;
  copy: (typeof content)[Language];
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  resumeHref: string;
};

function RailContent({ language, copy, onLanguageChange, activeSection, resumeHref }: RailProps) {
  return (
    <>
      <a href="#top" className="rail-name">
        Diego Ruiz<span> · {copy.sentence.split(",")[0]}</span>
      </a>
      <nav className="rail-actions" aria-label={language === "es" ? "Navegación principal" : "Primary navigation"}>
        {(["work", "about", "experience"] as const).map((id) => {
          const label = id === "work" ? copy.navWork : id === "about" ? copy.navAbout : copy.navExperience;
          return (
            <a
              key={id}
              href={`#${id}`}
              className="rail-link"
              aria-current={activeSection === id ? "location" : undefined}
              style={activeSection === id ? { color: "var(--ink)" } : undefined}
            >
              {label}
            </a>
          );
        })}
        <a href="#contact" className="rail-btn">
          {copy.contact} <ArrowUpRightIcon />
        </a>
        <a href={resumeHref} target="_blank" rel="noreferrer" className="rail-link" style={{ display: "none" }} aria-hidden="true" />
        <div className="lang-switch" role="group" aria-label={language === "es" ? "Seleccionar idioma" : "Select language"}>
          <button type="button" aria-pressed={language === "es"} onClick={() => onLanguageChange("es")}>ES</button>
          <button type="button" aria-pressed={language === "en"} onClick={() => onLanguageChange("en")}>EN</button>
        </div>
      </nav>
    </>
  );
}

export function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [activeSection, setActiveSection] = useState("work");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const copy = content[language];
  const projects = projectOrder.map((i) => ({ ...projectMedia[i], ...projectCopy[language][i] }));
  const selected = selectedProject === null ? null : projects[selectedProject];

  const openLightbox = (projectIndex: number, imageIndex: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setSelectedProject(projectIndex);
    setSelectedImageIndex(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setSelectedImageIndex(0);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  const moveImage = (direction: "previous" | "next") => {
    if (!selected) return;
    setSelectedImageIndex((i) =>
      direction === "previous"
        ? (i - 1 + selected.screenshots.length) % selected.screenshots.length
        : (i + 1) % selected.screenshots.length
    );
  };

  /* Hero: scroll progress drives the name split and the 3D phone */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyHeroProgress(hero, 0, 0);
      heroState.rot = -14;
      heroListeners.forEach((listener) => listener());
      return;
    }

    const readScroll = () => -hero.getBoundingClientRect().top;
    const readTravel = () => Math.max(1, hero.offsetHeight - window.innerHeight * 2);

    let target = clamp01(readScroll() / readTravel());
    let current = target;
    let frame = 0;
    const applyCurrent = () => {
      const cover = clamp01((readScroll() - readTravel()) / window.innerHeight);
      applyHeroProgress(hero, current, cover);
    };
    applyCurrent();

    const tick = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0004) current = target;
      applyCurrent();
      frame = current === target ? 0 : window.requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target = clamp01(readScroll() / readTravel());
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  /* Reveal + section tracking */
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    document
      .querySelectorAll<HTMLElement>(".reveal, .reveal-split, .reveal-curtain, .reveal-x")
      .forEach((el) => revealObserver.observe(el));

    const sweepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-swept");
            sweepObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -30% 0px" }
    );
    document.querySelectorAll<HTMLElement>("[data-sweep]").forEach((el) => sweepObserver.observe(el));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    navigationIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
      sweepObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  /* Right-column projects drift slower than the page */
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".project-item--right"));
    if (!items.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.setProperty("--py", `${(offset * 0.08).toFixed(1)}px`);
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  /* Language persistence */
  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === "es"
        ? "Diego Ruiz — Desarrollador Fullstack"
        : "Diego Ruiz — Fullstack Developer";
    try { window.localStorage.setItem("portfolio-language", language); } catch { /* noop */ }
  }, [language]);

  /* Lightbox keyboard */
  useEffect(() => {
    if (!selected) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setSelectedImageIndex((i) => (i - 1 + selected.screenshots.length) % selected.screenshots.length);
      if (e.key === "ArrowRight") setSelectedImageIndex((i) => (i + 1) % selected.screenshots.length);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const handleBackdropKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") closeLightbox();
  };

  const railProps: RailProps = {
    language,
    copy,
    onLanguageChange: setLanguage,
    activeSection,
    resumeHref: links.resume,
  };

  return (
    <div className="site">
      <a className="skip-link" href="#work">{copy.skip}</a>

      <header className="site-header">
        <RailContent {...railProps} />
      </header>

      {/* Hero: the name flanks a 3D phone that turns with the scroll */}
      <section className="hero" ref={heroRef} aria-label="Introduction">
        <div className="hero-stage">
          <h1 className="hero-name" aria-label="Diego Ruiz">
            <span className="hero-word hero-word--a" aria-hidden="true">
              <span className="hero-word-in">Diego</span>
            </span>
            <span className="hero-slot" aria-hidden="true" />
            <span className="hero-word hero-word--b" aria-hidden="true">
              <span className="hero-word-in">Ruiz</span>
            </span>
          </h1>

          <div className="phone-scene" aria-hidden="true">
            <Suspense fallback={phoneFallback}>
              <PhoneScene screens={PHONE_SCREENS} state={heroState} subscribe={subscribeHero} fallback={phoneFallback} />
            </Suspense>
          </div>

          <div className="hero-foot">
            <p>{copy.sentence}</p>
            <a href="#work" className="hero-foot-link">
              {copy.navWork} <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </section>

      <main id="top">
        {/* Work */}
        <section id="work" className="scroll-mt-16" aria-labelledby="work-heading">
          <div className="section-inner">
            <SplitHeading id="work-heading" className="section-heading" text={copy.workTitle} />
            <div className="work-list">
              {projects.map((project, index) => (
                <article
                  key={project.title}
                  className={`project-item project-item--${project.placement}`}
                >
                  <p className="project-meta-top reveal">{project.title}</p>
                  <button
                    type="button"
                    className={`project-exhibit project-exhibit--${project.kind} reveal-curtain`}
                    onClick={(e) => openLightbox(index, 0, e.currentTarget)}
                    aria-label={copy.openPreview(project.title)}
                  >
                    {(project.kind === "phone" ? project.screenshots : project.screenshots.slice(0, 1)).map((src, i) => (
                      <img
                        key={src}
                        src={src}
                        alt={`${project.title} — ${i + 1}`}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    ))}
                    <span className="project-open-label" aria-hidden="true">
                      {copy.liveSite} <ArrowUpRightIcon />
                    </span>
                  </button>
                  <div className="project-meta-bottom reveal" style={{ transitionDelay: "260ms" }}>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="stack-row">
                      {project.stack.map((tag) => (
                        <span key={tag} className="stack-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="project-links" style={{ marginTop: "1rem" }}>
                      <a href={project.demo} target="_blank" rel="noreferrer" className="project-link">
                        {copy.liveSite} <ArrowUpRightIcon />
                      </a>
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noreferrer" className="project-link">
                          {copy.source} <ArrowUpRightIcon />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}

              {/* Remark — sits beside the right-column project on wide screens */}
              <div className="work-remark reveal" aria-hidden="true">
                <p>{copy.workRemark}</p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" data-sweep aria-labelledby="about-heading">
          <div className="section-inner">
            <SplitHeading id="about-heading" className="section-heading" text={copy.aboutTitle} />
            <div className="about-grid">
              <div className="about-copy reveal">
                {copy.aboutCopy.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <div className="capability-table">
                {copy.capabilityLabels.map((label, i) => (
                  <div key={label} className="capability-row reveal-x" style={{ transitionDelay: `${i * 120}ms` }}>
                    <span className="capability-label">{label}</span>
                    <p className="capability-value">{copy.capabilityCopy[i]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" aria-labelledby="experience-heading">
          <div className="section-inner">
            <SplitHeading id="experience-heading" className="section-heading" text={copy.experienceTitle} />
            <div className="timeline">
              {copy.experience.map((item, i) => (
                <article key={item.title} className="timeline-item reveal-x" style={{ transitionDelay: `${i * 140}ms` }}>
                  <p className="timeline-period">{item.period}</p>
                  <div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading">
          <div className="section-inner">
            <div className="contact-body reveal">
              <div>
                <SplitHeading id="contact-heading" className="contact-heading" text={copy.contactTitle} />
                <p className="contact-copy">{copy.contactCopy}</p>
              </div>
              <div>
                <div className="contact-links">
                  <a href={links.email} className="contact-btn">
                    {copy.email} <ArrowUpRightIcon />
                  </a>
                  <a href={links.linkedin} target="_blank" rel="noreferrer" className="contact-btn contact-btn--ghost">
                    LinkedIn
                  </a>
                  <a href={links.github} target="_blank" rel="noreferrer" className="contact-btn contact-btn--ghost">
                    GitHub
                  </a>
                  <a href={links.resume} target="_blank" rel="noreferrer" className="contact-btn contact-btn--ghost">
                    CV / Résumé
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Diego Ruiz. {copy.footer}</p>
        <a href="#top" className="back-top">
          {copy.backToTop} <ArrowUpRightIcon />
        </a>
      </footer>

      {/* Lightbox */}
      {selected && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={copy.openPreview(selected.title)}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
          onKeyDown={handleBackdropKeyDown}
        >
          <div className="lightbox__content">
            <div className="lightbox__topline">
              <p>{selected.title}</p>
              <p>{selectedImageIndex + 1} / {selected.screenshots.length}</p>
            </div>
            <button ref={closeButtonRef} type="button" className="icon-btn lightbox__close" onClick={closeLightbox} aria-label={copy.closePreview}>
              <CloseIcon />
            </button>
            {selected.screenshots.length > 1 && (
              <button type="button" className="icon-btn lightbox__previous" onClick={() => moveImage("previous")} aria-label={copy.previousImage}>
                <ArrowIcon direction="left" />
              </button>
            )}
            <img
              src={selected.screenshots[selectedImageIndex]}
              alt={`${selected.title} screenshot ${selectedImageIndex + 1}`}
              className="lightbox__image"
            />
            {selected.screenshots.length > 1 && (
              <button type="button" className="icon-btn lightbox__next" onClick={() => moveImage("next")} aria-label={copy.nextImage}>
                <ArrowIcon direction="right" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
