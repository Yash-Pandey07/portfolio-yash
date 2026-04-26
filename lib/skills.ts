export type SkillLevel = "proficient" | "familiar" | "roadmap";

export interface Skill {
  name: string;
  level: SkillLevel;
  category: string;
}

export const skills: Skill[] = [
  // ── Proficient ─────────────────────────────────────────────────────────────
  { name: "Playwright", level: "proficient", category: "Testing" },
  { name: "Vitest", level: "proficient", category: "Testing" },
  { name: "TypeScript", level: "proficient", category: "Languages" },
  { name: "JavaScript", level: "proficient", category: "Languages" },
  { name: "AI-Driven Testing", level: "proficient", category: "Testing" },
  { name: "Self-Healing Frameworks", level: "proficient", category: "Testing" },
  { name: "REST API Testing", level: "proficient", category: "Testing" },
  { name: "Manual Test Design", level: "proficient", category: "Testing" },
  { name: "Exploratory Testing", level: "proficient", category: "Testing" },
  { name: "Bug Reporting", level: "proficient", category: "Testing" },
  { name: "Postman", level: "proficient", category: "Tools" },
  { name: "Jira", level: "proficient", category: "Tools" },
  { name: "GitHub Actions", level: "proficient", category: "DevOps" },
  { name: "CI/CD Pipelines", level: "proficient", category: "DevOps" },
  { name: "React", level: "proficient", category: "Frontend" },
  { name: "Node.js", level: "proficient", category: "Backend" },

  // ── Familiar ───────────────────────────────────────────────────────────────
  { name: "Cypress", level: "familiar", category: "Testing" },
  { name: "Selenium", level: "familiar", category: "Testing" },
  { name: "Regression Testing", level: "familiar", category: "Testing" },
  { name: "Test Case Management", level: "familiar", category: "Testing" },
  { name: "Java", level: "familiar", category: "Languages" },
  { name: "Python", level: "familiar", category: "Languages" },
  { name: "Jenkins", level: "familiar", category: "DevOps" },
  { name: "Docker", level: "familiar", category: "DevOps" },
  { name: "Kubernetes", level: "familiar", category: "DevOps" },
  { name: "Next.js", level: "familiar", category: "Frontend" },
  { name: "MongoDB", level: "familiar", category: "Database" },
  { name: "Allure Reports", level: "familiar", category: "Tools" },

  // ── Roadmap ────────────────────────────────────────────────────────────────
  { name: "k6 / Performance Testing", level: "roadmap", category: "Testing" },
  { name: "Contract Testing (Pact)", level: "roadmap", category: "Testing" },
  { name: "Accessibility Testing (axe)", level: "roadmap", category: "Testing" },
  { name: "Security Testing (OWASP ZAP)", level: "roadmap", category: "Testing" },
  { name: "Mobile Testing (Appium)", level: "roadmap", category: "Testing" },
  { name: "LLM / AI Response Testing", level: "roadmap", category: "Testing" },
  { name: "Chaos Engineering", level: "roadmap", category: "DevOps" },
  { name: "OpenTelemetry / Grafana", level: "roadmap", category: "DevOps" },
];

// ── Manual QA experience data ──────────────────────────────────────────────
export interface ManualQAItem {
  area: string;
  description: string;
  tools: string[];
}

export const manualQAItems: ManualQAItem[] = [
  {
    area: "Test Case Design",
    description:
      "Writing structured test cases using equivalence partitioning, boundary value analysis, and decision tables. Maintaining test suites in Jira and Excel-based RTMs.",
    tools: ["Jira", "Excel", "TestRail"],
  },
  {
    area: "Exploratory Testing",
    description:
      "Session-based exploratory testing with time-boxed charters. Uncovering edge cases and UX issues that scripted tests miss — documented in structured bug reports.",
    tools: ["Jira", "Loom", "DevTools"],
  },
  {
    area: "Bug Reporting & Triage",
    description:
      "Filing detailed bug reports with steps to reproduce, severity/priority classification, screenshots, HAR files, and console logs. Active in sprint triage and dev handoffs.",
    tools: ["Jira", "Postman", "Chrome DevTools"],
  },
  {
    area: "Regression Testing",
    description:
      "Executing sprint and release regression cycles. Maintaining regression suites, tracking flaky tests, and coordinating sign-off with product and dev teams before deployments.",
    tools: ["Jira", "GitHub", "Slack"],
  },
  {
    area: "API & Integration Testing",
    description:
      "Manual API validation using Postman — testing request/response contracts, auth headers, error codes, and data integrity across service boundaries.",
    tools: ["Postman", "Swagger", "Jira"],
  },
  {
    area: "Cross-Browser & Responsive",
    description:
      "Validating UI consistency across Chrome, Firefox, Safari, and Edge. Testing responsive breakpoints on mobile/tablet viewports using DevTools device emulation.",
    tools: ["Chrome", "Firefox", "BrowserStack"],
  },
];
