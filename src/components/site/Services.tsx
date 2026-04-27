const services = [
  {
    title: "Nyproduktion",
    desc: "Vi bygger nya fjällstugor, villor och fritidshus från grund till nyckelfärdigt — anpassade för fjällklimatet i Vemdalen och Jämtland.",
    num: "01",
  },
  {
    title: "Om- & tillbyggnad",
    desc: "Bygg ut, bygg om eller renovera. Vi hjälper dig förvandla befintliga ytor till något bättre — med varsamhet och precision.",
    num: "02",
  },
  {
    title: "Trall & altan",
    desc: "Hållbara altaner och trallar i tryckimpregnerat, lärk eller komposit. Konstruerade för att klara snölaster och snabba temperaturskiften.",
    num: "03",
  },
  {
    title: "Golvläggning",
    desc: "Trägolv, parkett och klinker. Vi lägger nya golv som ger rummet karaktär och håller i decennier.",
    num: "04",
  },
  {
    title: "Taklägging",
    desc: "Nytt tak, omläggning eller renovering. Vi tar hand om hela processen — från underlag till tätskikt och plåtarbeten.",
    num: "05",
  },
  {
    title: "Platsbyggda möbler",
    desc: "Skräddarsydda hyllor, bänkar, garderober och kök. Möbler som passar precis i ditt rum och håller livet ut.",
    num: "06",
  },
];

export const Services = () => (
  <section id="tjanster" className="py-24 md:py-32 bg-secondary">
    <div className="container">
      <div className="max-w-3xl mb-16 md:mb-20">
        <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">Tjänster</p>
        <h2 className="font-display text-5xl md:text-7xl text-foreground leading-none">
          Allt från grund till finsnickeri.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Vi erbjuder ett brett utbud av byggtjänster i Vemdalen och hela Jämtland — utförda av
          erfarna snickare med blicken för detaljer.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {services.map((s) => (
          <article
            key={s.title}
            className="group bg-background p-8 md:p-10 transition-smooth hover:bg-foreground hover:text-snow cursor-default"
          >
            <span className="font-display text-xl text-accent group-hover:text-accent block mb-8">
              {s.num}
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-4 leading-none">{s.title}</h3>
            <p className="text-muted-foreground group-hover:text-snow/80 leading-relaxed">{s.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);