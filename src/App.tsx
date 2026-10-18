import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
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
  eyebrow: string;
  description: string;
  stack: string[];
  demo: string;
  repo?: string;
  highlights: string[];
  screenshots: string[];
  visual?: "editorial" | "property";
};

type Language = "en" | "es";
type ProjectMedia = Pick<Project, "stack" | "demo" | "repo" | "screenshots" | "visual">;
type ProjectCopy = Pick<Project, "title" | "eyebrow" | "description" | "highlights">;

const projectMedia: ProjectMedia[] = [
  {
    stack: ["React", "TypeScript", "Zustand", "PWA", "Vite"],
    demo: "https://gym-tracker-v1.vercel.app/",
    repo: "https://github.com/DiegoRuiz8/gym-tracker-v1.git",
    screenshots: [liftLogHomeImg, liftLogWorkoutImg, liftLogHistoryImg],
  },
  {
    stack: ["Next.js", "TypeScript", "MercadoPago", "Resend"],
    demo: "https://www.worldcupnights.lat/",
    repo: "https://github.com/DiegoRuiz8/worldcupnights",
    screenshots: [wcn1, wcn2, wcn3],
  },
  {
    stack: ["React", "TypeScript", "Google Maps", "Charts", "Vite"],
    demo: "https://traffic-monitoring-dashboard-omega.vercel.app/",
    repo: "https://github.com/DiegoRuiz8/traffic-monitoring-dashboard.git",
    screenshots: [trafficDashboardImg, trafficStatsImg, trafficCamerasImg],
  },
  {
    stack: ["Next.js", "Editorial design", "Content hub"],
    demo: "https://www.luisfelipeiv.com/",
    screenshots: ["https://www.luisfelipeiv.com/images/site-1.jpg"],
    visual: "editorial",
  },
  {
    stack: ["Next.js", "Property catalog", "Responsive design"],
    demo: "https://www.espaxioinmobiliaria.com/es",
    screenshots: ["https://www.espaxioinmobiliaria.com/images/hero/hero-bg.jpg"],
    visual: "property",
  },
];

const projectCopy: Record<Language, ProjectCopy[]> = {
  en: [
    { title: "Lift Log", eyebrow: "Featured project", description: "A complete gym tracking app built for planning workouts, tracking progress, and reviewing past sessions.", highlights: ["Start and manage active workouts", "Keep routines and review session history", "Install it like an app and keep data on your device"] },
    { title: "World Cup Nights", eyebrow: "Booking website", description: "A bilingual ticket booking website for a World Cup 2026 party bus experience in Guadalajara.", highlights: ["Ticket selection and checkout", "Payment confirmation emails", "Simple date selection and booking flow"] },
    { title: "Traffic Monitoring Dashboard", eyebrow: "Data interface", description: "A dashboard that makes traffic data easier to understand with charts, maps, and camera views.", highlights: ["Clear traffic metrics and charts", "Map and camera views in one place", "Realistic data to show expected flows"] },
    { title: "Luis Felipe IV", eyebrow: "Editorial website", description: "A storytelling website for a music creator, bringing together an archive, playlists, community stories, and direct contact.", highlights: ["Editorial experience with a distinct visual identity", "Music archive and curated playlists", "Community story and song-dedication flow"] },
    { title: "EspaXio Inmobiliaria", eyebrow: "Real estate platform", description: "A real estate website that connects property discovery, credit guidance, services, and direct contact in one clear journey.", highlights: ["Property catalog for CDMX and Estado de México", "Services for sales, rentals, and condo administration", "Credit tools and direct WhatsApp contact"] },
  ],
  es: [
    { title: "Lift Log", eyebrow: "Proyecto destacado", description: "Una aplicación completa para planear entrenamientos, registrar progreso y revisar sesiones anteriores.", highlights: ["Inicia y administra entrenamientos activos", "Guarda rutinas y revisa el historial de sesiones", "Instálala como una app y conserva tus datos en tu dispositivo"] },
    { title: "World Cup Nights", eyebrow: "Sitio de reservaciones", description: "Un sitio bilingüe para reservar boletos de una experiencia en party bus durante el Mundial 2026 en Guadalajara.", highlights: ["Selección de boletos y pago", "Correos de confirmación de pago", "Selección de fecha y flujo de reserva simple"] },
    { title: "Dashboard de monitoreo de tráfico", eyebrow: "Interfaz de datos", description: "Un dashboard que facilita entender datos de tráfico con gráficas, mapas y vistas de cámaras.", highlights: ["Métricas y gráficas claras", "Mapa y cámaras en un solo lugar", "Datos realistas para mostrar flujos esperados"] },
    { title: "Luis Felipe IV", eyebrow: "Sitio editorial", description: "Un sitio de storytelling para un creador musical que une archivo, playlists, historias de la comunidad y contacto directo.", highlights: ["Experiencia editorial con identidad visual propia", "Archivo musical y playlists curadas", "Flujo para compartir historias y dedicar canciones"] },
    { title: "EspaXio Inmobiliaria", eyebrow: "Plataforma inmobiliaria", description: "Un sitio inmobiliario que une búsqueda de propiedades, asesoría de crédito, servicios y contacto directo en un solo recorrido claro.", highlights: ["Catálogo de propiedades en CDMX y Estado de México", "Servicios de venta, renta y administración de condominios", "Herramientas de crédito y contacto directo por WhatsApp"] },
  ],
};

