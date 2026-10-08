"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MAP_POINTS, STATS } from "@/content/site";
import { Reveal, RevealLines } from "./Reveal";
import styles from "./Territorio.module.css";

/** Número que conta de zero até o valor quando aparece na tela. O HTML já nasce com o valor final. */
function Counter({ value, prefix }: { value: number; prefix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1600;
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = prefix + Math.round(value * eased);
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = prefix + "0";
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, prefix]);
  return <span ref={ref}>{prefix + value}</span>;
}

type View = "italia" | "piemonte";

export function Territorio() {
  const [view, setView] = useState<View>("italia");
  const box = useRef<HTMLDivElement>(null);

  // quando o mapa entra na tela, faz o zoom suave sobre o Piemonte
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timer = setTimeout(() => setView("piemonte"), 900);
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const zoomed = view === "piemonte";

  return (
    <section id="territorio" className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.mapCol}>
          <div ref={box} className={styles.map} data-view={view}>
            <div className={styles.stage}>
              <Image
                src="/maps/italia-piemonte.svg"
                alt="Mappa d'Italia con il Piemonte evidenziato"
                width={500}
                height={646}
                unoptimized
                className={styles.svg}
              />
              {MAP_POINTS.map((p) => (
                <div
                  key={p.id}
                  className={`${styles.pt} ${p.main ? styles.main : ""} ${styles[p.side]}`}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <i />
                  <b>{p.label}</b>
                </div>
              ))}
              <span className={styles.region}>Piemonte</span>
            </div>
          </div>
          <div className={styles.toggle} role="group" aria-label="Vista della mappa">
            <button type="button" aria-pressed={!zoomed} onClick={() => setView("italia")}>
              Italia
            </button>
            <button type="button" aria-pressed={zoomed} onClick={() => setView("piemonte")}>
              Piemonte
            </button>
          </div>
        </Reveal>

        <div className={styles.text}>
          <Reveal>
            <p className="occhiello red">Il territorio</p>
          </Reveal>
          <RevealLines as="h2" className="h2" lines={["Una collina a forma", "di teatro"]} />
          <Reveal delay={0.1}>
            <p className={styles.p}>
              Castelnuovo Calcea è la porta d&apos;ingresso alla Valle Belbo e al Monferrato. La vigna abbraccia
              un&apos;intera collina, come un anfiteatro greco, esposta da sud-est a sud-ovest.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className={styles.p}>
              Terreno subalcalino con gesso. Quattro vitigni: Barbera, Grignolino, Cortese e Nebbiolo.
            </p>
          </Reveal>

          <Reveal delay={0.1} className={styles.soil}>
            <Image
              src="/images/vigna-neve.webp"
              alt="La terra della collina, con la neve e i segni del trattore"
              fill
              sizes="(max-width: 900px) 90vw, 560px"
              style={{ objectFit: "cover", objectPosition: "40% 92%" }}
            />
          </Reveal>

          <dl className={styles.stats}>
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.1} className={styles.stat}>
                <dt>
                  <Counter value={s.value} prefix={s.prefix} />
                </dt>
                <dd>{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
