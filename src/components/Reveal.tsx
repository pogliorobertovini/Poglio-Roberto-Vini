"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

function useInView<T extends HTMLElement>(threshold: number, rootMargin = "0px") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return ref;
}

/**
 * Entrada suave ao rolar: adiciona a classe `in` quando o elemento aparece
 * (o CSS está em globals.css). `delay` em segundos para escalonar colunas.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li" | "article" | "p" | "figure";
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useInView<HTMLDivElement>(0.12, "0px 0px -6% 0px");
  const Tag = as as "div";
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ ...style, ["--d" as string]: `${delay}s` }}>
      {children}
    </Tag>
  );
}

/** Título que entra linha por linha. Passe as linhas já quebradas. */
export function RevealLines({
  lines,
  as = "h2",
  className = "",
  delay = 0,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}) {
  const ref = useInView<HTMLHeadingElement>(0.3);
  const Tag = as as "h2";
  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span className="line" key={i}>
          <span style={{ ["--d" as string]: `${delay + i * 0.12}s` }}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
