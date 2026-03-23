"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import GlowParallax from "../../components/GlowParallax";
import styles from "./services.module.css";

type Language = "en" | "es";

type PackageItem = {
  name: string;
  price: number;
  featured: boolean;
  timeline: string;
  summary: string;
  features: string[];
};

type ExtraItem = {
  name: string;
  price: string;
  details: string[];
};

type ModeItem = {
  title: string;
  body: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type LocalizedContent = {
  kicker: string;
  heroTitle: string;
  heroLead: string;
  schemaDescription: string;
  languageToggleAria: string;
  contactEmailLabel: string;
  emailLabel: string;
  demosLabel: string;
  proDemoLabel: string;
  linkedinLabel: string;
  backHomeLabel: string;
  packageSection: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  extrasSection: {
    eyebrow: string;
    title: string;
  };
  appServicesSection: {
    eyebrow: string;
    title: string;
    lead: string;
    capabilities: string[];
    investment: string;
    costNote: string;
    guidance: string;
  };
  coverageSection: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  faqSection: {
    eyebrow: string;
    title: string;
  };
  ctaSection: {
    eyebrow: string;
    title: string;
    lead: string;
    footer: string;
  };
  packages: PackageItem[];
  extras: ExtraItem[];
  modes: ModeItem[];
  seoTags: string[];
  faq: FaqItem[];
};

type ServicesContentProps = {
  canonicalUrl: string;
};

const languageStorageKey = "nocturne-language";
const extraNotePattern = /^\s*(?:NOTE|NOTA)\s*:/i;

const content: Record<Language, LocalizedContent> = {
  en: {
    kicker: "Nocturne Services · Landing Page Development",
    heroTitle: "Senior landing page packages built for conversion and scale",
    heroLead:
      "I design and build high-performing landing pages for businesses and teams that need measurable outcomes, not only visuals. Engagement models include remote, nearshore, and on-site collaboration in Cancun, Quintana Roo, and across the Yucatan Peninsula.",
    schemaDescription:
      "Senior freelance landing page development for conversion-focused teams. Remote, nearshore, and on-site delivery in Cancun, Quintana Roo, and the Yucatan Peninsula.",
    languageToggleAria: "Switch language",
    contactEmailLabel: "Email quick quote",
    emailLabel: "Email inquiry",
    demosLabel: "View system demos",
    proDemoLabel: "View Landing Pro demo",
    linkedinLabel: "LinkedIn profile",
    backHomeLabel: "Back to Nocturne home",
    packageSection: {
      eyebrow: "Packages",
      title: "Choose the right delivery scope",
      lead: "Package pricing is in USD. Selected add-ons can be quoted in MXN.",
    },
    extrasSection: {
      eyebrow: "Extras",
      title: "Maintenance and enhancement services",
    },
    appServicesSection: {
      eyebrow: "App development services",
      title: "Web platforms, mobile apps, management tools, automation and more",
      lead:
        "Beyond landing pages, I also build both lightweight and robust technology for businesses that need to better organize processes, capture data, or automate operations.",
      capabilities: [
        "Mini CRMs",
        "Dashboards",
        "Internal portals",
        "Booking systems",
        "Advanced forms",
        "Automation workflows with interface",
        "PayPal payment systems",
      ],
      investment: "Estimated investment: Projects starting at $1200 USD",
      costNote:
        "Final cost depends on scope, number of screens, flows, user roles, and integrations.",
      guidance:
        "Not sure if you need a landing page or a mini app? I can help you define the best solution based on your objective.",
    },
    coverageSection: {
      eyebrow: "Engagement models",
      title: "Remote, nearshore, and on-site collaboration",
      lead:
        "Typical projects include local businesses in Cancun, regional teams in Quintana Roo, and international clients seeking a senior nearshore developer in Mexico.",
    },
    faqSection: {
      eyebrow: "FAQ",
      title: "Common questions before kickoff",
    },
    ctaSection: {
      eyebrow: "Start your project",
      title: "Need a landing page that can actually perform?",
      lead:
        "Share your objective, audience, and timeline. I will suggest the package and implementation approach that fits your growth stage.",
      footer: "Pablo Marines · Senior software engineer/Freelance developer · Cancun, Mexico",
    },
    packages: [
      {
        name: "Landing Starter",
        price: 280,
        featured: false,
        timeline: "Delivery in 4-6 business days",
        summary: "Best for businesses that need a professional online presence and fast contact flow.",
        features: [
          "1 landing page (single-page site)",
          "Responsive design for mobile and desktop",
          "Up to 5 sections",
          "Floating email quote button",
          "Simple contact form",
          "Social media links",
          "Deployment and publishing",
          "1 revision round",
        ],
      },
      {
        name: "Landing Pro",
        price: 510,
        featured: true,
        timeline: "Delivery in 5-8 business days",
        summary: "Best value package for conversion-focused businesses and campaign-ready structure.",
        features: [
          "Everything in Starter",
          "Conversion-oriented page architecture",
          "CTA-focused content organization",
          "FAQ section",
          "Google Maps or location section when applicable",
          "Enhanced contact form",
          "Basic SEO: title, description, headings",
          "Google Analytics setup",
          "Domain configuration (if domain is already available)",
          "2 revision rounds",
        ],
      },
      {
        name: "Landing Growth",
        price: 795,
        featured: false,
        timeline: "Delivery in 5-10 business days",
        summary: "For teams running campaigns and needing stronger tracking, speed, and lead quality.",
        features: [
          "Everything in Pro",
          "Performance optimization",
          "Meta Pixel or similar tracking integration",
          "Optimized testimonial section",
          "Extended SEO FAQ",
          "Advanced lead capture integration",
          "30 days of minor support and adjustments",
          "Priority delivery",
        ],
      },
    ],
    extras: [
      {
        name: "Monthly maintenance",
        price: "$70-$250 USD / month",
        details: [
          "Text and image updates",
          "Promotion refreshes",
          "Minor support",
          "Basic health checks",
          "Periodical backups and performance review",
          "NOTE: Price range based on expected update frequency and complexity.",
        ],
      },
      {
        name: "Professional contact form notifications",
        price: "$85-$200 USD",
        details: [
          "Email delivery flow",
          "User confirmation message",
          "Optional lead persistence",
          "Improved lead handling",
        ],
      },
      {
        name: "Simple lead automation",
        price: "$230-$685 USD",
        details: [
          "Form to email + Google Sheets",
          "Form to database",
          "Form to lightweight dashboard",
          "Form to automated follow-up workflow",
          "Webhook + small API integration",
        ],
      },
      {
        name: "Bilingual page setup",
        price: "Starting at $140 USD",
        details: [
          "English + Spanish page versions",
          "Copy and section adaptation by language",
          "Navigation and CTA consistency across languages",
          "Metadata and SEO structure per language",
          "NOTE: Base price custom variable by page and number of sections.",
        ],
      },
      {
        name: "Hosting and domain management",
        price: "Starting at $165 USD / month",
        details: [
          "Full purchase and renewal handling",
          "Technical setup and ongoing hosting/domain administration",
          "DNS, SSL, and email routing setup",
          "Recommended for clients who want zero hosting friction",
          "NOTE: Base price custom variable based on client needs and project complexity.",
        ],
      },
    ],
    modes: [
      {
        title: "Remote",
        body: "Async-friendly workflow, weekly checkpoints, and transparent delivery from kickoff to launch.",
      },
      {
        title: "Nearshore",
        body: "Timezone-compatible execution for US and LATAM teams with practical communication cadence.",
      },
      {
        title: "On-site",
        body: "Available for selected engagements in Cancun and nearby areas in Quintana Roo and Yucatan Peninsula.",
      },
    ],
    seoTags: [
      "Senior freelance developer",
      "Landing page developer",
      "Nearshore development",
      "Remote development partner",
      "On-site development in Cancun",
      "Freelance web developer Cancun",
      "Quintana Roo web developer",
      "Yucatan Peninsula software engineer",
    ],
    faq: [
      {
        q: "Do you work remotely, nearshore, and on-site?",
        a: "Yes. I work fully remote, nearshore with US and LATAM teams, and on-site for projects in Cancun and nearby areas in Quintana Roo.",
      },
      {
        q: "Are these packages suitable for SEO and paid campaigns?",
        a: "Yes. Pro and Growth include structured, conversion-oriented sections and baseline SEO practices. Growth is designed for stronger campaign tracking and performance tuning.",
      },
      {
        q: "Can you handle bilingual landing pages?",
        a: "Yes. English and Spanish delivery is available, including CTA flow, structure, and metadata strategy.",
      },
      {
        q: "Do you build accessible landing pages?",
        a: "Yes. Accessibility is integrated through semantic structure, readable hierarchy, keyboard-friendly interactions, and practical UX conventions.",
      },
    ],
  },
  es: {
    kicker: "Servicios Nocturne · Desarrollo de Landing Pages",
    heroTitle: "Paquetes senior de landing pages para conversión y crecimiento",
    heroLead:
      "Diseño y desarrollo landing pages de alto rendimiento para negocios y equipos que necesitan resultados medibles, no solo visuales. Los modelos de trabajo incluyen colaboración remota, nearshore y presencial en Cancún, Quintana Roo y toda la Península de Yucatán.",
    schemaDescription:
      "Desarrollo freelance senior de landing pages para equipos enfocados en conversión. Entrega remota, nearshore y presencial en Cancún, Quintana Roo y la Península de Yucatán.",
    languageToggleAria: "Cambiar idioma",
    contactEmailLabel: "Cotización rápida por correo",
    emailLabel: "Consulta por email",
    demosLabel: "Ver demos del sistema",
    proDemoLabel: "Ver demo Landing Pro",
    linkedinLabel: "Perfil de LinkedIn",
    backHomeLabel: "Volver al inicio de Nocturne",
    packageSection: {
      eyebrow: "Paquetes",
      title: "Elige el alcance ideal para tu proyecto",
      lead: "Los paquetes y extras están en MXN.",
    },
    extrasSection: {
      eyebrow: "Extras",
      title: "Servicios de mantenimiento y mejoras",
    },
    appServicesSection: {
      eyebrow: "Desarrollo de apps",
      title: "Plataformas web, apps móviles, herramientas de gestión, automatización y más",
      lead:
        "Además de landing pages, también desarrollo tecnologia tanto ligera como robusta para negocios que necesitan organizar mejor procesos, capturar datos o automatizar operaciones.",
      capabilities: [
        "Mini CRMs",
        "Dashboards",
        "Portales internos",
        "Reservas",
        "Formularios avanzados",
        "Automatización con interfaz",
        "Sistemas de pagos con PayPal",
      ],
      investment: "Inversión estimada: Proyectos a partir de $1200 USD",
      costNote:
        "El costo final depende del alcance, pantallas, flujos, usuarios e integraciones.",
      guidance:
        "¿No sabes si necesitas una landing o una mini app? Puedo ayudarte a definir la mejor solución según tu objetivo.",
    },
    coverageSection: {
      eyebrow: "Modelos de trabajo",
      title: "Colaboración remota, nearshore y presencial",
      lead:
        "Trabajo con negocios locales en Cancún, equipos regionales en Quintana Roo y clientes internacionales que buscan un desarrollador senior nearshore en México.",
    },
    faqSection: {
      eyebrow: "Preguntas frecuentes",
      title: "Dudas comunes antes de iniciar",
    },
    ctaSection: {
      eyebrow: "Inicia tu proyecto",
      title: "¿Necesitas una landing page que dé resultados reales?",
      lead:
        "Comparte tu objetivo, audiencia y tiempos. Te recomiendo el paquete y el enfoque de implementación que mejor se adapte a tu etapa de crecimiento.",
      footer: "Pablo Marines · Ingeniero de software senior/Programador freelance · Cancún, México",
    },
    packages: [
      {
        name: "Landing Starter",
        price: 5000,
        featured: false,
        timeline: "Entrega en 4-6 días hábiles",
        summary: "Ideal para negocios que necesitan presencia profesional y una vía rápida de contacto.",
        features: [
          "1 landing page (sitio de una sola página)",
          "Diseño responsive para móvil y desktop",
          "Hasta 5 secciones",
          "Botón flotante para cotización por correo",
          "Formulario de contacto simple",
          "Links a redes sociales",
          "Publicacion y deploy",
          "1 ronda de cambios",
        ],
      },
      {
        name: "Landing Pro",
        price: 9000,
        featured: true,
        timeline: "Entrega en 5-8 días hábiles",
        summary: "Mejor relación valor/precio para negocios orientados a conversión y campañas.",
        features: [
          "Todo lo del Starter",
          "Estructura optimizada para conversión",
          "Contenido orientado a CTA",
          "Sección FAQ",
          "Google Maps o ubicación (si aplica)",
          "Formulario mejorado",
          "SEO básico: title, description, headings",
          "Configuración de Google Analytics",
          "Configuración de dominio (si ya existe)",
          "2 rondas de cambios",
        ],
      },
      {
        name: "Landing Growth",
        price: 14000,
        featured: false,
        timeline: "Entrega en 5-10 días hábiles",
        summary: "Para equipos que ejecutan campañas y necesitan mejor tracking, velocidad y calidad de leads.",
        features: [
          "Todo lo del Pro",
          "Optimización de rendimiento",
          "Integración de Meta Pixel o similar",
          "Sección de testimonios optimizada",
          "FAQ SEO extendida",
          "Integración avanzada de captación",
          "30 días de soporte y ajustes menores",
          "Entrega prioritaria",
        ],
      },
    ],
    extras: [
      {
        name: "Mantenimiento mensual",
        price: "$1250 - $4500 MXN / mes",
        details: [
          "Cambios de texto e imágenes",
          "Actualización de promociones",
          "Soporte menor",
          "Revisión básica del sitio",
          "Respaldo periódico y revisión de rendimiento",
          "NOTA: Rango de precio basado en frecuencia y complejidad de actualizaciones.",
        ],
      },
      {
        name: "Formulario con notificaciones profesionales",
        price: "$1500 - $3500 MXN",
        details: [
          "Flujo de envío por email",
          "Mensaje de confirmación al usuario",
          "Guardado opcional de leads",
          "Mejor manejo de prospectos",
        ],
      },
      {
        name: "Automatización simple de leads",
        price: "$4100 - $12330 MXN",
        details: [
          "Formulario a email + Google Sheets",
          "Formulario a base de datos",
          "Formulario a dashboard ligero",
          "Formulario a flujo automático de seguimiento",
          "Integración por webhook + API pequeña",
        ],
      },
      {
        name: "Página bilingüe",
        price: "Desde $2500 MXN",
        details: [
          "Versión completa en inglés y español",
          "Adaptación de contenido y secciones por idioma",
          "Navegación y CTA consistentes entre idiomas",
          "Metadata y estructura SEO por idioma",
          "NOTA: Precio base personalizado por página y cantidad de secciones.",
        ],
      },
      {
        name: "Hosting y dominio",
        price: "Desde $3000 MXN",
        details: [
          "Compra y renovación completa del hosting y dominio",
          "Configuración técnica y administración continua del hosting/dominio",
          "Configuración de DNS, SSL y correo",
          "Recomendado para clientes que no quieren lidiar con molestias técnicas",
          "NOTA: Precio base personalizado variable según necesidades del cliente y complejidad del proyecto.",
        ],
      },
    ],
    modes: [
      {
        title: "Remoto",
        body: "Flujo de trabajo asíncrono, checkpoints semanales y entrega transparente de inicio a lanzamiento.",
      },
      {
        title: "Nearshore",
        body: "Ejecución compatible en zona horaria para equipos de US y LATAM con comunicación clara.",
      },
      {
        title: "Presencial",
        body: "Disponible para proyectos seleccionados en Cancún y zonas cercanas de Quintana Roo y Península de Yucatán.",
      },
    ],
    seoTags: [
      "Desarrollador freelance senior",
      "Desarrollador de landing pages",
      "Desarrollo nearshore en Mexico",
      "Desarrollador remoto para empresas",
      "Desarrollo presencial en Cancún",
      "Desarrollador web en Cancún",
      "Desarrollador web en Quintana Roo",
      "Ingeniero de software en Península de Yucatán",
      "Servicios web para negocios en México",
      "Diseño web accesible",
    ],
    faq: [
      {
        q: "¿Trabajas remoto, nearshore y presencial?",
        a: "Sí. Trabajo de forma remota, nearshore con equipos de US y LATAM, y presencial en proyectos seleccionados en Cancún y zonas cercanas de Quintana Roo.",
      },
      {
        q: "¿Estos paquetes sirven para SEO y campañas de pago?",
        a: "Sí. Pro y Growth incluyen estructura orientada a conversión y prácticas SEO base. Growth está pensado para tracking más avanzado y mejor rendimiento.",
      },
      {
        q: "¿Puedes hacer landing pages bilingües?",
        a: "Sí. Entrego en inglés y español, incluyendo estructura, flujo de CTA y estrategia de metadata.",
      },
      {
        q: "¿Construyes landing pages accesibles?",
        a: "Sí. La accesibilidad se integra con estructura semántica, jerarquía clara, navegación por teclado y buenas prácticas de UX.",
      },
    ],
  },
};

export default function ServicesContent({ canonicalUrl }: ServicesContentProps) {
  const [lang, setLang] = useState<Language>("en");
  const reduceMotion = useReducedMotion();

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

  const copy = content[lang];
  const packageCurrency = lang === "es" ? "MXN" : "USD";
  const packagePriceFormatter = useMemo(
    () => new Intl.NumberFormat(lang === "es" ? "es-MX" : "en-US"),
    [lang],
  );
  const quickQuoteEmailUrl = useMemo(() => {
    const body =
      lang === "es"
        ? "Hola, me interesan tus servicios de programacion."
        : "Hello, I'm interested in your programming services.";

    return `https://mail.google.com/mail/?view=cm&fs=1&to=pabs9230@gmail.com&body=${encodeURIComponent(body)}`;
  }, [lang]);

  const serviceSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Nocturne Landing Page Development",
      description: copy.schemaDescription,
      url: canonicalUrl,
      areaServed: [
        { "@type": "City", name: "Cancun" },
        { "@type": "AdministrativeArea", name: "Quintana Roo" },
        { "@type": "AdministrativeArea", name: "Yucatan Peninsula" },
        { "@type": "Country", name: "Mexico" },
      ],
      availableLanguage: ["English", "Spanish"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cancun",
        addressRegion: "Quintana Roo",
        addressCountry: "MX",
      },
      sameAs: [
        "https://www.linkedin.com/in/pablo-marines-lechuga/",
        "https://github.com/pabs9230",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Landing Page Packages",
        itemListElement: copy.packages.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.name,
            description: item.summary,
          },
          price: item.price,
          priceCurrency: packageCurrency,
          availability: "https://schema.org/InStock",
        })),
      },
    }),
    [canonicalUrl, copy, packageCurrency],
  );

  return (
    <div className={styles.page}>
      <GlowParallax />
      <div className={styles.aurora} aria-hidden />
      <main className={styles.shell} lang={lang === "es" ? "es-MX" : "en"}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

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
              <p className={styles.kicker}>{copy.kicker}</p>
              <h1 className={styles.heroTitle}>{copy.heroTitle}</h1>
              <p className={styles.heroLead}>{copy.heroLead}</p>
              <div className={styles.heroActions}>
                <a className={styles.primary} href={quickQuoteEmailUrl} target="_blank" rel="noreferrer">
                  {copy.contactEmailLabel}
                </a>
                <Link className={styles.primary} href="/#map">
                  {copy.demosLabel}
                </Link>
                <Link className={styles.demoProButton} href="/demo/black-lion-muay-thai" target="_blank">
                  <span className={styles.demoProButtonText}>{copy.proDemoLabel}</span>
                </Link>
              </div>
            </section>

            <section className={styles.section} aria-labelledby="packages-title">
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{copy.packageSection.eyebrow}</p>
                <h2 id="packages-title" className={styles.sectionTitle}>
                  {copy.packageSection.title}
                </h2>
                <p className={styles.sectionLead}>{copy.packageSection.lead}</p>
              </div>
              <div className={styles.packagesGrid}>
                {copy.packages.map((item) => (
                  <article key={item.name} className={`${styles.packageCard} ${item.featured ? styles.featured : ""}`}>
                    <p className={styles.packageName}>{item.name}</p>
                    <p className={styles.price}>${packagePriceFormatter.format(item.price)} {packageCurrency}</p>
                    <p className={styles.timeline}>{item.timeline}</p>
                    <p className={styles.packageSummary}>{item.summary}</p>
                    <ul className={styles.packageList}>
                      {item.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className={`${styles.section} ${styles.showcaseSection} ${styles.appShowcaseSection}`} aria-labelledby="app-services-title">
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{copy.appServicesSection.eyebrow}</p>
                <h2 id="app-services-title" className={styles.sectionTitle}>
                  {copy.appServicesSection.title}
                </h2>
                <p className={styles.sectionLead}>{copy.appServicesSection.lead}</p>
              </div>
              <div className={`${styles.extrasGrid} ${styles.showcaseGrid}`}>
                <article className={`${styles.extraCard} ${styles.showcaseCard} ${styles.appCapabilityCard}`}>
                  <ul>
                    {copy.appServicesSection.capabilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article className={`${styles.extraCard} ${styles.showcaseCard} ${styles.appInvestmentCard}`}>
                  <p className={styles.extraPrice}>{copy.appServicesSection.investment}</p>
                  <p>{copy.appServicesSection.costNote}</p>
                  <p>{copy.appServicesSection.guidance}</p>
                </article>
              </div>
            </section>

            <section className={`${styles.section} ${styles.showcaseSection}`} aria-labelledby="extras-title">
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{copy.extrasSection.eyebrow}</p>
                <h2 id="extras-title" className={styles.sectionTitle}>
                  {copy.extrasSection.title}
                </h2>
              </div>
              <div className={`${styles.extrasGrid} ${styles.showcaseGrid}`}>
                {copy.extras.map((item) => (
                  <article key={item.name} className={`${styles.extraCard} ${styles.showcaseCard}`}>
                    <h3>{item.name}</h3>
                    <p className={styles.extraPrice}>{item.price}</p>
                    <ul>
                      {item.details.map((detail) => {
                        const isNote = extraNotePattern.test(detail);
                        return (
                          <li key={detail} className={isNote ? styles.extraNote : undefined}>
                            {detail}
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.section} aria-labelledby="coverage-title">
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{copy.coverageSection.eyebrow}</p>
                <h2 id="coverage-title" className={styles.sectionTitle}>
                  {copy.coverageSection.title}
                </h2>
                <p className={styles.sectionLead}>{copy.coverageSection.lead}</p>
              </div>
              <div className={styles.modesGrid}>
                {copy.modes.map((item) => (
                  <article key={item.title} className={styles.modeCard}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
              <div className={styles.tagCloud} aria-label="search tags">
                {copy.seoTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </section>

            <section className={styles.section} aria-labelledby="faq-title">
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{copy.faqSection.eyebrow}</p>
                <h2 id="faq-title" className={styles.sectionTitle}>
                  {copy.faqSection.title}
                </h2>
              </div>
              <div className={styles.faqList}>
                {copy.faq.map((item) => (
                  <article key={item.q} className={styles.faqItem}>
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.ctaCard} aria-labelledby="cta-title">
              <p className={styles.eyebrow}>{copy.ctaSection.eyebrow}</p>
              <h2 id="cta-title" className={styles.ctaTitle}>
                {copy.ctaSection.title}
              </h2>
              <p>{copy.ctaSection.lead}</p>
              <div className={styles.heroActions}>
                <a className={styles.primary} href={quickQuoteEmailUrl} target="_blank" rel="noreferrer">
                  {copy.contactEmailLabel}
                </a>
                <a
                  className={styles.primary}
                  href="https://www.linkedin.com/in/pablo-marines-lechuga/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.linkedinLabel}
                </a>
                <Link className={styles.secondary} href="/">
                  {copy.backHomeLabel}
                </Link>
              </div>
              <p className={styles.footerLine}>{copy.ctaSection.footer}</p>
            </section>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
