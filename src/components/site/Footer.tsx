export const Footer = () => (
  <footer className="bg-foreground text-snow/70 border-t border-snow/10 py-10">
    <div className="container flex flex-col md:flex-row justify-between gap-6 text-sm">
      <p>
        © {new Date().getFullYear()} Nicke Danielssons Bygg AB · Norrmalmsgatan 20, 846 71 Vemdalen ·
        <a href="tel:+46768292821" className="hover:text-accent ml-1">076-829 28 21</a>
      </p>
      <div className="flex gap-6">
        <a href="https://www.instagram.com/danielssonsbygg/" target="_blank" rel="noreferrer noopener" className="hover:text-accent">
          Instagram
        </a>
        <a href="#kontakt" className="hover:text-accent">Kontakt</a>
      </div>
    </div>
  </footer>
);