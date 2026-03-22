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
  whatsappLabel: string;
  emailLabel: string;
  demosLabel: string;
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
  whatsappUrl: string;
};

const languageStorageKey = "nocturne-language";

const content: Record<Language, LocalizedContent> = {
  en: {
    kicker: "Nocturne Services · Landing Page Development",
    heroTitle: "Senior landing page packages built for conversion and scale",
    heroLead:
      "I design and build high-performing landing pages for businesses and teams that need measurable outcomes, not only visuals. Engagement models include remote, nearshore, and on-site collaboration in Cancun, Quintana Roo, and across the Yucatan Peninsula.",
    schemaDescription:
      "Senior freelance landing page development for conversion-focused teams. Remote, nearshore, and on-site delivery in Cancun, Quintana Roo, and the Yucatan Peninsula.",
    languageToggleAria: "Switch language",
    whatsappLabel: "WhatsApp quick quote",
    emailLabel: "Email inquiry",
    demosLabel: "View system demos",
    linkedinLabel: "LinkedIn profile",
    backHomeLabel: "Back to Nocturne home",
    packageSection: {
      eyebrow: "Packages",
      title: "Choose the right delivery scope",
      lead: "All pricing is in USD.",
    },
    extrasSection: {
      eyebrow: "Extras",
      title: "Upsells that strengthen lead operations",
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
      footer: "Nocturne · Senior systems engineer · Cancun, Mexico",
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
          "Floating WhatsApp button",
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
        price: "$70-$140 USD / month",
        details: [
          "Text and image updates",
          "Promotion refreshes",
          "Minor support",
          "Basic health checks",
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
    heroTitle: "Paquetes senior de landing pages para conversion y crecimiento",
    heroLead:
      "Diseno y desarrollo landing pages de alto rendimiento para negocios y equipos que necesitan resultados medibles, no solo visuales. Los modelos de trabajo incluyen colaboracion remota, nearshore y presencial en Cancun, Quintana Roo y toda la Peninsula de Yucatan.",
    schemaDescription:
      "Desarrollo freelance senior de landing pages para equipos enfocados en conversion. Entrega remota, nearshore y presencial en Cancun, Quintana Roo y la Peninsula de Yucatan.",
    languageToggleAria: "Cambiar idioma",
    whatsappLabel: "Cotizacion rapida por WhatsApp",
    emailLabel: "Consulta por email",
    demosLabel: "Ver demos del sistema",
    linkedinLabel: "Perfil de LinkedIn",
    backHomeLabel: "Volver al inicio de Nocturne",
    packageSection: {
      eyebrow: "Paquetes",
      title: "Elige el alcance ideal para tu proyecto",
      lead: "Todos los precios estan en USD.",
    },
    extrasSection: {
      eyebrow: "Extras",
      title: "Upsells para mejorar tu captacion de leads",
    },
    coverageSection: {
      eyebrow: "Modelos de trabajo",
      title: "Colaboracion remota, nearshore y presencial",
      lead:
        "Trabajo con negocios locales en Cancun, equipos regionales en Quintana Roo y clientes internacionales que buscan un desarrollador senior nearshore en Mexico.",
    },
    faqSection: {
      eyebrow: "Preguntas frecuentes",
      title: "Dudas comunes antes de iniciar",
    },
    ctaSection: {
      eyebrow: "Inicia tu proyecto",
      title: "Necesitas una landing page que de resultados reales?",
      lead:
        "Comparte tu objetivo, audiencia y tiempos. Te recomiendo el paquete y el enfoque de implementacion que mejor se adapte a tu etapa de crecimiento.",
      footer: "Nocturne · Ingeniero senior de sistemas · Cancun, Mexico",
    },
    packages: [
      {
        name: "Landing Starter",
        price: 280,
        featured: false,
        timeline: "Entrega en 4-6 dias habiles",
        summary: "Ideal para negocios que necesitan presencia profesional y una via rapida de contacto.",
        features: [
          "1 landing page (sitio de una sola pagina)",
          "Diseno responsive para movil y desktop",
          "Hasta 5 secciones",
          "Boton flotante de WhatsApp",
          "Formulario de contacto simple",
          "Links a redes sociales",
          "Publicacion y deploy",
          "1 ronda de cambios",
        ],
      },
      {
        name: "Landing Pro",
        price: 510,
        featured: true,
        timeline: "Entrega en 5-8 dias habiles",
        summary: "Mejor relacion valor/precio para negocios orientados a conversion y campanas.",
        features: [
          "Todo lo del Starter",
          "Estructura optimizada para conversion",
          "Contenido orientado a CTA",
          "Seccion FAQ",
          "Google Maps o ubicacion (si aplica)",
          "Formulario mejorado",
          "SEO basico: title, description, headings",
          "Configuracion de Google Analytics",
          "Configuracion de dominio (si ya existe)",
          "2 rondas de cambios",
        ],
      },
      {
        name: "Landing Growth",
        price: 795,
        featured: false,
        timeline: "Entrega en 5-10 dias habiles",
        summary: "Para equipos que ejecutan campanas y necesitan mejor tracking, velocidad y calidad de leads.",
        features: [
          "Todo lo del Pro",
          "Optimizacion de rendimiento",
          "Integracion de Meta Pixel o similar",
          "Seccion de testimonios optimizada",
          "FAQ SEO extendida",
          "Integracion avanzada de captacion",
          "30 dias de soporte y ajustes menores",
          "Entrega prioritaria",
        ],
      },
    ],
    extras: [
      {
        name: "Mantenimiento mensual",
        price: "$70-$140 USD / mes",
        details: [
          "Cambios de texto e imagenes",
          "Actualizacion de promociones",
          "Soporte menor",
          "Revision basica del sitio",
        ],
      },
      {
        name: "Formulario con notificaciones profesionales",
        price: "$85-$200 USD",
        details: [
          "Flujo de envio por email",
          "Mensaje de confirmacion al usuario",
          "Guardado opcional de leads",
          "Mejor manejo de prospectos",
        ],
      },
      {
        name: "Automatizacion simple de leads",
        price: "$230-$685 USD",
        details: [
          "Formulario a email + Google Sheets",
          "Formulario a base de datos",
          "Formulario a dashboard ligero",
          "Formulario a flujo automatico de seguimiento",
          "Integracion por webhook + API pequena",
        ],
      },
    ],
    modes: [
      {
        title: "Remoto",
        body: "Flujo de trabajo asincrono, checkpoints semanales y entrega transparente de inicio a lanzamiento.",
      },
      {
        title: "Nearshore",
        body: "Ejecucion compatible en zona horaria para equipos de US y LATAM con comunicacion clara.",
      },
      {
        title: "Presencial",
        body: "Disponible para proyectos seleccionados en Cancun y zonas cercanas de Quintana Roo y Peninsula de Yucatan.",
      },
    ],
    seoTags: [
      "Desarrollador freelance senior",
      "Desarrollador de landing pages",
      "Desarrollo nearshore en Mexico",
      "Desarrollador remoto para empresas",
      "Desarrollo presencial en Cancun",
      "Desarrollador web en Cancun",
      "Desarrollador web en Quintana Roo",
      "Ingeniero de software en Peninsula de Yucatan",
      "Servicios web para negocios en Mexico",
      "Diseno web accesible",
    ],
    faq: [
      {
        q: "Trabajas remoto, nearshore y presencial?",
        a: "Si. Trabajo de forma remota, nearshore con equipos de US y LATAM, y presencial en proyectos seleccionados en Cancun y zonas cercanas de Quintana Roo.",
      },
      {
        q: "Estos paquetes sirven para SEO y campanas de pago?",
        a: "Si. Pro y Growth incluyen estructura orientada a conversion y practicas SEO base. Growth esta pensado para tracking mas avanzado y mejor rendimiento.",
      },
      {
        q: "Puedes hacer landing pages bilingues?",
        a: "Si. Entrego en ingles y espanol, incluyendo estructura, flujo de CTA y estrategia de metadata.",
      },
      {
        q: "Construyes landing pages accesibles?",
        a: "Si. La accesibilidad se integra con estructura semantica, jerarquia clara, navegacion por teclado y buenas practicas de UX.",
      },
    ],
  },
};

export default function ServicesContent({ canonicalUrl, whatsappUrl }: ServicesContentProps) {
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
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        })),
      },
    }),
    [canonicalUrl, copy],
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
                <a className={styles.primary} href={whatsappUrl} target="_blank" rel="noreferrer">
                  {copy.whatsappLabel}
                </a>
                <a
                  className={styles.secondary}
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=pabs9230@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.emailLabel}
                </a>
                <Link className={styles.secondary} href="/#ecosystem">
                  {copy.demosLabel}
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
                    <p className={styles.price}>${item.price} USD</p>
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

            <section className={styles.section} aria-labelledby="extras-title">
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{copy.extrasSection.eyebrow}</p>
                <h2 id="extras-title" className={styles.sectionTitle}>
                  {copy.extrasSection.title}
                </h2>
              </div>
              <div className={styles.extrasGrid}>
                {copy.extras.map((item) => (
                  <article key={item.name} className={styles.extraCard}>
                    <h3>{item.name}</h3>
                    <p className={styles.extraPrice}>{item.price}</p>
                    <ul>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
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
                <a className={styles.primary} href={whatsappUrl} target="_blank" rel="noreferrer">
                  {copy.whatsappLabel}
                </a>
                <a
                  className={styles.secondary}
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
