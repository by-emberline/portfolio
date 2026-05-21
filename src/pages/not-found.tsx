import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "wouter";
import { ParticleBackground } from "@/components/ParticleBackground";

const THEME_COLORS: Record<string, string> = {
  ocean:   "#1dd4e8",
  violet:  "#a855f7",
  rose:    "#f43f73",
  emerald: "#34d399",
  amber:   "#f59e0b",
};

export default function NotFound() {
  const { theme } = useTheme();
  const color = THEME_COLORS[theme] ?? "#1dd4e8";

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center overflow-hidden relative">
      <ParticleBackground />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${color}12 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        {/* Giant 404 */}
        <div className="relative mb-8 select-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                y: [0, -8, 0],
                opacity: [0.06, 0.12, 0.06],
              }}
              transition={{
                duration: 3 + i * 0.7,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              style={{
                fontSize: "clamp(120px, 22vw, 200px)",
                fontWeight: 900,
                fontFamily: "'Syne', sans-serif",
                color: color,
                filter: `blur(${(i + 1) * 6}px)`,
                transform: `scale(${1 + i * 0.06})`,
              }}
            >
              404
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            style={{
              fontSize: "clamp(100px, 20vw, 180px)",
              fontWeight: 900,
              fontFamily: "'Syne', sans-serif",
              background: `linear-gradient(135deg, ${color} 0%, ${color}bb 50%, ${color}66 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}
          >
            404
          </motion.div>
        </div>

        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl p-8 mb-8"
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(40px) saturate(180%) brightness(110%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%) brightness(110%)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.45), inset 0 1.5px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.14)",
          }}
        >
          <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Page Not Found
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Looks like this page drifted off into the void. Let's get you back to something real.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <Link href="/">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm"
              style={{
                background: color,
                color: "#000",
                boxShadow: `0 0 24px ${color}55`,
              }}
            >
              <Home size={16} />
              Back to Home
            </motion.a>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-medium text-sm text-muted-foreground"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <ArrowLeft size={16} />
            Go Back
          </motion.button>
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-xs text-muted-foreground/40"
        >
          © {new Date().getFullYear()} Esther Shatipamba
        </motion.p>
      </div>
    </div>
  );
}
