import { useEffect, useState } from "react";
import logo from "@/assets/danielssons-bygg-logo.png";

const links = [
  { href: "#om-oss", label: "Om oss" },
  { href: "#tjanster", label: "Tjänster" },
  { href: "#projekt", label: "Projekt" },
  { href: "#kontakt", label: "Kontakt" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled ? "bg-background/90 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:z-[100]">
        Hoppa till innehåll
      </a>
      <nav className="container flex items-center justify-between h-20" aria-label="Huvudnavigation">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Danielssons Bygg logotyp – snickare i Vemdalen"
            width={48}
            height={48}
            className={`h-10 w-auto transition-smooth ${scrolled ? "opacity-100" : "opacity-0 invert brightness-0"}`}
          />
          <span className={`font-display text-2xl tracking-wide transition-smooth ${scrolled ? "text-foreground" : "text-snow"}`}>
            Danielssons Bygg
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium tracking-wide uppercase transition-smooth hover:text-accent ${
                  scrolled ? "text-foreground" : "text-snow"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="tel:+46768292821"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold uppercase tracking-wider hover:bg-accent/90 transition-smooth"
            >
              076-829 28 21
            </a>
          </li>
        </ul>
        <button
          type="button"
          aria-label="Öppna meny"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden p-2 ${scrolled ? "text-foreground" : "text-snow"}`}
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current" />
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <ul className="container flex flex-col py-4 gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-foreground hover:text-accent uppercase text-sm tracking-wide"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="tel:+46768292821"
                className="block mt-2 bg-accent text-accent-foreground px-5 py-3 text-center font-semibold uppercase tracking-wider"
              >
                Ring 076-829 28 21
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};