"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-8" style={{ background: "#050505" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="WORK" title="Projects" subtitle="Things I've built" />

        {/* Live projects */}
        <p className="mt-10 mb-4 uppercase" style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)" }}>
          ● Live
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(p => p.status === "live" || !p.status).map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} delay={i * 90} />
          ))}
        </div>

        {/* WIP projects */}
        <p className="mt-14 mb-4 uppercase" style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(245,158,11,0.6)" }}>
          ◐ Work in Progress
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(p => p.status === "wip").map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i + 4} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

const CARD_COLORS = [
  "rgba(99,102,241,0.5)",
  "rgba(236,72,153,0.5)",
  "rgba(251,191,36,0.5)",
  "rgba(34,197,94,0.5)",
  "rgba(14,165,233,0.5)",
  "rgba(168,85,247,0.5)",
];

function ProjectCard({
  project,
  index,
  delay,
}: {
  project: (typeof projects)[0];
  index: number;
  delay: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const accentColor = CARD_COLORS[index % CARD_COLORS.length];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    const inner = innerRef.current;
    const glow = glowRef.current;
    if (!el || !inner || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    inner.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.02)`;

    // Move glow with mouse
    const gx = (e.clientX - rect.left);
    const gy = (e.clientY - rect.top);
    glow.style.left = `${gx}px`;
    glow.style.top = `${gy}px`;
    glow.style.opacity = "1";
  }, []);

  const onLeave = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.77,0,0.175,1) ${delay}ms, transform 0.8s cubic-bezier(0.77,0,0.175,1) ${delay}ms`,
      }}
    >
      {/* Outer glow border on featured */}
      {project.featured && (
        <div
          className="absolute -inset-px rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, transparent 60%)`,
            opacity: 0.6,
          }}
        />
      )}

      <div
        ref={innerRef}
        className="misty-card rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden"
        style={{
          transition: "transform 0.08s ease, box-shadow 0.3s ease",
          transformStyle: "preserve-3d",
          border: project.featured
            ? `1px solid ${accentColor.replace("0.5", "0.35")}`
            : "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Mouse follow glow */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none"
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: accentColor.replace("0.5", "0.12"),
            filter: "blur(40px)",
            transform: "translate(-50%, -50%)",
            opacity: 0,
            transition: "opacity 0.3s",
          }}
        />

        {/* Card number */}
        <span
          className="absolute top-4 right-5"
          style={{
            fontFamily: "monospace",
            fontSize: "11px",
            color: "rgba(255,255,255,0.12)",
            letterSpacing: "0.1em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex gap-2 flex-wrap">
          {project.featured && (
            <span
              className="self-start px-2 py-0.5 rounded"
              style={{
                fontFamily: "monospace",
                fontSize: "9px",
                letterSpacing: "0.2em",
                background: accentColor.replace("0.5", "0.15"),
                border: `1px solid ${accentColor.replace("0.5", "0.3")}`,
                color: accentColor.replace(",0.5)", ",0.9)"),
                textTransform: "uppercase",
              }}
            >
              Featured
            </span>
          )}
          {project.status === "wip" && (
            <span
              className="self-start px-2 py-0.5 rounded"
              style={{
                fontFamily: "monospace",
                fontSize: "9px",
                letterSpacing: "0.2em",
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.35)",
                color: "rgba(245,158,11,0.9)",
                textTransform: "uppercase",
              }}
            >
              Work in Progress
            </span>
          )}
        </div>

        <div className="flex-1">
          <h3
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "1.15rem",
              color: "white",
              marginBottom: "0.5rem",
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full"
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.05em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="text-sm transition-colors duration-200"
            style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            GitHub ↗
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="text-sm transition-colors duration-200"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, color: "rgba(99,102,241,0.8)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(99,102,241,0.8)")}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <p
        className="uppercase mb-3"
        style={{
          fontFamily: "monospace",
          fontSize: "11px",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          letterSpacing: "-0.04em",
          color: "white",
          lineHeight: 0.95,
        }}
      >
        {title}
        <span style={{ color: "rgba(255,255,255,0.15)" }}> — </span>
        <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 700 }}>{subtitle}</span>
      </h2>
    </div>
  );
}

export { SectionHeader };
