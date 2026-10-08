"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NAV } from "@/content/site";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`${styles.header} ${scrolled || open ? styles.solid : ""}`}>
        <a
          href="#apertura"
          className={styles.logo}
          aria-label="Poglio Roberto — inizio pagina"
          onClick={() => setOpen(false)}
        >
          <Logo layout="horizontal" tone="dark" />
        </a>

        <nav className={styles.nav} aria-label="Principale">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
          <a href="#visite" className={styles.cta}>
            Prenota una visita
          </a>
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Chiudi" : "Menu"}
        </button>
      </header>

      {open && (
        <div id="menu-mobile" className={styles.overlay}>
          {NAV.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#visite" className={styles.overlayCta} onClick={() => setOpen(false)}>
            Prenota una visita
          </a>
        </div>
      )}
    </>
  );
}
