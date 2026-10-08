import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Cookie", robots: { index: false } };

export default function Cookie() {
  return (
    <LegalPage title="Cookie policy">
      <p>
        {/* TODO: aggiornare se in futuro si aggiungono analytics o servizi di terze parti. */}
        Questo sito, nella versione attuale, non utilizza cookie di profilazione né servizi di tracciamento di terze
        parti. Il testo definitivo della cookie policy sarà pubblicato qui prima della messa online.
      </p>
    </LegalPage>
  );
}
