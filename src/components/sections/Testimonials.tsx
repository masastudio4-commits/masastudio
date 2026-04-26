import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "MasaStudio delivered beyond our expectations. The site looks stunning and our conversions doubled within a month.",
    name: "Sarah Mansour",
    role: "Founder, Lumière Boutique",
  },
  {
    quote: "Working with MasaStudio was effortless. Clear communication, fast turnaround, and pixel-perfect execution.",
    name: "Omar Khaled",
    role: "CEO, Pulse Analytics",
  },
  {
    quote: "The attention to detail is unmatched. Our new platform feels premium in every interaction.",
    name: "Layla Hassan",
    role: "Product Lead, Aurum",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 sm:py-32 relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3 sm:mb-4">
            04 — Testimonials
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            Trusted by <span className="text-gradient-gold italic">founders</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-surface border border-border hover:border-primary/30 transition-[border-color] duration-500 group"
            >
              <Quote className="absolute top-5 right-5 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

              <div className="flex gap-0.5 mb-4 sm:mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-6 sm:mb-8 relative z-10">
                "{t.quote}"
              </p>

              <div className="pt-4 sm:pt-6 border-t border-border">
                <div className="font-display font-bold text-sm sm:text-base text-foreground">{t.name}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
