import { MessageCircle, Phone } from "lucide-react";
import { useContent } from "@/lib/content-store";

export const Contact = () => {
  const { content } = useContent();
  const c = content.contact;

  return (
    <section id="contact" className="py-20 sm:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ background: "var(--gradient-radial-gold)" }}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 sm:mb-4 font-medium">
            Contact
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-[1.1] sm:leading-[1.05]">
            {c.heading1}
            <br />
            <span className="text-gradient-gold italic">{c.heading2}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            {c.subtitle}
          </p>
        </div>

        {/* WhatsApp Cards */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {c.whatsapp.map((wa) => (
            <a
              key={wa.number}
              href={`https://wa.me/${wa.number.replace(/\+/g, "")}?text=${encodeURIComponent("Hi MasaStudio! I'm interested in discussing a project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 sm:p-8 rounded-2xl bg-surface border border-border hover:border-[#25D366]/50 transition-all duration-500 text-center"
              style={{ boxShadow: "0 4px 24px -8px hsl(0 0% 0% / 0.5)" }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(37, 211, 102, 0.08), transparent 70%)" }}
              />

              {/* WhatsApp icon */}
              <div
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  boxShadow: "0 8px 24px -4px rgba(37, 211, 102, 0.35)",
                }}
              >
                <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="white" />
              </div>

              {/* Number */}
              <div className="relative">
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  {wa.label}
                </div>
                <div className="font-display text-xl sm:text-2xl font-bold text-foreground group-hover:text-[#25D366] transition-colors duration-300 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground group-hover:text-[#25D366] transition-colors" />
                  <span dir="ltr">{wa.display}</span>
                </div>
              </div>

              {/* CTA */}
              <div
                className="relative mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 group-hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                }}
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </div>

              {/* Border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(37, 211, 102, 0.3)" }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
