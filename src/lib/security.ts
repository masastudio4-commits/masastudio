/**
 * MasaStudio — Client-Side Security Layer
 * NOTE: True DevTools prevention is impossible in any browser.
 * This layer deters casual inspection and removes source hints.
 */

export function initSecurity() {
  if (import.meta.env.DEV) return; // Only active in production

  // ── 1. Disable right-click context menu ──
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // ── 2. Block common DevTools keyboard shortcuts ──
  document.addEventListener("keydown", (e) => {
    const blocked =
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C", "U"].includes(e.key)) ||
      (e.metaKey && e.altKey && ["I", "J", "C", "U"].includes(e.key)) || // Mac
      (e.ctrlKey && e.key === "U"); // View source

    if (blocked) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  // ── 3. Console warning ──
  const style = "color:#c9a84c;font-size:18px;font-weight:bold;";
  console.log("%c⚠️ Stop!", style);
  console.log(
    "%cThis browser feature is for developers only. If someone told you to copy/paste something here — this is a scam.",
    "color:#999;font-size:13px;"
  );

  // ── 4. Clear console once on init ──
  console.clear();

  // ── 5. Detect DevTools via window size heuristic (every 5s, not 1s) ──
  const threshold = 160;
  const detectDevTools = () => {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    if (widthDiff > threshold || heightDiff > threshold) {
      document.body.innerHTML = `
        <div style="
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background:#0a0a0a;
          color:#c9a84c;
          font-family:sans-serif;
          text-align:center;
          padding:2rem;
        ">
          <div>
            <div style="font-size:3rem;margin-bottom:1rem;">🔒</div>
            <h1 style="font-size:1.5rem;margin-bottom:0.5rem;">Access Restricted</h1>
            <p style="color:#666;">Please close developer tools to continue.</p>
          </div>
        </div>
      `;
    }
  };

  setInterval(detectDevTools, 5000); // 5s instead of 1s — no more CPU drain
  window.addEventListener("resize", detectDevTools);
}
