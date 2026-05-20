import { useState, useEffect, useRef } from "react";

const skills = [
  { name: "Ruby on Rails", level: 95, category: "Backend" },
  { name: "React.js", level: 88, category: "Frontend" },
  { name: "PostgreSQL / MySQL", level: 85, category: "Database" },
  { name: "REST APIs", level: 92, category: "Backend" },
  { name: "JavaScript / HTML5 / CSS3", level: 90, category: "Frontend" },
  { name: "AI / GenAI Integrations", level: 80, category: "AI" },
  { name: "Docker", level: 72, category: "DevOps" },
  { name: "WordPress", level: 78, category: "CMS" },
];

const projects = [
  {
    title: "AI-Powered Job Portal",
    desc: "Full-stack Rails + React platform with GenAI resume parsing, smart job matching, and admin analytics dashboard.",
    tags: ["Rails", "React", "PostgreSQL", "OpenAI API"],
    accent: "#00FFB2",
  },
  {
    title: "SaaS Admin Dashboard",
    desc: "Scalable multi-tenant dashboard with real-time reporting, role-based access control, and REST API integrations.",
    tags: ["Rails", "React", "REST API", "Docker"],
    accent: "#FF6B35",
  },
  {
    title: "E-Commerce Platform",
    desc: "Performance-optimized storefront with custom WordPress theme, WooCommerce extensions, and payment gateway integrations.",
    tags: ["WordPress", "PHP", "MySQL", "JavaScript"],
    accent: "#A855F7",
  },
  {
    title: "GenAI Automation Suite",
    desc: "Internal tooling leveraging LLM APIs to automate content workflows, code reviews, and data extraction pipelines.",
    tags: ["Rails", "GenAI", "Python", "PostgreSQL"],
    accent: "#38BDF8",
  },
];

const services = [
  {
    title: "Custom Website Development",
    desc: "Pixel-perfect, responsive websites built from the ground up — tailored to your brand, optimised for performance, and crafted for seamless user experience.",
    icon: "🌐",
    accent: "#00FFB2",
  },
  {
    title: "Web Application Development",
    desc: "Scalable full-stack web applications using Ruby on Rails and React, featuring clean architecture, RESTful APIs, and robust database design.",
    icon: "⚙️",
    accent: "#38BDF8",
  },
  {
    title: "AI Integration & Automation",
    desc: "Embed GenAI and LLM-powered features into your product — intelligent assistants, automated workflows, smart data extraction, and more.",
    icon: "🤖",
    accent: "#A855F7",
  },
  {
    title: "Quality Assurance (QA) & Testing",
    desc: "Comprehensive test coverage with unit, integration, and end-to-end testing strategies to ensure your application ships bug-free and reliable.",
    icon: "✅",
    accent: "#FF6B35",
  },
  {
    title: "Feature Enhancement & Application Maintenance",
    desc: "Evolve and maintain your existing codebase — adding new features, refactoring legacy code, and keeping your application performant and secure.",
    icon: "🔧",
    accent: "#F59E0B",
  },
  {
    title: "IT Consulting & Mentorship",
    desc: "Strategic technology guidance for teams and individuals — architecture reviews, stack decisions, code mentorship, and career coaching for aspiring developers.",
    icon: "🧭",
    accent: "#34D399",
  },
];

