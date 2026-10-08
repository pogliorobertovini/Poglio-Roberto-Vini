import Image from "next/image";
import { mailtoUrl, VISIT_MESSAGE, whatsappUrl, CONTACT } from "@/content/site";
import { Reveal, RevealLines } from "./Reveal";
import styles from "./Visite.module.css";

export function Visite() {
  return (
    <section id="visite" className={styles.section}>
      <div className={styles.photo}>
        <Image
          src="/images/cantina.webp"
          alt="La cantina nell'antico monastero, con i serbatoi in acciaio sotto le volte in mattoni"
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "40% 50%" }}
        />
      </div>

      <div className={styles.text}>
        <Reveal>
          <p className={`occhiello ${styles.occ}`}>Vieni a trovarci</p>
        </Reveal>
        <RevealLines as="h2" className="h2" lines={["La porta", "è aperta"]} />
        <Reveal delay={0.1}>
          <p className={styles.p}>
            Ti aspettiamo tra i filari e nella nostra cantina. Le visite sono su prenotazione: scrivici e troviamo
            insieme il giorno giusto.
          </p>
        </Reveal>
        <Reveal delay={0.2} className={styles.actions}>
          <a href={whatsappUrl(VISIT_MESSAGE)} className="btn btn-light" target="_blank" rel="noopener noreferrer">
            Scrivici su WhatsApp
          </a>
          <a
            href={mailtoUrl(CONTACT.email, "Richiesta di visita in cantina", VISIT_MESSAGE)}
            className="btn btn-ghost"
          >
            Mandaci una mail
          </a>
        </Reveal>
      </div>
    </section>
  );
}
