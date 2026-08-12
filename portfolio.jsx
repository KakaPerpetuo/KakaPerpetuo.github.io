import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Copy, Check, ExternalLink, Terminal, Folder, User, Send } from "lucide-react";

const ME = {
    name: "Maria Clara",
    role: "Desenvolvedora de Software",
    location: "Ouro Preto, MG, Brasil",
    bio: "Construo aplicações web robustas, do banco de dados à interface",
    photo: null,
    email: "kakaperpetuo2001@gmail.com",
    github: "https://github.com/KakaPerpetuo",
    linkedin: "https://www.linkedin.com/in/maria-clara-perpetuo-3b5856316",
    stack: ["Python", "React", "PHP", "Git"],
};

// Colocar os projetos aqui
const PROJECTS = [
    {
        name: "app-financas",
        description:
            "Dashboard de controle financeiro pessoal com gráficos em tempo real e categorização automática de gastos via ML.",
        tags: ["React", "Node.js", "PostgreSQL"],
        stats: { added: 1240, removed: 180 },
        link: "https://github.com/seuusuario/app-financas",
        status: "produção",
    }
]

const COLORS = {
    bg: "#0B0D0C",
    surface: "#131614",
    surfaceHover: "#181C19",
    border: "#262B27",
    borderLight: "#333A34",
    text: "#E7EBE7",
    textMuted: "#8A928A",
    textDim: "#5A625C",
    green: "#3ECF6E",
    greenDim: "#1F7A3F",
    greenGlow: "rgba(62, 207, 110, 0.15)",
};

function useTypewriter(lines, speed = 35, startDelay = 300) {
    const [output, setOutput] = useState([]);
    const [done, setDone] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let timeouts = [];

        const run = async () => {
            await new Promise((r) => timeouts.push(setTimeout(r, startDelay)));
            for (let li = 0; li < lines.length; li++) {
                if (cancelled) return;
                const line = lines[li];
                for (let ci = 0; ci <= line.length; ci++) {
                    if (cancelled) return;
                    await new Promise((r) => timeouts.push(setTimeout(r, speed)));
                    setOutput((prev) => {
                        const copy = [...prev];
                        copy[li] = line.slice(0, ci);
                        return copy;
                    });
                }
                await new Promise((r) => timeouts.push(setTimeout(r, 150)));
            }
            setDone(true);
        };
        run();
        return () => {
            cancelled = true;
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return { output, done };
}

function PhotoFrame({ src, name }) {
    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

    return (
        <div style={{ flexShrink: 0 }}>
            <div
                className="mono"
                style={{ color: COLORS.textDim, fontSize: 11, marginBottom: 8, textAlign: "center" }}
            >
        // profile.jpg
            </div>
            <div
                style={{
                    position: "relative",
                    width: 152,
                    height: 152,
                    borderRadius: 10,
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.surface,
                    overflow: "hidden",
                }}
            >
                {/* corner accents */}
                <span style={{ position: "absolute", top: -1, left: -1, width: 14, height: 14, borderTop: `2px solid ${COLORS.green}`, borderLeft: `2px solid ${COLORS.green}`, borderRadius: "10px 0 0 0", zIndex: 2 }} />
                <span style={{ position: "absolute", bottom: -1, right: -1, width: 14, height: 14, borderBottom: `2px solid ${COLORS.green}`, borderRight: `2px solid ${COLORS.green}`, borderRadius: "0 0 10px 0", zIndex: 2 }} />

                {src ? (
                    <img
                        src={src}
                        alt={name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                ) : (
                    <div
                        className="mono"
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 34,
                            fontWeight: 700,
                            color: COLORS.greenDim,
                            background:
                                "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 8px, transparent 8px, transparent 16px)",
                        }}
                    >
                        {initials || <User size={40} color={COLORS.greenDim} />}
                    </div>
                )}
            </div>
        </div>
    );
}

function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => {
                navigator.clipboard?.writeText(text).catch(() => { });
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            }}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                border: `1px solid ${COLORS.border}`,
                color: copied ? COLORS.green : COLORS.textMuted,
                borderRadius: 6,
                padding: "6px 10px",
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = COLORS.borderLight)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
        >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "copiado" : "copiar"}
        </button>
    );
}

