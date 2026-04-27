export const Contact = () => (
  <section id="kontakt" className="py-24 md:py-32 bg-foreground text-snow">
    <div className="container grid md:grid-cols-2 gap-16 items-start">
      <div>
        <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">Kontakt</p>
        <h2 className="font-display text-5xl md:text-7xl leading-none mb-8">
          Låt oss bygga något bra ihop.
        </h2>
        <p className="text-lg text-snow/80 leading-relaxed max-w-lg">
          Har du en idé, en ritning eller bara en tanke om vad du vill bygga i fjällen? Hör av dig
          så pratar vi om hur vi kan göra det möjligt. Vi tar uppdrag i Vemdalen och hela Jämtland.
        </p>
      </div>
      <div className="space-y-8">
        <div className="border-t border-snow/20 pt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-snow/60 mb-2">Telefon</p>
          <a href="tel:+46768292821" className="font-display text-4xl md:text-5xl hover:text-accent transition-smooth block">
            076-829 28 21
          </a>
        </div>
        <div className="border-t border-snow/20 pt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-snow/60 mb-2">Adress</p>
          <p className="text-xl">
            Norrmalmsgatan 20<br />
            846 71 Vemdalen
          </p>
        </div>
        <div className="border-t border-snow/20 pt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-snow/60 mb-2">Företag</p>
          <p className="text-xl">
            Nicke Danielssons Bygg AB<br />
            <span className="text-snow/70 text-base">Org.nr 559317-6570</span>
          </p>
        </div>
        <div className="border-t border-snow/20 pt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-snow/60 mb-2">Kontaktperson</p>
          <p className="text-xl">Niklas Danielsson</p>
        </div>
        <a
          href="tel:+46768292821"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-accent/90 transition-smooth"
        >
          Ring oss nu
        </a>
      </div>
    </div>
  </section>
);