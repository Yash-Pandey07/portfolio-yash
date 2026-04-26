"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Deterministic activity grid (no Math.random → no hydration mismatch) ──
function activityOpacity(i: number): number {
  const h = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  const v = h - Math.floor(h);
  return v > 0.4 ? v * 0.8 + 0.2 : 0.05;
}

// ── Typewriter ─────────────────────────────────────────────────────────────
const ROLES = [
  "SDET @ Bayone Solutions",
  "Test Automation Engineer",
  "AI-Driven QA Architect",
  "Playwright Specialist",
];

function useTypewriter() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = ROLES[idx];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setIdx((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, idx]);

  return displayed;
}

// ── Count-up ───────────────────────────────────────────────────────────────
function useCountUp(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * ease));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

// ── Particles canvas ───────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.3,
      o: Math.random() * 0.35 + 0.05,
    }));

    let raf: number;
    function animate() {
      c.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${p.o})`;
        c.fill();
      }
      raf = requestAnimationFrame(animate);
    }
    animate();

    function onResize() {
      if (!canvasRef.current) return;
      W = canvasRef.current.width = window.innerWidth;
      H = canvasRef.current.height = window.innerHeight;
    }
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", opacity: 0.6 }}
    />
  );
}

// ── 3D tilt hook ───────────────────────────────────────────────────────────
function useTilt(strength = 10) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) scale(1.02)`;
  }, [strength]);

  const onLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  }, []);

  return { ref, onMove, onLeave };
}

// ── Stats ──────────────────────────────────────────────────────────────────
function useGitHubRepos(username: string): number {
  const [repos, setRepos] = useState(0);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then((d) => { if (d.public_repos) setRepos(d.public_repos); })
      .catch(() => {});
  }, [username]);
  return repos;
}

