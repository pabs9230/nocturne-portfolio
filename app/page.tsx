"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import styles from "./page.module.css";
import GlowParallax from "../components/GlowParallax";

type Node = {
  id: string;
  subdomain: string;
  label: string;
  productName?: string;
  summary: string;
  focus: string[];
  x: number;
  y: number;
};

type Language = "en" | "es";

const languageStorageKey = "nocturne-language";

const systemsNodesEn: Node[] = [
  {
    id: "fintech",
    subdomain: "fintech",
    label: "Fintech (W.I.P.)",
    summary: "Ledgers, payments, idempotent flows, and risk-aware messaging.",
    focus: [
      "Event-driven ledgers with outbox/idempotency",
      "Payment orchestration with retries and DLQs",
      "API gateway/BFF routing and auth policy",
    ],
    x: 50,
    y: 12,
  },
  {
    id: "economy",
    subdomain: "data",
    label: "Data (W.I.P.)",
    summary: "Pipelines for ingestion, modeling, and visualization APIs.",
    focus: [
      "Time-series storage + snapshotting",
      "Modeling workers with backpressure",
      "Serving layer with query guards",
    ],
    x: 14,
    y: 50,
  },
  {
    id: "game",
    subdomain: "game",
    label: "Game Engine",
    productName: "Living Dead Beat",
    summary: "PvE/PvP RPG multiplayer online IO style videogame.",
    focus: [
      "Art on canvas with in-memory projections",
      "Playable core with basic mechanics and bots",
      "Role-based creep design",
      "Donation system with real money transactions via Paypal(W.I.P.)",
      "Replayable event log",
      "Latency-aware emit/observe loop",
    ],
    x: 86,
    y: 50,
  },
  {
    id: "lab",
    subdomain: "lab",
    label: "Tech Lab (W.I.P.)",
    summary: "Load testing, distributed sims, and observability stacks.",
    focus: [
      "Scenario generators for stress tests",
      "Caching experiments with trace probes",
      "Red-team drills and chaos switches",
    ],
    x: 50,
    y: 88,
  },
];

