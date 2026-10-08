"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { WINES } from "@/content/site";
import type { BottleVariant } from "./Bottle3D";
import styles from "./GarrafeCompare.module.css";

const Bottle3D = dynamic(() => import("./Bottle3D"), { ssr: false });

const OPTIONS: { id: BottleVariant; n: string; title: string; text: string }[] = [
  { id: "classica", n: "Atual", title: "Clássica brilhante", text: "Vidro polido, com reflexos fortes de luz. É a que está no ar agora." },
  { id: "satinata", n: "Opção 1", title: "Satinada", text: "Mesmo formato, vidro verde escuro fosco: sem brilhos fortes, luz suave e difusa." },
  { id: "morbida", n: "Opção 2", title: "Verde antigo translúcido", text: "Vidro verde mais claro e transparente, luz ampla e suave. Dá para ver o vinho por dentro." },
  { id: "albeisa", n: "Opção 3", title: "Albeisa piemontese", text: "Outro formato: a garrafa tradicional do Piemonte, ombros em declive e vidro pesado, em verde-oliva acetinado." },
];

export function GarrafeCompare() {
  const [sel, setSel] = useState(0);
  return (
    <div className={styles.wrap}>
      <header className={styles.head}>
        <h1>Escolha da garrafa</h1>
        <p>
          Compare os quatro modelos com o mesmo vinho. Arraste cada garrafa para girar. Depois me diga o número da que
          você prefere (ou o que mudar nela).
        </p>
        <div className={styles.picker} role="group" aria-label="Vinho">
          {WINES.map((w, i) => (
            <button key={w.id} type="button" aria-pressed={i === sel} onClick={() => setSel(i)}>
              {w.name}
            </button>
          ))}
        </div>
      </header>
      <div className={styles.grid}>
        {OPTIONS.map((o) => (
          <article key={o.id} className={styles.card}>
            <div className={styles.stage}>
              <Bottle3D wines={WINES} index={sel} active variant={o.id} fallback={null} />
            </div>
            <p className={styles.n}>{o.n}</p>
            <h2>{o.title}</h2>
            <p className={styles.t}>{o.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
