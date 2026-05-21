import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { ArrowLeft, Download, Printer, Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react";
import { SiGithub, SiInstagram, SiDiscord, SiWhatsapp } from "react-icons/si";
import { useLocation } from "wouter";
import { ParticleBackground } from "@/components/ParticleBackground";

const THEME_COLORS: Record<string, string> = {
  ocean:   "#1dd4e8",
  violet:  "#a855f7",
  rose:    "#f43f73",
  emerald: "#34d399",
  amber:   "#f59e0b",
};

const skills = [
  { name: "HTML5",       level: 92 },
  { name: "CSS3",        level: 88 },
  { name: "JavaScript",  level: 82 },
  { name: "TypeScript",  level: 75 },
  { name: "React",       level: 80 },
  { name: "Next.js",     level: 68 },
  { name: "Tailwind CSS",level: 85 },
  { name: "Python",      level: 65 },
  { name: "C++",         level: 58 },
  { name: "MySQL",       level: 62 },
  { name: "Postman",     level: 70 },
  { name: "OpenAPI",     level: 60 },
];

const projects = [
  {
    title: "Personal Portfolio",
    desc: "Premium dark-mode portfolio with animated particle backgrounds, 5 color themes, liquid glass UI, and DB-backed reviews.",
    tech: ["React", "TypeScript", "Framer Motion", "PostgreSQL"],
    href: "/",
  },
  {
    title: "Glass Commerce",
    desc: "E-commerce concept with a frosted glass design system, product browsing, and checkout flow.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "#",
  },
  {
    title: "FlowTask",
    desc: "Minimalist task manager with drag-and-drop kanban boards and Pomodoro focus mode.",
    tech: ["React", "TypeScript", "Framer Motion"],
    href: "#",
  },
];

export default function ResumePage() {
  const { theme } = useTheme();
  const color = THEME_COLORS[theme] ?? "#1dd4e8";
  const [, navigate] = useLocation();

  function handlePrint() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ParticleBackground />

      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: `radial-gradient(ellipse 70% 50% at 30% 20%, ${color}10 0%, transparent 60%)` }}
      />

      {/* Print-hide toolbar */}
      <div className="no-print sticky top-0 z-40 flex items-center justify-between px-6 md:px-12 py-4"
        style={{
          background: "rgba(10,15,26,0.85)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
          <motion.button
            whileHover={{ x: -3 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </motion.button>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <Printer size={14} /> Print
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold"
            style={{ background: color, color: "#000", boxShadow: `0 0 20px ${color}44` }}
          >
            <Download size={14} /> Save as PDF
          </motion.button>
        </div>
      </div>

      {/* CV Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 py-12 print:py-6 print:px-0">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] p-8 md:p-10 mb-8 print:rounded-xl print:border print:border-gray-200"
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(48px) saturate(180%)",
            WebkitBackdropFilter: "blur(48px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1.5px 0 rgba(255,255,255,0.22)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div
                className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
              >
                Curriculum Vitae
              </div>
              <h1
                className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Esther Shatipamba
              </h1>
              <p className="text-xl text-muted-foreground font-light mb-4">
                Web Developer & UI Designer
              </p>
              <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-xl">
                Grade 10 student at Etosha Secondary School, Namibia — passionate about building beautiful,
                functional web experiences with modern technologies. Self-taught developer with a focus
                on clean UI, performance, and delightful user experiences.
              </p>
            </div>

            {/* Contact info block */}
            <div className="flex flex-col gap-2.5 min-w-[200px]">
              {[
                { icon: <Mail size={13} />, label: "estermatiaspandu@gmail.com", href: "mailto:estermatiaspandu@gmail.com" },
                { icon: <Phone size={13} />, label: "+264 858 112 457", href: "https://wa.me/264858112457" },
                { icon: <MapPin size={13} />, label: "Namibia · Remote available", href: null },
                { icon: <SiGithub size={13} />, label: "github.com/by-emberline", href: "https://github.com/by-emberline" },
                { icon: <SiInstagram size={13} />, label: "@_ester_matias", href: "https://instagram.com/_ester_matias" },
                { icon: <SiDiscord size={13} />, label: "black_child12", href: "https://discord.com/users/black_child12" },
              ].map(({ icon, label, href }) => (
                <div key={label} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <span style={{ color }}>{icon}</span>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors truncate">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

          {/* LEFT COLUMN */}
          <div className="md:col-span-3 flex flex-col gap-6">

            {/* Experience / Projects */}
            <Section title="Projects" color={color} delay={0.1}>
              <div className="flex flex-col gap-5">
                {projects.map((p, i) => (
                  <div key={i} className="border-l-2 pl-4" style={{ borderColor: `${color}55` }}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-white">{p.title}</h4>
                      <a href={p.href} className="text-primary/50 hover:text-primary transition-colors flex-shrink-0">
                        <ExternalLink size={13} />
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ background: `${color}18`, color, border: `1px solid ${color}33` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Education */}
            <Section title="Education" color={color} delay={0.2}>
              <div className="flex flex-col gap-4">
                <EduItem
                  title="Etosha Secondary School"
                  sub="Grade 10 · 2025 – Present"
                  desc="Focused on Information Technology, Computer Science, and Mathematics."
                  color={color}
                />
                <EduItem
                  title="Self-Taught Web Development"
                  sub="2023 – Present"
                  desc="Built expertise through online courses, open-source projects, and hands-on building — covering HTML, CSS, JavaScript, TypeScript, React, Next.js, and Node.js."
                  color={color}
                />
              </div>
            </Section>

            {/* About */}
            <Section title="About Me" color={color} delay={0.3}>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm a 15-year-old web developer from Namibia who discovered programming in Grade 8 and
                hasn't stopped since. I specialise in frontend development — creating fast, accessible,
                visually stunning interfaces. Outside of coding, I enjoy UI design, exploring new technologies,
                and turning creative ideas into real products. I'm available for freelance projects, collaborations,
                and mentorship opportunities.
              </p>
            </Section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Skills */}
            <Section title="Technical Skills" color={color} delay={0.15}>
              <div className="flex flex-col gap-3">
                {skills.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">{s.name}</span>
                      <span style={{ color }} className="font-medium">{s.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.05, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Soft Skills */}
            <Section title="Soft Skills" color={color} delay={0.25}>
              <div className="flex flex-wrap gap-2">
                {["Self-motivated", "Fast learner", "Detail-oriented", "Creative problem solver",
                  "Collaborative", "Communication", "Time management", "Adaptable"].map((s) => (
                  <span key={s} className="text-xs px-3 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </Section>

            {/* Languages */}
            <Section title="Languages" color={color} delay={0.3}>
              <div className="flex flex-col gap-2">
                {[
                  { lang: "English",   level: "Fluent" },
                  { lang: "Oshiwambo", level: "Native" },
                  { lang: "Afrikaans", level: "Basic" },
                ].map(({ lang, level }) => (
                  <div key={lang} className="flex justify-between items-center text-sm">
                    <span className="text-white/80">{lang}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full"
                      style={{ background: `${color}18`, color, border: `1px solid ${color}33` }}>
                      {level}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            {/* References */}
            <Section title="References" color={color} delay={0.35}>
              <p className="text-sm text-muted-foreground">Available upon request.</p>
            </Section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-xs text-muted-foreground/30 no-print">
          <p>© {new Date().getFullYear()} Esther Shatipamba · Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/50">Ctrl+P</kbd> or Save as PDF to download</p>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          * { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
          [style*="background: rgba"] { background: #f8f9fa !important; }
          [style*="color: rgba(255,255,255"] { color: #1a1a1a !important; }
          .text-muted-foreground { color: #555 !important; }
          .text-white { color: #111 !important; }
          .bg-background { background: white !important; }
        }
      `}</style>
    </div>
  );
}

function Section({ title, color, delay, children }: {
  title: string; color: string; delay: number; children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-[1.75rem] p-6 print:rounded-lg print:border print:border-gray-200"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <h3
        className="text-sm font-bold uppercase tracking-widest mb-5"
        style={{ color, fontFamily: "'Syne', sans-serif" }}
      >
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

function EduItem({ title, sub, desc, color }: {
  title: string; sub: string; desc: string; color: string;
}) {
  return (
    <div className="border-l-2 pl-4" style={{ borderColor: `${color}55` }}>
      <h4 className="font-semibold text-white text-sm">{title}</h4>
      <p className="text-xs font-medium mb-1" style={{ color }}>{sub}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
