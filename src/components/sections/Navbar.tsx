import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 will-change-[background-color] ${
        scrolled
          ? "bg-background/95 border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          {/* Logo in circle with faded edges */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0"
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
          <span className="font-display text-xl sm:text-2xl font-bold tracking-tight">
            <span className="text-foreground">Masa</span>
            <span className="text-gradient-gold">Studio</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-5 lg:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild variant="premium" size="sm">
            <a href="#contact">Start a Project</a>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/98 border-t border-border animate-fade-in">
          <ul className="container py-6 flex flex-col gap-1 px-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-4 rounded-xl text-foreground hover:text-primary hover:bg-surface/50 transition-colors text-base"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-3">
              <Button asChild variant="premium" className="w-full">
                <a href="#contact" onClick={() => setOpen(false)}>Start a Project</a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
