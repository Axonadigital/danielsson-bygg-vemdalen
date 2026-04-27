export const Hero = () => (
  <section id="top" className="relative flex items-end overflow-hidden" style={{ minHeight: "100vh" }}>
    <img
      src="/hero.webp"
      alt="Snickare från Danielssons Bygg bygger fjällstuga i Vemdalen"
      width={1920}
      height={1080}
      fetchPriority="high"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-gradient-hero" />
    <div className="relative container pb-16 md:pb-24 pt-28 z-10">
      <p className="text-snow/80 uppercase tracking-[0.3em] text-xs mb-4 animate-fade-in">
        Vemdalen · Härjedalen · Jämtland
      </p>
      <h1 className="font-display text-snow leading-none animate-fade-up">
        <span className="block text-4xl md:text-6xl lg:text-7xl tracking-wide">Danielssons</span>
        <span className="block text-7xl md:text-[9rem] lg:text-[11rem] leading-none -mt-2">Bygg</span>
      </h1>
      <p className="mt-6 text-snow/80 text-base md:text-lg max-w-lg leading-relaxed animate-fade-up" style={{ animationDelay: "0.15s" }}>
        Din snickare i fjällen — nyproduktion, renovering och platsbyggda möbler med hantverk som syns i varje detalj.
      </p>
      <p className="mt-3 text-snow/60 text-sm animate-fade-up" style={{ animationDelay: "0.2s" }}>
        Certifierad kontrollansvarig (KA) enligt PBL
      </p>
      <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <a
          href="#kontakt"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-accent/90 transition-smooth shadow-elegant"
        >
          Begär offert
        </a>
        <a
          href="#tjanster"
          className="inline-flex items-center gap-2 border border-snow/40 text-snow px-7 py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-snow/10 transition-smooth"
        >
          Se tjänster
        </a>
      </div>
    </div>
  </section>
);
