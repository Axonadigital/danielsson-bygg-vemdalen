import { useState } from "react";

type Service = { title: string; desc: string; img: string; img2?: string };

const services: Service[] = [
  {
    title: "Nyproduktion",
    desc: "Vi bygger nya fjällstugor, villor och fritidshus från grund till nyckelfärdigt — anpassade för fjällklimatet i Vemdalen och Jämtland.",
    img: "/projects/tillbyggnad.webp",
  },
  {
    title: "Om- & tillbyggnad",
    desc: "Bygg ut, bygg om eller renovera. Vi hjälper dig förvandla befintliga ytor till något bättre — med varsamhet och precision.",
    img: "/projects/tillbyggnad-ny.jpg",
  },
  {
    title: "Trall & altan",
    desc: "Hållbara altaner och trallar i tryckimpregnerat, lärk eller komposit. Konstruerade för att klara snölaster och snabba temperaturskiften.",
    img: "/projects/atlan/trall.jpg",
  },
  {
    title: "Golvläggning",
    desc: "Trägolv, parkett och klinker. Vi lägger nya golv som ger rummet karaktär och håller i decennier.",
    img: "/projects/golvlaggning/ny.jpg",
  },
  {
    title: "Takläggning",
    desc: "Nytt tak, omläggning eller renovering. Vi tar hand om hela processen — från underlag till tätskikt och plåtarbeten.",
    img: "/projects/takbyte/4.jpg",
  },
  {
    title: "Kök & platsbyggda möbler",
    desc: "Skräddarsydda hyllor, bänkar, garderober och kök. Möbler som passar precis i ditt rum och håller livet ut.",
    img: "/projects/atlan/mobler.jpg",
    img2: "/platsbyggda-mobler.jpg",
  },
];

const ServiceModal = ({ service, onClose }: { service: Service; onClose: () => void }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/75 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="relative w-full max-w-2xl bg-background shadow-elegant overflow-hidden animate-fade-up"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative h-64 md:h-80">
        <img
          src={service.img}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
      </div>
      <button
        type="button"
        aria-label="Stäng"
        onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-foreground/50 text-snow hover:bg-foreground/70 transition-smooth text-lg leading-none"
      >
        ✕
      </button>
      <div className="p-8 md:p-10">
        <h3 className="font-display text-4xl md:text-5xl text-foreground leading-none mb-4">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
        <a
          href="#kontakt"
          onClick={onClose}
          className="inline-flex items-center gap-2 mt-8 bg-accent text-accent-foreground px-7 py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-accent/90 transition-smooth shadow-elegant"
        >
          Begär offert
        </a>
      </div>
    </div>
  </div>
);

const SplitCard = ({ s, onClick }: { s: Service; onClick: () => void }) => {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);

  const leftW = hovered === "right" ? "25%" : hovered === "left" ? "75%" : "60%";
  const rightW = hovered === "left" ? "25%" : hovered === "right" ? "75%" : "40%";

  return (
    <article
      className="relative overflow-hidden bg-secondary cursor-pointer"
      style={{ minHeight: "300px" }}
      onClick={onClick}
    >
      {/* Vänster panel – kök */}
      <div
        className="absolute inset-y-0 left-0 bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{ width: leftW, backgroundImage: `url(${s.img})` }}
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        <div className="absolute top-4 left-4 z-10">
          <span className="px-2 py-1 bg-black/60 text-white/90 text-xs uppercase tracking-widest backdrop-blur-sm">
            Kök
          </span>
        </div>
      </div>

      {/* Avdelare */}
      <div
        className="absolute inset-y-0 z-20 flex items-center justify-center transition-all duration-500 ease-in-out"
        style={{ left: leftW, transform: "translateX(-50%)" }}
      >
        <div className="w-px h-full bg-white/50 absolute" />
        <div className="relative z-10 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
          <span className="text-white text-xs font-light">↔</span>
        </div>
      </div>

      {/* Höger panel – platsbyggda möbler */}
      <div
        className="absolute inset-y-0 right-0 bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{ width: rightW, backgroundImage: `url(${s.img2})` }}
        onMouseEnter={() => setHovered("right")}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2 py-1 bg-black/60 text-white/90 text-xs uppercase tracking-widest backdrop-blur-sm">
            Möbler
          </span>
        </div>
      </div>

      {/* Rubrik och länk längst ner */}
      <div
        className="absolute inset-x-0 bottom-0 z-30 p-7 pointer-events-none"
        onMouseEnter={() => setHovered(null)}
      >
        <h3 className="font-display text-4xl text-white leading-none mb-3 drop-shadow-lg">
          {s.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="h-px bg-accent w-6" />
          <span className="text-white/70 text-xs uppercase tracking-widest drop-shadow-md">
            Läs mer
          </span>
        </div>
      </div>
    </article>
  );
};

export const Services = () => {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section id="tjanster" className="py-24 md:py-32 bg-secondary">
      <div className="container">
        <div className="mb-12 md:mb-16">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">Tjänster</p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground leading-none">
            Allt från grund till finsnickeri.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((s) =>
            s.img2 ? (
              <SplitCard key={s.title} s={s} onClick={() => setSelected(s)} />
            ) : (
              <article
                key={s.title}
                className="group relative overflow-hidden bg-secondary cursor-pointer"
                style={{ minHeight: "300px" }}
                onClick={() => setSelected(s)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${s.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-smooth group-hover:from-black/95 group-hover:via-black/50" />
                <div className="relative z-10 p-7 flex flex-col justify-end" style={{ minHeight: "300px" }}>
                  <h3 className="font-display text-4xl text-white leading-none mb-2 drop-shadow-lg">{s.title}</h3>
                  <p className="text-white/95 text-sm leading-relaxed overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 mb-0 group-hover:mb-4 drop-shadow-md">
                    {s.desc}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="h-px bg-accent w-6 group-hover:w-14 transition-all duration-500" />
                    <span className="text-white/70 group-hover:text-accent text-xs uppercase tracking-widest transition-smooth drop-shadow-md">
                      Läs mer
                    </span>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </div>

      {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};
