"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CONTACT, WINES, mailtoUrl } from "@/content/site";
import { Reveal, RevealLines } from "./Reveal";
import styles from "./Vini.module.css";

const Bottle3D = dynamic(() => import("./Bottle3D"), { ssr: false });

export function Vini() {
  const [sel, setSel] = useState(0);
  const [near, setNear] = useState(false); // carrega o 3D só perto da seção
  const [visible, setVisible] = useState(false); // pausa o render fora da tela
  const stage = useRef<HTMLDivElement>(null);
  const n = WINES.length;
  const wine = WINES[sel];

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (i: number) => setSel(((i % n) + n) % n);

  // alternativa estática (carregando / sem WebGL): o rótulo plano
  const flat = (
    <div className={styles.flat}>
      <Image src={wine.label} alt={`Rótulo ${wine.name}`} width={440} height={560} sizes="320px" />
    </div>
  );

  return (
    <section id="vini" className={`section ${styles.section}`}>
      <div className={`container ${styles.wrap}`}>
        <header className={styles.head}>
          <Reveal>
            <p className="occhiello">I nostri vini</p>
          </Reveal>
          <RevealLines as="h2" className="h2" lines={["Cinque vini,", "e una novità in arrivo"]} />
        </header>

        <div className={styles.grid}>
          {/* esquerda: a lista */}
          <Reveal className={styles.listCol}>
            <ul className={styles.list} aria-label="I nostri vini">
              {WINES.map((w, i) => (
                <li key={w.id}>
                  <button
                    type="button"
                    className={`${styles.item} ${i === sel ? styles.active : ""}`}
                    aria-current={i === sel}
                    onClick={() => go(i)}
                  >
                    <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.names}>
                      <span className={styles.name}>{w.name}</span>
                      <span className={styles.denom}>{w.denom}</span>
                    </span>
                    <i className={styles.swatch} style={{ background: w.tag }} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* centro: a garrafa */}
          <Reveal delay={0.1} className={styles.center}>
            <div ref={stage} className={styles.stage}>
              <div className={styles.glow} aria-hidden />
              {near ? <Bottle3D wines={WINES} index={sel} active={visible} fallback={flat} /> : flat}
            </div>
            <div className={styles.nav}>
              <button type="button" onClick={() => go(sel - 1)} aria-label="Vino precedente">
                ←
              </button>
              <span aria-hidden>
                {sel + 1} / {n}
              </span>
              <button type="button" onClick={() => go(sel + 1)} aria-label="Vino successivo">
                →
              </button>
            </div>
            <p className={styles.hint}>Trascina la bottiglia per ruotarla</p>
          </Reveal>

          {/* direita: o texto */}
          <Reveal delay={0.2} className={styles.infoCol}>
            <div key={wine.id} className={styles.info} aria-live="polite">
              <p className="occhiello red">{wine.denom}</p>
              <h3 className={styles.title}>{wine.name}</h3>
              <p className={styles.text}>{wine.text}</p>
              {!wine.soon && (
                <dl className={styles.facts}>
                  {wine.grape && (
                    <>
                      <dt>Uva</dt>
                      <dd>{wine.grape}</dd>
                    </>
                  )}
                  <dt>Tipologia</dt>
                  <dd>{wine.type}</dd>
                  {wine.year && (
                    <>
                      <dt>Annata</dt>
                      <dd>{wine.year}</dd>
                    </>
                  )}
                </dl>
              )}
              {wine.soon ? (
                <a
                  className="btn btn-primary"
                  style={{ alignSelf: "flex-start", marginTop: 8 }}
                  href={CONTACT.instagram ?? "#contatti"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Seguici su Instagram
                </a>
              ) : (
                <a
                  className={styles.sheet}
                  href={mailtoUrl(CONTACT.email, `Scheda tecnica — ${wine.name}`, `Buongiorno, vorrei ricevere la scheda tecnica di ${wine.name}.`)}
                >
                  Richiedi la scheda tecnica
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
