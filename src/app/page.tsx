import { Contatti } from "@/components/Contatti";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Storia } from "@/components/Storia";
import { Territorio } from "@/components/Territorio";
import { Vigna } from "@/components/Vigna";
import { Vini } from "@/components/Vini";
import { Visite } from "@/components/Visite";
import { CONTACT, SITE } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Winery",
  name: SITE.brand,
  legalName: SITE.company,
  url: SITE.url,
  address: {
    "@type": "PostalAddress",
    postalCode: CONTACT.zip,
    addressLocality: SITE.town,
    addressRegion: SITE.province,
    addressCountry: "IT",
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <Hero />
        <Storia />
        <Territorio />
        <Vigna />
        <Vini />
        <Visite />
      </main>
      <Contatti />
    </>
  );
}
