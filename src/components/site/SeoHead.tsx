import { Helmet } from "react-helmet-async";

const SITE = "https://danielssonsbygg.se";

export const SeoHead = () => {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE}/#business`,
    name: "Danielssons Bygg",
    legalName: "Nicke Danielssons Bygg AB",
    description:
      "Snickare och byggföretag i Vemdalen. Nyproduktion, om- och tillbyggnad, trall, golv, tak och platsbyggda möbler i Jämtland och Härjedalen.",
    url: SITE,
    telephone: "+46768292821",
    image: `${SITE}/og-image.png`,
    logo: `${SITE}/favicon.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Norrmalmsgatan 20",
      postalCode: "846 71",
      addressLocality: "Vemdalen",
      addressRegion: "Jämtland",
      addressCountry: "SE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 62.4337,
      longitude: 13.8536,
    },
    areaServed: [
      { "@type": "Place", name: "Vemdalen" },
      { "@type": "Place", name: "Härjedalen" },
      { "@type": "Place", name: "Jämtland" },
      { "@type": "Place", name: "Klövsjö" },
      { "@type": "Place", name: "Östersund" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    sameAs: ["https://www.instagram.com/danielssonsbygg/"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+46768292821",
      contactType: "customer service",
      areaServed: "SE",
      availableLanguage: ["Swedish"],
    },
  };

  const services = [
    "Nyproduktion",
    "Om- och tillbyggnad",
    "Trall och altan",
    "Golvläggning",
    "Taklägging",
    "Platsbyggda möbler",
  ].map((name) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    provider: { "@id": `${SITE}/#business` },
    areaServed: "Jämtland, Sverige",
  }));

  return (
    <Helmet>
      <html lang="sv" />
      <title>Snickare i Vemdalen & Jämtland | Danielssons Bygg</title>
      <meta
        name="description"
        content="Danielssons Bygg – din snickare i fjällen. Nyproduktion, om- och tillbyggnad, trall, golv, tak och platsbyggda möbler i Vemdalen och hela Jämtland."
      />
      <link rel="canonical" href={`${SITE}/`} />
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      {services.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};