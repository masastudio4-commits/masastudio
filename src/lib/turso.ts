import { createClient } from "@libsql/client/web";

const url = import.meta.env.VITE_TURSO_DATABASE_URL;
const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Database credentials missing!");
  throw new Error("Missing Turso credentials. Please check your environment variables.");
}

export const turso = createClient({
  url,
  authToken,
});
