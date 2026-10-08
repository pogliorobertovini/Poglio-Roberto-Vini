import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy", robots: { index: false } };

export default function Privacy() {
  return (
    <LegalPage title="Informativa sulla privacy">
      <p>
        {/* TODO: testo legale definitivo (titolare del trattamento, finalità, diritti). */}
        Il testo dell&apos;informativa sulla privacy sarà pubblicato qui prima della messa online del sito.
      </p>
    </LegalPage>
  );
}
