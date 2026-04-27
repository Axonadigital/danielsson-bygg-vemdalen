import heroImg from "@/assets/hero-bygg.jpg";

export const Hero = () => (
  <section id="top" className="relative min-h-screen flex items-end overflow-hidden">
    <img
      src={heroImg}
      alt="Snickare från Danielssons Bygg bygger fjällstuga i Vemdalen"
      width={1920}
      height={1080}
      fetchPriority="high"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-hero" />
    <div className="relative container pb-20 md:pb-32 pt-32 z-10">
      <p className="text-snow/80 uppercase tracking-[0.3em] text-xs md:text-sm mb-6 animate-fade-in">
        Vemdalen · Härjedalen · Jämtland
      </p>
      <h1 className="font-display text-snow text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-balance max-w-5xl animate-fade-up">
        Snickare i fjällen — byggd för att hålla.
      </h1>
      <p className="mt-8 text-snow/90 text-lg md:text-xl max-w-2xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.15s" }}>
        Danielssons Bygg är ditt lokala byggföretag i Vemdalen. Vi tar hand om allt från
        nyproduktion och tillbyggnad till trall, tak och platsbyggda möbler — med hantverk
        som syns i varje detalj.
      </p>
      <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <a
          href="#kontakt"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-accent/90 transition-smooth shadow-elegant"
        >
          Begär offert
        </a>
        <a
          href="#tjanster"
          className="inline-flex items-center gap-2 border border-snow/40 text-snow px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-snow/10 transition-smooth"
        >
          Se våra tjänster
        </a>
      </div>
    </div>
  </section>
);