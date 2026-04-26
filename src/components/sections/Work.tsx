import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useContent } from "@/lib/content-store";
import work1 from "@/assets/work-1.png";
import work2 from "@/assets/work-2.png";
import work3 from "@/assets/work-3.png";
import work4 from "@/assets/work-4.png";
import work5 from "@/assets/work-5.png";
import work6 from "@/assets/work-6.png";

// Fallback images mapped by index
const fallbackImages = [work2, work3, work4, work5, work6, work1];

export const Work = () => {
  const { content } = useContent();
  const w = content.work;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 400;
    const gap = 20;
    el.scrollBy({
      left: dir === "right" ? cardWidth + gap : -(cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section id="work" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Top accent */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "var(--gradient-gold)", opacity: 0.18 }}
      />

      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-medium">
              {w.label}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
              {w.heading}{" "}
              <span className="text-gradient-gold italic">{w.headingGold}</span>
            </h2>
          </div>

          {/* Arrow controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Previous project"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Next project"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel — full-bleed */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-background to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-4 sm:px-8 lg:px-[max(2rem,calc((100vw-1280px)/2+2rem))]"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {w.projects.map((p, i) => {
            const imgSrc = p.customImage || fallbackImages[i % fallbackImages.length];
            return (
              <div
                key={i}
                data-card
                className="group relative shrink-0 w-[85vw] sm:w-[420px] md:w-[480px] aspect-[4/3] rounded-2xl overflow-hidden bg-surface border border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer"
                style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.6)" }}
              >
                {/* Image */}
                <img
                  src={imgSrc}
                  alt={p.category}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />

                {/* Gold hover tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(to top, hsl(43 53% 54% / 0.15), transparent 60%)" }}
                />

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <h3 className="font-display text-lg sm:text-xl font-bold group-hover:text-gradient-gold transition-all duration-300">
                    {p.category}
                  </h3>
                </div>

                {/* Inset border glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px hsl(43 53% 54% / 0.35)" }}
                />
              </div>
            );
          })}
        </div>

        {/* Mobile arrows */}
        <div className="flex sm:hidden justify-center gap-3 mt-6 px-4">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all disabled:opacity-20"
            aria-label="Previous"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all disabled:opacity-20"
            aria-label="Next"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
