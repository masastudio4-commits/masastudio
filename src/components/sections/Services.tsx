import { Code2, Layout, ShoppingBag, Sparkles } from "lucide-react";
import { useContent } from "@/lib/content-store";

const icons = [Layout, Code2, ShoppingBag, Sparkles];

export const Services = () => {
  const { content } = useContent();
  const s = content.services;

  return (
    <section id="services" className="py-20 sm:py-32 relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3 sm:mb-4">
            {s.label}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            {s.heading} <span className="text-gradient-gold italic">{s.headingGold}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {s.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {s.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={item.title}
                className="group relative p-6 sm:p-8 md:p-10 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-[border-color] duration-500 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.08), transparent 70%)" }}
                />

                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-primary/20 group-hover:scale-105 transition-[background-color,transform] duration-500">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6">
                    {item.description}
                  </p>

                  <ul className="space-y-2">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="absolute top-0 right-0 font-display text-5xl sm:text-6xl font-bold text-primary/5">
                    0{i + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
