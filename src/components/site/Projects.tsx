import nyproduktion from "@/assets/project-nyproduktion.jpg";
import trall from "@/assets/project-trall.jpg";
import mobler from "@/assets/project-mobler.jpg";

const projects = [
  {
    img: nyproduktion,
    alt: "Nybyggd fjällstuga med stora fönster i Vemdalen",
    title: "Fjällstuga, Vemdalsskalet",
    cat: "Nyproduktion",
  },
  {
    img: trall,
    alt: "Ny trall av lärkträ vid fjällstuga i Härjedalen",
    title: "Altan i lärkträ",
    cat: "Trall & utemiljö",
  },
  {
    img: mobler,
    alt: "Platsbyggda hyllor och bänk i fjällstuga",
    title: "Platsbyggd inredning",
    cat: "Snickeri",
  },
];

export const Projects = () => (
  <section id="projekt" className="py-24 md:py-32 bg-background">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">Projekt</p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground leading-none">
            Hantverk i bilder.
          </h2>
        </div>
        <a
          href="https://www.instagram.com/danielssonsbygg/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm uppercase tracking-wider text-accent hover:text-accent/80 transition-smooth border-b border-accent pb-1 self-start"
        >
          Följ på Instagram →
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <article
            key={p.title}
            className={`group relative overflow-hidden shadow-card ${
              i === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <img
              src={p.img}
              alt={p.alt}
              width={1200}
              height={900}
              loading="lazy"
              className={`w-full object-cover transition-smooth group-hover:scale-105 ${
                i === 0 ? "h-[400px] md:h-[640px]" : "h-[400px]"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-overlay opacity-80" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="text-snow/70 text-xs uppercase tracking-[0.2em] mb-2">{p.cat}</p>
              <h3 className="font-display text-snow text-2xl md:text-3xl">{p.title}</h3>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-10 text-center text-muted-foreground text-sm">
        Fler projekt och löpande uppdateringar finns på vår{" "}
        <a
          href="https://www.instagram.com/danielssonsbygg/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent hover:underline"
        >
          Instagram @danielssonsbygg
        </a>
        .
      </p>
    </div>
  </section>
);