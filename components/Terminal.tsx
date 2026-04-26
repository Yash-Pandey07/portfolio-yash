"use client";

import { useEffect, useRef, useState } from "react";

// Real Playwright test run output — cross-layer validation suite
const LINES = [
  { text: "$ npx playwright test --project=chromium,firefox", color: "rgba(255,255,255,0.45)" },
  { text: "", color: "" },
  { text: "Running 4 tests using 2 workers", color: "rgba(255,255,255,0.6)" },
  { text: "", color: "" },
  { text: "  ✓  [chromium] auth.spec.ts › Login › valid credentials redirects to dashboard (1.24s)", color: "rgba(34,197,94,0.85)" },
  { text: "  ✓  [chromium] api.spec.ts › POST /api/users › returns 201 with user id (0.38s)", color: "rgba(34,197,94,0.85)" },
  { text: "  ✗  [firefox]  checkout.spec.ts › Payment › error msg visible on invalid card", color: "rgba(239,68,68,0.9)" },
  { text: "  ✓  [chromium] db.spec.ts › account state transitions match API + UI (2.01s)", color: "rgba(34,197,94,0.85)" },
  { text: "", color: "" },
  { text: "  ● checkout.spec.ts › Payment › error msg visible on invalid card", color: "rgba(239,68,68,0.75)" },
  { text: "", color: "" },
  { text: "    Error: expect(locator).toBeVisible()", color: "rgba(239,68,68,0.7)" },
  { text: "    Locator: page.locator('.error-banner')", color: "rgba(255,255,255,0.35)" },
  { text: "    Expected: visible", color: "rgba(34,197,94,0.6)" },
  { text: "    Received: hidden  ← DOM present, CSS display:none", color: "rgba(239,68,68,0.7)" },
  { text: "", color: "" },
  { text: "  3 passed  1 failed  (4.8s)", color: "rgba(245,158,11,0.9)" },
  { text: "  HTML report: playwright-report/index.html", color: "rgba(99,102,241,0.7)" },
];

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (lineCount >= LINES.length) return;
    const delay = lineCount === 0 ? 400 : LINES[lineCount - 1].text === "" ? 80 : 110;
    const t = setTimeout(() => setLineCount((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [visible, lineCount]);

  return (
    <section className="py-24 px-8" style={{ background: "#050505" }}>
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className="terminal-window"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s cubic-bezier(0.77,0,0.175,1), transform 0.8s cubic-bezier(0.77,0,0.175,1)",
          }}
        >
          {/* Terminal bar */}
          <div className="terminal-bar">
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
            <span style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.25)", marginLeft: 8 }}>
              zsh — playwright · cross-layer validation suite
            </span>
          </div>

          {/* Output area */}
          <div
            className="p-6 overflow-auto"
            style={{ fontFamily: "monospace", fontSize: "clamp(12px, 1.3vw, 13.5px)", lineHeight: 1.85, minHeight: 340 }}
          >
            {LINES.slice(0, lineCount).map((line, i) => (
              <div key={i} style={{ color: line.color || "transparent", whiteSpace: "pre" }}>
                {line.text}
                {i === lineCount - 1 && lineCount < LINES.length && (
                  <span className="typewriter-cursor" />
                )}
              </div>
            ))}
          </div>
        </div>

        <p
          className="text-center mt-6"
          style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em" }}
        >
          REAL TEST OUTPUT · PLAYWRIGHT · CROSS-LAYER VALIDATION · HTML REPORT
        </p>
      </div>
    </section>
  );
}