const content: Record<Language, {
  skip: string;
  navigation: readonly { id: "work" | "about" | "experience" | "contact"; label: string; number: string }[];
  contact: string;
  eyebrow: string;
  hero: string;
  heroCopy: string;
  viewWork: string;
  downloadCv: string;
  scroll: string;
  workEyebrow: string;
  workTitle: string;
  liveSite: string;
  source: string;
  phoneView: string;
  phoneAlt: string;
  preview: string;
  openPreview: (title: string) => string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutCopy: string;
  capabilityLabels: readonly string[];
  capabilityCopy: readonly string[];
  experienceEyebrow: string;
  experienceTitle: string;
  experience: readonly { period: string; title: string; description: string }[];
  contactEyebrow: string;
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
    navigation: [{ id: "work", label: "Work", number: "01" }, { id: "about", label: "About", number: "02" }, { id: "experience", label: "Experience", number: "03" }, { id: "contact", label: "Contact", number: "04" }],
    contact: "Contact", eyebrow: "Fullstack developer · frontend focused", hero: "I build web products people enjoy using.", heroCopy: "Clean interfaces, thoughtful details, and enough backend knowledge to connect a complete feature from start to finish.", viewWork: "View my work", downloadCv: "Download CV", scroll: "Scroll to explore", workEyebrow: "01 — Selected work", workTitle: "A few projects I've built.", liveSite: "Live site", source: "Source", phoneView: "Active workout view", phoneAlt: "Lift Log active workout screen", preview: "Open preview", openPreview: (title) => `Open ${title} screenshot`,
    aboutEyebrow: "02 — About", aboutTitle: "I like building things that are useful and easy to use.", aboutCopy: "I mainly work on the frontend, where I turn ideas into clean and responsive experiences. I also understand the backend side well enough to connect the pieces and build complete features.", capabilityLabels: ["Frontend", "Backend", "Tools"], capabilityCopy: ["React, TypeScript, responsive design, and reusable components.", "Python, Odoo, APIs, databases, and connecting services together.", "Git, Vercel, deployment, and the everyday tools needed to ship a project."],
    experienceEyebrow: "03 — Experience", experienceTitle: "What I've been working on.", experience: [{ period: "2026 — Present", title: "Fullstack Developer · Grupo Frío / WorldKold", description: "Building web and mobile tools for daily operations, connecting React interfaces with an Odoo/Python backend." }, { period: "2026 — Present", title: "Co-founder & Developer · Krea Studio", description: "Building and launching custom React and Next.js websites from start to finish." }],
    contactEyebrow: "04 — Contact", contactTitle: "Interested in working together?", contactCopy: "I'm currently looking for a frontend or fullstack role where I can keep building useful products and growing as a developer.", email: "Email me", footer: "Built with intent.", backToTop: "Back to top", closePreview: "Close preview", previousImage: "Previous image", nextImage: "Next image",
  },
  es: {
    skip: "Ir a proyectos seleccionados",
    navigation: [{ id: "work", label: "Proyectos", number: "01" }, { id: "about", label: "Sobre mí", number: "02" }, { id: "experience", label: "Experiencia", number: "03" }, { id: "contact", label: "Contacto", number: "04" }],
    contact: "Contacto", eyebrow: "Desarrollador fullstack · enfoque en frontend", hero: "Creo productos web que la gente disfruta usar.", heroCopy: "Interfaces claras, detalles cuidadosos y el conocimiento de backend necesario para conectar una funcionalidad de inicio a fin.", viewWork: "Ver proyectos", downloadCv: "Descargar CV", scroll: "Explora mi trabajo", workEyebrow: "01 — Proyectos seleccionados", workTitle: "Algunos proyectos que he creado.", liveSite: "Ver sitio", source: "Código", phoneView: "Vista de entrenamiento activo", phoneAlt: "Pantalla de entrenamiento activo de Lift Log", preview: "Abrir vista", openPreview: (title) => `Abrir captura de ${title}`,
    aboutEyebrow: "02 — Sobre mí", aboutTitle: "Me gusta crear productos útiles y fáciles de usar.", aboutCopy: "Trabajo principalmente en frontend, donde convierto ideas en experiencias limpias y responsivas. También entiendo lo suficiente del backend para conectar las piezas y construir funcionalidades completas.", capabilityLabels: ["Frontend", "Backend", "Herramientas"], capabilityCopy: ["React, TypeScript, diseño responsivo y componentes reutilizables.", "Python, Odoo, APIs, bases de datos y conexión de servicios.", "Git, Vercel, despliegues y herramientas diarias para lanzar un proyecto."],
    experienceEyebrow: "03 — Experiencia", experienceTitle: "En lo que he estado trabajando.", experience: [{ period: "2026 — Actualidad", title: "Desarrollador Fullstack · Grupo Frío / WorldKold", description: "Creo herramientas web y móviles para operaciones diarias, conectando interfaces en React con un backend en Odoo/Python." }, { period: "2026 — Actualidad", title: "Cofundador y desarrollador · Krea Studio", description: "Creo y lanzo sitios personalizados en React y Next.js de principio a fin." }],
    contactEyebrow: "04 — Contacto", contactTitle: "¿Te interesa trabajar juntos?", contactCopy: "Actualmente busco un rol frontend o fullstack donde pueda seguir creando productos útiles y creciendo como desarrollador.", email: "Escríbeme", footer: "Hecho con intención.", backToTop: "Volver arriba", closePreview: "Cerrar vista previa", previousImage: "Imagen anterior", nextImage: "Siguiente imagen",
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
  let savedLanguage: string | null = null;
  try {
    savedLanguage = window.localStorage.getItem("portfolio-language");
  } catch {
    savedLanguage = null;
  }
  if (savedLanguage === "en" || savedLanguage === "es") return savedLanguage;
  const browserLanguage = window.navigator.languages?.[0] ?? window.navigator.language;
  return browserLanguage.toLowerCase().startsWith("es") ? "es" : "en";
};

function ArrowUpRightIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>;
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} /></svg>;
}

function CloseIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function LanguageSwitcher({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  const label = language === "es" ? "Seleccionar idioma" : "Select language";
  return <div className="language-switcher" role="group" aria-label={label}>
    <button type="button" className={language === "es" ? "language-switcher__option language-switcher__option--active" : "language-switcher__option"} aria-pressed={language === "es"} onClick={() => onChange("es")}>ES</button>
    <button type="button" className={language === "en" ? "language-switcher__option language-switcher__option--active" : "language-switcher__option"} aria-pressed={language === "en"} onClick={() => onChange("en")}>EN</button>
  </div>;
}

export function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [activeSection, setActiveSection] = useState("work");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const copy = content[language];
  const navigation = copy.navigation;
  const projects = projectMedia.map((project, index) => ({ ...project, ...projectCopy[language][index] }));
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
    setSelectedImageIndex((index) => direction === "previous"
      ? (index - 1 + selected.screenshots.length) % selected.screenshots.length
      : (index + 1) % selected.screenshots.length);
  };

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    navigationIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "es" ? "Diego Ruiz — Desarrollador Fullstack" : "Diego Ruiz — Fullstack Developer";
    try {
      window.localStorage.setItem("portfolio-language", language);
    } catch {
      return undefined;
    }
  }, [language]);

  useEffect(() => {
    if (!selected) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        setSelectedImageIndex(0);
        window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
      }
      if (event.key === "ArrowLeft") {
        setSelectedImageIndex((index) => (index - 1 + selected.screenshots.length) % selected.screenshots.length);
      }
      if (event.key === "ArrowRight") {
        setSelectedImageIndex((index) => (index + 1) % selected.screenshots.length);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  const handleBackdropKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") closeLightbox();
  };

  return (
    <div className="site-shell min-h-screen overflow-x-hidden">
      <a className="skip-link" href="#work">{copy.skip}</a>
      <div className="site-grid" aria-hidden="true" />
      <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a href="#top" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-white"><span className="logo-mark" aria-hidden="true">DR</span><span>Diego Ruiz</span></a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navigation.map((item) => <a key={item.id} href={`#${item.id}`} className={`nav-item ${activeSection === item.id ? "nav-item--active" : ""}`}><span>{item.number}</span>{item.label}</a>)}
          </nav>
          <div className="header-actions"><LanguageSwitcher language={language} onChange={setLanguage} /><a href="#contact" className="button button--small button--primary">{copy.contact} <ArrowUpRightIcon /></a></div>
        </div>
        <nav className="mx-auto flex max-w-7xl items-center gap-4 border-t border-white/5 px-5 pb-3 pt-1.5 sm:px-8 md:hidden" aria-label="Mobile navigation">
          {navigation.map((item) => <a key={item.id} href={`#${item.id}`} className={`nav-item ${activeSection === item.id ? "nav-item--active" : ""}`}><span>{item.number}</span>{item.label}</a>)}
        </nav>
      </header>

      <main id="top">
        <div className="intro-flow">
        <div className="intro-flow__horizon" aria-hidden="true" />
        <section className="hero-section mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="hero-section__content">
            <p className="eyebrow hero-enter hero-enter--one"><span className="status-dot" aria-hidden="true" />{copy.eyebrow}</p>
            <h1 className="hero-title hero-enter hero-enter--two">{copy.hero}</h1>
            <p className="hero-copy hero-enter hero-enter--three">{copy.heroCopy}</p>
            <div className="hero-actions hero-enter hero-enter--four">
              <a href="#work" className="button button--primary">{copy.viewWork} <ArrowUpRightIcon /></a>
              <a href={links.resume} target="_blank" rel="noreferrer" className="button button--ghost">{copy.downloadCv}</a>
            </div>
          </div>
          <p className="hero-scroll-cue hero-enter hero-enter--five">{copy.scroll} <span aria-hidden="true">↓</span></p>
        </section>

        <section id="work" className="work-section mx-auto w-full max-w-7xl scroll-mt-24 px-5 pb-24 sm:px-8 lg:px-10">
          <div className="section-heading reveal"><p className="eyebrow">{copy.workEyebrow}</p><h2>{copy.workTitle}</h2></div>
          <article className="featured-project reveal mt-10">
            <div className="featured-project__copy"><p className="eyebrow">{projects[0].eyebrow}</p><h3>{projects[0].title}</h3><p>{projects[0].description}</p><ul>{projects[0].highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><div className="mt-7 flex flex-wrap gap-2">{projects[0].stack.map((item) => <span key={item} className="tech-pill">{item}</span>)}</div><div className="mt-8 flex flex-wrap gap-3"><a className="button button--primary" href={projects[0].demo} target="_blank" rel="noreferrer">{copy.liveSite} <ArrowUpRightIcon /></a><a className="button button--ghost" href={projects[0].repo} target="_blank" rel="noreferrer">{copy.source}</a></div></div>
            <div className="featured-project__media">
              <div className="device-showcase">
                <div className="device-showcase__grid" aria-hidden="true" />
                <div className="device-showcase__orbit device-showcase__orbit--one" aria-hidden="true" />
                <div className="device-showcase__orbit device-showcase__orbit--two" aria-hidden="true" />
                <div className="device-showcase__shadow" aria-hidden="true" />
                <div className="device-phone">
                  <span className="device-phone__control device-phone__control--mute" aria-hidden="true" />
                  <span className="device-phone__control device-phone__control--volume-up" aria-hidden="true" />
                  <span className="device-phone__control device-phone__control--volume-down" aria-hidden="true" />
                  <div className="device-phone__screen">
                    <img src={projects[0].screenshots[1]} alt={copy.phoneAlt} />
                    <span className="device-phone__notch" aria-hidden="true" />
                    <span className="device-phone__gloss" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <p className="device-showcase__caption"><span aria-hidden="true" />Lift Log · {copy.phoneView}</p>
            </div>
          </article>
          <div className="project-grid mt-6">{projects.slice(1).map((project, index) => {
            const visualClass = project.visual ? `media-button media-button--compact media-button--${project.visual}` : "media-button media-button--compact";
            const cardClass = project.visual ? `project-card project-card--${project.visual} reveal` : "project-card reveal";
            return <article key={project.title} className={cardClass}>
              <button type="button" className={visualClass} onClick={(event) => openLightbox(index + 1, 0, event.currentTarget)} aria-label={copy.openPreview(project.title)}>
                <img src={project.screenshots[0]} alt={`${project.title} interface`} loading="lazy" decoding="async" />
                {project.visual === "editorial" && <span className="editorial-card-title" aria-hidden="true">Luis Felipe IV</span>}
                {project.visual === "property" && <span className="property-card-title" aria-hidden="true">EspaXio</span>}
                <span>{copy.preview} <ArrowUpRightIcon /></span>
              </button>
              <div className="project-card__body"><p className="eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p>{project.description}</p><div className="mt-6 flex items-center justify-between gap-4"><a href={project.demo} target="_blank" rel="noreferrer" className="text-link">{copy.liveSite} <ArrowUpRightIcon /></a>{project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="text-link">{copy.source} <ArrowUpRightIcon /></a>}</div></div>
            </article>;
          })}</div>
        </section>
        </div>

        <section id="about" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 pb-24 sm:px-8 lg:px-10"><div className="about-grid"><div className="section-heading reveal"><p className="eyebrow">{copy.aboutEyebrow}</p><h2>{copy.aboutTitle}</h2><p className="mt-5 max-w-xl text-base leading-7 text-slate-300">{copy.aboutCopy}</p></div><div className="capability-list reveal">{copy.capabilityLabels.map((label, index) => <div key={label}><span>{label}</span><p>{copy.capabilityCopy[index]}</p></div>)}</div></div></section>

        <section id="experience" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 pb-24 sm:px-8 lg:px-10"><div className="section-heading reveal"><p className="eyebrow">{copy.experienceEyebrow}</p><h2>{copy.experienceTitle}</h2></div><div className="timeline reveal mt-10">{copy.experience.map((item) => <article key={item.title}><p>{item.period}</p><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></section>

        <section id="contact" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 pb-24 sm:px-8 lg:px-10"><div className="contact-panel reveal"><div><p className="eyebrow">{copy.contactEyebrow}</p><h2>{copy.contactTitle}</h2><p>{copy.contactCopy}</p></div><div className="flex flex-wrap gap-3 lg:justify-end"><a href={links.email} className="button button--primary">{copy.email} <ArrowUpRightIcon /></a><a href={links.linkedin} target="_blank" rel="noreferrer" className="button button--ghost">LinkedIn</a><a href={links.github} target="_blank" rel="noreferrer" className="button button--ghost">GitHub</a></div></div></section>
      </main>

      <footer className="mx-auto flex w-full max-w-7xl flex-col gap-3 border-t border-white/10 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><p>© {new Date().getFullYear()} Diego Ruiz. {copy.footer}</p><a href="#top" className="text-link">{copy.backToTop} <ArrowUpRightIcon /></a></footer>

      {selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${selected.title} ${copy.openPreview(selected.title)}`} onClick={(event) => { if (event.target === event.currentTarget) closeLightbox(); }} onKeyDown={handleBackdropKeyDown}><div className="lightbox__content"><div className="lightbox__topline"><p>{selected.title}</p><p>{selectedImageIndex + 1} / {selected.screenshots.length}</p></div><button ref={closeButtonRef} type="button" className="icon-button lightbox__close" onClick={closeLightbox} aria-label={copy.closePreview}><CloseIcon /></button>{selected.screenshots.length > 1 && <button type="button" className="icon-button lightbox__previous" onClick={() => moveImage("previous")} aria-label={copy.previousImage}><ArrowIcon direction="left" /></button>}<img src={selected.screenshots[selectedImageIndex]} alt={`${selected.title} screenshot ${selectedImageIndex + 1}`} className="lightbox__image" />{selected.screenshots.length > 1 && <button type="button" className="icon-button lightbox__next" onClick={() => moveImage("next")} aria-label={copy.nextImage}><ArrowIcon direction="right" /></button>}</div></div>}
    </div>
  );
}
