import { useEffect, useRef } from "react";
import { useTheme, type Theme } from "@/lib/theme";

const THEME_COLORS: Record<Theme, [number, number, number]> = {
  ocean:   [29,  212, 232],
  violet:  [168, 85,  247],
  rose:    [244, 63,  115],
  emerald: [52,  211, 153],
  amber:   [245, 158, 11],
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: 1 | 2 | 3;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const targetColorRef = useRef<[number, number, number]>([...THEME_COLORS[theme]]);
  const currentColorRef = useRef<[number, number, number]>([...THEME_COLORS[theme]]);

  useEffect(() => {
    targetColorRef.current = [...THEME_COLORS[theme]];
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const particles: Particle[] = [];
    const COUNT = 110;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      const layer = (i % 3 + 1) as 1 | 2 | 3;
      const speed = layer === 1 ? 0.12 : layer === 2 ? 0.22 : 0.4;
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed * 0.6,
        size: layer === 1 ? Math.random() * 1.2 + 0.3 : layer === 2 ? Math.random() * 2 + 0.8 : Math.random() * 3 + 1.2,
        baseOpacity: layer === 1 ? Math.random() * 0.35 + 0.05 : layer === 2 ? Math.random() * 0.45 + 0.1 : Math.random() * 0.25 + 0.05,
        twinkleSpeed: Math.random() * 0.018 + 0.004,
        twinklePhase: Math.random() * Math.PI * 2,
        layer,
      });
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const [tr, tg, tb] = targetColorRef.current;
      const [cr, cg, cb] = currentColorRef.current;
      currentColorRef.current = [
        lerp(cr, tr, 0.025),
        lerp(cg, tg, 0.025),
        lerp(cb, tb, 0.025),
      ];
      const [r, g, b] = currentColorRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.twinklePhase += p.twinkleSpeed;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        const twinkle = 0.55 + 0.45 * Math.sin(p.twinklePhase);
        const alpha = p.baseOpacity * twinkle;

        if (p.layer === 3) {
          const glowR = p.size * 9;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          grad.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.5})`);
          grad.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.15})`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        const coreR = p.size * (p.layer === 1 ? 0.8 : p.layer === 2 ? 1 : 1.2);
        const coreGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, coreR * 2);
        coreGrad.addColorStop(0, `rgba(255,255,255,${alpha * (p.layer === 1 ? 0.9 : 0.75)})`);
        coreGrad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.5})`);
        coreGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, coreR * 2, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.55 }}
    />
  );
}
