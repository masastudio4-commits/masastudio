import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    price: "$1,200",
    desc: "Perfect for landing pages and small business sites.",
    features: [
      "Up to 5 pages",
      "Responsive design",
      "Basic SEO setup",
      "Contact form",
      "1 round of revisions",
    ],
    featured: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "$3,500",
    desc: "For growing businesses needing a custom web app.",
    features: [
      "Up to 15 pages",
      "Custom CMS / database",
      "Authentication system",
      "Advanced SEO + analytics",
      "Payment integration",
      "3 rounds of revisions",
      "30 days of support",
    ],
    featured: true,
    cta: "Most Popular",
  },
  {
    name: "Custom",
    price: "Let's Talk",
    desc: "Tailored solutions for SaaS and complex platforms.",
    features: [
      "Unlimited scope",
      "Full-stack architecture",
      "Third-party integrations",
      "Dedicated support",
      "Performance audit",
      "Ongoing maintenance",
    ],
    featured: false,
    cta: "Contact Me",
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 sm:py-32 bg-surface/30 border-y border-border/50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3 sm:mb-4">
            05 — Pricing
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            Simple, <span className="text-gradient-gold italic">transparent</span> pricing
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Choose the package that fits your project. All plans include a free discovery call.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative p-6 sm:p-8 rounded-xl sm:rounded-2xl flex flex-col transition-[border-color] duration-500 ${
                t.featured
                  ? "bg-card border-2 border-primary shadow-gold sm:scale-105"
                  : "bg-card border border-border hover:border-primary/40"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-gold text-primary-foreground text-[10px] sm:text-xs uppercase tracking-widest font-bold whitespace-nowrap">
                  Recommended
                </div>
              )}

              <h3 className="font-display text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{t.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{t.desc}</p>

              <div className="font-display text-3xl sm:text-5xl font-bold mb-6 sm:mb-8">
                {t.price.startsWith("$") ? (
                  <>
                    <span className="text-gradient-gold">{t.price}</span>
                    <span className="text-xs sm:text-base text-muted-foreground font-sans font-normal">
                      {" "}/ project
                    </span>
                  </>
                ) : (
                  <span className="text-gradient-gold">{t.price}</span>
                )}
              </div>

              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={t.featured ? "premium" : "outlineGold"}
                className="w-full"
              >
                <a href="#contact">{t.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
