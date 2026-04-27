import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, X } from "lucide-react";
import { CircularGallery, type GalleryAPI, type GalleryItem } from "@/components/ui/circular-gallery";
import { BeforeAfter } from "@/components/site/BeforeAfter";

type Project = {
  title: string;
  cat: string;
  desc: string;
  hero: string;
  images: string[];
};

const projects: Project[] = [
  {
    title: "Trall, kök & möbler",
    cat: "Snickeri & trall",
    desc: "Totalrenovering med ny kärnfurutrall, köksmontering och platsbyggda hallmöbler. Allt snickeriarbete utfört i hög kvalitet för lång livslängd i fjällklimatet.",
    hero: "/projects/atlan/hero.jpg",
    images: [
      "/projects/atlan/hero.jpg",
      "/projects/atlan/1.jpg",
      "/projects/atlan/3.jpg",
      "/projects/atlan/4.jpg",
      "/projects/atlan/5.jpg",
      "/projects/atlan/6.jpg",
      "/projects/atlan/7.jpg",
    ],
  },
  {
    title: "Vemdalsporten",
    cat: "Nyproduktion",
    desc: "Nyproduktion av flerbostadshus i centrala Vemdalen. Projektet genomfördes från grund till nyckelfärdigt med hög precision och anpassning till det krävande fjällklimatet.",
    hero: "/projects/vemdalsporten/1.webp",
    images: [
      "/projects/vemdalsporten/1.webp",
      "/projects/vemdalsporten/2.webp",
      "/projects/vemdalsporten/3.webp",
      "/projects/vemdalsporten/4.webp",
      "/projects/vemdalsporten/5.webp",
      "/projects/vemdalsporten/6.webp",
      "/projects/vemdalsporten/7.webp",
      "/projects/vemdalsporten/8.webp",
    ],
  },
  {
    title: "Garagebyggsats – 30 m²",
    cat: "Nyproduktion",
    desc: "Uppförande av fullisolerat garage på knappt 30 m² med garagebyggsats från Lövånger. Smidigt och effektivt — allt material färdigpaketerat och monterat på plats.",
    hero: "/projects/garage/1.jpg",
    images: [
      "/projects/garage/1.jpg",
      "/projects/garage/2.jpg",
      "/projects/garage/3.jpg",
      "/projects/garage/4.jpg",
      "/projects/garage/5.jpg",
    ],
  },
  {
    title: "Takbyte",
    cat: "Renovering",
    desc: "Komplett takbyte med ny pannläggning och tilläggsisolering för förbättrad energiprestanda. Allt från rivning och underlag till färdigt tätskikt och plåtarbeten.",
    hero: "/projects/takbyte/1.jpg",
    images: [
      "/projects/takbyte/1.jpg",
      "/projects/takbyte/2.jpg",
      "/projects/takbyte/3.jpg",
      "/projects/takbyte/4.jpg",
      "/projects/takbyte/5.jpg",
      "/projects/takbyte/6.jpg",
    ],
  },
  {
    title: "Golvläggning",
    cat: "Golv",
    desc: "Läggning av trägolv med noggrant underarbete och professionell finish. Rätt utfört ger golvet karaktär och håller i decennier — oavsett säsongsvariation.",
    hero: "/projects/golvlaggning/1.jpg",
    images: [
      "/projects/golvlaggning/1.jpg",
      "/projects/golvlaggning/2.jpg",
      "/projects/golvlaggning/3.jpg",
    ],
  },
  {
    title: "Sommarprojekt",
    cat: "Renovering",
    desc: "Renovering och utbyggnad under sommarsäsongen. Projektet kombinerade flera hantverksmoment för att lyfta fastighetens skick och ge den nytt liv inför hösten.",
    hero: "/projects/sommar/2.jpg",
    images: [
      "/projects/sommar/1.jpg",
      "/projects/sommar/2.jpg",
      "/projects/sommar/3.jpg",
      "/projects/sommar/4.jpg",
      "/projects/sommar/5.jpg",
      "/projects/sommar/6.jpg",
    ],
  },
];

const galleryItems: GalleryItem[] = projects.map((p) => ({
  image: p.hero,
  text: p.title,
  subtext: p.cat,
}));

/* ---------- GalleryModal ---------- */
type ModalProps = { project: Project; onClose: () => void };

