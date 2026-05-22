import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";
import {
  SiGithub, SiInstagram, SiDiscord, SiWhatsapp,
  SiHtml5, SiJavascript, SiTypescript, SiReact, SiTailwindcss,
  SiNodedotjs, SiMysql, SiPostman,
  SiPython, SiCplusplus, SiNextdotjs,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { FileCode2, Code2 } from "lucide-react";
import {
  Mail, Phone, ArrowRight, Star, ExternalLink,
  X, Menu, Palette, GraduationCap, MapPin,
  Camera, Send, Linkedin, CheckCircle2, AlertCircle,
  Eye, Users, Github, Download, ChevronLeft, ChevronRight,
  Monitor, Server, Award, Clock, CheckCircle,
} from "lucide-react";
import { useListReviews, useCreateReview, getListReviewsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme, type Theme } from "@/lib/theme";
import emailjs from "@emailjs/browser";

/* ============================================================
   THEME CONFIG
   ============================================================ */
const THEMES: { id: Theme; label: string; color: string }[] = [
  { id: "ocean",   label: "Ocean",   color: "#1dd4e8" },
  { id: "violet",  label: "Violet",  color: "#a855f7" },
  { id: "rose",    label: "Rose",    color: "#f43f73" },
  { id: "emerald", label: "Emerald", color: "#34d399" },
  { id: "amber",   label: "Amber",   color: "#f59e0b" },
];

/* ============================================================
   NAV
   ============================================================ */
const NAV_ITEMS = [
  { label: "Home",      target: "hero" },
  { label: "Projects",  target: "projects" },
  { label: "Services",  target: "services" },
  { label: "Skills",    target: "skills" },
  { label: "Education", target: "education" },
  { label: "Reviews",   target: "reviews" },
  { label: "Contact",   target: "contact" },
];

/* ============================================================
   ROOT
   ============================================================ */
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <Splash key="splash" onDismiss={() => setShowSplash(false)} />
        ) : (
          <MainContent key="main" />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   SPLASH
   ============================================================ */
const TITLES = ["Web Developer", "UI Crafter", "Frontend Engineer", "Digital Builder", "Backend Engineer"];

function Splash({ onDismiss }: { onDismiss: () => void }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");

  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1200);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("erasing"), 400);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setTitleIndex((i) => (i + 1) % TITLES.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, titleIndex]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(24px)", scale: 1.05 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background cursor-pointer"
      onClick={onDismiss}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/12 via-background to-background" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[120px]" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, filter: "blur(12px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-8 font-medium"
        >
          Portfolio
        </motion.p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white min-h-[1.3em]">
          {displayed}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-primary"
          >|</motion.span>
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, delay: 1, ease: "circInOut" }}
          className="h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-muted-foreground/40 text-xs mt-6 tracking-[0.3em] uppercase"
        >
          tap to enter
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   FLOATING NAV
   ============================================================ */
