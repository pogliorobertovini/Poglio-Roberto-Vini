import type { Metadata } from "next";
import { GarrafeCompare } from "@/components/GarrafeCompare";

// Página temporária só para escolher o visual da garrafa (não indexar).
export const metadata: Metadata = { title: "Escolha da garrafa", robots: { index: false, follow: false } };

export default function Garrafe() {
  return <GarrafeCompare />;
}