const systemsNodesEs: Node[] = [
  {
    id: "fintech",
    subdomain: "fintech",
    label: "Fintech (W.I.P.)",
    summary: "Ledgers, pagos, flujos idempotentes y mensajería orientada a riesgo.",
    focus: [
      "Ledgers event-driven con outbox/idempotencia",
      "Orquestación de pagos con retries y DLQ",
      "Routing API gateway/BFF y política de auth",
    ],
    x: 50,
    y: 12,
  },
  {
    id: "economy",
    subdomain: "data",
    label: "Data (W.I.P.)",
    summary: "Pipelines para ingesta, modelado y APIs de visualización.",
    focus: [
      "Almacenamiento time-series + snapshotting",
      "Workers de modelado con backpressure",
      "Capa de servicio con guardrails de consulta",
    ],
    x: 14,
    y: 50,
  },
  {
    id: "game",
    subdomain: "game",
    label: "Motor de Juego",
    productName: "Living Dead Beat",
    summary: "Videojuego estilo IO multijugador RPG PvE/PvP.",
    focus: [
      "Arte sobre canvas con proyecciones en memoria",
      "Core jugable con mecánicas básicas y bots",
      "Diseño de creeps basado en roles",
      "Sistema de donaciones con transacciones de dinero real vía PayPal (W.I.P.)",
      "Log de eventos reproducible",
      "Loop de emit/observe consciente de latencia",
    ],
    x: 86,
    y: 50,
  },
  {
    id: "lab",
    subdomain: "lab",
    label: "Tech Lab (W.I.P.)",
    summary: "Pruebas de carga, simulaciones distribuidas y observabilidad.",
    focus: [
      "Generadores de escenarios para stress tests",
      "Experimentos de caché con probes de trazas",
      "Ejercicios red-team y chaos switches",
    ],
    x: 50,
    y: 88,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 0.9, 0.2, 1] } },
} as Variants;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const homeContent = {
  en: {
    heroSubtitle: "Software engineer portfolio - hybrid tech & art, maps, and resilient systems.",
    kicker: "NOCTURNE · Pablo Marines · Software Engineer senior/Freelance developer · Cancun, Mexico",
    lede:
      "NOCTURNE is a hybrid tech/art interface with a dark aurora, interactive project map, and concise engineering signals. Built to promote my services as a freelance developer and showcase my own personal projects, it's designed to surface my development philosophy and expertise in web/app/game development, data engineering and system design.",
    heroExplore: "Explore my projects",
    heroContact: "Contact / socials",
    metaChips: ["Web/App Development", "Game Development", "Data Engineering", "Marketing", "Resilient Systems", "Business Digitalization"],
    languageToggleAria: "Switch portfolio language",
    mapEyebrow: "My projects map.",
    mapTitle: "NOCTURNE core with connected domains",
    mapLead:
      "Central node with Fintech, Economy Data, Game Engine, and Tech Lab edges.",
    mapRingLabel: "Shared infra-ring",
    focusedNode: "Focused node",
    enterLabel: "Enter",
    philosophyEyebrow: "Core philosophy",
    philosophyTitle: "How the experience is framed",
    philosophy: [
      {
        title: "Systems over pages",
        body: "Treat the portfolio as a living system - maps, flows, and resilience baked into the experience.",
      },
      {
        title: "Hybrid tech/art",
        body: "Dark canvas with expressive nodes and restrained motion; clarity first, mood second.",
      },
      {
        title: "Signal-rich storytelling",
        body: "Mini case systems and engineering principles surface credibility without walls of text.",
      },
    ],
    servicesEyebrow: "Development services",
    servicesTitle: "I offer a range of distinct services ideal for clients seeking growth and optimization of their digital presence.",
    servicesLead:
      "From landing pages to custom systems and maintenance services, my packages are designed to deliver tangible results, with options for remote and nearshore delivery, as well as select on-site work in Cancun and the Quintana Roo area.",
    servicesBody:
      "Explore the different options I have available to suit your needs and start digitizing your business today.",
    servicesPreviewTags: [
      "Senior freelance developer",
      "Accessible landing pages",
      "Nearshore + remote delivery",
      "On-site Cancun, Mexico",
    ],
    viewPackages: "View packages and services",
    quickQuote: "Email quick quote",
    principlesEyebrow: "Programming principles",
    principlesTitle: "My approach to system design and programming.",
    principles: [
      "Focus on product outcomes and architecture",
      "Readable code and clever code as necessary",
      "Small iterations with visible progress",
      "Test and verify before shipping",
      "Use AI to augment the developer, never as autopilot"
    ],
    techEyebrow: "Tech stack",
    techTitle: "Tools and disciplines",
    techStack: [
      {
        title: "Frontend",
        items: ["Next.js (App Router)", "TypeScript", "React", "CSS Modules"],
      },
      {
        title: "Backend",
        items: ["FastAPI/Flask", "Node.js", "Message Queues", "WebSockets", "GraphQL"],
      },
      {
        title: "Data & Infra",
        items: [
          "PostgreSQL/MySQL",
          "Redis",
          "Object Storage",
          "Time-series DB",
          "Observability stack",
          "Docker",
          "Kubernetes",
        ],
      },
      {
        title: "Practice",
        items: ["C4 modeling", "Event storming", "Chaos drills", "Load tests", "SLO dashboards"],
      },
    ],
    contactEyebrow: "Contact",
    contactTitle: "Let's collaborate",
    contactLead: "Reach out for systems design, simulations, fintech, or data platform work.",
    contactEmail: "Email",
    contactLinkedIn: "LinkedIn",
    contactGitHub: "GitHub",
    footerMetaOne: "NOCTURNE · Pablo Marines · Senior software engineer/Freelance developer · Cancun, Mexico",
    footerMetaTwo: "Built with Next.js, App Router, and custom CSS.",
  },
  es: {
    heroSubtitle: "Portafolio de ingeniería de software - híbrido tech + arte, mapas y sistemas resilientes.",
    kicker: "NOCTURNE · Pablo Marines · Ingeniero de Software senior/Desarrollador freelance · Cancún, México",
    lede:
      "NOCTURNE es una interfaz híbrida de tecnología y arte con un aurora oscura, mapa interactivo de proyectos y señales de ingeniería concisas. Construida para promover mis servicios como desarrollador freelance y proyectos personales, así como para demostrar mi filosofía de desarrollo y experiencia en desarrollo de web/app/videojuegos, ingeniería de datos y diseño de sistemas.",
    heroExplore: "Explorar mis proyectos",
    heroContact: "Contacto / redes",
    metaChips: ["Desarrollo de apps y web", "Desarrollo de juegos", "Ingeniería de datos", "Marketing", "Sistemas resilientes", "Digitalización de negocios"],
    languageToggleAria: "Cambiar idioma del portafolio",
    mapEyebrow: "Mapa de mis proyectos.",
    mapTitle: "Núcleo NOCTURNE con dominios conectados",
    mapLead:
      "Nodo central con aristas hacia Fintech, Data de Economía, Motor de Juego y Tech Lab.",
    mapRingLabel: "Anillo de infraestructura compartida.",
    focusedNode: "Nodo enfocado",
    enterLabel: "Entrar",
    philosophyEyebrow: "Filosofía base",
    philosophyTitle: "Cómo está planteada la experiencia",
    philosophy: [
      {
        title: "Sistemas sobre páginas",
        body: "Tratar el portafolio como un sistema vivo - mapas, flujos y resiliencia integrados en la experiencia.",
      },
      {
        title: "Híbrido tech/arte",
        body: "Canvas oscuro con nodos expresivos y movimiento contenido; primero claridad, después atmósfera.",
      },
      {
        title: "Narrativa de alto valor",
        body: "Mini casos de sistemas y principios de ingeniería para proyectar credibilidad sin bloques de texto.",
      },
    ],
    servicesEyebrow: "Servicios de desarrollo",
    servicesTitle: "Ofrezco una serie de distintos servicios ideales para clientes que buscan crecimiento y optimización de su presencia digital.",
    servicesLead:
      "Desde páginas de aterrizaje hasta sistemas personalizados y servicios de mantenimiento, mis paquetes están diseñados para ofrecer resultados tangibles, con opciones de entrega remota y nearshore, además de trabajo presencial seleccionado en Cancún y Quintana Roo.",
    servicesBody:
      "Explora las distintas opciones que tengo disponibles para adaptarse a tus necesidades y comienza la digitalización de tu negocio hoy mismo.",
    servicesPreviewTags: [
      "Desarrollador freelance senior",
      "Landing pages accesibles",
      "Entrega nearshore + remota",
      "Presencial en Cancún, México",
    ],
    viewPackages: "Ver paquetes y servicios",
    quickQuote: "Cotización rápida por correo",
    principlesEyebrow: "Principios de programación",
    principlesTitle: "Mi enfoque al diseñar sistemas y programar.",
    principles: [
      "Enfoque en resultados del producto y arquitectura",
      "Código legible e ingenioso dentro de lo necesario",
      "Iteraciones pequeñas con avance visible",
      "Probar y verificar antes de publicar",
      "Usar IA para potenciar al desarrollador, nunca como piloto automático",
    ],
    techEyebrow: "Stack tecnológico",
    techTitle: "Herramientas y disciplinas",
    techStack: [
      {
        title: "Frontend",
        items: ["Next.js (App Router)", "TypeScript", "React", "CSS Modules"],
      },
      {
        title: "Backend",
        items: ["FastAPI/Flask", "Node.js", "Message Queues", "WebSockets", "GraphQL"],
      },
      {
        title: "Data e Infra",
        items: [
          "PostgreSQL/MySQL",
          "Redis",
          "Object Storage",
          "Time-series DB",
          "Stack de observabilidad",
          "Docker",
          "Kubernetes",
        ],
      },
      {
        title: "Práctica",
        items: ["Modelado C4", "Event storming", "Chaos drills", "Load tests", "Dashboards SLO"],
      },
    ],
    contactEyebrow: "Contacto",
    contactTitle: "Colaboremos",
    contactLead: "Escríbeme para arquitectura de sistemas, simulaciones, fintech o plataformas de datos.",
    contactEmail: "Email",
    contactLinkedIn: "LinkedIn",
    contactGitHub: "GitHub",
    footerMetaOne: "NOCTURNE · Pablo Marines · Ingeniero de Software senior/Desarrollador freelance · Cancún, México",
    footerMetaTwo: "Construido con Next.js, App Router y CSS custom.",
  },
} as const;