const navLinks = ["About", "Skills", "Services", "Work", "Contact"];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function SkillBar({ skill, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: "1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", color: "#CBD5E1", letterSpacing: "0.05em" }}>
          {skill.name}
        </span>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.75rem", color: "#64748B" }}>
          {skill.level}%
        </span>
      </div>
      <div style={{ height: "3px", background: "#1E293B", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: inView ? `${skill.level}%` : "0%",
          background: "linear-gradient(90deg, #00FFB2, #38BDF8)",
          borderRadius: "2px",
          transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 500)}
      style={{
        background: active ? "#0F172A" : "#0A0F1E",
        border: `1px solid ${active ? project.accent + "55" : "#1E293B"}`,
        borderRadius: "16px",
        padding: "1.6rem",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: inView ? "translateY(0)" : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 80}ms`,
        boxShadow: active ? `0 0 40px ${project.accent}18` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        opacity: active ? 1 : 0,
        transition: "opacity 0.4s",
      }} />
      <div style={{
        width: "8px", height: "8px", borderRadius: "50%",
        background: project.accent, marginBottom: "1rem",
        boxShadow: `0 0 12px ${project.accent}`,
      }} />
      <h3 style={{
        fontFamily: "'Poppins', sans-serif", fontSize: "1.05rem", fontWeight: 700,
        color: "#F1F5F9", marginBottom: "0.6rem", letterSpacing: "-0.02em",
      }}>
        {project.title}
      </h3>
      <p style={{
        fontFamily: "'Poppins', sans-serif", fontSize: "0.86rem",
        color: "#64748B", lineHeight: 1.65, marginBottom: "1.2rem",
      }}>
        {project.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'Poppins', sans-serif", fontSize: "0.68rem",
            color: project.accent, background: project.accent + "15",
            border: `1px solid ${project.accent}30`,
            padding: "0.22rem 0.55rem", borderRadius: "4px",
            letterSpacing: "0.04em",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 500)}
      style={{
        background: active ? "#0F172A" : "#0A0F1E",
        border: `1px solid ${active ? service.accent + "55" : "#1E293B"}`,
        borderRadius: "16px",
        padding: "1.8rem 1.6rem",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: inView ? "translateY(0)" : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 80}ms`,
        boxShadow: active ? `0 0 40px ${service.accent}18` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
        opacity: active ? 1 : 0,
        transition: "opacity 0.4s",
      }} />
      <div style={{
        width: "44px", height: "44px", borderRadius: "12px",
        background: service.accent + "15",
        border: `1px solid ${service.accent}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.4rem", marginBottom: "1.1rem",
      }}>
        {service.icon}
      </div>
      <h3 style={{
        fontFamily: "'Poppins', sans-serif", fontSize: "1rem", fontWeight: 700,
        color: "#F1F5F9", marginBottom: "0.6rem", letterSpacing: "-0.02em",
      }}>
        {service.title}
      </h3>
      <p style={{
        fontFamily: "'Poppins', sans-serif", fontSize: "0.86rem",
        color: "#64748B", lineHeight: 1.65,
      }}>
        {service.desc}
      </p>
    </div>
  );
}

function SectionHeader({ label, title }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(20px)",
      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{
        fontFamily: "'Poppins', sans-serif", fontSize: "0.68rem",
        color: "#00FFB2", letterSpacing: "0.14em", marginBottom: "0.75rem",
      }}>
        — {label}
      </div>
      <h2 style={{
        fontFamily: "'Poppins', sans-serif", fontWeight: 800,
        fontSize: "clamp(1.7rem, 5vw, 2.5rem)", letterSpacing: "-0.04em",
        color: "#F1F5F9",
      }}>
        {title}
      </h2>
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heroRef, heroInView] = useInView(0.05);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (menuOpen) setMenuOpen(false);
    };
    const onMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const glowX = (mousePos.x / (window.innerWidth || 1)) * 100;
  const glowY = (mousePos.y / (window.innerHeight || 1)) * 100;
  const px = isMobile ? "1.25rem" : isTablet ? "2rem" : "2.5rem";
  const sectionPy = isMobile ? "4rem" : "6rem";

  return (
    <div style={{
      background: "#050B18",
      minHeight: "100vh",
      color: "#F1F5F9",
      fontFamily: "'Poppins', sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050B18; }
        ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 2px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(-50%); }
          50% { transform: translateY(calc(-50% - 10px)); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.06; }
        }

        .nav-link {
          font-family: 'Poppins', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #475569;
          cursor: pointer;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          transition: all 0.2s;
          border: 1px solid transparent;
          background: none;
        }
        .nav-link:hover, .nav-link.active {
          color: #00FFB2; border-color: #00FFB233; background: #00FFB20A;
        }
        .mobile-nav-link {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
          cursor: pointer;
          padding: 1.1rem 0;
          border-bottom: 1px solid #0F172A;
          border-left: none; border-right: none; border-top: none;
          transition: color 0.2s;
          background: none;
          width: 100%;
          text-align: left;
          display: block;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active { color: #00FFB2; }
        .hire-btn {
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.55rem 1.3rem;
          border-radius: 8px;
          border: 1px solid #00FFB2;
          color: #00FFB2;
          background: transparent;
          cursor: pointer;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .hire-btn:hover { background: #00FFB2; color: #050B18; }
        .cv-btn {
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.55rem 1.3rem;
          border-radius: 8px;
          border: 1px solid #1E293B;
          color: #94A3B8;
          background: #0A0F1E;
          cursor: pointer;
          transition: all 0.25s;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
        }
        .cv-btn:hover { border-color: #38BDF8; color: #38BDF8; background: #38BDF808; }
        .cta-primary {
          font-family: 'Poppins', sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.9rem 1.8rem;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #00FFB2, #38BDF8);
          color: #050B18;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px #00FFB230; }
        .cta-secondary {
          font-family: 'Poppins', sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.9rem 1.8rem;
          border-radius: 10px;
          border: 1px solid #1E293B;
          background: transparent;
          color: #64748B;
          cursor: pointer;
          transition: all 0.3s;
        }
        .cta-secondary:hover { border-color: #38BDF8; color: #38BDF8; }
        .hamburger {
          display: flex; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 6px;
          background: none; border: none;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: #94A3B8; border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-drawer {
          position: fixed; top: 60px; left: 0; right: 0; bottom: 0;
          background: rgba(5,11,24,0.98);
          backdrop-filter: blur(24px);
          z-index: 99;
          padding: 1.5rem 1.5rem 3rem;
          display: flex; flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
      `}</style>

      {/* Ambient glow — desktop only */}
      {!isMobile && (
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, #00FFB208, transparent 60%)`,
          transition: "background 0.15s",
        }} />
      )}

      {/* Grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,255,178,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(0,255,178,0.04) 1px, transparent 1px)`,
        backgroundSize: isMobile ? "40px 40px" : "60px 60px",
        animation: "gridPulse 4s ease-in-out infinite",
      }} />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "60px",
        background: scrolled || menuOpen ? "rgba(5,11,24,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #0F172A" : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: `0 ${px}`, height: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.03em" }}>
            <span style={{ color: "#00FFB2" }}>&lt;</span>dev<span style={{ color: "#00FFB2" }}>/&gt;</span>
          </div>

          {!isMobile && (
            <div style={{ display: "flex", gap: "0.2rem", alignItems: "center" }}>
              {navLinks.map(l => (
                <button key={l} className={`nav-link${activeNav === l ? " active" : ""}`} onClick={() => scrollTo(l)}>{l}</button>
              ))}
            </div>
          )}

          {!isMobile && (
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <a className="cv-btn" href="/Ritesh_Chaudhary_CV.pdf" download>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
              </a>
              <button className="hire-btn" onClick={() => scrollTo("Contact")}>Hire Me</button>
            </div>
          )}

          {isMobile && (
            <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
          )}
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {isMobile && (
        <div className="mobile-drawer" style={{ transform: menuOpen ? "translateX(0)" : "translateX(100%)" }}>
          {navLinks.map(l => (
            <button key={l} className={`mobile-nav-link${activeNav === l ? " active" : ""}`} onClick={() => scrollTo(l)}>{l}</button>
          ))}
          <div style={{ marginTop: "auto", paddingTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <a className="cv-btn" href="/Ritesh_Chaudhary_CV.pdf" download style={{ justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
            <button className="cta-primary" style={{ width: "100%" }} onClick={() => scrollTo("Contact")}>
              Hire Me
            </button>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="about" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: `80px ${px} 4rem`,
        maxWidth: "1200px", margin: "0 auto",
        position: "relative", zIndex: 1,
      }}>
        <div ref={heroRef} style={{ width: "100%", maxWidth: isTablet ? "100%" : "640px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "#00FFB20F", border: "1px solid #00FFB225",
            borderRadius: "100px", padding: "0.35rem 1rem", marginBottom: "1.75rem",
            animation: heroInView ? "fadeUp 0.6s ease both" : "none",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00FFB2", boxShadow: "0 0 8px #00FFB2", display: "inline-block" }} />
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.7rem", color: "#00FFB2", letterSpacing: "0.1em" }}>AVAILABLE FOR WORK</span>
          </div>

          <h1 style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 800,
            fontSize: isMobile ? "2.6rem" : "clamp(2.8rem, 5.5vw, 4.2rem)",
            lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "1.25rem",
            animation: heroInView ? "fadeUp 0.7s 0.1s ease both" : "none",
          }}>
            Hi, I'm Ritesh<br />
            <span style={{ background: "linear-gradient(135deg, #00FFB2 0%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: isMobile ? "1.5rem" : "1.8rem", letterSpacing: "0.02em" }}>
              A Senior Ruby on Rails developer
            </span>
          </h1>

          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: isMobile ? "0.95rem" : "1.02rem",
            color: "#64748B", lineHeight: 1.75, marginBottom: "2rem",
            animation: heroInView ? "fadeUp 0.7s 0.2s ease both" : "none",
          }}>
            5+ years building scalable web applications with{" "}
            <strong style={{ color: "#94A3B8" }}>Ruby on Rails</strong>,{" "}
            <strong style={{ color: "#94A3B8" }}>React</strong>, and{" "}
            <strong style={{ color: "#94A3B8" }}>AI integrations</strong>. I craft performant, maintainable systems with obsessive attention to clean architecture and UX.
          </p>

          <div style={{
            display: "flex", gap: "0.85rem",
            flexDirection: isMobile ? "column" : "row",
            animation: heroInView ? "fadeUp 0.7s 0.3s ease both" : "none",
          }}>
            <button className="cta-primary" style={{ width: isMobile ? "100%" : "auto" }} onClick={() => scrollTo("Work")}>
              View My Work →
            </button>
            <button className="cta-secondary" style={{ width: isMobile ? "100%" : "auto" }} onClick={() => scrollTo("Contact")}>
              Get In Touch
            </button>
          </div>

          <div style={{
            display: "flex", gap: isMobile ? "1.75rem" : "2.5rem",
            marginTop: "3rem", flexWrap: "wrap",
            animation: heroInView ? "fadeUp 0.7s 0.4s ease both" : "none",
          }}>
            {[["5+", "Years Experience"], ["4+", "Projects Shipped"], ["Rails · React", "Core Stack"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#F1F5F9", letterSpacing: "-0.03em" }}>{val}</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.68rem", color: "#475569", letterSpacing: "0.06em", marginTop: "0.2rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative orb — desktop only */}
        {!isTablet && (
          <div style={{
            position: "absolute", right: "4%", top: "50%",
            width: "500px", height: "500px",
            background: "radial-gradient(circle, #00FFB215 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "floatOrb 6s ease-in-out infinite",
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none",
          }}>
            <div style={{ width: "400px", height: "400px", border: "1px solid #00FFB220", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "130px", height: "130px", border: "1px solid #38BDF820", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "2.4rem" }}>⌨️</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: `${sectionPy} ${px}`, maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHeader label="EXPERTISE" title="Skills & Stack" />
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "0" : "0 4rem",
          marginTop: "2.5rem",
        }}>
          {skills.map((s, i) => <SkillBar key={s.name} skill={s} delay={i * 80} />)}
        </div>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "2.5rem",
          padding: isMobile ? "1.25rem" : "1.75rem",
          background: "#0A0F1E", borderRadius: "16px", border: "1px solid #1E293B",
        }}>
          {["Ruby on Rails", "React.js", "PostgreSQL", "MySQL", "REST APIs", "Git & GitHub", "Docker", "WordPress", "GenAI / LLMs", "HTML5", "CSS3", "JavaScript"].map(t => (
            <span key={t} style={{
              fontFamily: "'Poppins', sans-serif", fontSize: "0.71rem",
              color: "#94A3B8", background: "#1E293B",
              padding: "0.32rem 0.7rem", borderRadius: "6px", letterSpacing: "0.03em",
            }}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: `${sectionPy} ${px}`, maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHeader label="WHAT I OFFER" title="My Services" />
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: "1rem", marginTop: "2.5rem",
        }}>
          {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" style={{ padding: `${sectionPy} ${px}`, maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHeader label="PORTFOLIO" title="Selected Work" />
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: "1rem", marginTop: "2.5rem",
        }}>
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: `${sectionPy} ${px}`, maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          background: "linear-gradient(135deg, #0A0F1E 0%, #0F1A2E 100%)",
          border: "1px solid #1E293B",
          borderRadius: isMobile ? "18px" : "24px",
          padding: isMobile ? "2.5rem 1.5rem" : "4rem",
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)",
            width: "300px", height: "300px",
            background: "radial-gradient(circle, #00FFB210, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.68rem", color: "#00FFB2", letterSpacing: "0.12em", marginBottom: "1rem" }}>
            — LET'S BUILD TOGETHER —
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 800,
            fontSize: isMobile ? "1.9rem" : "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.04em", marginBottom: "1rem",
          }}>
            Open to New{" "}
            <span style={{ background: "linear-gradient(135deg, #00FFB2, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Opportunities
            </span>
          </h2>
          <p style={{
            fontFamily: "'Poppins', sans-serif", color: "#64748B",
            fontSize: isMobile ? "0.92rem" : "1rem", lineHeight: 1.7,
            maxWidth: "460px", margin: "0 auto 2rem",
          }}>
            Whether it's a full-stack product, API integration, or AI-powered feature — I'm ready to ship something great.
          </p>
          <div style={{
            display: "flex", gap: "0.85rem", justifyContent: "center",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
          }}>
            <a href="mailto: chaudharyritesh7100@gmail.com" style={{ textDecoration: "none", width: isMobile ? "100%" : "auto" }}>
              <button className="cta-primary" style={{ width: isMobile ? "100%" : "auto" }}>Send an Email</button>
            </a>
            <a href="https://github.com/Riteshchaudhary710" target="_blank" rel="noreferrer" style={{ textDecoration: "none", width: isMobile ? "100%" : "auto" }}>
              <button className="cta-secondary" style={{ width: isMobile ? "100%" : "auto" }}>GitHub Profile</button>
            </a>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? "1rem" : "2rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
            {[
              { icon: "📧", label: "chaudharyritesh7100@gmail.com", href: "mailto:chaudharyritesh7100@gmail.com" },
              { icon: "💼", label: "linkedin.com/in/ritesh-chaudhary-a77804190/", href: "https://www.linkedin.com/in/ritesh-chaudhary-a77804190/" },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#475569">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
                label: "github.com/Riteshchaudhary710",
                href: "https://github.com/Riteshchaudhary710",
              },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} target={href.startsWith("mailto") ? "_self" : "_blank"} rel="noreferrer" style={{ textDecoration: "none" }}>
                <div style={{
                  fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? "0.68rem" : "0.75rem",
                  color: "#475569", letterSpacing: "0.04em",
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = "#00FFB2"}
                  onMouseLeave={e => e.currentTarget.style.color = "#475569"}
                >
                  <span>{icon}</span>{label}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid #0F172A",
        padding: `1.5rem ${px}`,
        display: "flex",
        justifyContent: isMobile ? "center" : "space-between",
        alignItems: "center",
        flexDirection: isMobile ? "column" : "row",
        gap: "0.5rem",
        maxWidth: "1200px", margin: "0 auto",
        position: "relative", zIndex: 1,
      }}>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "rgb(30, 119, 59)" }}>
          <span style={{ color: "#00FFB230" }}>&lt;</span>dev<span style={{ color: "#00FFB230" }}>/&gt;</span>
        </span>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.68rem", color: "rgb(30, 119, 59)", letterSpacing: "0.05em" }}>
          © 2026 · Design by Ritesh
        </span>
      </footer>
    </div>
  );
}
