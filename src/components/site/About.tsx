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
            <p>
              Niklas är{" "}
              <strong className="text-foreground">certifierad kontrollansvarig (KA)</strong>{" "}
              enligt PBL, vilket innebär att han kan ansvara för kontrollplanen och vara er
              kontaktpunkt mot byggnadsnämnden — ett tryggt steg för både nybyggnation och
              större ombyggnader.
            </p>
          </div>

          <dl className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-border">
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Bas</dt>
              <dd className="font-display text-3xl text-foreground leading-none">Vemdalen</dd>
            </div>
            <div className="border-l border-border pl-8">
              <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Område</dt>
              <dd className="font-display text-3xl text-foreground leading-none">Jämtland</dd>
            </div>
            <div className="border-l border-border pl-8">
              <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Certifiering</dt>
              <dd className="flex items-center gap-3 leading-none">
                <span className="font-display text-3xl text-foreground">KA</span>
                <img
                  src="/projects/kontrollansvarig.png.png"
                  alt="Certifierad kontrollansvarig"
                  className="h-8 w-auto object-contain opacity-75"
                />
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-accent/90 transition-smooth"
            >
              Begär offert
            </a>
            <img
              src="/projects/kontrollansvarig.png.png"
              alt="Certifierad kontrollansvarig"
              className="h-12 w-auto object-contain opacity-80"
            />
          </div>
        </div>

        {/* Bild — porträttkort */}
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="relative overflow-hidden shadow-elegant" style={{ aspectRatio: "4/3" }}>
            <img
              src="/om-oss.jpg"
              alt="Niklas Danielsson, Danielssons Bygg"
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 right-0 px-7 py-6 bg-gradient-to-t from-black/75 to-transparent pt-16">
              <p className="font-display text-2xl text-snow leading-none">Niklas Danielsson</p>
              <p className="text-snow/60 text-sm mt-1">Grundare &amp; snickarmästare</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);
