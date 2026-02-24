"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import styles from "./page.module.css";
import GlowParallax from "../components/GlowParallax";

type Node = {
  id: string;
  subdomain: string;
  label: string;
  summary: string;
  focus: string[];
  x: number;
  y: number;
};

const systemsNodes: Node[] = [
  {
    id: "fintech",
    subdomain: "fintech",
    label: "Fintech",
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
    label: "Economy Data",
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
    summary: "Projection-driven state, event dispatch, and snapshots.",
    focus: [
      "Authoritative server with projection engine",
      "Replayable event log + snapshots",
      "Latency-aware emit/observe loop",
    ],
    x: 86,
    y: 50,
  },
  {
    id: "lab",
    subdomain: "lab",
    label: "Tech Lab",
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

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 0.9, 0.2, 1] } },
} as Variants;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const philosophy = [
  {
    title: "Systems over pages",
    body: "Treat the portfolio as a living system—maps, flows, and resilience baked into the experience.",
  },
  {
    title: "Hybrid tech/art",
    body: "Dark canvas with expressive nodes and restrained motion; clarity first, mood second.",
  },
  {
    title: "Signal-rich storytelling",
    body: "Mini case systems, C4 cues, and engineering principles surface credibility without walls of text.",
  },
];

const ecosystem = [
  {
    title: "Fintech Microservices",
    status: "Live architecture",
    badges: ["Ledger", "Payments", "Idempotency", "Outbox"],
    summary: "API gateway, auth, ledger engine, payments processor, and message queue with replayable events.",
  },
  {
    title: "Economy Data Science",
    status: "Modeling in progress",
    badges: ["Ingestion", "Modeling", "TSDB", "Viz API"],
    summary: "Data ingestion, modeling pipelines, time-series DB, and visualization API for macro/micro signals.",
  },
  {
    title: "Game Simulation Engine",
    status: "Playable core",
    badges: ["Projections", "Event Store", "Snapshots"],
    summary: "Authoritative game server with in-memory projections, event dispatch, and snapshot rotation.",
  },
  {
    title: "Tech Lab",
    status: "Experiments",
    badges: ["Load Tests", "Distributed Sims", "Observability"],
    summary: "Load-testing engine, distributed simulation harness, caching experiments, and observability stack.",
  },
];

const principles = [
  "Event-driven first; batch as a fallback",
  "Design for replay: logs + snapshots",
  "Idempotency and outbox across boundaries",
  "Guardrails: timeouts, circuit breakers, backpressure",
  "Observability as product surface",
  "Progressive disclosure: show detail on intent",
];

const techStack = [
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
    items: ["PostgreSQL/MySQL", "Redis", "Object Storage", "Time-series DB", "Observability stack", "Docker", "Kubernetes"],
  },
  {
    title: "Practice",
    items: ["C4 modeling", "Event storming", "Chaos drills", "Load tests", "SLO dashboards"],
  },
];