function NavDot() {
    return (
        <span
            style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: COLORS.green,
                boxShadow: `0 0 8px ${COLORS.green}`,
                display: "inline-block",
                marginRight: 8,
            }}
        />
    );
}

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState("hero");
    const [menuOpen, setMenuOpen] = useState(false);

    const heroLines = [
        `$ whoami`,
        `${ME.name} — ${ME.role}`,
        `$ cat bio.txt`,
        ME.bio,
    ];
    const { output, done } = useTypewriter(heroLines, 22, 400);

    const navItems = [
        { id: "hero", label: "~", icon: Terminal },
        { id: "sobre", label: "sobre", icon: User },
        { id: "projetos", label: "projetos", icon: Folder },
        { id: "contato", label: "contato", icon: Send },
    ];

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    return (
        <div
            style={{
                background: COLORS.bg,
                color: COLORS.text,
                minHeight: "100vh",
                fontFamily: "'Inter', -apple-system, sans-serif",
                backgroundImage:
                    "radial-gradient(circle at 20% 0%, rgba(62,207,110,0.06), transparent 40%), radial-gradient(circle at 80% 50%, rgba(62,207,110,0.04), transparent 40%)",
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .fade-up { animation: fadeUp 0.7s ease both; }
        @keyframes fadeUp { from { opacity:0; transform: translateY(14px);} to { opacity:1; transform: translateY(0);} }
        .blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .project-card { transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease; }
        .project-card:hover { border-color: ${COLORS.borderLight}; transform: translateY(-2px); background: ${COLORS.surfaceHover}; }
        .nav-link { transition: color 0.15s ease; }
        .nav-link:hover { color: ${COLORS.green} !important; }
        .icon-btn { transition: border-color 0.15s ease, color 0.15s ease; }
        .icon-btn:hover { border-color: ${COLORS.green}; color: ${COLORS.green} !important; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${COLORS.green}; outline-offset: 2px; }
        ::selection { background: ${COLORS.greenGlow}; }
        @media (prefers-reduced-motion: reduce) {
          .fade-up { animation: none; }
          .blink { animation: none; }
        }
      `}</style>

            {/* ===== NAV ===== */}
            <nav
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    background: "rgba(11,13,12,0.85)",
                    backdropFilter: "blur(10px)",
                    borderBottom: `1px solid ${COLORS.border}`,
                }}
            >
                <div
                    style={{
                        maxWidth: 960,
                        margin: "0 auto",
                        padding: "14px 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <button
                        onClick={() => scrollTo("hero")}
                        className="mono nav-link"
                        style={{ background: "none", border: "none", color: COLORS.text, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center" }}
                    >
                        <NavDot />
                        {ME.name.toLowerCase().replace(/\s+/g, "-")}
                    </button>

                    <div style={{ display: "flex", gap: 28 }} className="mono">
                        {navItems.slice(1).map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className="nav-link"
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: COLORS.textMuted,
                                    fontSize: 13,
                                    cursor: "pointer",
                                    display: window.innerWidth < 640 ? "none" : "block",
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* ===== HERO ===== */}
            <section
                id="hero"
                style={{
                    maxWidth: 760,
                    margin: "0 auto",
                    padding: "90px 24px 70px",
                }}
            >
                <div
                    style={{
                        background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 10,
                        overflow: "hidden",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                    }}
                >
                    {/* terminal titlebar */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "12px 16px",
                            borderBottom: `1px solid ${COLORS.border}`,
                            background: "rgba(255,255,255,0.02)",
                        }}
                    >
                        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#3a3f3b" }} />
                        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#3a3f3b" }} />
                        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#3a3f3b" }} />
                        <span className="mono" style={{ color: COLORS.textDim, fontSize: 12, marginLeft: 8 }}>
                            zsh — 80x24
                        </span>
                    </div>

                    <div className="mono" style={{ padding: "24px", fontSize: 14, lineHeight: 1.9, minHeight: 170 }}>
                        <div>
                            <span style={{ color: COLORS.green }}>❯</span>{" "}
                            <span style={{ color: COLORS.text }}>{output[0]}</span>
                        </div>
                        {output[0] === heroLines[0] && (
                            <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 20, margin: "10px 0 14px" }}>
                                {output[1]}
                                {output[1] !== undefined && output[1].length < heroLines[1].length && (
                                    <span className="blink" style={{ color: COLORS.green }}>▍</span>
                                )}
                            </div>
                        )}
                        {output[1] === heroLines[1] && (
                            <div style={{ marginTop: 18 }}>
                                <span style={{ color: COLORS.green }}>❯</span>{" "}
                                <span style={{ color: COLORS.text }}>{output[2]}</span>
                            </div>
                        )}
                        {output[2] === heroLines[2] && (
                            <div style={{ color: COLORS.textMuted, marginTop: 6, maxWidth: 560 }}>
                                {output[3]}
                                {done ? null : <span className="blink" style={{ color: COLORS.green }}>▍</span>}
                            </div>
                        )}
                        {done && <span className="blink" style={{ color: COLORS.green }}>▍</span>}
                    </div>
                </div>

                {done && (
                    <div className="fade-up" style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
                        <button
                            onClick={() => scrollTo("projetos")}
                            style={{
                                background: COLORS.green,
                                color: "#06140B",
                                border: "none",
                                borderRadius: 6,
                                padding: "10px 18px",
                                fontFamily: "'JetBrains Mono', monospace",
                                fontWeight: 600,
                                fontSize: 13,
                                cursor: "pointer",
                            }}
                        >
                            ver projetos →
                        </button>
                        <button
                            onClick={() => scrollTo("contato")}
                            className="icon-btn"
                            style={{
                                background: "transparent",
                                color: COLORS.textMuted,
                                border: `1px solid ${COLORS.border}`,
                                borderRadius: 6,
                                padding: "10px 18px",
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 13,
                                cursor: "pointer",
                            }}
                        >
                            entrar em contato
                        </button>
                    </div>
                )}
            </section>

            {/* ===== SOBRE ===== */}
            <section id="sobre" style={{ maxWidth: 760, margin: "0 auto", padding: "50px 24px" }}>
                <SectionLabel icon={User} text="sobre" />
                <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap" }}>
                    <PhotoFrame src={ME.photo} name={ME.name} />
                    <p style={{ fontSize: 17, lineHeight: 1.75, color: COLORS.text, maxWidth: 460, flex: 1, minWidth: 240 }}>
                        {ME.bio} Atualmente baseado em <span style={{ color: COLORS.green }}>{ME.location}</span>.
                    </p>
                </div>

                <div style={{ marginTop: 28 }}>
                    <div className="mono" style={{ color: COLORS.textDim, fontSize: 12, marginBottom: 10 }}>
            // stack.json
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {ME.stack.map((tech) => (
                            <span
                                key={tech}
                                className="mono"
                                style={{
                                    border: `1px solid ${COLORS.border}`,
                                    background: COLORS.surface,
                                    color: COLORS.textMuted,
                                    borderRadius: 5,
                                    padding: "5px 11px",
                                    fontSize: 12.5,
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROJETOS ===== */}
            <section id="projetos" style={{ maxWidth: 760, margin: "0 auto", padding: "50px 24px" }}>
                <SectionLabel icon={Folder} text="projetos" />
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {PROJECTS.map((p) => (
                        <a
                            key={p.name}
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card"
                            style={{
                                display: "block",
                                textDecoration: "none",
                                color: "inherit",
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                borderRadius: 8,
                                padding: "20px 22px",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span className="mono" style={{ color: COLORS.green, fontWeight: 600, fontSize: 15 }}>
                                        {p.name}
                                    </span>
                                    <ExternalLink size={13} color={COLORS.textDim} />
                                </div>
                                <span
                                    className="mono"
                                    style={{
                                        fontSize: 11,
                                        color: p.status === "produção" ? COLORS.green : COLORS.textMuted,
                                        border: `1px solid ${p.status === "produção" ? COLORS.greenDim : COLORS.border}`,
                                        borderRadius: 4,
                                        padding: "2px 8px",
                                    }}
                                >
                                    {p.status}
                                </span>
                            </div>

                            <p style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.6, margin: "10px 0 14px", maxWidth: 580 }}>
                                {p.description}
                            </p>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                    {p.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="mono"
                                            style={{ fontSize: 11, color: COLORS.textDim, border: `1px solid ${COLORS.border}`, borderRadius: 4, padding: "2px 7px" }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <span className="mono" style={{ fontSize: 12 }}>
                                    <span style={{ color: COLORS.green }}>+{p.stats.added}</span>{" "}
                                    <span style={{ color: "#C0645A" }}>-{p.stats.removed}</span>
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* ===== CONTATO ===== */}
            <section id="contato" style={{ maxWidth: 760, margin: "0 auto", padding: "50px 24px 90px" }}>
                <SectionLabel icon={Send} text="contato" />
                <p style={{ color: COLORS.textMuted, fontSize: 15, maxWidth: 480, marginBottom: 24 }}>
                    Aberto a novas oportunidades e conversas sobre projetos. A forma mais rápida de falar comigo é por e-mail.
                </p>

                <div
                    style={{
                        background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 8,
                        padding: "18px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 12,
                        marginBottom: 20,
                    }}
                >
                    <span className="mono" style={{ fontSize: 14, color: COLORS.text }}>
                        <span style={{ color: COLORS.textDim }}>$</span> echo {ME.email}
                    </span>
                    <div style={{ display: "flex", gap: 8 }}>
                        <CopyButton text={ME.email} />
                        <a
                            href={`mailto:${ME.email}`}
                            className="icon-btn"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                border: `1px solid ${COLORS.border}`,
                                color: COLORS.textMuted,
                                borderRadius: 6,
                                padding: "6px 10px",
                                fontSize: 12,
                                fontFamily: "'JetBrains Mono', monospace",
                                textDecoration: "none",
                            }}
                        >
                            <Mail size={13} /> escrever
                        </a>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                    <SocialLink href={ME.github} icon={Github} label="github" />
                    <SocialLink href={ME.linkedin} icon={Linkedin} label="linkedin" />
                </div>
            </section>

            <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "24px", textAlign: "center" }}>
                <span className="mono" style={{ color: COLORS.textDim, fontSize: 12 }}>
                    © {new Date().getFullYear()} {ME.name} — feito com React
                </span>
            </footer>
        </div>
    );
}

function SectionLabel({ icon: Icon, text }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <Icon size={15} color={COLORS.green} />
            <span className="mono" style={{ color: COLORS.green, fontSize: 13, letterSpacing: 0.5 }}>
                ./{text}
            </span>
            <div style={{ flex: 1, height: 1, background: COLORS.border }} />
        </div>
    );
}

function SocialLink({ href, icon: Icon, label }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn mono"
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.textMuted,
                borderRadius: 6,
                padding: "8px 14px",
                fontSize: 13,
                textDecoration: "none",
            }}
        >
            <Icon size={14} /> {label}
        </a>
    );
}
