const steps = [
  {
    n: "01",
    title: "Discover",
    desc: "We start with a deep dive into your goals, audience, and competitors to align on the vision.",
  },
  {
    n: "02",
    title: "Design",
    desc: "Wireframes and high-fidelity mockups crafted to reflect your brand and convert visitors.",
  },
  {
    n: "03",
    title: "Develop",
    desc: "Clean, performant code built with modern frameworks and best practices for scale.",
  },
  {
    n: "04",
    title: "Deliver",
    desc: "Launch with full QA, performance optimization, and post-launch support to ensure success.",
  },
];

export const Process = () => {
  return (
    <section id="process" className="py-20 sm:py-32 bg-surface/30 border-y border-border/50 relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3 sm:mb-4">
            03 — Process
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            How we <span className="text-gradient-gold italic">work</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            A proven 4-step process that turns ideas into polished, production-ready products.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 relative">
          {steps.map((s, i) => (
            <div key={s.n} className="relative group">
              <div className="p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-card border border-border h-full hover:border-primary/40 transition-[border-color] duration-500">
                <div className="font-display text-3xl sm:text-5xl font-bold text-gradient-gold mb-4 sm:mb-6">
                  {s.n}
                </div>
                <h3 className="font-display text-lg sm:text-2xl font-bold mb-2 sm:mb-3">{s.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary/40 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