const GalleryModal = ({ project, onClose }: ModalProps) => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? project.images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === project.images.length - 1 ? 0 : c + 1));

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-foreground/95 flex flex-col"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={handleKey}
      tabIndex={0}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-snow/10 flex-shrink-0">
        <p className="text-accent text-xs uppercase tracking-[0.3em]">{project.cat}</p>
        <button onClick={onClose} className="text-snow/60 hover:text-snow transition-smooth p-2" aria-label="Stäng">
          <X size={24} />
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 relative flex items-center justify-center px-4 py-2 min-h-0">
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-foreground/60 hover:bg-foreground/80 text-snow p-3 transition-smooth z-10" aria-label="Föregående">
          <ChevronLeft size={24} />
        </button>
        <img
          src={project.images[current]}
          alt={`${project.title} – bild ${current + 1}`}
          className="max-h-full max-w-full object-contain shadow-elegant"
        />
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-foreground/60 hover:bg-foreground/80 text-snow p-3 transition-smooth z-10" aria-label="Nästa">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Titel + beskrivning — vit bakgrund */}
      <div className="bg-background px-6 py-5 flex-shrink-0 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <h3 className="font-display text-2xl text-foreground leading-none mb-1">{project.title}</h3>
          {project.desc && (
            <p className="text-muted-foreground text-sm leading-relaxed mt-2">{project.desc}</p>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 px-6 py-4 overflow-x-auto border-t border-snow/10 flex-shrink-0">
        {project.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex-shrink-0 w-16 h-12 overflow-hidden transition-smooth ${
              i === current ? "ring-2 ring-accent" : "opacity-50 hover:opacity-80"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
        <p className="ml-auto self-center text-snow/40 text-xs whitespace-nowrap pl-4">
          {current + 1} / {project.images.length}
        </p>
      </div>
    </div>
  );
};

/* ---------- Projects ---------- */
export const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const apiRef = useRef<GalleryAPI | null>(null);
  const [bend, setBend] = useState(() => window.innerWidth < 768 ? 1 : 3);

  useEffect(() => {
    const handler = () => setBend(window.innerWidth < 768 ? 1 : 3);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleInit = useCallback((api: GalleryAPI) => {
    apiRef.current = api;
  }, []);

  const handleItemClick = useCallback((i: number) => {
    setSelected(projects[i]);
  }, []);

  return (
    <>
      <section id="projekt" className="pt-24 md:pt-32 pb-12 bg-secondary">
        <div className="container mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">Projekt</p>
              <h2 className="font-display text-5xl md:text-7xl text-foreground leading-none">
                Hantverk i bilder.
              </h2>
              <p className="mt-4 text-muted-foreground text-base max-w-md leading-relaxed">
                Ett urval av våra senaste arbeten — dra eller använd pilarna för att bläddra, klicka på ett projekt för att se fler bilder och läsa mer.
              </p>
            </div>
            <a
              href="https://www.instagram.com/danielssonsbygg/"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-smooth self-start"
            >
              <Instagram size={18} />
              Se mer på vår Instagram
            </a>
          </div>
        </div>

        <div className="relative" style={{ height: "520px" }}>
          <CircularGallery
            items={galleryItems}
            bend={bend}
            autoRotateSpeed={0.012}
            scrollEase={0.06}
            onItemClick={handleItemClick}
            onInit={handleInit}
          />

          <button
            onClick={() => apiRef.current?.scrollPrev()}
            onTouchEnd={(e) => { e.stopPropagation(); apiRef.current?.scrollPrev(); }}
            className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 z-10 bg-background border border-border text-foreground p-4 md:p-3 shadow-card hover:bg-secondary transition-smooth"
            aria-label="Föregående projekt"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => apiRef.current?.scrollNext()}
            onTouchEnd={(e) => { e.stopPropagation(); apiRef.current?.scrollNext(); }}
            className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 z-10 bg-background border border-border text-foreground p-4 md:p-3 shadow-card hover:bg-secondary transition-smooth"
            aria-label="Nästa projekt"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-3">
          Dra eller använd pilarna · Klicka på ett projekt för att se alla bilder
        </p>

        {/* Före/efter-slider */}
        <div className="container mt-8">
          <p className="text-muted-foreground text-xs uppercase tracking-[0.25em] mb-3">
            Före &amp; efter — Dra för att se
          </p>
          <BeforeAfter
            before="/projects/takbyte/fore.jpg"
            after="/projects/takbyte/efter.jpg"
            height={320}
          />
        </div>
      </section>

      {selected && (
        <GalleryModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};
