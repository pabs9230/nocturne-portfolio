"use client";
import React, { useEffect, useRef } from "react";
import styles from "./GlowParallax.module.css";

export default function GlowParallax() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rAF = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseX = (e.clientX - w / 2) / w; // -0.5 .. 0.5
      mouseY = (e.clientY - h / 2) / h;
    };

    const handleScroll = () => {
      const scroll = window.scrollY || window.pageYOffset;
      const docH = document.body.scrollHeight - window.innerHeight || 1;
      const t = scroll / docH; // 0..1
      el.style.setProperty("--scroll-factor", String((t - 0.5) * 0.6));
    };

    let start = performance.now();
    const tick = (time: number) => {
      if (!el) return;
      const t = time - start;
      // automatic slow drift
      const autoX = Math.sin(t * 0.00007) * 60; // slow horizontal drift
      const autoY = Math.cos(t * 0.00005) * 40; // slow vertical drift
      const scrollFactor = parseFloat(el.style.getPropertyValue("--scroll-factor") || "0");
      const tx = mouseX * 60 + autoX + scrollFactor * 40;
      const ty = mouseY * 60 + autoY + scrollFactor * 20;
      const s = 1 + Math.max(Math.abs(mouseX), Math.abs(mouseY)) * 0.06 + Math.abs(scrollFactor) * 0.05;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${s})`;
      rAF = requestAnimationFrame(tick);
    };

    if (!prefersReduce) {
      window.addEventListener("pointermove", handleMove, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      rAF = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, []);

  return <div className={styles.fullGlow} ref={ref} aria-hidden="true" />;
}
