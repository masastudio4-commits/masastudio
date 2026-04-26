import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { turso } from "./turso";

// ─── Default site content ───
export const defaultContent = {
  hero: {
    title1: "Crafting Digital",
    title2: "Experiences",
    title3: "That Convert",
    subtitle:
      "We are MasaStudio — a full-stack web development studio building premium websites, web apps, and e-commerce platforms that perform.",
    cta1: "View My Work",
    cta2: "Get in Touch",
  },
  services: {
    label: "01 — Services",
    heading: "What I",
    headingGold: "build",
    subtitle:
      "From concept to launch, I deliver end-to-end web development services crafted with precision and an obsession for quality.",
    items: [
      {
        title: "Landing Pages",
        description:
          "High-converting landing pages designed to capture leads and turn visitors into customers.",
        features: ["Pixel-perfect design", "SEO optimized", "Lightning fast"],
      },
      {
        title: "Web Applications",
        description:
          "Custom-built web apps with React, Next.js, and modern stacks. Scalable and maintainable.",
        features: ["React / Next.js", "Auth & databases", "API integrations"],
      },
      {
        title: "E-Commerce",
        description:
          "Full-featured online stores with secure checkout, inventory management, and payment integration.",
        features: ["Stripe / Paddle", "Inventory system", "Mobile-first"],
      },
      {
        title: "Custom Solutions",
        description:
          "Bespoke development tailored to your unique business needs. Dashboards, SaaS, and beyond.",
        features: ["SaaS platforms", "Admin dashboards", "Automations"],
      },
    ],
  },
  work: {
    label: "Portfolio",
    heading: "Recent",
    headingGold: "projects",
    projects: [
      { category: "E-Commerce Website", customImage: "" },
      { category: "Teacher Platform", customImage: "" },
      { category: "CV & Portfolio", customImage: "" },
      { category: "Restaurant Website", customImage: "" },
      { category: "Marketing Agency", customImage: "" },
      { category: "Real Estate Platform", customImage: "" },
    ],
  },
  contact: {
    heading1: "Have a project",
    heading2: "in mind?",
    subtitle: "Reach out on WhatsApp and let's discuss your next project.",
    whatsapp: [
      { label: "WhatsApp 1", number: "+201014444750", display: "+20 10 14444750" },
      { label: "WhatsApp 2", number: "+20122052953", display: "+20 122 052 953" },
    ],
  },
  footer: {
    tiktok: "https://www.tiktok.com/@masastudio_",
    tiktokHandle: "@MasaStudio",
    description:
      "A full-stack web development studio crafting premium digital experiences that convert visitors into customers.",
  },
};

export type SiteContent = typeof defaultContent;

const STORAGE_KEY = "masastudio_content";
const CACHE_TS_KEY = "masastudio_cache_ts";
const CACHE_TTL_MS = 1000 * 60 * 1; // 1 minute — visitors see admin changes within 60s

// ── Merge helper – never drops keys from defaultContent ──
function mergeWithDefaults(remote: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...remote,
    hero: { ...defaultContent.hero, ...(remote.hero || {}) },
    services: { ...defaultContent.services, ...(remote.services || {}) },
    work: { ...defaultContent.work, ...(remote.work || {}) },
    contact: { ...defaultContent.contact, ...(remote.contact || {}) },
    footer: { ...defaultContent.footer, ...(remote.footer || {}) },
  };
}

// ── Read from localStorage synchronously (fast, no network) ──
function readCache(): SiteContent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return mergeWithDefaults(JSON.parse(raw));
  } catch {}
  return null;
}

function isCacheFresh(): boolean {
  const ts = Number(localStorage.getItem(CACHE_TS_KEY) || 0);
  return Date.now() - ts < CACHE_TTL_MS;
}

interface ContentContextType {
  content: SiteContent;
  setContent: (c: SiteContent) => Promise<void>;
  resetContent: () => Promise<void>;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  setContent: async () => {},
  resetContent: async () => {},
  isLoading: false, // never block UI by default
});

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  // 1️⃣ INSTANT: Load from localStorage synchronously — zero network wait
  const [content, setContentState] = useState<SiteContent>(() => readCache() ?? defaultContent);
  const [isLoading, setIsLoading] = useState(false);
  const syncedRef = useRef(false);

  // 2️⃣ BACKGROUND: Sync from Turso only if cache is stale (after render)
  useEffect(() => {
    if (syncedRef.current) return;
    syncedRef.current = true;

    // If cache is fresh, skip network call entirely
    if (isCacheFresh()) return;

    // Defer network fetch to after first paint (non-blocking)
    const timer = setTimeout(async () => {
      try {
        await turso.execute(
          "CREATE TABLE IF NOT EXISTS site_data (id INTEGER PRIMARY KEY, content TEXT)"
        );
        const rs = await turso.execute("SELECT content FROM site_data WHERE id = 1");

        if (rs.rows.length > 0) {
          const merged = mergeWithDefaults(JSON.parse(rs.rows[0].content as string));
          setContentState(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          localStorage.setItem(CACHE_TS_KEY, Date.now().toString());
        } else {
          const json = JSON.stringify(defaultContent);
          await turso.execute({ sql: "INSERT INTO site_data (id, content) VALUES (1, ?)", args: [json] });
        }
      } catch (e) {
        // Silent fail — cached data is still showing
      }
    }, 500); // Wait 500ms after render before hitting the network

    return () => clearTimeout(timer);
  }, []);

  // 3️⃣ HEARTBEAT: Keep Turso warm every 5 minutes (no UI impact)
  useEffect(() => {
    const hb = setInterval(() => {
      turso.execute("SELECT 1").catch(() => {});
    }, 1000 * 60 * 5);
    return () => clearInterval(hb);
  }, []);

  const setContent = async (c: SiteContent) => {
    const previous = content;
    setContentState(c); // Optimistic update

    try {
      const json = JSON.stringify(c);
      await turso.execute({ sql: "UPDATE site_data SET content = ? WHERE id = 1", args: [json] });
      localStorage.setItem(STORAGE_KEY, json);
      localStorage.setItem(CACHE_TS_KEY, Date.now().toString());
    } catch (error) {
      setContentState(previous); // Rollback
      throw error;
    }
  };

  const resetContent = async () => {
    setContentState(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CACHE_TS_KEY);
    try {
      await turso.execute({
        sql: "UPDATE site_data SET content = ? WHERE id = 1",
        args: [JSON.stringify(defaultContent)],
      });
    } catch {}
  };

  return (
    <ContentContext.Provider value={{ content, setContent, resetContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
};

// ─── Auth ───
const AUTH_KEY = "masastudio_admin_auth";
const COOLDOWN_KEY = "masastudio_admin_cooldown";

export function adminLogin(password: string): boolean {
  const now = Date.now();
  const cooldown = Number(sessionStorage.getItem(COOLDOWN_KEY) || 0);
  if (now < cooldown) throw new Error("Too many attempts. Please wait 10 seconds.");

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "masa2024";
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, "1");
    sessionStorage.removeItem(COOLDOWN_KEY);
    return true;
  }
  sessionStorage.setItem(COOLDOWN_KEY, (now + 10000).toString());
  return false;
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

export function adminLogout() {
  sessionStorage.removeItem(AUTH_KEY);
}
