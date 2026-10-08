/**
 * Logo Poglio Roberto — torre desenhada à mão em dourado, pensada para fundo escuro.
 * Arquivos em /public/logo (gerados por scripts/logo.mjs a partir da arte original).
 *  - horizontal: torre + nome (menu)
 *  - stacked: logo completa com as quatro palavras (rodapé, materiais)
 *  - symbol: só a torre
 * Obs.: use sempre sobre fundo escuro (Nero Cantina / foto com véu).
 */
import Image from "next/image";
import styles from "./Logo.module.css";

type Layout = "stacked" | "horizontal" | "symbol";

export function Logo({
  layout = "horizontal",
  className = "",
  title = "Poglio Roberto — Vini",
}: {
  layout?: Layout;
  /** aceito por compatibilidade: a logo atual só existe em dourado sobre escuro */
  tone?: "light" | "dark" | "white" | "black" | "gold";
  className?: string;
  title?: string;
}) {
  if (layout === "stacked") {
    return (
      <Image src="/logo/logo-oro.png" alt={title} width={342} height={349} className={`${styles.full} ${className}`} />
    );
  }
  if (layout === "symbol") {
    return <Image src="/logo/torre-oro.png" alt={title} width={229} height={267} className={`${styles.symbol} ${className}`} />;
  }
  return (
    <span className={`${styles.horizontal} ${className}`} role="img" aria-label={title}>
      <Image src="/logo/torre-oro.png" alt="" width={229} height={267} />
      <span className={styles.name} aria-hidden>
        <b>POGLIO</b> ROBERTO
      </span>
    </span>
  );
}
