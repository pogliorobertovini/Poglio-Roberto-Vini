import Image from "next/image";
import { STEPS } from "@/content/site";
import { Reveal, RevealLines } from "./Reveal";
import styles from "./Vigna.module.css";

export function Vigna() {
  return (
    <section id="vigna" className={`section on-dark ${styles.section}`}>
      <div className={`container ${styles.wrap}`}>
        <header className={styles.head}>
          <Reveal>
            <p className="occhiello">Dalla vigna alla bottiglia</p>
          </Reveal>
          <RevealLines as="h2" className={`h2 ${styles.h2}`} lines={["Tutto passa", "dalle nostre mani"]} />
        </header>

        <div className={styles.cols}>
          {STEPS.map((s, i) => (
            <Reveal as="article" key={s.title} delay={i * 0.14} className={styles.step}>
              <div className={styles.photo}>
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 700px) 90vw, 380px"
                  style={{ objectFit: "cover", objectPosition: s.pos }}
                />
              </div>
              <div className={styles.label}>
                <span className={styles.n}>{s.n}</span>
                <h3>{s.title}</h3>
              </div>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
