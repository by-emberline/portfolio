import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme";

const THEME_COLORS: Record<string, string> = {
  ocean:   "#1dd4e8",
  violet:  "#a855f7",
  rose:    "#f43f73",
  emerald: "#34d399",
  amber:   "#f59e0b",
};

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const color = THEME_COLORS[theme] ?? "#1dd4e8";

  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const pos   = useRef({ x: -100, y: -100 });
  const ring  = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement;
      const isClickable = !!(
        target.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor-pointer]")
      );
      setHovering(isClickable);
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const animate = () => {
      const lag = 0.12;
      ring.current.x += (pos.current.x - ring.current.x) * lag;
      ring.current.y += (pos.current.y - ring.current.y) * lag;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  const dotSize  = clicking ? 6  : hovering ? 10 : 8;
  const ringSize = clicking ? 28 : hovering ? 44 : 36;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width:  dotSize,
          height: dotSize,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 ${clicking ? 12 : 8}px ${color}, 0 0 ${clicking ? 24 : 16}px ${color}88`,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: "width 0.15s ease, height 0.15s ease, opacity 0.2s ease, background 0.6s ease, box-shadow 0.15s ease",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width:  ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: `1.5px solid ${color}88`,
          boxShadow: `0 0 12px ${color}33`,
          pointerEvents: "none",
          zIndex: 99998,
          opacity: visible ? (hovering ? 1 : 0.6) : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease, border-color 0.6s ease, box-shadow 0.6s ease",
        }}
      />
    </>
  );
}
