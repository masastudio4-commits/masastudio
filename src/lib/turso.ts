import { createClient } from "@libsql/client/web";

const url = import.meta.env.VITE_TURSO_DATABASE_URL;
const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN;

if (typeof window !== "undefined" && !url) {
  const allViteKeys = Object.keys(import.meta.env).filter(k => k.startsWith('VITE_'));
  alert("DEBUG: VITE_TURSO_DATABASE_URL is MISSING!\nAvailable VITE_ keys: " + (allViteKeys.join(', ') || 'NONE'));
}

if (!url || !authToken) {
  throw new Error(
    "Missing Turso credentials. Set VITE_TURSO_DATABASE_URL and VITE_TURSO_AUTH_TOKEN " +
    "in your .env file (local) or in the Netlify environment variables dashboard (production)."
  );
}

export const turso = createClient({
  url,
  authToken,
});
