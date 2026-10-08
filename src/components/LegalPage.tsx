import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

/** Casca simples para Privacy / Cookie (conteúdo legal ainda a redigir). */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <header style={{ background: "var(--nero)", padding: "20px var(--pad-x)" }}>
        <Link href="/" aria-label="Poglio Roberto — torna al sito" style={{ display: "block", height: 44 }}>
          <Logo layout="horizontal" tone="dark" />
        </Link>
      </header>
      <main className="section" style={{ minHeight: "60vh" }}>
        <div className="container" style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 20 }}>
          <h1 className="h2">{title}</h1>
          {children}
          <p>
            <Link href="/">← Torna al sito</Link>
          </p>
        </div>
      </main>
    </>
  );
}
