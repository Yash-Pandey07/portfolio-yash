export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  featured?: boolean;
  status?: "live" | "wip" | "planned";
}

export const projects: Project[] = [
  // ── Live projects ──────────────────────────────────────────────────────────
  {
    title: "Real-Time QA Dashboard",
    description:
      "Live QA intelligence platform aggregating CI/CD pipeline status, Jira tracking, and test results into a unified ops view.",
    tags: ["JavaScript", "QA Automation", "CI/CD", "Dashboard"],
    github: "https://github.com/Yash-Pandey07/real-time-qa-dashboard",
    status: "live",
    featured: true,
  },
  {
    title: "Agentic Self-Healing Framework",
    description:
      "AI-driven Selenium automation framework with intelligent locator recovery — automatically heals broken selectors without manual intervention.",
    tags: ["Java", "Selenium", "AI", "Self-Healing"],
    github: "https://github.com/Yash-Pandey07/agentic-self-healing-framework",
    status: "live",
    featured: true,
  },
  {
    title: "AgentE2E QA Workflow — Playwright",
    description:
      "Complete 7-step AI-powered QA automation using MCP servers and AI agents orchestrated with Playwright for end-to-end testing.",
    tags: ["TypeScript", "Playwright", "AI Agents", "MCP"],
    github: "https://github.com/Yash-Pandey07/AgentE2EQAWorkflow-Playwright",
    status: "live",
    featured: true,
  },
  {
    title: "Cypress Automation Framework",
    description:
      "End-to-end testing framework with API testing, custom commands, and reusable locator strategies built in JavaScript.",
    tags: ["JavaScript", "Cypress", "E2E", "API Testing"],
    github: "https://github.com/Yash-Pandey07/Cypress-Automation-with-JavaScript",
    status: "live",
  },

  // ── Work in Progress ──────────────────────────────────────────────────────
  {
    title: "Playwright API Test Suite",
    description:
      "Production-grade API testing framework using Playwright + TypeScript. Covers GitHub REST API and JSONPlaceholder — schema validation, auth flows, error boundary tests, and Allure reports.",
    tags: ["TypeScript", "Playwright", "API Testing", "Allure"],
    github: "https://github.com/Yash-Pandey07/playwright-api-suite",
    status: "wip",
    featured: true,
  },
  {
    title: "GitHub Actions QA Pipeline",
    description:
      "Reusable CI/CD pipeline template running Playwright E2E + API tests on every PR. Includes test sharding, Allure HTML reports published to GitHub Pages, and Slack failure notifications.",
    tags: ["GitHub Actions", "Playwright", "CI/CD", "DevOps"],
    github: "https://github.com/Yash-Pandey07/github-actions-qa-pipeline",
    status: "wip",
    featured: true,
  },
  {
    title: "k6 Performance Test Suite",
    description:
      "Load and stress testing suite using k6 — ramp-up scenarios, threshold assertions, and HTML dashboard reports targeting public REST APIs and internal staging environments.",
    tags: ["k6", "Performance", "TypeScript", "Load Testing"],
    github: "https://github.com/Yash-Pandey07/k6-performance-suite",
    status: "wip",
  },
  {
    title: "LLM Response Testing Framework",
    description:
      "Testing framework for AI/LLM API outputs — hallucination detection, JSON schema validation, response consistency checks, and adversarial prompt testing patterns.",
    tags: ["TypeScript", "AI Testing", "LLM", "Vitest"],
    github: "https://github.com/Yash-Pandey07/llm-response-testing",
    status: "wip",
  },
  {
    title: "Manual QA Test Plan — E2E Coverage",
    description:
      "Structured test case library with Jira-style bug reports, exploratory charters, regression matrices, and RTM (Requirements Traceability Matrix) for a real e-commerce app.",
    tags: ["Manual QA", "Jira", "Test Design", "Bug Reporting"],
    github: "https://github.com/Yash-Pandey07/manual-qa-test-plan",
    status: "wip",
  },
];
