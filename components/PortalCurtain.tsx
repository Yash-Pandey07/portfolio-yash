"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function PortalCurtain({ onComplete }: { onComplete?: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [scrollHintOpacity, setScrollHintOpacity] = useState(1);
  const [progress, setProgress] = useState(0);
  const [curtainVisible, setCurtainVisible] = useState(true);
  const completedRef = useRef(false);

  const applyProgress = useCallback((p: number) => {
    if (!maskGroupRef.current || !curtainRef.current) return;
    const clamped = Math.min(1, Math.max(0, p));
    progressRef.current = clamped;
    setProgress(clamped);

    const scale = 1 + (220 - 1) * Math.pow(clamped, 2.5);
    maskGroupRef.current.setAttribute(
      "transform",
      `translate(${window.innerWidth / 2}, ${window.innerHeight / 2}) scale(${scale}) translate(${-window.innerWidth / 2}, ${-window.innerHeight / 2})`
    );

    if (clamped > 0.85) {
      const fadeOut = (clamped - 0.85) / 0.15;
      curtainRef.current.style.opacity = String(1 - fadeOut);
    } else {
      curtainRef.current.style.opacity = "1";
    }

    setScrollHintOpacity(Math.max(0, 1 - clamped / 0.2));

    if (clamped >= 1 && !completedRef.current) {
      completedRef.current = true;
      document.body.style.overflow = "";
      setCurtainVisible(false);
      onComplete?.();
    }
  }, [onComplete]);

  // Cancel any running animation
  const cancelAnim = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const animateTo = useCallback((target: number, duration = 2800) => {
    cancelAnim();
    const start = progressRef.current;
    if (Math.abs(target - start) < 0.001) return;
    const startTime = performance.now();

    function tick(now: number) {
      const t = Math.min(1, (now - startTime) / duration);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      applyProgress(start + (target - start) * ease);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [applyProgress, cancelAnim]);

  // Lock body scroll while portal active
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    let autoAdvanceTriggered = false;

    function triggerAutoAdvance() {
      if (!autoAdvanceTriggered) {
        autoAdvanceTriggered = true;
        animateTo(1, 2800);
      }
    }

    function onWheel(e: WheelEvent) {
      if (completedRef.current) return;
      e.preventDefault();

      const delta = e.deltaY / window.innerHeight;

      if (delta < 0) {
        cancelAnim();
        autoAdvanceTriggered = false;
        applyProgress(progressRef.current + delta * 0.8);
        return;
      }

      const next = progressRef.current + delta * 0.8;
      applyProgress(next);

      if (progressRef.current >= 0.5) triggerAutoAdvance();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (completedRef.current) return;
      // Space, Enter, ArrowDown, PageDown → advance portal
      if (["Space", "Enter", "ArrowDown", "PageDown"].includes(e.code)) {
        e.preventDefault();
        triggerAutoAdvance();
      }
    }

    function onClick() {
      if (completedRef.current) return;
      triggerAutoAdvance();
    }

    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }
    function onTouchMove(e: TouchEvent) {
      if (completedRef.current) return;
      e.preventDefault();
      const dy = touchStartY - e.touches[0].clientY;
      const delta = dy / window.innerHeight;

      if (delta < 0) {
        cancelAnim();
        autoAdvanceTriggered = false;
      }

      const next = progressRef.current + delta * 1.2;
      applyProgress(next);
      touchStartY = e.touches[0].clientY;

      if (progressRef.current >= 0.5) triggerAutoAdvance();
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnim();
    };
  }, [applyProgress, animateTo, cancelAnim]);

  if (!curtainVisible) return null;

  return (
    <>
      <div
        ref={curtainRef}
        className="fixed inset-0 z-40"
        style={{ pointerEvents: "all" }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full"
          style={{ display: "block" }}
        >
          <defs>
            <mask id="portal-mask">
              <rect width="100%" height="100%" fill="white" />
              <g ref={maskGroupRef}>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontWeight: 900,
                    fontSize: "15vw",
                    letterSpacing: "-0.05em",
                  }}
                >
                  YP
                </text>
              </g>
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="#050505"
            mask="url(#portal-mask)"
          />
        </svg>

        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{
            opacity: scrollHintOpacity,
            transform: `translateX(-50%) translateY(${(1 - scrollHintOpacity) * -60}px)`,
            transition: "none",
          }}
        >
          <div className="bounce-mouse">
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
              <rect x="1" y="1" width="22" height="34" rx="11" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
              <rect x="10" y="6" width="4" height="8" rx="2" fill="white" fillOpacity="0.5" />
            </svg>
          </div>
          <span
            className="text-white uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "0.4em",
              opacity: 0.5,
              fontFamily: "'Satoshi', sans-serif",
            }}
          >
            Scroll Down or click to unveil
          </span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-[9999] h-1" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div
          className="h-full bg-white"
          style={{
            width: `${progress * 100}%`,
            transition: "width 0.05s linear",
          }}
        />
      </div>
    </>
  );
}
