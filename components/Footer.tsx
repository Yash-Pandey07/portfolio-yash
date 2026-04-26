"use client";

import { useState } from "react";

export default function Footer() {
  return (
    <>
      <ContactSection />
      <footer
        className="py-8 px-8"
        style={{
          background: "#050505",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
            © 2025 Yash Pandey
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", fontFamily: "'Satoshi', sans-serif" }}>
            Built with Next.js · Deployed on Vercel
          </span>
        </div>
      </footer>
    </>
  );
}

type FormState = "idle" | "sending" | "success" | "error";

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      // Replace YOUR_FORM_ID with Formspree form id after signup at formspree.io
      const res = await fetch("https://formspree.io/f/xeevdznw" , {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <section
      id="contact"
      className="py-32 px-8"
      style={{ background: "#060606" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">

        {/* Left — info */}
        <div>
          <p
            className="uppercase mb-3"
            style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)" }}
          >
            CONTACT
          </p>
          <h2
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.04em",
              color: "white",
              lineHeight: 0.95,
              marginBottom: "1.5rem",
            }}
          >
            Let&apos;s build
            <span style={{ color: "rgba(255,255,255,0.15)" }}> — </span>
            <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 700 }}>something together</span>
          </h2>
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.75,
              maxWidth: "400px",
              marginBottom: "2rem",
            }}
          >
            Open to SDET roles, test architecture consulting, and AI/LLM testing work.
            Drop a message or reach out directly.
          </p>

          <div className="flex flex-col gap-4">
            <ContactDetail label="EMAIL" value="ypandey777@yahoo.in" href="mailto:ypandey777@yahoo.in" />
            <ContactDetail label="LINKEDIN" value="linkedin.com/in/yashpandey7" href="https://www.linkedin.com/in/yashpandey7/" />
            <ContactDetail label="GITHUB" value="github.com/Yash-Pandey07" href="https://github.com/Yash-Pandey07" />
            <ContactDetail label="LOCATION" value="Gurugram, Haryana · Open to remote" href={null} />
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <FormField
            label="Name"
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            placeholder="Your name"
            type="text"
            required
          />
          <FormField
            label="Email"
            value={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            placeholder="your@email.com"
            type="email"
            required
          />
          <div className="flex flex-col gap-2">
            <label
              style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}
            >
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="What are you working on?"
              required
              rows={5}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "14px 16px",
                color: "white",
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.9rem",
                outline: "none",
                resize: "vertical",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            />
          </div>

          <button
            type="submit"
            disabled={state === "sending"}
            className="px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              background: state === "sending" ? "rgba(99,102,241,0.4)" : "rgba(99,102,241,0.9)",
              color: "white",
              border: "1px solid rgba(99,102,241,0.6)",
              cursor: state === "sending" ? "not-allowed" : "pointer",
              alignSelf: "flex-start",
            }}
            onMouseEnter={(e) => { if (state !== "sending") e.currentTarget.style.background = "rgba(99,102,241,1)"; }}
            onMouseLeave={(e) => { if (state !== "sending") e.currentTarget.style.background = "rgba(99,102,241,0.9)"; }}
          >
            {state === "sending" ? "Sending..." : "Send Message ↗"}
          </button>

          {state === "success" && (
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.875rem", color: "rgba(34,197,94,0.9)" }}>
              ✓ Message sent — I&apos;ll get back to you soon.
            </p>
          )}
          {state === "error" && (
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.875rem", color: "rgba(239,68,68,0.9)" }}>
              Something went wrong. Email me directly at ypandey777@yahoo.in
            </p>
          )}

        </form>
      </div>
    </section>
  );
}

function ContactDetail({ label, value, href }: { label: string; value: string; href: string | null }) {
  const content = (
    <div className="flex flex-col gap-0.5">
      <span style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
        {label}
      </span>
      <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.9rem", color: href ? "rgba(165,180,252,0.85)" : "rgba(255,255,255,0.55)", fontWeight: 500 }}>
        {value}
      </span>
    </div>
  );
  if (!href) return content;
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity"
    >
      {content}
    </a>
  );
}

function FormField({
  label, value, onChange, placeholder, type, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          padding: "14px 16px",
          color: "white",
          fontFamily: "'Satoshi', sans-serif",
          fontSize: "0.9rem",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
      />
    </div>
  );
}
