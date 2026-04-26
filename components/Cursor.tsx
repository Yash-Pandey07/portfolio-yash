"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf: number;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }

    function animate() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      }
      raf = requestAnimationFrame(animate);
    }

    function onEnter(e: Event) {
      const el = e.currentTarget as Element;
      if (ringRef.current && (el.tagName === "A" || el.tagName === "BUTTON" || el.getAttribute("data-cursor"))) {
        ringRef.current.classList.add("hovered");
      }
    }

    function onLeave() {
      ringRef.current?.classList.remove("hovered");
    }

    function attachListeners() {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    }

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    // Attach to existing + future elements via MutationObserver
    attachListeners();
    const mo = new MutationObserver(attachListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