export default function Page() {
  const [lang, setLang] = useState<Language>("en");
  const [activeNodeId, setActiveNodeId] = useState<string>(systemsNodesEn[0].id);
  const [hoveredNodeId, setHoveredNodeId] = useState<string>("");
  const [ringPulse, setRingPulse] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const reduceMotion = useReducedMotion();

  const copy = homeContent[lang];
  const systemsNodes = lang === "es" ? systemsNodesEs : systemsNodesEn;
  const quickQuoteUrl = useMemo(() => {
    const body =
      lang === "es"
        ? "Hola, me interesan tus servicios de programacion."
        : "Hello, I'm interested in your programming services.";

    return `https://mail.google.com/mail/?view=cm&fs=1&to=pabs9230@gmail.com&body=${encodeURIComponent(body)}`;
  }, [lang]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(languageStorageKey);
    if (saved === "en" || saved === "es") {
      setLang(saved);
      return;
    }

    const preferred = window.navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
    setLang(preferred);
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLang(nextLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(languageStorageKey, nextLanguage);
    }
  };

  const activeNode = useMemo(
    () => systemsNodes.find((n) => n.id === activeNodeId) ?? systemsNodes[0],
    [activeNodeId, systemsNodes],
  );

  const displayedNode = useMemo(() => {
    if (hoveredNodeId) return systemsNodes.find((n) => n.id === hoveredNodeId) ?? activeNode;
    return activeNode;
  }, [hoveredNodeId, activeNode]);

  useEffect(() => {
    if (reduceMotion) return;
    setRingPulse(true);
    const t = setTimeout(() => setRingPulse(false), 680);
    return () => clearTimeout(t);
  }, [activeNodeId, reduceMotion]);

  // detect mobile viewport to adjust interaction and svg scaling
  useEffect(() => {
    const mq = typeof window !== "undefined" ? window.matchMedia("(max-width: 640px)") : null;
    const update = () => {
      if (!mq) return;
      setIsMobile(!!mq.matches);
    };
    update();
    if (mq && mq.addEventListener) mq.addEventListener("change", update);
    else if (mq && mq.addListener) mq.addListener(update as any);
    return () => {
      if (mq && mq.removeEventListener) mq.removeEventListener("change", update);
      else if (mq && mq.removeListener) mq.removeListener(update as any);
    };
  }, []);

  const openNode = (node: Node) => {
    const url = `https://${node.subdomain}.${process.env.NEXT_PUBLIC_ROOT_PORTFOLIO_URL}`;
    setActiveNodeId(node.id);
    // clear hovered preview when navigating from mobile preview
    setHoveredNodeId("");
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  

  return (
    <div className={styles.page}>
      <GlowParallax />
      <div className={styles.aurora} aria-hidden />
      <main className={styles.shell} lang={lang === "es" ? "es-MX" : "en"}>
        <div className={styles.langToggle} role="group" aria-label={copy.languageToggleAria}>
          <button
            type="button"
            className={`${styles.langButton} ${lang === "en" ? styles.langButtonActive : ""}`}
            onClick={() => setLanguage("en")}
            aria-pressed={lang === "en"}
          >
            <span aria-hidden className={styles.flag}>🇺🇸</span>
            EN
          </button>
          <button
            type="button"
            className={`${styles.langButton} ${lang === "es" ? styles.langButtonActive : ""}`}
            onClick={() => setLanguage("es")}
            aria-pressed={lang === "es"}
          >
            <span aria-hidden className={styles.flag}>🇲🇽</span>
            ES
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={lang}
            className={styles.languageStage}
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 12, scale: 0.996, filter: "blur(7px) saturate(110%)" }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1, filter: "blur(0px) saturate(100%)" }
            }
            exit={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -10, scale: 1.004, filter: "blur(8px) saturate(112%)" }
            }
            transition={{ duration: reduceMotion ? 0.05 : 0.42, ease: [0.22, 0.9, 0.2, 1] }}
          >
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <motion.h1
              className={`${styles.heroTitle} ${reduceMotion ? "" : ""}`}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              transition={{ duration: 0.22 }}
            >
              NOCTURNE
            </motion.h1>
            <div className={styles.hUnderline} aria-hidden />
            <p className={styles.heroSubtitle}>
              {copy.heroSubtitle}
            </p>
          </div>
          <div className={styles.kicker}>{copy.kicker}</div>
          <p className={styles.lede}>{copy.lede}</p>
          <div className={`${styles.heroActions} ${styles.heroTopActions}`}>
            <a className={styles.primary} href="/services">
              {copy.viewPackages}
            </a>
            <a className={styles.primary} href="#map">
              {copy.heroExplore}
            </a>
            <a className={styles.secondary} href="#contact">
              {copy.heroContact}
            </a>
          </div>
          <div className={styles.metaChips}>
            {copy.metaChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </section>

        <motion.section
          className={styles.mapSection}
          id="map"
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.mapEyebrow}</p>
            <h2>{copy.mapTitle}</h2>
            <p className={styles.sectionLead}>{copy.mapLead}</p>
          </div>
          <motion.div className={styles.mapGrid} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}>
            <motion.div className={styles.mapCard} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}>
              <div
                className={`${styles.mapCanvas} ${ringPulse ? styles.ringPulseActive : ""}`}
                data-hovered={hoveredNodeId}
                data-active={activeNodeId}
              >
                <svg className={styles.mapSvg} viewBox="0 0 100 100" preserveAspectRatio={isMobile ? "xMidYMid meet" : "none"} aria-hidden>
                  <circle cx="50" cy="50" r="34" className={styles.ring} />
                  {systemsNodes.map((node) => (
                    <line
                      key={`line-${node.id}`}
                      data-line={node.id}
                      x1="50"
                      y1="50"
                      x2={node.x}
                      y2={node.y}
                      className={`${styles.connector} ${hoveredNodeId === node.id ? styles.connectorActive : ""} ${
                        activeNodeId === node.id ? styles.connectorActiveActive : ""
                      }`}
                    />
                  ))}
                </svg>
                <div className={styles.coreNode}>
                  <span className={styles.coreTitle}>NOCTURNE</span>
                  <span className={styles.coreSubtitle}>Portfolio Core</span>
                </div>
                {systemsNodes.map((node) => (
                  <button
                    key={node.id}
                    className={`${styles.node} ${activeNodeId === node.id ? styles.activeNode : ""}`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    onClick={() => {
                      // Mobile: single tap should behave like hover/preview (do not open link)
                      // Desktop: preserve existing behaviour (select + open)
                      if (isMobile) {
                        setHoveredNodeId(node.id);
                      } else {
                        setActiveNodeId(node.id);
                        openNode(node);
                      }
                    }}
                    onTouchStart={() => {
                      if (isMobile) setHoveredNodeId(node.id);
                    }}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onFocus={() => setActiveNodeId(node.id)}
                    aria-pressed={activeNodeId === node.id}
                  >
                    <span>{node.label}</span>
                  </button>
                ))}
                <div className={styles.ringLabel}>{copy.mapRingLabel}</div>
              </div>
            </motion.div>
            <motion.div className={styles.mapDetail} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayedNode.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.36 }}
                >
                  <p className={styles.detailKicker}>{copy.focusedNode}</p>
                  <h3>{displayedNode.productName || displayedNode.label}</h3>
                  <p className={styles.detailText}>{displayedNode.summary}</p>
                  <ul className={styles.focusList}>
                    {displayedNode.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {isMobile && (
                    <div className={styles.enterWrap}>
                      <button
                        className={styles.enterButton}
                        onClick={() => openNode(displayedNode)}
                        aria-label={`${copy.enterLabel} ${displayedNode.label}`}
                      >
                        {copy.enterLabel}
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className={styles.philosophy}
          id="philosophy"
          variants={reveal}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: false, amount: 0.12 }}
        >
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.philosophyEyebrow}</p>
            <h2>{copy.philosophyTitle}</h2>
          </div>
          <motion.div className={styles.cardGrid} variants={container}>
            {copy.philosophy.map((item) => (
              <motion.article key={item.title} className={styles.card} variants={reveal}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className={styles.servicesPreview}
          id="services-preview"
          variants={reveal}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: false, amount: 0.12 }}
        >
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.servicesEyebrow}</p>
            <h2>{copy.servicesTitle}</h2>
            <p className={styles.sectionLead}>{copy.servicesLead}</p>
          </div>
          <motion.article className={styles.servicesPreviewCard} variants={reveal}>
            <p className={styles.sectionLead}>{copy.servicesBody}</p>
            <div className={styles.metaChips}>
              {copy.servicesPreviewTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="/services">
                {copy.viewPackages}
              </a>
              <a className={styles.secondary} href={quickQuoteUrl} target="_blank" rel="noreferrer">
                {copy.quickQuote}
              </a>
            </div>
          </motion.article>
        </motion.section>

        <motion.section
          className={styles.principles}
          id="principles"
          variants={reveal}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: false, amount: 0.12 }}
        >
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.principlesEyebrow}</p>
            <h2>{copy.principlesTitle}</h2>
          </div>
          <motion.ul className={styles.principleList} variants={container}>
            {copy.principles.map((item) => (
              <motion.li key={item} variants={reveal}>
                <span className={styles.bullet} />
                <p>{item}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        <motion.section
          className={styles.tech}
          id="tech"
          variants={reveal}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: false, amount: 0.12 }}
        >
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.techEyebrow}</p>
            <h2>{copy.techTitle}</h2>
          </div>
          <motion.div className={styles.stackGrid} variants={container}>
            {copy.techStack.map((group) => (
              <motion.article key={group.title} className={styles.stackCard} variants={reveal}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.footer
          className={styles.footer}
          id="contact"
          variants={reveal}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: false, amount: 0.12 }}
        >
          <div>
            <p className={styles.eyebrow}>{copy.contactEyebrow}</p>
            <h2>{copy.contactTitle}</h2>
            <p className={styles.sectionLead}>{copy.contactLead}</p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="https://mail.google.com/mail/?view=cm&fs=1&to=pabs9230@gmail.com" target="_blank" rel="noreferrer">
                {copy.contactEmail}
              </a>
              <a className={styles.secondary} href="https://www.linkedin.com/in/pablo-marines-lechuga/" target="_blank" rel="noreferrer">
                {copy.contactLinkedIn}
              </a>
              <a className={styles.secondary} href="https://github.com/pabs9230" target="_blank" rel="noreferrer">
                {copy.contactGitHub}
              </a>
            </div>
          </div>
          <div className={styles.footerMeta}>
            <p>{copy.footerMetaOne}</p>
            <p>{copy.footerMetaTwo}</p>
          </div>
        </motion.footer>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
