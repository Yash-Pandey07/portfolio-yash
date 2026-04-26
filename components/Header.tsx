"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "WORK", href: "#projects" },
  { label: "MANUAL QA", href: "#manual-qa" },
  { label: "SKILLS", href: "#skills" },
  { label: "BLOG", href: "#blog" },
  { label: "CONTACT", href: "#contact" },
];

export default function Header({ revealed }: { revealed: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // visible only after portal completes
  const visible = revealed;

  // Hide on scroll down, show on scroll up — only after portal done
  useEffect(() => {
    if (!revealed) return;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      if (delta > 8 && y > 80) {
        setHidden(true);
      } else if (delta < -8 || y < 80) {
        setHidden(false);
      }
      setScrolled(y > 80);
      lastScrollY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealed]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{
        opacity: visible && !hidden ? 1 : 0,
        transform: hidden ? "translateY(-100%)" : visible ? "translateY(0)" : "translateY(-20px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        pointerEvents: visible && !hidden ? "all" : "none",
        background: scrolled
          ? "rgba(5,5,5,0.88)"
          : "linear-gradient(to bottom, rgba(5,5,5,0.85) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
          <span
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 900, color: "#4f46e5", fontSize: "0.875rem" }}
          >
            YP
          </span>
        </div>
        <span
          className="text-white text-sm uppercase opacity-80"
          style={{ fontFamily: "'Satoshi', sans-serif", letterSpacing: "0.2em" }}
        >
          Yash Pandey
        </span>
      </a>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-white text-xs opacity-70 hover:opacity-100 transition-opacity duration-300"
            style={{ fontFamily: "'Satoshi', sans-serif", letterSpacing: "0.15em" }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
