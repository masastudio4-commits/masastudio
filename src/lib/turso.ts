import { createClient } from "@libsql/client/web";

const url = import.meta.env.VITE_TURSO_DATABASE_URL;
const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN;

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
