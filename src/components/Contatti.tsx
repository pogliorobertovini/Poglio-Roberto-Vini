import Link from "next/link";
import { CONTACT, SITE, mailtoUrl, whatsappUrl } from "@/content/site";
import { Logo } from "./Logo";
import { Reveal, RevealLines } from "./Reveal";
import styles from "./Contatti.module.css";

const TBD = <span className={styles.tbd}>da inserire</span>;

export function Contatti() {
  return (
    <footer id="contatti" className={`on-dark ${styles.footer}`}>
      <div className={`container ${styles.wrap}`}>
        <div className={styles.top}>
          <div className={styles.info}>
            <Reveal>
              <p className="occhiello">Contatti</p>
            </Reveal>
            <RevealLines as="h2" className={`h2 ${styles.h2}`} lines={["Restiamo", "in contatto"]} />
            <Reveal delay={0.1} className={styles.list}>
              <p className={styles.company}>{SITE.company}</p>
              <dl>
                <dt>Indirizzo</dt>
                <dd>
                  {CONTACT.address ?? TBD}, {CONTACT.zip} {SITE.town} ({SITE.province})
                </dd>
                <dt>Telefono</dt>
                <dd>
                  {CONTACT.phoneDisplay ? <a href={`tel:${CONTACT.phoneDisplay.replace(/\s/g, "")}`}>{CONTACT.phoneDisplay}</a> : TBD}
                </dd>
                <dt>WhatsApp</dt>
                <dd>
                  <a href={whatsappUrl("Buongiorno, vorrei avere qualche informazione sui vostri vini.")} target="_blank" rel="noopener noreferrer">
                    Scrivici
                  </a>
                </dd>
                <dt>E-mail</dt>
                <dd>
                  {CONTACT.email ? <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> : TBD}
                </dd>
                <dt>Instagram</dt>
                <dd>
                  {CONTACT.instagram ? (
                    <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
                      {CONTACT.instagramHandle}
                    </a>
                  ) : (
                    TBD
                  )}
                </dd>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.15} className={styles.trade}>
            <p className="occhiello">Per il trade</p>
            <h3>Sei un importatore o un distributore?</h3>
            <p className={styles.tradeP}>
              Scrivici e ti invieremo le schede tecniche. Listino e campioni su richiesta.
            </p>
            <a
              href={mailtoUrl(CONTACT.emailTrade ?? CONTACT.email, "Richiesta schede tecniche — importatore/distributore")}
              className="btn btn-light"
            >
              Contatto importatori
            </a>
          </Reveal>
        </div>

        <div className={styles.bottom}>
          <Logo layout="stacked" tone="dark" className={styles.logo} />
          <div className={styles.legal}>
            <p>
              © {new Date().getFullYear()} {SITE.company} · P. IVA {CONTACT.vat ?? "[da inserire]"}
            </p>
            <p className={styles.links}>
              <span>Bevi responsabilmente</span>
              <Link href="/privacy">Privacy</Link>
              <Link href="/cookie">Cookie</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
