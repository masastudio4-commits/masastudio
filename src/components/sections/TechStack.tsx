import { useEffect, useRef } from "react";

const techs = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React",
  "Next.js", "Vue.js", "Tailwind CSS", "Sass", "Node.js",
  "Express.js", "PHP", "Python", "MySQL", "PostgreSQL",
  "Firebase", "Supabase", "Turso", "Git", "GitHub",
  "Vercel", "Figma",
];

export const TechStack = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<1 | -1>(1);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.6; // px per frame

    const animate = () => {
      if (!el) return;

      el.scrollLeft += speed * directionRef.current;

      // Reverse at edges
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
        directionRef.current = -1;
      } else if (el.scrollLeft <= 0) {
        directionRef.current = 1;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Pause on hover
    const pause = () => cancelAnimationFrame(rafRef.current);
    const resume = () => { rafRef.current = requestAnimationFrame(animate); };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="py-14 sm:py-20 border-y border-border/50 overflow-hidden">
      <div className="container mb-8 sm:mb-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2 sm:mb-3">
            Tech Stack
          </div>
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold">
            Tools I work <span className="text-gradient-gold italic">with</span>
          </h3>
        </div>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex overflow-x-hidden whitespace-nowrap gpu-layer"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            contain: "content",
          }}
        >
          {techs.map((t, i) => (
            <div
              key={i}
              className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3 shrink-0"
            >
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary" />
              <span className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-foreground/40 hover:text-primary transition-colors cursor-default">
                {t}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
