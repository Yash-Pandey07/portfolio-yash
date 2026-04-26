"use client";

import { useState } from "react";
import { SectionHeader } from "./Projects";

const TABS = ["Test Planning", "Bug Reporting", "Cross-Layer Validation", "AI in QA"] as const;
type Tab = typeof TABS[number];

const CONTENT: Record<Tab, React.ReactNode> = {
  "Test Planning": <TestPlanContent />,
  "Bug Reporting": <BugReportContent />,
  "Cross-Layer Validation": <CrossLayerContent />,
  "AI in QA": <AIQAContent />,
};

export default function HowITest() {
  const [active, setActive] = useState<Tab>("Test Planning");

  return (
    <section id="how-i-test" className="py-32 px-8" style={{ background: "#060606" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="METHODOLOGY" title="How I Test" subtitle="process & approach" />

        {/* Tab bar */}
        <div className="mt-16 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                padding: "8px 20px",
                borderRadius: "9999px",
                border: active === tab ? "1px solid rgba(99,102,241,0.6)" : "1px solid rgba(255,255,255,0.1)",
                background: active === tab ? "rgba(99,102,241,0.15)" : "transparent",
                color: active === tab ? "rgba(165,180,252,0.95)" : "rgba(255,255,255,0.45)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div
          className="mt-8 rounded-2xl p-8 md:p-10"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {CONTENT[active]}
        </div>
      </div>
    </section>
  );
}

// ── Tab content components ──────────────────────────────────────────────────

function TestPlanContent() {
  const steps = [
    {
      num: "01",
      title: "Requirement Analysis",
      body: "Read spec, user stories, and acceptance criteria before touching a test file. Flag ambiguities directly in the ticket — assumptions are bugs waiting to happen.",
    },
    {
      num: "02",
      title: "Risk-Based Scope",
      body: "Prioritize by impact × probability. Payment flows, auth, and data mutations get full E2E coverage. Static UI gets smoke only. No equal-weight testing.",
    },
    {
      num: "03",
      title: "Positive → Negative → Edge",
      body: "Start with the happy path to confirm the feature exists. Then boundary values, invalid inputs, and concurrent access. Document each as a reusable scenario.",
    },
    {
      num: "04",
      title: "Three-Layer Coverage",
      body: "Every feature gets API contract tests, DB state assertions, and UI behavior checks. A test that only clicks buttons misses the system beneath.",
    },
    {
      num: "05",
      title: "CI Gate",
      body: "Smoke suite runs on every PR (< 2 min). Full regression on merge to main. Flaky tests get quarantined and fixed within 24h — not ignored.",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((s) => (
        <div key={s.num} className="flex flex-col gap-3">
          <span style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(99,102,241,0.7)", letterSpacing: "0.2em" }}>
            {s.num}
          </span>
          <h3 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "white" }}>
            {s.title}
          </h3>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            {s.body}
          </p>
        </div>
      ))}
    </div>
  );
}

function BugReportContent() {
  return (
    <div className="flex flex-col gap-8">
      <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 700 }}>
        Good bug reports cut investigation time in half. Every report I write follows this structure — reproducible, scoped, and actionable for both dev and PM.
      </p>

      {/* Sample bug card */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.04)" }}
      >
        {/* Header bar */}
        <div
          className="px-6 py-3 flex items-center gap-3"
          style={{ borderBottom: "1px solid rgba(239,68,68,0.15)", background: "rgba(239,68,68,0.07)" }}
        >
          <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(239,68,68,0.8)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            BUG · SEVERITY: HIGH
          </span>
          <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>
            QA-2041
          </span>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">
          <h3 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "rgba(255,255,255,0.9)" }}>
            [CHECKOUT] Order placed with expired card — no error shown to user, payment silently fails
          </h3>

          <BugSection label="Steps to Reproduce">
            <ol className="list-decimal list-inside flex flex-col gap-1">
              {[
                "Add any product to cart and proceed to checkout",
                "Enter a card with expiry date 01/22 (past date)",
                "Click 'Place Order' button",
                "Observe UI response and check system logs",
              ].map((s, i) => (
                <li key={i} style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>{s}</li>
              ))}
            </ol>
          </BugSection>

          <div className="grid md:grid-cols-2 gap-4">
            <BugSection label="Expected">
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.85rem", color: "rgba(34,197,94,0.8)", lineHeight: 1.6 }}>
                Inline error: "Your card has expired. Please use a valid payment method." Order not created in DB.
              </p>
            </BugSection>
            <BugSection label="Actual">
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.85rem", color: "rgba(239,68,68,0.8)", lineHeight: 1.6 }}>
                UI shows success toast. Order created in DB with status <code style={{ fontFamily: "monospace", fontSize: "11px" }}>"pending_payment"</code>. Payment gateway returns 402, silently swallowed.
              </p>
            </BugSection>
          </div>

          <BugSection label="Error Log">
            <pre
              className="rounded-lg p-4 overflow-x-auto"
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
                lineHeight: 1.7,
                background: "rgba(0,0,0,0.4)",
                color: "rgba(239,68,68,0.75)",
                border: "1px solid rgba(239,68,68,0.1)",
              }}
            >
{`ERROR [PaymentService] gateway.charge() → 402 card_expired
  at PaymentProcessor.chargeCard (payment.service.ts:89)
  at OrderController.placeOrder (order.controller.ts:142)
Payment error swallowed — order status not rolled back`}
            </pre>
          </BugSection>

          <BugSection label="Environment">
            <p style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>
              chromium · staging · build #2041 · Playwright 1.44
            </p>
          </BugSection>
        </div>
      </div>
    </div>
  );
}

function BugSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function CrossLayerContent() {
  const layers = [
    {
      label: "UI Layer",
      color: "rgba(99,102,241,0.8)",
      bg: "rgba(99,102,241,0.08)",
      border: "rgba(99,102,241,0.2)",
      icon: "⬡",
      checks: [
        "Success/error message visible to user",
        "Form resets after submission",
        "Loading state prevents double-submit",
        "Redirect to correct post-action page",
      ],
    },
    {
      label: "API Layer",
      color: "rgba(245,158,11,0.8)",
      bg: "rgba(245,158,11,0.08)",
      border: "rgba(245,158,11,0.2)",
      icon: "⇄",
      checks: [
        "Correct HTTP status code (201/400/409)",
        "Response body matches contract",
        "Auth headers validated, 401 on missing token",
        "Idempotency — duplicate POST handled",
      ],
    },
    {
      label: "DB Layer",
      color: "rgba(34,197,94,0.8)",
      bg: "rgba(34,197,94,0.08)",
      border: "rgba(34,197,94,0.2)",
      icon: "◫",
      checks: [
        "Record created with correct fields + foreign keys",
        "Soft-delete sets deleted_at, not hard removal",
        "Constraints enforced (unique email, non-null)",
        "No orphaned records on failed transactions",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 680 }}>
        Most bugs live between layers — the UI says success while the DB silently rolled back. I test all three in the same scenario so nothing hides in the gap.
      </p>

      <div className="grid md:grid-cols-3 gap-5">
        {layers.map((l) => (
          <div
            key={l.label}
            className="rounded-xl p-5 flex flex-col gap-4"
            style={{ background: l.bg, border: `1px solid ${l.border}` }}
          >
            <div className="flex items-center gap-2">
              <span style={{ fontSize: "1.1rem", color: l.color }}>{l.icon}</span>
              <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: l.color }}>
                {l.label}
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {l.checks.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span style={{ color: l.color, fontSize: "10px", marginTop: "5px", flexShrink: 0 }}>▸</span>
                  <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.825rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl p-5"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", marginBottom: "8px", textTransform: "uppercase" }}>
          Example — User Registration Flow
        </p>
        <pre
          style={{
            fontFamily: "monospace",
            fontSize: "12px",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.55)",
            overflowX: "auto",
          }}
        >
{`// 1. Submit via UI
await page.fill('[name=email]', 'test@hims.com');
await page.click('[type=submit]');
await expect(page.getByText('Account created')).toBeVisible(); // UI ✓

// 2. Verify API response
const res = await request.post('/api/users', { data: { email } });
expect(res.status()).toBe(201);                                  // API ✓

// 3. Assert DB state
const user = await db.query('SELECT * FROM users WHERE email=$1', [email]);
expect(user.rows[0].verified).toBe(false);                      // DB  ✓`}
        </pre>
      </div>
    </div>
  );
}

function AIQAContent() {
  const items = [
    {
      title: "Test Scenario Generation",
      body: "Feed spec + acceptance criteria to Claude. Get edge cases I'd miss after 3 hours of context. Curate, don't blindly accept — AI hallucinates test logic too.",
      tool: "Claude Code · Cursor",
    },
    {
      title: "Log Analysis",
      body: "Pipe CI failure logs through LLM to classify root cause: flaky selector, env issue, or real regression. Cuts triage from 20 min to 2 min per failure.",
      tool: "Claude API",
    },
    {
      title: "Self-Healing Locators",
      body: "When a selector breaks, AI suggests 3 alternative locators ranked by stability. No manual DOM hunting. Framework picks the first one that passes smoke.",
      tool: "Playwright + Claude",
    },
    {
      title: "PR Test Review",
      body: "Custom Claude prompt reviews test PRs for missing negative cases, hardcoded waits, and missing assertions. Runs as pre-merge check in GitHub Actions.",
      tool: "Claude API · GitHub Actions",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 680 }}>
        AI doesn't replace test judgment — it removes the repetitive parts so I spend time on the decisions that actually need an SDET brain.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl p-5 flex flex-col gap-3"
            style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}
          >
            <h3 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "rgba(255,255,255,0.9)" }}>
              {item.title}
            </h3>
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
              {item.body}
            </p>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                color: "rgba(165,180,252,0.7)",
                letterSpacing: "0.1em",
                marginTop: "auto",
                paddingTop: "8px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {item.tool}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
