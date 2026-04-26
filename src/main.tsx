import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initSecurity } from "./lib/security";

// Initialize security layer (F12 protection, context menu disable, etc.)
initSecurity();

createRoot(document.getElementById("root")!).render(<App />);
