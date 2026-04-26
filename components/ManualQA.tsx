"use client";

import { useEffect, useRef, useState } from "react";
import { manualQAItems } from "@/lib/skills";
import { SectionHeader } from "./Projects";

export default function ManualQA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="manual-qa"
      ref={ref}
      className="py-32 px-8"
      style={{ background: "#060606" }}
    >
      <div className="max-w-7xl mx-auto">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s cubic-bezier(0.77,0,0.175,1), transform 0.8s cubic-bezier(0.77,0,0.175,1)",
          }}
        >
          <SectionHeader label="MANUAL QA" title="Testing" subtitle="Beyond Automation" />

          <p
            className="mt-6 max-w-2xl"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
            }}
          >
            Automation is only as good as the thinking behind it. Strong manual QA
            instincts — test case design, exploratory sessions, sharp bug reports —
            are what separate good SDETs from great ones.
          </p>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {manualQAItems.map((item, i) => (
              <QACard key={item.area} item={item} delay={i * 80} visible={visible} />
            ))}
          </div>

          {/* Experience bar */}
          <div
            className="mt-16 p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p
              className="uppercase mb-6"
              style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)" }}
            >
              Tools & Platforms
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Jira", "Confluence", "Postman", "Chrome DevTools",
                "TestRail", "Swagger / OpenAPI", "Loom", "BrowserStack",
                "GitHub", "Slack", "Excel / Sheets",
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-full"
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QACard({
  item,
  delay,
  visible,
}: {
  item: (typeof manualQAItems)[0];
  delay: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
      style={{
        background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: hovered ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, background 0.25s, border-color 0.25s`,
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Area title */}
      <h3
        style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          color: "white",
        }}
      >
        {item.area}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.65,
          flex: 1,
        }}
      >
        {item.description}
      </p>

      {/* Tools */}
      <div className="flex flex-wrap gap-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {item.tools.map((tool) => (
          <span
            key={tool}
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              letterSpacing: "0.05em",
              color: "rgba(99,102,241,0.8)",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: "4px",
              padding: "2px 8px",
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
