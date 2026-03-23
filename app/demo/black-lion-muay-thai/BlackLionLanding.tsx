"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import styles from "./blackLion.module.css";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

type Language = "en" | "es";
type ZoneId = "north" | "east" | "south" | "west";

type ProgramCard = {
  title: string;
  subtitle: string;
  bullets: string[];
};

type Tier = {
  name: string;
  price: string;
  sessions: string;
  focus: string;
  featured?: boolean;
};

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type Zone = {
  id: ZoneId;
  label: string;
  summary: string;
  nearby: string[];
  x: number;
  y: number;
};

type LocalizedCopy = {
  langAria: string;
  heroKicker: string;
  heroTitle: string;
  heroLead: string;
  heroPrimary: string;
  heroSecondary: string;
  heroTertiary: string;
  trustChips: string[];
  programsEyebrow: string;
  programsTitle: string;
  programsLead: string;
  programs: ProgramCard[];
  scheduleEyebrow: string;
  scheduleTitle: string;
  scheduleLead: string;
  scheduleList: string[];
  pricingTitle: string;
  tiers: Tier[];
  mapEyebrow: string;
  mapTitle: string;
  mapLead: string;
  mapTooltip: string;
  mapNote: string;
  mapAria: string;
  mapPanelTitle: string;
  mapPanelNearby: string;
  zones: Zone[];
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  testimonials: Testimonial[];
  faqEyebrow: string;
  faqTitle: string;
  faq: FaqItem[];
  formEyebrow: string;
  formTitle: string;
  formLead: string;
  fieldName: string;
  fieldEmail: string;
  fieldPhone: string;
  fieldDiscipline: string;
  fieldGoal: string;
  fieldSchedule: string;
  fieldMessage: string;
  consentLabel: string;
  submitLabel: string;
  submittingLabel: string;
  successLabel: string;
  formDisclaimer: string;
  goalOptions: string[];
  disciplineOptions: string[];
  scheduleOptions: string[];
  requiredMessage: string;
  invalidEmailMessage: string;
  footerLine: string;
  schemaDescription: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  discipline: string;
  goal: string;
  schedule: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<"name" | "email" | "discipline" | "goal" | "consent", string>>;

type BlackLionLandingProps = {
  canonicalUrl: string;
  contactEmailUrl: string;
};

type HeroCarouselSlide = {
  src: string;
  altEn: string;
  altEs: string;
};

type ScheduleCalendarEvent = {
  title: string;
  time: string;
};

type ScheduleCalendarBoard = {
  dayLabels: string[];
  dayEvents: ScheduleCalendarEvent[][];
};

const languageStorageKey = "nocturne-language";

const heroCarouselSlides: HeroCarouselSlide[] = [
  {
    src: "/carrousell-1.jpeg",
    altEn: "Black Lion athletes training Brazilian Jiu-Jitsu grappling on academy mats",
    altEs: "Atletas de Black Lion entrenando grappling de Jiu-Jitsu Brasileño sobre tatami",
  },
  {
    src: "/carrousell-2.jpeg",
    altEn: "MMA fight exchange inside a Black Lion octagon-style cage",
    altEs: "Intercambio de pelea MMA dentro de una jaula estilo octágono de Black Lion",
  },
  {
    src: "/carrousell-3.png",
    altEn: "High-impact Muay Thai kick during a professional ring bout",
    altEs: "Patada de alto impacto de Muay Thai durante una pelea profesional en ring",
  },
  {
    src: "/carrousell-4.png",
    altEn: "Close-range boxing sparring with gloves and headgear under gym lights",
    altEs: "Sparring de boxeo a corta distancia con guantes y careta bajo luces de gimnasio",
  },
  {
    src: "/carrousell-5.png",
    altEn: "Serious women division for competition prep at Black Lion, with two athletes exchanging strikes in a cage match",
    altEs: "División femenina seria para preparación de competencia en Black Lion, con dos atletas intercambiando golpes en un combate de jaula",
  },
];

const stripAccents = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

function buildScheduleCalendar(entries: string[], lang: Language): ScheduleCalendarBoard {
  const isSpanish = lang === "es";
  const dayLabels = isSpanish
    ? ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const dayAliases: Record<string, number> = isSpanish
    ? {
      lun: 0,
      lunes: 0,
      mar: 1,
      martes: 1,
      mie: 2,
      miercoles: 2,
      jue: 3,
      jueves: 3,
      vie: 4,
      viernes: 4,
      sab: 5,
      sabado: 5,
      dom: 6,
      domingo: 6,
    }
    : {
      mon: 0,
      monday: 0,
      tue: 1,
      tues: 1,
      tuesday: 1,
      wed: 2,
      wednesday: 2,
      thu: 3,
      thur: 3,
      thurs: 3,
      thursday: 3,
      fri: 4,
      friday: 4,
      sat: 5,
      saturday: 5,
      sun: 6,
      sunday: 6,
    };

  const dayEvents = dayLabels.map(() => [] as ScheduleCalendarEvent[]);

  entries.forEach((entry) => {
    const [segment, timeSegment = ""] = entry.split("·").map((value) => value.trim());
    const [daysSegment, titleSegment = ""] = segment.split(" - ").map((value) => value.trim());
    const eventTitle = titleSegment || segment;
    const eventTime = timeSegment || (isSpanish ? "Horario por definir" : "Time TBD");
    const dayIndexes = new Set<number>();

    daysSegment
      .split("/")
      .map((token) => stripAccents(token))
      .forEach((token) => {
        const dayIndex = dayAliases[token];
        if (typeof dayIndex === "number") {
          dayIndexes.add(dayIndex);
        }
      });

    dayIndexes.forEach((dayIndex) => {
      dayEvents[dayIndex].push({
        title: eventTitle,
        time: eventTime,
      });
    });
  });

  const visibleDayIndexes = dayEvents
    .map((events, index) => ({ events, index }))
    .filter(({ events, index }) => events.length > 0 || index < 5)
    .map(({ index }) => index);

  return {
    dayLabels: visibleDayIndexes.map((index) => dayLabels[index]),
    dayEvents: visibleDayIndexes.map((index) => dayEvents[index]),
  };
}

const copyByLanguage: Record<Language, LocalizedCopy> = {
  en: {
    langAria: "Switch page language",
    heroKicker: "Black Lion Muay Thai · Landing Pro Demo",
    heroTitle: "Train with discipline. Fight with strategy. Grow with a real system.",
    heroLead:
      "Black Lion Muay Thai is a fictional MMA academy demo designed as a conversion-ready final product. Programs include Muay Thai, BJJ, and Kickboxing with beginner to advanced pathways.",
    heroPrimary: "Book your trial class",
    heroSecondary: "See membership plans",
    heroTertiary: "Back to services",
    trustChips: ["Muay Thai", "BJJ", "Kickboxing", "Beginner friendly", "Competition prep"],
    programsEyebrow: "Core programs",
    programsTitle: "Three combat disciplines. One integrated MMA mindset.",
    programsLead: "Each class block is structured for technical progression, conditioning, and controlled sparring.",
    programs: [
      {
        title: "Muay Thai",
        subtitle: "Striking precision + ring IQ",
        bullets: ["Pad work and clinch basics", "Footwork and defense layers", "Controlled sparring progression"],
      },
      {
        title: "Brazilian Jiu-Jitsu",
        subtitle: "Position, pressure, submissions",
        bullets: ["Fundamental positional system", "Escapes and guard retention", "No-gi and gi class blocks"],
      },
      {
        title: "Kickboxing",
        subtitle: "Volume, timing, and combinations",
        bullets: ["Combination trees by level", "Counter-attacking drills", "Conditioning rounds with metrics"],
      },
    ],
    scheduleEyebrow: "Schedule and plans",
    scheduleTitle: "Weekday consistency and weekend intensity",
    scheduleLead: "Structured weekly blocks keep members improving without overtraining.",
    scheduleList: [
      "Mon - Muai Tai Kids · 4:00 PM",
      "Mon - Kickboxing Kids · 5:00 PM",
      "Mon - Muai Tai Teens · 6:00 PM",
      "Mon - Kickboxing Teens · 7:00 PM",
      "Mon - Muai Tai Adults · 8:00 PM",
      "Mon - Kickboxing Adults · 9:00 PM",
      "Tue - Jiu Jitsu Kids · 4:00 PM",
      "Tue - MMA Kids · 5:00 PM",
      "Tue - Jiu Jitsu Teens · 6:00 PM",
      "Tue - MMA Teens · 7:00 PM",
      "Tue - Jiu Jitsu Adults · 8:00 PM",
      "Tue - MMA Adults · 9:00 PM",
      "Wed - Muai Tai Kids · 4:00 PM",
      "Wed - Kickboxing Kids · 5:00 PM",
      "Wed - Muai Tai Teens · 6:00 PM",
      "Wed - Kickboxing Teens · 7:00 PM",
      "Wed - Muai Tai Adults · 8:00 PM",
      "Wed - Kickboxing Adults · 9:00 PM",
      "Thu - Jiu Jitsu Kids · 4:00 PM",
      "Thu - MMA Kids · 5:00 PM",
      "Thu - Jiu Jitsu Teens · 6:00 PM",
      "Thu - MMA Teens · 7:00 PM",
      "Thu - Jiu Jitsu Adults · 8:00 PM",
      "Thu - MMA Adults · 9:00 PM",
      "Fri - Lucha Jiu Jitsu Kids · 4:00 PM",
      "Fri - MMA Sparring Kids · 5:00 PM",
      "Fri - Kucha Jiu Jitsu Teens · 6:00 PM",
      "Fri - MMA Sparring Teens · 7:00 PM",
      "Fri - Lucha Jiu Jitsu Adults · 8:00 PM",
      "Fri - MMA Sparring Adults · 9:00 PM",
    ],
    pricingTitle: "Enrollment and monthly fees",
    tiers: [
      {
        name: "Registration fee",
        price: "$50 USD",
        sessions: "One-time payment",
        focus: "Converted from 900 MXN using 18 MXN = 1 USD and rounded up to the nearest multiple of 5.",
      },
      {
        name: "Monthly - 1 martial art",
        price: "$45 USD / month",
        sessions: "Muay Thai, BJJ, or Kickboxing",
        focus: "Best for focused progression in one discipline",
      },
      {
        name: "Monthly - 2 martial arts",
        price: "$85 USD / month",
        sessions: "Any two disciplines",
        focus: "Balanced cross-training without full catalog",
      },
      {
        name: "Monthly - 3 martial arts",
        price: "$115 USD / month",
        sessions: "Any three disciplines",
        focus: "High-volume multi-style progression",
        featured: true,
      },
      {
        name: "Monthly - Full catalog",
        price: "$140 USD / month",
        sessions: "Complete access to all class tracks",
        focus: "Maximum flexibility for mixed goals and schedule",
      },
    ],
    mapEyebrow: "Location experience",
    mapTitle: "Interactive training-zone map (fictional demo)",
    mapLead:
      "This section simulates a custom location experience without using Google Maps. Visitors can explore fictional zones and nearby references.",
    mapTooltip: "Demo note: this map is fictional and shown only for portfolio demonstration.",
    mapNote:
      "No real address is associated with Black Lion Muay Thai in this demo. A real project would replace this with verified map/embed data.",
    mapAria: "Fictional academy map with selectable zones",
    mapPanelTitle: "Selected zone",
    mapPanelNearby: "Nearby references",
    zones: [
      {
        id: "north",
        label: "North Combat District",
        summary: "Ideal for beginners and evening commuters.",
        nearby: ["Transit Hub A", "Open parking lot", "Food strip"],
        x: 52,
        y: 20,
      },
      {
        id: "east",
        label: "East Training Corridor",
        summary: "High-density area with after-work athlete traffic.",
        nearby: ["Business plaza", "Bike lane network", "Recovery clinic"],
        x: 78,
        y: 44,
      },
      {
        id: "south",
        label: "South Performance Block",
        summary: "Competition-focused member cluster and weekend camps.",
        nearby: ["Sports complex", "Nutrition bar", "Indoor parking"],
        x: 50,
        y: 74,
      },
      {
        id: "west",
        label: "West Community Ring",
        summary: "Family-friendly area with youth and fundamentals classes.",
        nearby: ["Community park", "Bus stop route", "After-school centers"],
        x: 24,
        y: 48,
      },
    ],
    testimonialsEyebrow: "Social proof",
    testimonialsTitle: "Members improving with measurable discipline",
    testimonials: [
      {
        name: "Andre M.",
        role: "Kickboxing student · 9 months",
        quote:
          "The structure is what changed everything for me. Every session has purpose and progression.",
      },
      {
        name: "Sofia R.",
        role: "BJJ beginner · 4 months",
        quote:
          "I started with zero confidence. The coaching system made learning technical and safe.",
      },
      {
        name: "Julian T.",
        role: "Amateur fighter",
        quote:
          "The integration of striking, grappling, and conditioning feels built for real MMA development.",
      },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Questions before joining",
    faq: [
      {
        q: "Do I need prior fight experience?",
        a: "No. Classes are tiered by experience and include beginner-specific technique tracks.",
      },
      {
        q: "Can I combine BJJ and Muay Thai in one membership?",
        a: "Yes. The 2-arts, 3-arts, and full catalog monthly options are designed for mixed progression.",
      },
      {
        q: "Is there a trial option?",
        a: "Yes. You can request a trial class and receive a class recommendation based on goals.",
      },
      {
        q: "Is this a real academy website?",
        a: "No. This is a professional portfolio demo for a fictional brand.",
      },
    ],
    formEyebrow: "Lead capture",
    formTitle: "Request your trial and training recommendation",
    formLead:
      "This form demonstrates a production-ready conversion flow with practical lead fields and validation.",
    fieldName: "Full name",
    fieldEmail: "Email",
    fieldPhone: "Phone (optional)",
    fieldDiscipline: "Main discipline",
    fieldGoal: "Primary goal",
    fieldSchedule: "Preferred schedule",
    fieldMessage: "Message",
    consentLabel: "I agree to be contacted about classes and membership options.",
    submitLabel: "Send request",
    submittingLabel: "Sending...",
    successLabel: "Thanks. Demo lead captured successfully.",
    formDisclaimer: "Demo form only: no data is sent to a live CRM in this portfolio example.",
    goalOptions: ["Improve fitness", "Learn self-defense", "Compete in amateur events", "Cross-train for MMA"],
    disciplineOptions: ["Muay Thai", "BJJ", "Kickboxing", "MMA mixed track"],
    scheduleOptions: ["Weeknights", "Early mornings", "Weekend only", "Flexible"],
    requiredMessage: "This field is required.",
    invalidEmailMessage: "Please enter a valid email.",
    footerLine: "Black Lion Muay Thai · Fictional demo for Nocturne Landing Pro showcase",
    schemaDescription:
      "Fictional MMA academy landing page demo featuring conversion sections, FAQ SEO, custom interactive map simulation, and lead capture form.",
  },
  es: {
    langAria: "Cambiar idioma de la página",
    heroKicker: "Black Lion Muay Thai · Demo Landing Pro",
    heroTitle: "Entrena con disciplina. Pelea con estrategia. Crece con un sistema real.",
    heroLead:
      "Black Lion Muay Thai es una academia ficticia para demo, diseñada como producto final orientado a conversión. Incluye Muay Thai, BJJ y Kickboxing con rutas desde principiante hasta avanzado.",
    heroPrimary: "Reservar clase de prueba",
    heroSecondary: "Ver planes de membresía",
    heroTertiary: "Volver a servicios",
    trustChips: ["Muay Thai", "BJJ", "Kickboxing", "Apto para principiantes", "Preparación competitiva"],
    programsEyebrow: "Programas principales",
    programsTitle: "Tres disciplinas de combate. Una sola mentalidad MMA.",
    programsLead: "Cada bloque de clase está estructurado para progresión técnica, condicionamiento y sparring controlado.",
    programs: [
      {
        title: "Muay Thai",
        subtitle: "Precisión de striking + IQ de ring",
        bullets: ["Pad work y clinch básico", "Footwork y capas defensivas", "Progresión de sparring controlado"],
      },
      {
        title: "Brazilian Jiu-Jitsu",
        subtitle: "Posición, presión, sumisiones",
        bullets: ["Sistema fundamental por posiciones", "Escapes y retención de guardia", "Bloques no-gi y gi"],
      },
      {
        title: "Kickboxing",
        subtitle: "Volumen, timing y combinaciones",
        bullets: ["Árboles de combinaciones por nivel", "Drills de contraataque", "Rondas de condición con métricas"],
      },
    ],
    scheduleEyebrow: "Horarios y planes",
    scheduleTitle: "Constancia entre semana e intensidad el fin de semana",
    scheduleLead: "Bloques semanales estructurados para mejorar sin sobreentrenamiento.",
    scheduleList: [
      "Lun - Muay Thai Niños · 4:00 PM",
      "Lun - Kickboxing Niños · 5:00 PM",
      "Lun - Muay Thai Adolescentes · 6:00 PM",
      "Lun - Kickboxing Adolescentes · 7:00 PM",
      "Lun - Muay Thai Adultos · 8:00 PM",
      "Lun - Kickboxing Adultos · 9:00 PM",
      "Mar - Jiu Jitsu Niños · 4:00 PM",
      "Mar - MMA Niños · 5:00 PM",
      "Mar - Jiu Jitsu Adolescentes · 6:00 PM",
      "Mar - MMA Adolescentes · 7:00 PM",
      "Mar - Jiu Jitsu Adultos · 8:00 PM",
      "Mar - MMA Adultos · 9:00 PM",
      "Mié - Muay Thai Niños · 4:00 PM",
      "Mié - Kickboxing Niños · 5:00 PM",
      "Mié - Muay Thai Adolescentes · 6:00 PM",
      "Mié - Kickboxing Adolescentes · 7:00 PM",
      "Mié - Muay Thai Adultos · 8:00 PM",
      "Mié - Kickboxing Adultos · 9:00 PM",
      "Jue - Jiu Jitsu Niños · 4:00 PM",
      "Jue - MMA Niños · 5:00 PM",
      "Jue - Jiu Jitsu Adolescentes · 6:00 PM",
      "Jue - MMA Adolescentes · 7:00 PM",
      "Jue - Jiu Jitsu Adultos · 8:00 PM",
      "Jue - MMA Adultos · 9:00 PM",
      "Vie - Lucha Jiu Jitsu Niños · 4:00 PM",
      "Vie - MMA Sparring Niños · 5:00 PM",
      "Vie - Lucha Jiu Jitsu Adolescentes · 6:00 PM",
      "Vie - MMA Sparring Adolescentes · 7:00 PM",
      "Vie - Lucha Jiu Jitsu Adultos · 8:00 PM",
      "Vie - MMA Sparring Adultos · 9:00 PM",
    ],
    pricingTitle: "Inscripción y mensualidades",
    tiers: [
      {
        name: "Precio de inscripción",
        price: "$900 MXN",
        sessions: "Pago único",
        focus: "Calculado con tipo de cambio de 18 MXN por USD y redondeado a múltiplos exactos de 5",
      },
      {
        name: "Mensualidad 1 arte marcial",
        price: "$800 MXN / mes",
        sessions: "Muay Thai, BJJ o Kickboxing",
        focus: "Ideal para progresión enfocada en una disciplina",
      },
      {
        name: "Mensualidad 2 arte marcial",
        price: "$1,500 MXN / mes",
        sessions: "Cualquier combinación de 2 disciplinas",
        focus: "Cross-training balanceado sin catálogo completo",
      },
      {
        name: "Mensualidad 3 arte marcial",
        price: "$2,000 MXN / mes",
        sessions: "Cualquier combinación de 3 disciplinas",
        focus: "Progresión multiestilo de alto volumen",
        featured: true,
      },
      {
        name: "Mensualidad catálogo completo",
        price: "$2,500 MXN / mes",
        sessions: "Acceso total a todas las líneas de clase",
        focus: "Máxima flexibilidad para objetivos mixtos y horario",
      },
    ],
    mapEyebrow: "Experiencia de ubicación",
    mapTitle: "Mapa interactivo de zonas de entrenamiento (demo ficticio)",
    mapLead:
      "Esta sección simula una experiencia de ubicación personalizada sin usar Google Maps. Los visitantes pueden explorar zonas y referencias ficticias.",
    mapTooltip: "Nota de demo: este mapa es ficticio y se muestra solo para fines de portafolio.",
    mapNote:
      "Black Lion Muay Thai no tiene dirección real en esta demo. Un proyecto real sustituye esto por datos de ubicación verificados.",
    mapAria: "Mapa ficticio de academia con zonas seleccionables",
    mapPanelTitle: "Zona seleccionada",
    mapPanelNearby: "Referencias cercanas",
    zones: [
      {
        id: "north",
        label: "Distrito Norte de Combate",
        summary: "Ideal para principiantes y miembros que salen del trabajo.",
        nearby: ["Hub de transporte A", "Estacionamiento abierto", "Zona de comida"],
        x: 52,
        y: 20,
      },
      {
        id: "east",
        label: "Corredor Este de Entrenamiento",
        summary: "Área de alta densidad con flujo de atletas después del trabajo.",
        nearby: ["Plaza de negocios", "Red de ciclovías", "Clínica de recuperación"],
        x: 78,
        y: 44,
      },
      {
        id: "south",
        label: "Bloque Sur de Rendimiento",
        summary: "Cluster para miembros competitivos y campamentos de fin de semana.",
        nearby: ["Complejo deportivo", "Nutrition bar", "Estacionamiento techado"],
        x: 50,
        y: 74,
      },
      {
        id: "west",
        label: "Anillo Comunitario Oeste",
        summary: "Área familiar con clases juveniles y fundamentos.",
        nearby: ["Parque comunitario", "Ruta de autobús", "Centros after-school"],
        x: 24,
        y: 48,
      },
    ],
    testimonialsEyebrow: "Prueba social",
    testimonialsTitle: "Miembros mejorando con disciplina medible",
    testimonials: [
      {
        name: "Andre M.",
        role: "Alumno de Kickboxing · 9 meses",
        quote:
          "La estructura es lo que me cambió todo. Cada sesión tiene propósito y progresión.",
      },
      {
        name: "Sofia R.",
        role: "Principiante en BJJ · 4 meses",
        quote:
          "Empecé sin confianza. El sistema de coaching hizo el aprendizaje técnico y seguro.",
      },
      {
        name: "Julian T.",
        role: "Peleador amateur",
        quote:
          "La integración entre striking, grappling y condicionamiento se siente hecha para desarrollo real de MMA.",
      },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Preguntas antes de unirte",
    faq: [
      {
        q: "¿Necesito experiencia previa de combate?",
        a: "No. Las clases se agrupan por nivel e incluyen rutas técnicas para principiantes.",
      },
      {
        q: "¿Puedo combinar BJJ y Muay Thai en una membresía?",
        a: "Sí. Las mensualidades de 2 artes, 3 artes y catálogo completo están pensadas para progreso mixto entre disciplinas.",
      },
      {
        q: "¿Hay opción de clase de prueba?",
        a: "Sí. Puedes solicitar clase de prueba y recibir recomendación según tus objetivos.",
      },
      {
        q: "¿Este es un sitio real de academia?",
        a: "No. Es un demo profesional de portafolio para una marca ficticia.",
      },
    ],
    formEyebrow: "Captación de leads",
    formTitle: "Solicita tu clase de prueba y recomendación de entrenamiento",
    formLead:
      "Este formulario demuestra un flujo de conversión profesional con campos útiles y validación real.",
    fieldName: "Nombre completo",
    fieldEmail: "Email",
    fieldPhone: "Teléfono (opcional)",
    fieldDiscipline: "Disciplina principal",
    fieldGoal: "Objetivo principal",
    fieldSchedule: "Horario preferido",
    fieldMessage: "Mensaje",
    consentLabel: "Acepto ser contactado sobre clases y opciones de membresía.",
    submitLabel: "Enviar solicitud",
    submittingLabel: "Enviando...",
    successLabel: "Gracias. Lead de demo capturado correctamente.",
    formDisclaimer: "Formulario de demo: no se envían datos a un CRM real en este ejemplo de portafolio.",
    goalOptions: ["Mejorar condición física", "Aprender defensa personal", "Competir en eventos amateur", "Cross-train para MMA"],
    disciplineOptions: ["Muay Thai", "BJJ", "Kickboxing", "Ruta mixta MMA"],
    scheduleOptions: ["Noches entre semana", "Mañanas tempranas", "Solo fin de semana", "Flexible"],
    requiredMessage: "Este campo es obligatorio.",
    invalidEmailMessage: "Ingresa un email válido.",
    footerLine: "Black Lion Muay Thai · Demo ficticio para showcase Landing Pro de Nocturne",
    schemaDescription:
      "Demo ficticio de landing page para academia MMA con secciones de conversión, FAQ SEO, simulación de mapa interactivo y formulario de leads.",
  },
};

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  discipline: "",
  goal: "",
  schedule: "",
  message: "",
  consent: false,
};

export default function BlackLionLanding({ canonicalUrl, contactEmailUrl }: BlackLionLandingProps) {
  const [lang, setLang] = useState<Language>("en");
  const [selectedZoneId, setSelectedZoneId] = useState<ZoneId>("north");
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success">("idle");
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const skyLayerY = useTransform(scrollY, [0, 1400], [0, -80]);
  const hazeLayerY = useTransform(scrollY, [0, 1400], [0, -150]);
  const sunburstLayerY = useTransform(scrollY, [0, 1400], [0, -220]);
  const canopyLayerY = useTransform(scrollY, [0, 1400], [0, -130]);
  const jungleLayerY = useTransform(scrollY, [0, 1400], [0, -190]);

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

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveHeroSlide((previous) => (previous + 1) % heroCarouselSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const setLanguage = (nextLanguage: Language) => {
    setLang(nextLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(languageStorageKey, nextLanguage);
    }
  };

  const copy = copyByLanguage[lang];
  const selectedZone = copy.zones.find((zone) => zone.id === selectedZoneId) ?? copy.zones[0];
  const scheduleCalendar = useMemo(() => buildScheduleCalendar(copy.scheduleList, lang), [copy.scheduleList, lang]);
  const scheduleAriaLabel = lang === "es" ? "Calendario semanal de clases" : "Weekly class calendar";
  const noClassLabel = lang === "es" ? "Sin clase" : "No class";
  const featuredTierLabel = lang === "es" ? "Más elegido" : "Most chosen";
  const tierLabel = lang === "es" ? "Plan" : "Tier";

  const goToPreviousHeroSlide = () => {
    setActiveHeroSlide((previous) => (previous - 1 + heroCarouselSlides.length) % heroCarouselSlides.length);
  };

  const goToNextHeroSlide = () => {
    setActiveHeroSlide((previous) => (previous + 1) % heroCarouselSlides.length);
  };

  const serviceSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      name: "Black Lion Muay Thai (Fictional Demo)",
      description: copy.schemaDescription,
      url: canonicalUrl,
      sport: ["Muay Thai", "Brazilian Jiu-Jitsu", "Kickboxing"],
      isAccessibleForFree: false,
      areaServed: [
        { "@type": "City", name: "Cancun" },
        { "@type": "AdministrativeArea", name: "Quintana Roo" },
      ],
      availableLanguage: ["English", "Spanish"],
    }),
    [canonicalUrl, copy.schemaDescription],
  );

  const track = (eventName: string, detail?: Record<string, string>) => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: eventName,
      page: "black-lion-demo",
      language: lang,
      ...(detail ?? {}),
    });
  };

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;
    const nextValue = type === "checkbox" ? (event.target as HTMLInputElement).checked : value;

    setFormState((previous) => ({
      ...previous,
      [name]: nextValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!formState.name.trim()) nextErrors.name = copy.requiredMessage;
    if (!formState.email.trim()) nextErrors.email = copy.requiredMessage;
    if (formState.email.trim() && !/^\S+@\S+\.\S+$/.test(formState.email)) {
      nextErrors.email = copy.invalidEmailMessage;
    }
    if (!formState.discipline.trim()) nextErrors.discipline = copy.requiredMessage;
    if (!formState.goal.trim()) nextErrors.goal = copy.requiredMessage;
    if (!formState.consent) nextErrors.consent = copy.requiredMessage;

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitState("submitting");
    track("demo_form_submit_attempt", { discipline: formState.discipline, goal: formState.goal });

    await new Promise((resolve) => setTimeout(resolve, 900));

    setSubmitState("success");
    setFormState(initialFormState);
    track("demo_form_submit_success");
  };

  return (
    <div className={styles.page}>
      <motion.div className={styles.parallaxSky} style={reduceMotion ? undefined : { y: skyLayerY }} aria-hidden />
      <motion.div className={styles.parallaxHaze} style={reduceMotion ? undefined : { y: hazeLayerY }} aria-hidden />
      <motion.div className={styles.sunburst} style={reduceMotion ? undefined : { y: sunburstLayerY }} aria-hidden />
      <motion.div className={styles.jungleCanopy} style={reduceMotion ? undefined : { y: canopyLayerY }} aria-hidden />
      <motion.div className={styles.jungleFloor} style={reduceMotion ? undefined : { y: jungleLayerY }} aria-hidden />
      <div className={styles.jungleVeil} aria-hidden />
      <div className={styles.grain} aria-hidden />
      <main className={styles.shell} lang={lang === "es" ? "es-MX" : "en"}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

        <div className={styles.langToggle} role="group" aria-label={copy.langAria}>
          <button
            type="button"
            className={`${styles.langButton} ${lang === "en" ? styles.langButtonActive : ""}`}
            onClick={() => setLanguage("en")}
            aria-pressed={lang === "en"}
          >
            US
          </button>
          <button
            type="button"
            className={`${styles.langButton} ${lang === "es" ? styles.langButtonActive : ""}`}
            onClick={() => setLanguage("es")}
            aria-pressed={lang === "es"}
          >
            MX
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={lang}
            className={styles.languageStage}
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 10, scale: 0.996, filter: "blur(7px) saturate(108%)" }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1, filter: "blur(0px) saturate(100%)" }
            }
            exit={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -8, scale: 1.004, filter: "blur(8px) saturate(112%)" }
            }
            transition={{ duration: reduceMotion ? 0.05 : 0.4, ease: [0.22, 0.9, 0.2, 1] }}
          >
            <header className={styles.pageBrandHeader}>
              <div className={styles.pageBrandGlow} aria-hidden />
              <Image
                src="/academy_logo.png"
                alt={lang === "es" ? "Logo oficial de Black Lion Muay Thai" : "Official Black Lion Muay Thai logo"}
                className={styles.pageBrandLogo}
                width={280}
                height={280}
                priority
              />
              <div className={styles.pageBrandText}>
                <p className={styles.pageBrandEyebrow}>
                  {lang === "es" ? "Header oficial de marca · Demo ficticio" : "Official brand header · Fictional demo"}
                </p>
                <p className={styles.pageBrandTitle}>Black Lion Muay Thai</p>
                <p className={styles.pageBrandSub}>
                  {lang === "es"
                    ? "Una academia de combate conceptual: Muay Thai, BJJ y Kickboxing con enfoque profesional."
                    : "A conceptual combat academy: Muay Thai, BJJ, and Kickboxing with a professional training focus."}
                </p>
              </div>
            </header>

            <section className={styles.hero}>
              <div className={styles.heroShowcase}>
                <p className={styles.heroCarouselTopline}>
                  {lang === "es"
                    ? "Muay Thai, MMA, BJJ y escenas de competencia"
                    : "Muay Thai, MMA, BJJ, and competition moments"}
                </p>

                <div
                  className={styles.heroCarousel}
                  role="region"
                  aria-label={
                    lang === "es"
                      ? "Carrusel de imagenes de entrenamiento en Black Lion"
                      : "Black Lion training image carousel"
                  }
                >
                  <div className={styles.heroCarouselStage}>
                    {heroCarouselSlides.map((slide, index) => (
                      <div
                        key={slide.src}
                        className={`${styles.heroCarouselSlide} ${index === activeHeroSlide ? styles.heroCarouselSlideActive : ""}`}
                        aria-hidden={index !== activeHeroSlide}
                      >
                        <img
                          src={slide.src}
                          alt={lang === "es" ? slide.altEs : slide.altEn}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </div>
                    ))}

                    <div className={styles.heroCarouselShade} aria-hidden />

                    <button
                      type="button"
                      className={`${styles.heroCarouselArrow} ${styles.heroCarouselArrowPrev}`}
                      onClick={goToPreviousHeroSlide}
                      aria-label={lang === "es" ? "Imagen anterior" : "Previous image"}
                    >
                      {"<"}
                    </button>
                    <button
                      type="button"
                      className={`${styles.heroCarouselArrow} ${styles.heroCarouselArrowNext}`}
                      onClick={goToNextHeroSlide}
                      aria-label={lang === "es" ? "Siguiente imagen" : "Next image"}
                    >
                      {">"}
                    </button>
                  </div>

                  <div className={styles.heroCarouselFooter}>
                    <p className={styles.heroCarouselCaption}>
                      {lang === "es"
                        ? "Galeria visual oficial de Black Lion"
                        : "Official Black Lion visual gallery"}
                    </p>
                    <div className={styles.heroCarouselDots} role="tablist" aria-label={lang === "es" ? "Selector de imagen" : "Image selector"}>
                      {heroCarouselSlides.map((slide, index) => (
                        <button
                          key={`${slide.src}-dot`}
                          type="button"
                          role="tab"
                          className={`${styles.heroCarouselDot} ${index === activeHeroSlide ? styles.heroCarouselDotActive : ""}`}
                          aria-selected={index === activeHeroSlide}
                          aria-label={
                            lang === "es"
                              ? `Ir a imagen ${index + 1}`
                              : `Go to image ${index + 1}`
                          }
                          onClick={() => setActiveHeroSlide(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <p className={styles.kicker}>{copy.heroKicker}</p>
              <h1>{copy.heroTitle}</h1>
              <p className={styles.heroLead}>{copy.heroLead}</p>
              <div className={styles.heroActions}>
                <a
                  className={styles.primary}
                  href="#lead-form"
                  onClick={() => track("demo_cta_click", { cta: "trial_class" })}
                >
                  {copy.heroPrimary}
                </a>
                <a
                  className={styles.secondary}
                  href="#pricing"
                  onClick={() => track("demo_cta_click", { cta: "pricing" })}
                >
                  {copy.heroSecondary}
                </a>
                <Link className={styles.secondary} href="/services">
                  {copy.heroTertiary}
                </Link>
              </div>
              <div className={styles.trustChips}>
                {copy.trustChips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{copy.programsEyebrow}</p>
                <h2>{copy.programsTitle}</h2>
                <p>{copy.programsLead}</p>
              </div>
              <div className={styles.programGrid}>
                {copy.programs.map((program) => (
                  <article key={program.title} className={styles.card}>
                    <h3>{program.title}</h3>
                    <p className={styles.cardSubtitle}>{program.subtitle}</p>
                    <ul>
                      {program.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.section} id="pricing">
              <div className={`${styles.twoColumn} ${styles.pricingColumns}`}>
                <div className={`${styles.card} ${styles.scheduleCard}`}>
                  <p className={styles.eyebrow}>{copy.scheduleEyebrow}</p>
                  <h3>{copy.scheduleTitle}</h3>
                  <p className={styles.cardSubtitle}>{copy.scheduleLead}</p>
                  <div className={styles.scheduleCalendar} aria-label={scheduleAriaLabel}>
                    <div className={styles.scheduleCalendarGrid}>
                      {scheduleCalendar.dayEvents.map((events, dayIndex) => (
                        <section
                          key={scheduleCalendar.dayLabels[dayIndex]}
                          className={styles.scheduleDayColumn}
                          aria-label={scheduleCalendar.dayLabels[dayIndex]}
                        >
                          <p className={styles.scheduleDayLabel}>{scheduleCalendar.dayLabels[dayIndex]}</p>
                          <div className={styles.scheduleDayEvents}>
                            {events.length > 0 ? (
                              events.map((event, eventIndex) => (
                                <article
                                  key={`${scheduleCalendar.dayLabels[dayIndex]}-${event.title}-${eventIndex}`}
                                  className={styles.scheduleEvent}
                                >
                                  <p className={styles.scheduleEventTime}>{event.time}</p>
                                  <p className={styles.scheduleEventTitle}>{event.title}</p>
                                </article>
                              ))
                            ) : (
                              <p className={styles.scheduleEmpty}>{noClassLabel}</p>
                            )}
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`${styles.card} ${styles.pricingCard}`}>
                  <p className={styles.eyebrow}>{copy.pricingTitle}</p>
                  <div className={styles.tierStack}>
                    {copy.tiers.map((tier, index) => (
                      <article key={tier.name} className={`${styles.tierCard} ${tier.featured ? styles.tierFeatured : ""}`}>
                        <div className={styles.tierHeader}>
                          <p className={styles.tierIndex}>{`${tierLabel} ${index + 1}`}</p>
                          {tier.featured && <span className={styles.tierBadge}>{featuredTierLabel}</span>}
                        </div>
                        <h4 className={styles.tierName}>{tier.name}</h4>
                        <p className={styles.tierPrice}>{tier.price}</p>
                        <p className={styles.tierSessions}>{tier.sessions}</p>
                        <p className={styles.tierFocus}>{tier.focus}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{copy.mapEyebrow}</p>
                <h2>{copy.mapTitle}</h2>
                <p>{copy.mapLead}</p>
              </div>
              <div className={styles.mapWrap}>
                <div className={styles.mapTooltip}>{copy.mapTooltip}</div>
                <div className={styles.mapDisclaimer}>{copy.mapNote}</div>
                <div className={styles.fakeMap} role="img" aria-label={copy.mapAria}>
                  <div className={styles.mapChromeTop} aria-hidden>
                    <div className={styles.mapSearchMock}>
                      <span className={styles.mapSearchIcon} aria-hidden />
                      <span>{lang === "es" ? "Buscar en el mapa (demo)" : "Search the map (demo)"}</span>
                    </div>
                    <div className={styles.mapTypePills}>
                      <span className={`${styles.mapTypePill} ${styles.mapTypePillActive}`}>
                        {lang === "es" ? "Mapa" : "Map"}
                      </span>
                      <span className={styles.mapTypePill}>{lang === "es" ? "Satélite" : "Satellite"}</span>
                    </div>
                  </div>

                  <svg viewBox="0 0 100 100" className={styles.mapSvg} aria-hidden>
                    <rect x="0" y="0" width="100" height="100" className={styles.mapLand} />
                    <path d="M2 74 C20 65, 28 70, 44 64 C57 59, 68 60, 98 48 L98 100 L2 100 Z" className={styles.mapWater} />
                    <path d="M8 12 L26 8 L31 22 L18 30 L6 24 Z" className={styles.mapPark} />
                    <path d="M62 8 L86 12 L92 28 L72 34 L60 24 Z" className={styles.mapPark} />
                    <path d="M40 40 L54 34 L67 44 L58 57 L42 58 L34 48 Z" className={styles.mapPark} />

                    <path d="M4 22 C20 28, 35 30, 98 36" className={styles.mapRoadMajor} />
                    <path d="M2 56 C24 50, 40 52, 98 60" className={styles.mapRoadMajor} />
                    <path d="M20 2 C22 28, 26 52, 30 98" className={styles.mapRoadMajor} />
                    <path d="M64 2 C62 20, 58 44, 56 98" className={styles.mapRoadMajor} />

                    <path d="M10 18 C26 26, 35 28, 62 30" className={styles.mapRoadMinor} />
                    <path d="M8 46 C24 42, 38 44, 62 48" className={styles.mapRoadMinor} />
                    <path d="M36 8 C34 26, 36 48, 40 86" className={styles.mapRoadMinor} />
                    <path d="M76 10 C72 28, 70 44, 72 82" className={styles.mapRoadMinor} />

                    <path d="M12 72 C20 66, 30 66, 38 72" className={styles.mapRoadMinor} />
                    <path d="M48 70 C58 64, 68 64, 78 70" className={styles.mapRoadMinor} />

                    <path d="M8 78 L14 74 L17 78 L13 84 Z" className={styles.mapBlockAlt} />
                    <path d="M74 22 L84 18 L88 24 L80 30 Z" className={styles.mapBlockAlt} />
                  </svg>

                  <div className={styles.mapLabels} aria-hidden>
                    <span className={styles.mapLabel} style={{ left: "21%", top: "18%" }}>
                      {lang === "es" ? "Parque Norte" : "North Park"}
                    </span>
                    <span className={styles.mapLabel} style={{ left: "72%", top: "20%" }}>
                      {lang === "es" ? "Avenida Central" : "Central Ave"}
                    </span>
                    <span className={styles.mapLabel} style={{ left: "46%", top: "54%" }}>
                      {lang === "es" ? "Ring Road" : "Ring Road"}
                    </span>
                    <span className={styles.mapLabel} style={{ left: "73%", top: "82%" }}>
                      {lang === "es" ? "Canal Sur" : "South Canal"}
                    </span>
                  </div>

                  <div className={styles.mapControls} aria-hidden>
                    <span className={styles.mapControlBtn}>+</span>
                    <span className={styles.mapControlBtn}>-</span>
                    <span className={styles.mapControlBtn}>o</span>
                  </div>

                  <div className={styles.mapGoogleBadge} aria-hidden>
                    {lang === "es" ? "Estilo de mapa demo" : "Demo map style"}
                  </div>

                  {copy.zones.map((zone) => (
                    <button
                      key={zone.id}
                      type="button"
                      className={`${styles.zoneDot} ${selectedZoneId === zone.id ? styles.zoneDotActive : ""}`}
                      style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                      onClick={() => {
                        setSelectedZoneId(zone.id);
                        track("demo_map_zone_select", { zone: zone.id });
                      }}
                      aria-pressed={selectedZoneId === zone.id}
                    >
                      <span className={styles.zoneDotText}>{zone.label}</span>
                    </button>
                  ))}
                </div>
                <aside className={styles.mapPanel}>
                  <p className={styles.eyebrow}>{copy.mapPanelTitle}</p>
                  <h3>{selectedZone.label}</h3>
                  <p>{selectedZone.summary}</p>
                  <p className={styles.panelSubhead}>{copy.mapPanelNearby}</p>
                  <ul>
                    {selectedZone.nearby.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </aside>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{copy.testimonialsEyebrow}</p>
                <h2>{copy.testimonialsTitle}</h2>
              </div>
              <div className={styles.programGrid}>
                {copy.testimonials.map((item) => (
                  <article key={item.name} className={styles.card}>
                    <p className={styles.quote}>&quot;{item.quote}&quot;</p>
                    <h3>{item.name}</h3>
                    <p className={styles.cardSubtitle}>{item.role}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{copy.faqEyebrow}</p>
                <h2>{copy.faqTitle}</h2>
              </div>
              <div className={styles.faqGrid}>
                {copy.faq.map((item) => (
                  <article key={item.q} className={styles.card}>
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.section} id="lead-form">
              <div className={styles.twoColumn}>
                <div className={styles.card}>
                  <p className={styles.eyebrow}>{copy.formEyebrow}</p>
                  <h2>{copy.formTitle}</h2>
                  <p className={styles.cardSubtitle}>{copy.formLead}</p>
                  <p className={styles.formHint}>
                    {lang === "es"
                      ? "Usa el botón flotante de correo para cotización rápida."
                      : "Use the floating email button for a quick quote."}
                  </p>
                </div>

                <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
                  <label>
                    {copy.fieldName}
                    <input name="name" value={formState.name} onChange={handleFieldChange} />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                  </label>

                  <label>
                    {copy.fieldEmail}
                    <input name="email" type="email" value={formState.email} onChange={handleFieldChange} />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                  </label>

                  <label>
                    {copy.fieldPhone}
                    <input name="phone" value={formState.phone} onChange={handleFieldChange} />
                  </label>

                  <label>
                    {copy.fieldDiscipline}
                    <select name="discipline" value={formState.discipline} onChange={handleFieldChange}>
                      <option value="">-</option>
                      {copy.disciplineOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.discipline && <span className={styles.error}>{errors.discipline}</span>}
                  </label>

                  <label>
                    {copy.fieldGoal}
                    <select name="goal" value={formState.goal} onChange={handleFieldChange}>
                      <option value="">-</option>
                      {copy.goalOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.goal && <span className={styles.error}>{errors.goal}</span>}
                  </label>

                  <label>
                    {copy.fieldSchedule}
                    <select name="schedule" value={formState.schedule} onChange={handleFieldChange}>
                      <option value="">-</option>
                      {copy.scheduleOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    {copy.fieldMessage}
                    <textarea name="message" value={formState.message} onChange={handleFieldChange} rows={3} />
                  </label>

                  <label className={styles.consentRow}>
                    <input
                      name="consent"
                      type="checkbox"
                      checked={formState.consent}
                      onChange={handleFieldChange}
                    />
                    <span>{copy.consentLabel}</span>
                  </label>
                  {errors.consent && <span className={styles.error}>{errors.consent}</span>}

                  <button type="submit" className={styles.primary} disabled={submitState === "submitting"}>
                    {submitState === "submitting" ? copy.submittingLabel : copy.submitLabel}
                  </button>

                  {submitState === "success" && <p className={styles.success}>{copy.successLabel}</p>}
                  <p className={styles.formDisclaimer}>{copy.formDisclaimer}</p>
                </form>
              </div>
            </section>

            <footer className={styles.footer}>
              <p>{copy.footerLine}</p>
              <Link href="/services">Nocturne Services</Link>
            </footer>
          </motion.div>
        </AnimatePresence>

        <a
          className={styles.whatsappFloat}
          href={contactEmailUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("demo_cta_click", { cta: "email_floating" })}
          aria-label={lang === "es" ? "Abrir correo" : "Open email"}
        >
          <span className={styles.whatsappPulse} aria-hidden />
          <svg
            className={styles.whatsappIcon}
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden
          >
            <path d="M13.601 2.326A7.854 7.854 0 0 0 8 0C3.582 0 0 3.582 0 8c0 1.409.369 2.785 1.07 4L0 16l4.116-1.05A7.95 7.95 0 0 0 8 16c4.418 0 8-3.582 8-8a7.95 7.95 0 0 0-2.399-5.674zM8 14.5a6.5 6.5 0 0 1-3.314-.908l-.237-.14-2.44.622.652-2.381-.154-.245A6.47 6.47 0 0 1 1.5 8a6.5 6.5 0 1 1 6.5 6.5z" />
            <path d="M11.278 9.856c-.167-.083-.988-.487-1.141-.543-.153-.056-.264-.083-.376.083-.111.167-.43.543-.528.654-.097.111-.194.125-.361.042-.167-.083-.705-.26-1.343-.829-.496-.443-.83-.99-.928-1.157-.097-.167-.01-.257.073-.34.074-.073.167-.194.25-.292.083-.097.111-.167.167-.278.056-.111.028-.208-.014-.292-.042-.083-.376-.904-.515-1.24-.135-.324-.272-.28-.376-.285-.097-.005-.208-.006-.319-.006a.61.61 0 0 0-.444.208c-.153.167-.583.57-.583 1.389 0 .82.597 1.611.681 1.722.083.111 1.174 1.792 2.846 2.513.398.172.708.274.95.35.399.127.762.109 1.049.066.32-.048.988-.403 1.127-.792.139-.389.139-.722.097-.792-.042-.069-.153-.111-.32-.194z" />
          </svg>
        </a>
      </main>
    </div>
  );
}
