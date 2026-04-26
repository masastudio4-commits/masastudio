import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content-store";

export const Hero = () => {
  const { content } = useContent();
  const h = content.hero;

  return (
    <section className="relative min-h-screen flex items-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
      {/* Background gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-70"
          style={{ background: "var(--gradient-radial-gold)" }}
        />
        <div
          className="absolute top-1/4 -left-20 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full animate-float-slow"
          style={{
            background: "radial-gradient(circle, hsl(43 53% 54% / 0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-20 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full animate-float-slow"
          style={{
            animationDelay: "2s",
            background: "radial-gradient(circle, hsl(43 75% 75% / 0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8 animate-fade-up">
            {h.title1}
            <br />
            <span className="text-gradient-gold italic">{h.title2}</span>
            <br />
            {h.title3}
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 sm:mb-10 animate-fade-up px-2" style={{ animationDelay: "0.15s" }}>
            {h.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-up px-4 sm:px-0" style={{ animationDelay: "0.3s" }}>
            <Button asChild variant="premium" size="lg" className="group w-full sm:w-auto">
              <a href="#work">
                {h.cta1}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button asChild variant="outlineGold" size="lg" className="w-full sm:w-auto">
              <a href="#contact">{h.cta2}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