function StatItem({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, active);
  return (
    <div className="flex flex-col gap-1">
      <span className="stat-number">
        {count}{suffix}
      </span>
      <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Hero({ revealed }: { revealed: boolean }) {
  const [mounted, setMounted] = useState(false);
  const role = useTypewriter();
  const tilt = useTilt(8);
  const repoCount = useGitHubRepos("Yash-Pandey07");

  useEffect(() => { setMounted(true); }, []);

  const show = mounted && revealed;

  const STATS = [
    { value: repoCount || 75, suffix: "+", label: "GitHub Repos" },
    { value: 4, suffix: "+", label: "Years as SDET" },
    { value: 52, suffix: "+", label: "Production Deploys" },
  ];

  return (
    <section
      id="hero"
      className="hero-bg min-h-screen relative flex flex-col overflow-hidden"
      style={{ pointerEvents: revealed ? "all" : "none" }}
    >
      {/* Particle field */}
      <ParticleCanvas />

      {/* Aurora blobs */}
      <div className="aurora-blob" style={{
        width: 600, height: 600,
        top: "-10%", left: "-10%",
        background: "rgba(79,70,229,0.12)",
        animationDuration: "22s",
      }} />
      <div className="aurora-blob" style={{
        width: 500, height: 500,
        top: "30%", right: "-5%",
        background: "rgba(124,58,237,0.1)",
        animationDuration: "28s",
        animationDelay: "-8s",
      }} />
      <div className="aurora-blob" style={{
        width: 400, height: 400,
        bottom: "5%", left: "30%",
        background: "rgba(236,72,153,0.1)",
        animationDuration: "18s",
        animationDelay: "-14s",
      }} />

      <div className="flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 pt-28 pb-16 grid md:grid-cols-2 gap-16 items-center relative z-10">

          {/* ── Left column ── */}
          <div
            className="flex flex-col gap-8"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 1.2s cubic-bezier(0.77,0,0.175,1), transform 1.2s cubic-bezier(0.77,0,0.175,1)",
              transitionDelay: "0.1s",
            }}
          >
            {/* Name */}
            <div>
              <h1
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.05em",
                  color: "white",
                }}
              >
                YASH
                <br />
                PANDEY
              </h1>

              {/* Typewriter subtitle */}
              <p
                className="mt-5"
                style={{
                  fontFamily: "monospace",
                  fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)",
                  color: "rgba(99,102,241,0.9)",
                  letterSpacing: "0.06em",
                  minHeight: "1.5em",
                }}
              >
                {role}
                <span className="typewriter-cursor" />
              </p>
            </div>

            {/* Bio */}
            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 400,
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.75,
                maxWidth: "480px",
              }}
            >
              Senior SDET catching failures other layers miss — cross-validating UI, API, and DB simultaneously.
              Contracting at{" "}
              <span style={{ color: "rgba(165,180,252,0.9)", fontWeight: 600 }}>Hims &amp; Hers</span>
              {" "}via{" "}
              <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>Bayone Solutions</span>
              {" "}— building Playwright + TypeScript frameworks and pushing AI into the test loop with Claude Code &amp; Cursor.
            </p>

            {/* Stats */}
            <div className="flex gap-10 pt-2 pb-2">
              {STATS.map((s: { value: number; suffix: string; label: string }) => (
                <StatItem key={s.label} {...s} active={show} />
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                data-cursor
                className="px-7 py-3 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition-transform duration-200"
                style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700 }}
              >
                View Work ↓
              </a>
              <a
                href="https://github.com/Yash-Pandey07"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="px-7 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:bg-white/10"
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/yashpandey7/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="px-7 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:bg-white/10"
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                LinkedIn ↗
              </a>
              <a
                href="/Yash_Pandey_Resume.pdf"
                download
                data-cursor
                className="px-7 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 700,
                  border: "1px solid rgba(99,102,241,0.5)",
                  color: "rgba(165,180,252,0.9)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                Resume ↓
              </a>
            </div>
          </div>

          {/* ── Right column — 3D tilt info card ── */}
          <div
            ref={tilt.ref}
            onMouseMove={tilt.onMove}
            onMouseLeave={tilt.onLeave}
            className="misty-card tilt-card gradient-border rounded-3xl p-8 relative"
            style={{
              aspectRatio: "1 / 1",
              opacity: show ? 1 : 0,
              filter: show ? "blur(0)" : "blur(40px)",
              transition: "opacity 1.4s cubic-bezier(0.77,0,0.175,1), filter 1.4s cubic-bezier(0.77,0,0.175,1)",
              transitionDelay: "0.35s",
              maxWidth: "480px",
              marginLeft: "auto",
            }}
          >
            {/* Glow orb inside card */}
            <div
              className="absolute"
              style={{
                width: 200, height: 200,
                top: -40, right: -40,
                borderRadius: "50%",
                background: "rgba(99,102,241,0.15)",
                filter: "blur(60px)",
                pointerEvents: "none",
              }}
            />

            <div className="h-full flex flex-col justify-between relative z-10">
              <div className="flex flex-col gap-6">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src="/avatar.jpg"
                    alt="Yash Pandey"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "top center",
                      border: "2px solid rgba(99,102,241,0.5)",
                      boxShadow: "0 0 20px rgba(99,102,241,0.2)",
                    }}
                  />
                  <div>
                    <p style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(99,102,241,0.9)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Senior SDET
                    </p>
                    <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>
                      Bayone Solutions
                    </p>
                  </div>
                </div>
                <Row label="CURRENT ROLE" value="SDET @ Bayone Solutions" />
                <Row label="LOCATION" value="Delhi, India" />
                <Row label="CORE STACK" value="Playwright · Vitest · TypeScript" />
                <Row label="FOCUS" value="AI-Driven Test Automation" />
                <Row label="STATUS" value="Open to opportunities" dot="green" />
              </div>

              <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <p
                  className="uppercase mb-3"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  GitHub Activity
                </p>
                <div className="flex gap-1 flex-wrap">
                  {Array.from({ length: 42 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm"
                      style={{ background: `rgba(99,102,241,${activityOpacity(i)})` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }}
      />
    </section>
  );
}

function Row({ label, value, dot }: { label: string; value: string; dot?: "green" }) {
  return (
    <div>
      <p
        className="uppercase mb-1"
        style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)" }}
      >
        {label}
      </p>
      <p
        className="flex items-center gap-2"
        style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "white" }}
      >
        {dot === "green" && (
          <span
            className="w-2 h-2 rounded-full inline-block flex-shrink-0"
            style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
          />
        )}
        {value}
      </p>
    </div>
  );
}
