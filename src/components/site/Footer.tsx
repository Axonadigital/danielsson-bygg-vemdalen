export const Footer = () => (
  <footer className="bg-foreground text-snow">
    <div className="container py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        {/* Logga + tagline */}
        <div className="col-span-2 md:col-span-1">
          <img
            src="/logga.png"
            alt="Danielssons Bygg"
            className="h-10 w-auto mb-4 brightness-0 invert"
          />
          <p className="text-snow/50 text-sm leading-relaxed">
            Hantverksskicklighet i Vemdalen och hela Jämtland.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-snow/40 mb-5">Navigation</p>
          <ul className="space-y-3 text-sm">
            {[
              { href: "#om-oss", label: "Om oss" },
              { href: "#tjanster", label: "Tjänster" },
              { href: "#projekt", label: "Projekt" },
              { href: "#kontakt", label: "Kontakt" },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-snow/60 hover:text-accent transition-smooth">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-snow/40 mb-5">Kontakt</p>
          <ul className="space-y-3 text-sm text-snow/60">
            <li>
              <a href="tel:+46768292821" className="hover:text-accent transition-smooth">
                076-829 28 21
              </a>
            </li>
            <li>Norrmalmsgatan 20</li>
            <li>846 71 Vemdalen</li>
            <li className="pt-1">Niklas Danielsson</li>
          </ul>
        </div>

        {/* Socialt */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-snow/40 mb-5">Följ oss</p>
          <a
            href="https://www.instagram.com/danielssonsbygg/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-snow/60 hover:text-accent transition-smooth flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            @danielssonsbygg
          </a>
        </div>
      </div>

      <div className="border-t border-snow/10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-snow/30">
        <p>© {new Date().getFullYear()} Nicke Danielssons Bygg AB · Org.nr 559317-6570</p>
        <p>Vemdalen, Härjedalen</p>
      </div>

      <div className="mt-6 flex justify-center">
        <a
          href="https://axonadigital.se"
          target="_blank"
          rel="noreferrer noopener"
          className="group flex items-center gap-2 text-snow/30 hover:text-snow/60 transition-smooth text-xs"
        >
          Skapad av
          <img
            src="/axona-logo.png"
            alt="Axona Digital"
            className="h-4 w-auto opacity-30 group-hover:opacity-60 transition-smooth brightness-0 invert"
          />
        </a>
      </div>
    </div>
  </footer>
);