function FloatingNav() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [showThemes, setShowThemes] = useState(false);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }

  return (
    <>
      <motion.button
        data-testid="button-nav-toggle"
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 right-6 z-[60] w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:text-primary hover:scale-110 transition-all"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={18} />
            </motion.div>
          ) : (
            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Menu size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-3xl flex flex-col items-center justify-center"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <nav className="flex flex-col items-center gap-1 mb-12">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.target}
                  data-testid={`nav-link-${item.target}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={() => scrollTo(item.target)}
                  className="text-4xl md:text-6xl font-bold tracking-tight text-white/70 hover:text-primary transition-colors px-4 py-1.5"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              <button
                data-testid="button-theme-toggle"
                onClick={() => setShowThemes((v) => !v)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-full glass-card"
              >
                <Palette size={14} />
                Theme
              </button>

              <AnimatePresence>
                {showThemes && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-3"
                  >
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        data-testid={`theme-${t.id}`}
                        onClick={() => setTheme(t.id)}
                        title={t.label}
                        className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-125 ${theme === t.id ? "border-white scale-125" : "border-transparent"}`}
                        style={{ backgroundColor: t.color }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   SERVICES
   ============================================================ */
function Services() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      title: "Web Development",
      icon: Code2,
      short: "Modern, responsive, and high-performance websites.",
      full: "I specialize in building impressive dynamic websites using React, Next.js, and Tailwind CSS. I handle both frontend and backend development for complete web solutions.",
      color: "#1dd4e8"
    },
    {
      id: 2,
      title: "Software Development",
      icon: Monitor,
      short: "Custom software and desktop/web applications.",
      full: "I develop custom software solutions with focus on performance, scalability, maintenance, and seamless API integrations.",
      color: "#a855f7"
    },
    {
      id: 3,
      title: "Backend Development",
      icon: Server,
      short: "Robust and secure server-side systems.",
      full: "I design and build efficient backend systems, database architecture (MySQL), API development, and ensure smooth data management.",
      color: "#34d399"
    }
  ];

  return (
    <section id="services" className="py-32 px-6 md:px-12 lg:px-24 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Services I Offer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Professional web & software development with reliable support</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl p-8 flex flex-col h-full transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: `1px solid rgba(255,255,255,0.15)`,
                }}
              >
                <div className="mb-6">
                  <Icon size={48} style={{ color: service.color }} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{service.short}</p>

                <button
                  onClick={() => setExpanded(expanded === service.id ? null : service.id)}
                  className="text-primary hover:underline flex items-center gap-2 text-sm font-medium self-start"
                >
                  {expanded === service.id ? "Show less" : "View more"} →
                </button>

                <AnimatePresence>
                  {expanded === service.id && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-sm text-muted-foreground mt-4 pt-4 border-t border-white/10"
                    >
                      {service.full}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12 text-sm text-muted-foreground">
          ✅ 24/7 Online Support • 2 Fully Completed Projects • Fast Delivery
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MAIN CONTENT
   ============================================================ */
function MainContent() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative"
    >
      <ParticleBackground />

      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/8 blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent/8 blur-[160px] pointer-events-none z-0" />

      <FloatingNav />
      <Hero />
      <Projects />
      <Services />
      <Skills />
      <Education />
      <Reviews />
      <Contact />
    </motion.main>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  const [photo, setPhoto] = useState<string | null>(() => localStorage.getItem("portfolio-photo"));
  const fileRef = useRef<HTMLInputElement>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      setPhoto(data);
      localStorage.setItem("portfolio-photo", data);
    };
    reader.readAsDataURL(file);
  }

  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 pb-10">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0 relative group cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            <div
              className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden relative"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                border: "2px solid rgba(255,255,255,0.15)",
                boxShadow: "0 0 40px var(--tw-shadow-color), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              {photo ? (
                <img src={photo} alt="Esther Shatipamba" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <Camera size={28} className="text-primary/60" />
                  <span className="text-[10px] text-muted-foreground/50 tracking-wide">Add photo</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary animate-pulse border-2 border-background" />
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </motion.div>

          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium tracking-wide text-primary">Available for work</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.1] mb-3">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">
                Ester
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-8 text-white/40">
              Shatipamba.
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed mb-10">
              A passionate web developer crafting premium digital products — from sleek landing pages to full-stack applications.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">2+ Years</div>
                <div className="text-sm text-muted-foreground">Experience</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-muted-foreground">Completed Projects</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Online Support</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                data-testid="button-lets-talk"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold tracking-wide hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
              >
                Let's Talk <ArrowRight size={18} />
              </button>
              <button
                data-testid="button-view-work"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 rounded-full glass-card font-medium tracking-wide hover:bg-white/10 transition-colors"
              >
                View Work
              </button>
              <a
                href="/resume"
                data-testid="button-view-cv"
                className="px-8 py-4 rounded-full font-medium tracking-wide flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <Download size={16} className="text-primary" /> View CV
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   PROJECTS — with detail modal
   ============================================================ */
