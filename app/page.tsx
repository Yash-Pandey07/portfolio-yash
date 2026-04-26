"use client";

import { useState } from "react";
import PortalCurtain from "@/components/PortalCurtain";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Terminal from "@/components/Terminal";
import ManualQA from "@/components/ManualQA";
import HowITest from "@/components/HowITest";
import Skills from "@/components/Skills";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export default function Home() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ background: "#050505", minHeight: "100vh" }}>
      {/* Content — pointer-events blocked until portal done */}
      <div style={{ pointerEvents: revealed ? "all" : "none" }}>
        <Header revealed={revealed} />
        <Hero revealed={revealed} />
        <Marquee />
        <Projects />
        <Terminal />
        <ManualQA />
        <HowITest />
        <Skills />
        <Blog />
        <Footer />
      </div>

      {/* Portal curtain SVG mask */}
      <PortalCurtain onComplete={() => setRevealed(true)} />
    </div>
  );
}
