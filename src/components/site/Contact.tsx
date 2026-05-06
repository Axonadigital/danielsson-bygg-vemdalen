export const Contact = () => (
  <section id="kontakt" className="py-24 md:py-32 bg-muted">
    <div className="container">
      <div className="max-w-3xl mb-16">
        <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">Kontakt</p>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-none">
          Hör av dig!
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
          Har du en idé, en ritning eller bara en tanke om vad du vill bygga i fjällen? Hör av dig
          så pratar vi om hur vi kan göra det möjligt. Vi tar uppdrag i Vemdalen och hela Jämtland.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Kontaktuppgifter */}
        <div className="space-y-0">
          <div className="border-t border-border py-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Telefon</p>
            <a
              href="tel:+46768292821"
              className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground hover:text-accent transition-smooth block"
            >
              076-829 28 21
            </a>
          </div>
          <div className="border-t border-border py-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">E-post</p>
            <a
              href="mailto:danielssonsbygg@hotmail.com"
              className="font-display text-2xl sm:text-3xl text-foreground hover:text-accent transition-smooth block break-all"
            >
              danielssonsbygg@hotmail.com
            </a>
          </div>
          <div className="border-t border-border py-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Adress</p>
            <p className="text-xl text-foreground">
              Norrmalmsgatan 20<br />
              846 71 Vemdalen
            </p>
          </div>
          <div className="border-t border-border py-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Företag</p>
            <p className="text-xl text-foreground">Nicke Danielssons Bygg AB</p>
          </div>
          <div className="border-t border-border py-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Kontaktperson</p>
            <p className="text-xl text-foreground">Niklas Danielsson</p>
          </div>
          <div className="border-t border-border pt-6">
            <a
              href="tel:+46768292821"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-accent/90 transition-smooth"
            >
              Ring oss nu
            </a>
          </div>
        </div>

        {/* Google Maps */}
        <div className="overflow-hidden shadow-card">
          <iframe
            title="Karta – Danielssons Bygg, Vemdalen"
            src="https://maps.google.com/maps?q=Norrmalmsgatan+20+846+71+Vemdalen+Sweden&output=embed&z=14&hl=sv"
            className="w-full border-0"
            style={{ height: "480px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </section>
);
