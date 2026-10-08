"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { TIMELINE } from "@/content/site";
import { Reveal, RevealLines } from "./Reveal";
import styles from "./Storia.module.css";

export function Storia() {
  const list = useRef<HTMLOListElement>(null);

  // a linha do tempo se preenche com a rolagem e cada tappa "acende"
  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const items = Array.from(ol.children) as HTMLElement[];
    let raf = 0;
    const update = () => {
      const rect = ol.getBoundingClientRect();
      const mark = window.innerHeight * 0.62;
      const p = Math.max(0, Math.min(1, (mark - rect.top) / rect.height));
      ol.style.setProperty("--p", String(p));
      items.forEach((li) => {
        const dot = li.getBoundingClientRect().top + 14;
        li.classList.toggle(styles.on, dot < mark);
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="storia" className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <Reveal>
            <p className="occhiello">La nostra storia</p>
          </Reveal>
          <RevealLines
            as="h2"
            className="h2"
            lines={["Tutto è cominciato", "con Vanin"]}
          />

          <ol ref={list} className={styles.timeline}>
            {TIMELINE.map((t, i) => (
              <li key={t.when} className={styles.item}>
                <span className={styles.dot} aria-hidden />
                <Reveal delay={i * 0.05}>
                  <h3 className={styles.when}>{t.when}</h3>
                  <p className={styles.what}>{t.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal>
            <p className={styles.closing}>
              Il resto della storia? Si racconta meglio con un bicchiere in mano.
            </p>
          </Reveal>
        </div>

        <div className={styles.photos}>
          <Reveal as="figure" className={styles.polaroid}>
            <Image
              src="/images/famiglia.webp"
              alt="La famiglia Poglio nel cortile della cascina, accanto a un trattore d'epoca"
              width={1800}
              height={1246}
              sizes="(max-width: 900px) 80vw, 420px"
              style={{ objectPosition: "30% 50%" }}
            />
            <figcaption>La famiglia in cortile</figcaption>
          </Reveal>
          <Reveal as="figure" className={`${styles.polaroid} ${styles.second}`} delay={0.15}>
            <Image
              src="/images/cartolina.webp"
              alt="Vecchia cartolina in bianco e nero: panorama di Castelnuovo Calcea con il castello e il campanile tra gli alberi e le vigne"
              width={2000}
              height={1387}
              sizes="(max-width: 900px) 70vw, 340px"
            />
            <figcaption>Castelnuovo Calcea, una vecchia cartolina</figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
