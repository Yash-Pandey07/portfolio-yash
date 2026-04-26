import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Noise from "@/components/Noise";

const BASE_URL = "https://portfolio-yash-sage.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Yash Pandey — SDET & Test Automation Engineer",
    template: "%s | Yash Pandey",
  },
  description:
    "Yash Pandey is an SDET at Bayone Solutions specializing in Playwright, Vitest, TypeScript, and AI-driven test automation. Based in Delhi, India.",
  keywords: [
    "Yash Pandey",
    "SDET",
    "Test Automation Engineer",
    "Playwright",
    "Vitest",
    "TypeScript",
    "QA Engineer",
    "AI test automation",
    "Bayone Solutions",
    "Delhi",
    "software testing",
    "portfolio",
  ],
  authors: [{ name: "Yash Pandey", url: "https://github.com/Yash-Pandey07" }],
  creator: "Yash Pandey",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Yash Pandey — SDET & Test Automation Engineer",
    description:
      "SDET specializing in Playwright, Vitest, and AI-driven test automation. Building intelligent QA systems at Bayone Solutions.",
    url: BASE_URL,
    siteName: "Yash Pandey Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Pandey — SDET & Test Automation Engineer",
    description:
      "SDET specializing in Playwright, Vitest, and AI-driven test automation.",
    creator: "@Yash_Pandey07",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yash Pandey",
  url: BASE_URL,
  sameAs: [
    "https://github.com/Yash-Pandey07",
    "https://www.linkedin.com/in/yashpandey7/",
  ],
  jobTitle: "Software Development Engineer in Test",
  worksFor: {
    "@type": "Organization",
    name: "Bayone Solutions",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Playwright",
    "Vitest",
    "TypeScript",
    "Test Automation",
    "AI-driven QA",
    "Cypress",
    "Selenium",
  ],
  email: "ypandey777@yahoo.in",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full antialiased">
          <Cursor />
          <Noise />
          {children}
        </body>
    </html>
  );
}