export default function Page() {
  const [activeNodeId, setActiveNodeId] = useState<string>(systemsNodes[0].id);
  const [hoveredNodeId, setHoveredNodeId] = useState<string>("");
  const [ringPulse, setRingPulse] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const reduceMotion = useReducedMotion();
  

  const activeNode = useMemo(
    () => systemsNodes.find((n) => n.id === activeNodeId) ?? systemsNodes[0],
    [activeNodeId],
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

  

  return (
    <div className={styles.page}>
      <GlowParallax />
      <div className={styles.aurora} aria-hidden />
      <main className={styles.shell}>
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
              Systems engineer portfolio — hybrid tech & art, maps, and resilient systems.
            </p>
          </div>
          <div className={styles.kicker}>NOCTURNE · Pablo Marines · Systems Engineer</div>
          <p className={styles.lede}>
            Hybrid tech/art interface with a dark aurora, interactive node map, and concise engineering signals. Built
            to highlight C4 thinking, projections, and event-driven rigor.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primary} href="#map">
              Explore systems map
            </a>
            <a className={styles.secondary} href="#contact">
              Contact / socials
            </a>
          </div>
          <div className={styles.metaChips}>
            <span>App Router</span>
            <span>Event-driven</span>
            <span>C4 mapping</span>
            <span>Projections</span>
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
            <p className={styles.eyebrow}>Homepage systems map</p>
            <h2>NOCTURNE core with connected domains</h2>
            <p className={styles.sectionLead}>
              Central node with Fintech, Economy Data, Game Engine, and Tech Lab spokes. Shared infrastructure ring: Redis,
              Message Queue, Database, Observability.
            </p>
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
                      const url = `https://${node.subdomain}.${process.env.NEXT_PUBLIC_ROOT_PORTFOLIO_URL}`;
                      if (isMobile) {
                        // on mobile: first tap selects (shows details), second tap on same node opens link
                        if (activeNodeId === node.id) {
                          window.open(url, "_blank");
                        } else {
                          setActiveNodeId(node.id);
                        }
                      } else {
                        // desktop: immediate open (preserve current behavior)
                        setActiveNodeId(node.id);
                        window.open(url, "_blank");
                      }
                    }}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onFocus={() => setActiveNodeId(node.id)}
                    aria-pressed={activeNodeId === node.id}
                  >
                    <span>{node.label}</span>
                  </button>
                ))}
                <div className={styles.ringLabel}>Shared infra ring · Redis · MQ · DB · Observability</div>
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
                  <p className={styles.detailKicker}>Focused node</p>
                  <h3>{displayedNode.label}</h3>
                  <p className={styles.detailText}>{displayedNode.summary}</p>
                  <ul className={styles.focusList}>
                    {displayedNode.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
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
            <p className={styles.eyebrow}>Core philosophy</p>
            <h2>How the experience is framed</h2>
          </div>
          <motion.div className={styles.cardGrid} variants={container}>
            {philosophy.map((item) => (
              <motion.article key={item.title} className={styles.card} variants={reveal}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className={styles.ecosystem}
          id="ecosystem"
          variants={reveal}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: false, amount: 0.12 }}
        >
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Project ecosystem</p>
            <h2>Mini case systems across four domains</h2>
            <p className={styles.sectionLead}>Each tile is CTA-ready for demos, repos, or deep dives.</p>
          </div>
          <motion.div className={styles.cardGrid} variants={container}>
            {ecosystem.map((item) => (
              <motion.article key={item.title} className={styles.card} variants={reveal}>
                <div className={styles.cardTop}>
                  <p className={styles.eyebrow}>{item.status}</p>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
                <div className={styles.badges}>
                  {item.badges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
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
            <p className={styles.eyebrow}>Engineering principles</p>
            <h2>Guardrails and practice</h2>
          </div>
          <motion.ul className={styles.principleList} variants={container}>
            {principles.map((item) => (
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
            <p className={styles.eyebrow}>Tech stack</p>
            <h2>Tools and disciplines</h2>
          </div>
          <motion.div className={styles.stackGrid} variants={container}>
            {techStack.map((group) => (
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
            <p className={styles.eyebrow}>Contact</p>
            <h2>Let&apos;s collaborate</h2>
            <p className={styles.sectionLead}>
              Reach out for systems design, simulations, fintech, or data platform work.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="https://mail.google.com/mail/?view=cm&fs=1&to=pabs9230@gmail.com" target="_blank" rel="noreferrer">
                Email
              </a>
              <a className={styles.secondary} href="https://www.linkedin.com/in/pablo-marines-lechuga/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className={styles.secondary} href="https://github.com/pabs9230" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
          <div className={styles.footerMeta}>
            <p>NOCTURNE · Mawgrim · Systems Engineer</p>
            <p>Built with Next.js, App Router, and custom CSS.</p>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
