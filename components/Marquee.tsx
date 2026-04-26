const techs = [
  "Playwright", "Vitest", "TypeScript", "AI Testing", "Selenium",
  "Cypress", "Node.js", "React", "CI/CD", "REST API", "MCP Agents",
  "Self-Healing", "Postman", "Jenkins", "Kubernetes", "MongoDB",
];

export default function Marquee() {
  const doubled = [...techs, ...techs];

  return (
    <div
      className="relative overflow-hidden py-6 border-y"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
    >
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #050505, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #050505, transparent)" }} />

      <div className="marquee-track">
        {doubled.map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-8"
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(99,102,241,0.6)",
              }}
            />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
