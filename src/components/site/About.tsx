export const About = () => (
  <section id="om-oss" className="py-20 md:py-28 bg-secondary overflow-hidden">
    <div className="container">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Text */}
        <div>
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-5">Om oss</p>
          <h2 className="font-display text-6xl md:text-7xl lg:text-8xl text-foreground leading-none mb-8">
            Hantverk<br />från fjällen.
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed max-w-md">
            <p>
              Danielssons Bygg drivs av{" "}
              <strong className="text-foreground">Niklas Danielsson</strong> och utgår från
              Vemdalen i hjärtat av Härjedalen. Vi tar uppdrag i Vemdalen, Klövsjö, Östersund
              och hela Jämtland — där berg, snö och väder ställer höga krav på det som byggs.
            </p>
            <p>
              Vi tror på personliga relationer, ärlig kommunikation och hantverk som håller —
              från första skiss till sista skruv.
            </p>
          </div>

          <dl className="flex gap-8 mt-10 pt-8 border-t border-border">
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Bas</dt>
              <dd className="font-display text-3xl text-foreground leading-none">Vemdalen</dd>
            </div>
            <div className="border-l border-border pl-8">
              <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Område</dt>
              <dd className="font-display text-3xl text-foreground leading-none">Jämtland</dd>
            </div>
          </dl>

          <div className="mt-10">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-accent/90 transition-smooth"
            >
              Begär offert
            </a>
          </div>
        </div>

        {/* Fjällbild */}
        <div className="relative overflow-hidden shadow-elegant" style={{ aspectRatio: "4/5" }}>
          <img
            src="/fjallbild.jpg"
            alt="Fjällen i Vemdalen och Härjedalen"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  </section>
);