type Project = {
  id: number;
  title: string;
  desc: string;
  fullDesc: string;
  hotelName: string;
  location: string;
  images: string[];
  video?: string;
  tech: string[];
  github: string;
  live: string;
  accent: string;
};

  const projects: Project[] = [
  {
    id: 1,
    title: "Punyu International Hotel",
    desc: "An elegant, modern hotel built for travellers who expect more.",
    fullDesc: "An elegant, modern hotel built for travellers who expect more — refined rooms, honest food and the warm spirit of northern Namibia.",
    hotelName: "Punyu International Hotel",
    location: "Ondangwa, Oshikoto, Namibia",
    images: [
      "/projects/punyu-home.png",
      "/projects/punyu-phone-home.png",
      "/projects/punyu-map.png"
    ],
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    github: "#",
    live: "#",
    accent: "#1dd4e8",
  },
  {
    id: 2,
    title: "Callie's Game Lodge",
    desc: "An exclusive African sanctuary nestled near Tsumeb.",
    fullDesc: "An exclusive African sanctuary. Six luxury chalets, active waterhole and curated cuisine under the Namibian sky.",
    hotelName: "Callie's Game Lodge",
    location: "Tsumeb, Namibia",
    images: [
      "/projects/Callies-home.png",
      "/projects/Callies-phone-home.png",
      "/projects/Callies-map.png"
    ],
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    github: "#",
    live: "#",
    accent: "#a855f7",
  },
  {
    id: 3,
    title: "Conductor's Inn",
    desc: "A vintage railway reborn as a unique stay.",
    fullDesc: "Two disused rail carriages and farmhouse chalets turned into a one-of-a-kind retreat 8 km outside Tsumeb.",
    hotelName: "Conductor's Inn",
    location: "Tsumeb, Oshikoto, Namibia",
    images: [
      "/projects/Conductor's-home.png",
      "/projects/Conductor's-phone-home.png",
      "/projects/Conductor's-map.png"
    ],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github: "#",
    live: "#",
    accent: "#f43f73",
  },
  {
    id: 4,
    title: "Kupferquelle Resort",
    desc: "An oasis at the gateway to Etosha.",
    fullDesc: "An oasis at the gateway to Etosha. Located in central Tsumeb, a short drive from the museum and Lake Otjikoto.",
    hotelName: "Kupferquelle Resort",
    location: "Tsumeb, Namibia",
    images: [
      "/projects/Kupferquelle-home.png",
      "/projects/Kupferquelle-phone-home.png",
      "/projects/Kupferquelle-map.png"
    ],
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    github: "#",
    live: "#",
    accent: "#34d399",
  },
  {
    id: 5,
    title: "La Rochelle",
    desc: "A timeless retreat in the heart of the bushveld.",
    fullDesc: "Ten thousand hectares of private wilderness with European warmth and Namibian skies.",
    hotelName: "La Rochelle",
    location: "Tsumeb, Namibia",
    images: [
      "/projects/La Rochelle-home.png",
      "/projects/La Rochelle-phone-home.png",
      "/projects/La Rochelle-map.png"
    ],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github: "#",
    live: "#",
    accent: "#f59e0b",
  },
  {
    id: 6,
    title: "Red Hills Guesthouse",
    desc: "A quiet luxury retreat in the heart of Tsumeb.",
    fullDesc: "A quiet luxury retreat in the heart of Tsumeb with elegant rooms and warm hospitality.",
    hotelName: "Red Hills Guesthouse",
    location: "Tsumeb, Namibia",
    images: [
      "/projects/Red hills-home.png",
      "/projects/Red hills-phone-home.png",
      "/projects/Red hills-map.png"
    ],
    tech: ["Next.js", "Tailwind CSS"],
    github: "#",
    live: "#",
    accent: "#8b1e2f",
  },
  {
    id: 7,
    title: "Strand Hotel Swakopmund",
    desc: "Beachfront luxury where the Atlantic meets warm hospitality.",
    fullDesc: "Beachfront luxury with world-class dining and unforgettable coastal moments.",
    hotelName: "Strand Hotel",
    location: "Swakopmund, Namibia",
    images: [
      "/projects/Strand-home.png",
      "/projects/Strand-phone-home.png",
      "/projects/Strand-map.png"
    ],
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    github: "#",
    live: "#",
    accent: "#004080",
  },
  {
    id: 8,
    title: "Tsumeb Theater Guesthouse",
    desc: "Sleep in the spotlight. Vintage elegance meets theatrical charm.",
    fullDesc: "A cozy guesthouse where vintage elegance meets theatrical charm in the heart of Tsumeb.",
    hotelName: "Tsumeb Theater Guesthouse",
    location: "Tsumeb, Namibia",
    images: [
      "/projects/Tsumeb Theater-home.png",
      "/projects/Tsumeb Theater-phone-home.png",
      "/projects/Tsumeb Theater-map.png"
    ],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github: "#",
    live: "#",
    accent: "#3a2a1f",
  },
  {
    id: 9,
    title: "Victoria Guest House",
    desc: "A quiet African retreat in the north of Namibia.",
    fullDesc: "Family-run comfort with crisp linens and a peaceful courtyard in the heart of Tsumeb.",
    hotelName: "Victoria Guest House",
    location: "Tsumeb, Namibia",
    images: [
      "/projects/Victoria-home.png",
      "/projects/Victoria-phone-home.png",
      "/projects/Victoria-map.png"
    ],
    tech: ["Next.js", "Tailwind CSS"],
    github: "#",
    live: "#",
    accent: "#2f4a2f",
  }
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const nextImage = () => setImageIndex((prev) => (prev + 1) % project.images.length);
  const prevImage = () => setImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 16, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring", damping: 22, stiffness: 280 }}
        className="w-full max-w-3xl rounded-[2rem] overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{
          background: "rgba(12,18,30,0.92)",
          backdropFilter: "blur(48px) saturate(180%)",
          WebkitBackdropFilter: "blur(48px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1.5px 0 rgba(255,255,255,0.22)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-8 right-8 p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all z-[51]"
        >
          <X size={24} />
        </button>

        {/* Image Gallery */}
        <div className="relative bg-black/40 overflow-hidden">
          <img
            src={project.images[imageIndex]}
            alt={`${project.title} - Image ${imageIndex + 1}`}
            className="w-full h-96 object-cover"
          />
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all z-10"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{
                      background: idx === imageIndex ? project.accent : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Header info */}
        <div
          className="p-6 border-b"
          style={{
            background: `linear-gradient(135deg, ${project.accent}10 0%, transparent 100%)`,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {project.title}
            </h3>
            <p className="text-sm text-white/50 mb-3">{project.desc}</p>
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Hotel Name: </span>
                <span className="text-white font-medium">{project.hotelName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Location: </span>
                <span className="text-white font-medium">{project.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video (if available) */}
        {project.video && (
          <div className="p-6 border-b border-white/10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">Project Video</p>
            <div className="aspect-video bg-black/40 rounded-lg overflow-hidden">
              <img
                src={project.video}
                alt={`${project.title} video`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 space-y-6">
          <p className="text-muted-foreground leading-relaxed text-sm">{project.fullDesc}</p>

          {/* Tech stack */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: `${project.accent}18`,
                    border: `1px solid ${project.accent}40`,
                    color: project.accent,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all"
              style={{
                background: project.accent,
                color: "#000",
                boxShadow: `0 0 24px ${project.accent}44`,
              }}
            >
              <ExternalLink size={15} /> Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium text-muted-foreground hover:text-white transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <Github size={15} /> GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-32 px-6 md:px-12 lg:px-24">
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Projects</h2>
          <div className="w-20 h-1 bg-primary/50 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              data-testid={`card-project-${project.id}`}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group rounded-3xl overflow-hidden flex flex-col cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(40px) saturate(180%) brightness(110%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%) brightness(110%)",
                border: "1px solid rgba(255,255,255,0.20)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.2), inset 0 1.5px 0 rgba(255,255,255,0.24), inset 0 -1px 0 rgba(0,0,0,0.14)",
              }}
              onClick={() => setSelected(project)}
            >
              <div className="aspect-[4/3] relative overflow-hidden flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${project.accent}14 0%, rgba(255,255,255,0.03) 100%)` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${project.accent}20, transparent)` }}
                />
                <div className="relative z-10 flex flex-col items-center gap-3 opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${project.accent}22`, border: `1px solid ${project.accent}44` }}>
                    <Eye size={20} style={{ color: project.accent }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: project.accent }}>Click to explore</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm flex-1 mb-6">{project.desc}</p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                  <Eye size={14} /> View Details
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SKILLS — SkillCard with color glow on hover
   ============================================================ */
type SkillDef = { name: string; icon: React.ElementType | (() => React.ReactElement); color: string };

function SkillCard({ skill, delay }: { skill: SkillDef; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon as React.ElementType;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5, scale: 1.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 px-5 py-3 rounded-2xl cursor-default select-none"
      style={{
        background: hovered
          ? `rgba(${hexToRgb(skill.color)}, 0.12)`
          : "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? `${skill.color}55` : "rgba(255,255,255,0.10)"}`,
        boxShadow: hovered
          ? `0 0 28px ${skill.color}40, 0 6px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)`
          : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)`,
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Icon size={22} style={{ color: skill.color }} />
      <span className="text-sm font-medium" style={{ color: hovered ? "#fff" : "rgba(255,255,255,0.75)" }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function OpenApiIcon({ size = 22, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <FileCode2 size={size} style={style} />
  );
}

const skillGroups: { label: string; skills: SkillDef[] }[] = [
  {
    label: "Frontend",
    skills: [
      { name: "HTML5",       icon: SiHtml5,       color: "#e34f26" },
      { name: "CSS3",        icon: FaCss3Alt,     color: "#1572b6" },
      { name: "JavaScript",  icon: SiJavascript,  color: "#f7df1e" },
      { name: "TypeScript",  icon: SiTypescript,  color: "#3178c6" },
      { name: "React",       icon: SiReact,       color: "#61dafb" },
      { name: "Tailwind",    icon: SiTailwindcss, color: "#38bdf8" },
      { name: "Next.js",     icon: SiNextdotjs,   color: "#e2e8f0" },
    ],
  },
  {
    label: "Languages",
    skills: [
      { name: "Python",      icon: SiPython,      color: "#3776ab" },
      { name: "C++",         icon: SiCplusplus,   color: "#00599c" },
      { name: "Node.js",     icon: SiNodedotjs,   color: "#68a063" },
    ],
  },
  {
    label: "APIs & Docs",
    skills: [
      { name: "REST APIs",   icon: SiPostman,     color: "#ff6c37" },
      { name: "OpenAPI",     icon: OpenApiIcon,   color: "#6ba539" },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "MySQL",       icon: SiMysql,       color: "#4479a1" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "GitHub",      icon: SiGithub,      color: "#e2e8f0" },
      { name: "VS Code",     icon: Code2,              color: "#007acc" },
    ],
  },
];

/* ============================================================
   SERVICES SECTION
   ============================================================ */
function Skills() {
  return (
    <section id="skills" className="py-32 px-6 md:px-12 lg:px-24 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>Skills</h2>
          <div className="w-20 h-1 bg-primary/50 rounded-full" />
        </motion.div>

        <div className="space-y-10">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 font-medium mb-5 pl-1">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-4">
                {group.skills.map((skill, si) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    delay={gi * 0.08 + si * 0.06}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EDUCATION
   ============================================================ */
function Education() {
  return (
    <section id="education" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>Education</h2>
          <div className="w-20 h-1 bg-primary/50 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl"
        >
          <div
            className="p-8 rounded-3xl flex items-start gap-6"
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(40px) saturate(180%) brightness(110%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%) brightness(110%)",
              border: "1px solid rgba(255,255,255,0.20)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.2), inset 0 1.5px 0 rgba(255,255,255,0.24), inset 0 -1px 0 rgba(0,0,0,0.14)",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <GraduationCap size={26} className="text-primary" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium tracking-wide mb-3">
                Currently Enrolled
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Etosha Secondary School</h3>
              <p className="text-muted-foreground text-sm mb-3">Grade 10 · Namibia</p>
              <p className="text-sm text-white/60 leading-relaxed">
                Passionate about web development while pursuing secondary education. Building real-world projects and growing as a full-stack developer.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   STAR RATING INPUT
   ============================================================ */
function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange?.(s)}
          onMouseEnter={() => onChange && setHovered(s)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={`transition-colors ${onChange ? "cursor-pointer" : "cursor-default"}`}
          data-testid={`star-${s}`}
        >
          <Star
            size={18}
            className={
              s <= (hovered || rating)
                ? "text-primary fill-primary"
                : "text-muted-foreground/30 fill-muted-foreground/10"
            }
          />
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   REVIEW FORM
   ============================================================ */
function ReviewForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const createReview = useCreateReview();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;
    createReview.mutate(
      { data: { name: name.trim(), company: company.trim() || undefined, quote: quote.trim(), rating } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListReviewsQueryKey() });
          setSubmitted(true);
          setTimeout(onClose, 1800);
        },
      }
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Star size={28} className="text-primary fill-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
          <p className="text-muted-foreground text-sm">Your review has been submitted.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-muted-foreground mb-1.5">Your rating</label>
        <StarRating rating={rating} onChange={setRating} />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-1.5">Name *</label>
        <input
          data-testid="input-review-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-1.5">Company / Project</label>
        <input
          data-testid="input-review-company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Optional"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-1.5">Your review *</label>
        <textarea
          data-testid="input-review-quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          required
          placeholder="Share your experience working with Esther..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-all text-sm resize-none"
        />
      </div>
      <button
        data-testid="button-submit-review"
        type="submit"
        disabled={createReview.isPending || !name.trim() || !quote.trim()}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {createReview.isPending ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>Submit Review <Send size={15} /></>
        )}
      </button>
    </form>
  );
}

/* ============================================================
   REVIEWS
   ============================================================ */
function Reviews() {
  const { data: reviews, isLoading } = useListReviews();
  const [showForm, setShowForm] = useState(false);

  const allReviews = (reviews ?? []).map((r) => ({ ...r, id: String(r.id) }));

  return (
    <section id="reviews" className="py-32 px-6 md:px-12 lg:px-24 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>Client Love</h2>
            <div className="w-20 h-1 bg-accent/50 rounded-full" />
          </div>
          <button
            data-testid="button-leave-review"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 hover:scale-105 transition-all self-start md:self-auto"
          >
            <Star size={15} className="fill-primary" />
            Leave a Review
          </button>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-3xl p-8 animate-pulse h-48" />
            ))}
          </div>
        ) : allReviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
              <Star size={26} className="text-primary/50" />
            </div>
            <p className="text-muted-foreground text-lg mb-2">No reviews yet</p>
            <p className="text-muted-foreground/50 text-sm">Be the first to leave a review!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allReviews.map((review, i) => (
              <motion.div
                key={review.id}
                data-testid={`card-review-${review.id}`}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 rounded-3xl flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(40px) saturate(180%) brightness(110%)",
                  WebkitBackdropFilter: "blur(40px) saturate(180%) brightness(110%)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.2), inset 0 1.5px 0 rgba(255,255,255,0.24), inset 0 -1px 0 rgba(0,0,0,0.14)",
                }}
              >
                <div className="flex gap-1 mb-6 text-primary">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-base font-light leading-relaxed mb-auto pb-8">"{review.quote}"</p>
                <div>
                  <p className="font-medium text-white">{review.name}</p>
                  {"company" in review && review.company && (
                    <p className="text-sm text-muted-foreground">{review.company}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-2xl"
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl p-8 w-full max-w-md relative"
              style={{
                background: "rgba(10,10,20,0.85)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <button
                data-testid="button-close-review-form"
                onClick={() => setShowForm(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 transition-colors text-muted-foreground"
              >
                <X size={18} />
              </button>
              <h3 className="text-2xl font-bold mb-2">Leave a review</h3>
              <p className="text-muted-foreground text-sm mb-6">Share your experience working with Esther.</p>
              <ReviewForm onClose={() => setShowForm(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============================================================
   VISITOR COUNTER
   ============================================================ */
function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
    fetch(`${base}/api/visits`, { method: "POST" })
      .then((r) => r.json())
      .then((data) => setCount(data.count))
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-16 flex justify-center"
    >
      <div
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Users size={14} className="text-primary" />
        <span className="text-muted-foreground">
          <span className="text-white font-semibold">{count.toLocaleString()}</span>
          {" "}visitor{count !== 1 ? "s" : ""} so far
        </span>
      </div>
    </motion.div>
  );
}

/* ============================================================
   EMAILJS CONTACT FORM
   ============================================================ */
const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? "";
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? "";

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const configured = EJS_SERVICE && EJS_TEMPLATE && EJS_KEY;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;

    if (!configured) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(EJS_SERVICE, EJS_TEMPLATE, formRef.current, { publicKey: EJS_KEY });
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 tracking-wide uppercase">Name</label>
          <input
            name="from_name"
            required
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 tracking-wide uppercase">Email</label>
          <input
            name="reply_to"
            type="email"
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-all text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1.5 tracking-wide uppercase">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project..."
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-all text-sm resize-none"
        />
      </div>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-emerald-400 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
        >
          <CheckCircle2 size={16} />
          Message sent! I'll get back to you soon.
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-red-400 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20"
        >
          <AlertCircle size={16} />
          {configured ? "Failed to send. Try emailing me directly." : "EmailJS keys not configured yet."}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>Send Message <Send size={15} /></>
        )}
      </button>
    </form>
  );
}

/* ============================================================
   CONTACT + GOOGLE MAP
   ============================================================ */
function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let's build<br />
            something <span className="text-primary italic">together.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Available for freelance opportunities. Let's create an unforgettable digital experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* EmailJS Contact Form */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-[2.5rem]"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(48px) saturate(200%) brightness(110%)",
              WebkitBackdropFilter: "blur(48px) saturate(200%) brightness(110%)",
              border: "1px solid rgba(255,255,255,0.22)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3), inset 0 1.5px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.16), inset 1px 0 rgba(255,255,255,0.1), inset -1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <h3 className="text-xl font-bold mb-1">Send a message</h3>
            <p className="text-sm text-muted-foreground mb-6">I'll respond within 24 hours.</p>
            <ContactForm />

            <div className="mt-8 pt-6 border-t border-white/8">
              <div className="flex flex-col gap-3 mb-5">
                <a href="mailto:estermatiaspandu@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={15} className="text-primary/60 flex-shrink-0" />
                  estermatiaspandu@gmail.com
                </a>
                <a href="tel:0858112457" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={15} className="text-primary/60 flex-shrink-0" />
                  0858112457
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin size={15} className="text-primary/60 flex-shrink-0" />
                  Namibia · Remote available worldwide
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-3">
                <SocialLink href="https://github.com/by-emberline" icon={<SiGithub size={20} />} label="GitHub" />
                <SocialLink href="https://instagram.com/_ester_matias" icon={<SiInstagram size={20} />} label="Instagram" />
                <SocialLink href="https://linkedin.com/in/ester-shatipamba" icon={<Linkedin size={20} />} label="LinkedIn" />
                <SocialLink href="https://discord.com/users/black_child12" icon={<SiDiscord size={20} />} label="Discord: black_child12" />
                <SocialLink href="https://wa.me/264858112457" icon={<SiWhatsapp size={20} />} label="WhatsApp Business" />
              </div>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="overflow-hidden rounded-[2.5rem] relative"
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none z-10 rounded-[2.5rem]"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 40%)" }}
            />
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7463765!2d18.4904!3d-22.5595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c25b39a19b9a713%3A0x35bda8c70e4f2dab!2sNamibia!5e0!3m2!1sen!2s!4v1234567890!5m2!1sen!2s"
              width="100%"
              height="520"
              style={{ border: 0, filter: "grayscale(0.3) contrast(1.1) brightness(0.85)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <MapPin size={12} className="text-primary" />
                <span>Namibia · Location varies</span>
              </div>
            </div>
          </motion.div>
        </div>

        <VisitorCounter />
        <div className="mt-6 text-center text-sm text-muted-foreground/40">
          <p>© {new Date().getFullYear()} Esther Shatipamba. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-3 rounded-full glass-card hover:scale-110 hover:text-primary transition-all duration-300"
    >
      {icon}
    </a>
  );
}
