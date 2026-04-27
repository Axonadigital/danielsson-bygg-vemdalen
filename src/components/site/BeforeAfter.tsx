import { useRef, useState } from "react";

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: number;
}

export const BeforeAfter = ({
  before,
  after,
  beforeLabel = "Före",
  afterLabel = "Efter",
  height = 440,
}: BeforeAfterProps) => {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePos = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none cursor-ew-resize"
      style={{ height }}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        updatePos(e.clientX);
      }}
      onPointerMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
      onPointerUp={() => { dragging.current = false; }}
      onPointerCancel={() => { dragging.current = false; }}
    >
      {/* After image — full background */}
      <img src={after} alt={afterLabel} draggable={false} className="absolute inset-0 w-full h-full object-cover" />

      {/* Before image — clipped to left portion */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt={beforeLabel} draggable={false} className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-elegant flex items-center justify-center gap-0.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-foreground">
            <path d="M4 7H1M1 7L3 5M1 7L3 9M10 7H13M13 7L11 5M13 7L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 bg-foreground/60 text-snow text-xs px-3 py-1 uppercase tracking-widest pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 bg-foreground/60 text-snow text-xs px-3 py-1 uppercase tracking-widest pointer-events-none">
        {afterLabel}
      </span>
    </div>
  );
};
