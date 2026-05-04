export const About = () => (
  <section id="om-oss" className="py-20 md:py-28 bg-secondary overflow-hidden">
    <div className="container">

      {/* Rubrik — full bredd */}
      <div className="mb-12 md:mb-16">
        <p className="text-accent uppercase tracking-[0.3em] text-xs mb-5">Om oss</p>
        <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] text-foreground leading-none">
          Hantverk<br />från fjällen.
        </h2>
      </div>

      {/* Brödtext + stats i två kolumner */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 border-t border-border pt-10">

        {/* Vänster — text */}
        <div className="space-y-4 text-muted-foreground leading-relaxed">
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

        {/* Höger — stats + CTA */}
        <div className="flex flex-col justify-between gap-10">
          <dl className="flex gap-8">
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Bas</dt>
              <dd className="font-display text-3xl text-foreground leading-none">Vemdalen</dd>
            </div>
            <div className="border-l border-border pl-8">
              <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Område</dt>
              <dd className="font-display text-3xl text-foreground leading-none">Jämtland</dd>
            </div>
          </dl>

          <a
            href="#kontakt"
            className="self-start inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-accent/90 transition-smooth"
          >
            Begär offert
          </a>
        </div>

      </div>
    </div>
  </section>
);
