"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { HERO } from "@/content/site";
import styles from "./Hero.module.css";

export function Hero() {
  const media = useRef<HTMLDivElement>(null);

  // parallax leve: a mídia desce mais devagar que a página
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight * 1.2);
        if (media.current) media.current.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="apertura" className={styles.hero}>
      <div ref={media} className={styles.media}>
        {HERO.video ? (
          <video
            className={styles.kb}
            src={HERO.video}
            poster={HERO.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            className={styles.kb}
            src={HERO.poster}
            alt=""
            fill
            sizes="100vw"
            preload
            style={{ objectFit: "cover", objectPosition: "50% 42%" }}
          />
        )}
      </div>
      <div className={styles.veil} />

      <div className={styles.content}>
        <p className={`occhiello gold ${styles.up}`} style={{ ["--i" as string]: 0 }}>
          Castelnuovo Calcea · Asti · Piemonte
        </p>
        <h1 className={styles.title}>
          {["Dal primo Ottocento,", "la stessa famiglia,", "la stessa collina."].map((l, i) => (
            <span className="line" key={l}>
              <span className={styles.lineIn} style={{ ["--i" as string]: i + 1 }}>
                {l}
              </span>
            </span>
          ))}
        </h1>
        <div className={`${styles.actions} ${styles.up}`} style={{ ["--i" as string]: 4.5 }}>
          <a href="#vini" className="btn btn-light">
            Scopri i nostri vini
          </a>
          <a href="#visite" className="btn btn-ghost">
            Vieni a trovarci
          </a>
        </div>
      </div>

      <a href="#storia" className={styles.cue} aria-label="Scorri per scoprire">
        <span>Scorri</span>
        <i />
      </a>
    </section>
  );
}
