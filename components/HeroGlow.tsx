"use client";
import React, { useEffect, useRef } from "react";
import styles from "./HeroGlow.module.css";

export default function HeroGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rAF = 0;
    let localX = 0;
    let localY = 0;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      localX = (e.clientX - (rect.left + rect.width / 2)) / rect.width; // -0.5..0.5
      localY = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    };

    let start = performance.now();
    const tick = (t: number) => {
      if (!el) return;
      const dt = t - start;
      const autoX = Math.sin(dt * 0.00012) * 18; // smaller slow drift
      const autoY = Math.cos(dt * 0.00009) * 12;
      const tx = localX * 28 + autoX;
      const ty = localY * 28 + autoY;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      rAF = requestAnimationFrame(tick);
    };

    if (!prefersReduce) {
      el.style.transform = `translate3d(0,0,0)`;
      window.addEventListener("pointermove", handleMove, { passive: true });
      rAF = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, []);

  return <div className={styles.heroGlow} ref={ref} aria-hidden="true" />;
}
