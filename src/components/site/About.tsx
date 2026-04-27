export const About = () => (
  <section id="om-oss" className="py-24 md:py-32 bg-background">
    <div className="container grid md:grid-cols-12 gap-12 md:gap-16">
      <div className="md:col-span-4">
        <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">Om oss</p>
        <h2 className="font-display text-5xl md:text-6xl text-foreground leading-none">
          Hantverk från fjällen.
        </h2>
      </div>
      <div className="md:col-span-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>
          Danielssons Bygg drivs av <strong className="text-foreground">Niklas Danielsson</strong> och
          utgår från Vemdalen i hjärtat av Härjedalen. Vi är ett lokalt byggföretag som tar uppdrag
          i Vemdalen, Klövsjö, Östersund och hela Jämtland — där berg, snö och väder ställer höga krav
          på det som byggs.
        </p>
        <p>
          Vi tror på personliga relationer, ärlig kommunikation och hantverk som står sig över tid.
          Oavsett om du planerar en ny fjällstuga, en tillbyggnad till befintligt boende eller en ny
          altan — så får du samma engagemang från första skiss till sista skruv.
        </p>
        <dl className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Bas</dt>
            <dd className="font-display text-3xl text-foreground mt-2">Vemdalen</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Verksamhet</dt>
            <dd className="font-display text-3xl text-foreground mt-2">Jämtland</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Org.nr</dt>
            <dd className="font-display text-3xl text-foreground mt-2">559317-6570</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
);