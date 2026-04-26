import logo from "@/assets/logo.png";
import { useContent } from "@/lib/content-store";

// TikTok icon (lucide doesn't have one, simple SVG)
const TikTok = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.32a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.55z" />
  </svg>
);

export const Footer = () => {
  const { content } = useContent();
  const f = content.footer;

  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="container py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        {/* TikTok highlight */}
        <div className="mb-10 sm:mb-12 p-5 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-surface to-surface border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-gold flex items-center justify-center shrink-0">
              <TikTok className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-primary mb-1">
                Follow on TikTok
              </div>
              <div className="font-display text-lg sm:text-xl md:text-2xl font-bold">
                {f.tiktokHandle}
              </div>
            </div>
          </div>
          <a
            href={f.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-gradient-gold text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
          >
            Follow Me
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12">
          <div className="sm:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4 inline-flex">
              {/* Logo in circle with faded edges */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0"
                style={{
                  maskImage: "radial-gradient(circle, black 55%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 75%)",
                }}
              >
                <img
                  src={logo}
                  alt="MasaStudio Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                <span className="text-foreground">Masa</span>
                <span className="text-gradient-gold">Studio</span>
              </span>
            </a>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm sm:text-base">
              {f.description}
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-primary mb-4">
              Navigation
            </div>
            <ul className="space-y-2">
              {["Services", "Work", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-6 sm:pt-8 border-t border-border flex items-center justify-center">
          <div className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} MasaStudio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
