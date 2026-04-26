"use client";

import { useEffect, useRef, useState } from "react";
import { skills, type SkillLevel } from "@/lib/skills";
import { SectionHeader } from "./Projects";

const levelConfig: Record<SkillLevel, { label: string; cls: string }> = {
  proficient: { label: "Proficient", cls: "badge-proficient" },
  familiar: { label: "Familiar", cls: "badge-familiar" },
  roadmap: { label: "Roadmap", cls: "badge-roadmap" },
};

const levelOrder: SkillLevel[] = ["proficient", "familiar", "roadmap"];

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<SkillLevel | "all">("all");
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

  const filtered = activeFilter === "all" ? skills : skills.filter((s) => s.level === activeFilter);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-32 px-8"
      style={{ background: "#080808" }}
    >
      <div className="max-w-7xl mx-auto">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(0.77,0,0.175,1), transform 0.8s cubic-bezier(0.77,0,0.175,1)",
          }}
        >
          <SectionHeader label="SKILLS" title="Expertise" subtitle="& Roadmap" />

          {/* Legend + Filter */}
          <div className="mt-10 flex flex-wrap gap-3">
            <FilterPill
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
              label="All"
              cls=""
            />
            {levelOrder.map((level) => (
              <FilterPill
                key={level}
                active={activeFilter === level}
                onClick={() => setActiveFilter(level)}
                label={levelConfig[level].label}
                cls={levelConfig[level].cls}
              />
            ))}
          </div>

          {/* Skills grid */}
          <div className="mt-10 flex flex-wrap gap-3">
            {filtered.map((skill, i) => (
              <SkillChip key={skill.name} skill={skill} delay={i * 30} />
            ))}
          </div>

          {/* Legend explanation */}
          <div className="mt-12 flex flex-wrap gap-6">
            {levelOrder.map((level) => (
              <div key={level} className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs ${levelConfig[level].cls}`}>
                  {levelConfig[level].label}
                </span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'Satoshi', sans-serif" }}>
                  {level === "proficient" && "Daily use, confident"}
                  {level === "familiar" && "Used in projects, growing"}
                  {level === "roadmap" && "Planned to learn"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillChip({
  skill,
  delay,
}: {
  skill: (typeof skills)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`px-4 py-2.5 rounded-full flex items-center gap-2 ${levelConfig[skill.level].cls}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 500,
        fontSize: "0.875rem",
      }}
    >
      {skill.name}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
  cls,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  cls: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
        active
          ? "bg-white text-black font-semibold"
          : `text-white/60 hover:text-white ${cls}`
      }`}
      style={{
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: active ? 700 : 400,
        border: active ? "none" : "1px solid rgba(255,255,255,0.15)",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
