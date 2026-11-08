import "../style/Home.css";
import Navbar from "../component/Navbar";
import { useState, useEffect, useRef, useCallback } from "react";
import { projects } from "../data/portafolio";
import { useSettings } from "../i18n/settings";

function useTypewriter(text, speed = 60, startDelay = 0, trigger = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!trigger) {
      setDisplayed("");
      setDone(false);
      return;
    }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const startTimer = setTimeout(() => {
      const tick = () => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
          if (i <= text.length) {
            timeoutRef.current = setTimeout(tick, speed);
          } else {
            setDone(true);
          }
        }
      };
      tick();
    }, startDelay);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timeoutRef.current);
    };
  }, [text, speed, startDelay, trigger]);

  return { displayed, done };
}

function Cursor({ visible = true }) {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(interval);
  }, []);
  if (!visible) return null;
  return <span className={`cursor ${blink ? "cursor--on" : "cursor--off"}`} />;
}

function ScanlineOverlay() {
  return <div className="scanlines" />;
}

function GlitchText({ text }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    };
    const interval = setInterval(trigger, 3500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="glitch">
      {text}
      {glitching && (
        <>
          <span className="glitch__red">{text}</span>
          <span className="glitch__cyan">{text}</span>
        </>
      )}
    </span>
  );
}

function PixelGrid() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const COLS = 32;
    const ROWS = 20;
    const CW = W / COLS;
    const CH = H / ROWS;
    const cells = Array.from({ length: COLS * ROWS }, () => ({
      speed: 0.003 + Math.random() * 0.008,
      phase: Math.random() * Math.PI * 2,
    }));
    let frame = 0;
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      cells.forEach((cell, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const a = (Math.sin(frame * cell.speed + cell.phase) + 1) / 2;
        ctx.fillStyle = `rgba(0, 255, 157, ${a * 0.12})`;
        ctx.fillRect(col * CW + 1, row * CH + 1, CW - 2, CH - 2);
      });
      frame++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} width={640} height={400} className="pixel-grid" />;
}

function LightBeam() {
  return <div className="light-beam" />;
}

//Carta de presentacion
export default function PixelCraftHome() {
  const { t } = useSettings();

  // Estadísticas calculadas a partir de los proyectos
  const projectYears = projects.map((p) => p.year).filter(Boolean);
  const years = projectYears.length
    ? new Date().getFullYear() - Math.min(...projectYears)
    : 0;
  const stats = [
    [`${projects.length}+`, t("Proyectos")],
    [years < 1 ? "<1yr" : `${years}yr`, t("XP")],
    [`${new Set(projects.flatMap((p) => p.tags)).size}+`, t("Habilidades")],
  ];

  // Textos del hero en el idioma activo
  const hello = t("Hola, soy");
  const myName = "Ivandy Casaya";
  const subText = t(
    "estudiante de Ingeniería en Sistemas y desarrollador web. Me apasiona transformar ideas en soluciones digitales mediante código, diseño y tecnología. Explora mis proyectos y conoce mi experiencia en el desarrollo de aplicaciones web."
  );

  const [visible, setVisible] = useState(false);
  const heroRef = useRef(null);
  const observerRef = useRef(null);

  const restartAnimation = useCallback(() => {
    setVisible(false);
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) restartAnimation();
        });
      },
      { threshold: 0.4 }
    );
    if (heroRef.current) observerRef.current.observe(heroRef.current);
    return () => observerRef.current?.disconnect();
  }, [restartAnimation]);

  const title1 = useTypewriter(hello, 55, 400, visible);
  const title2 = useTypewriter(myName, 80, 400 + 55 * hello.length + 100, visible);

  const sub = useTypewriter(
    subText,
    28,
    400 + 55 * hello.length + 80 * myName.length + 300,
    visible
  );

  const subStarted = sub.displayed.length > 0;

  return (
    <div className="page">
      <Navbar />

      <section ref={heroRef} className="hero">
        <ScanlineOverlay />
        <PixelGrid />
        <LightBeam />

        <span className="corner corner--tl" />
        <span className="corner corner--tr" />
        <span className="corner corner--bl" />
        <span className="corner corner--br" />



        <div className="hero__content">
          <div className={`hero__badge ${visible ? "hero__badge--visible" : ""}`}>
            <span className="hero__badge-dot" />
            {t("Jugador Uno")}
          </div>

          <h1 className="hero__title">
            <GlitchText text={title1.displayed} />
            {!title1.done && <Cursor visible />}
            {title1.done && (
              <>
                <br />
                <span className="hero__title--green">
                  {title2.displayed}
                  {!title2.done && <Cursor visible />}
                </span>
              </>
            )}
          </h1>

          <p className="hero__sub">
            {sub.displayed}
            {subStarted && !sub.done && <Cursor visible />}
          </p>

          {sub.done && (
           <button
  className="explore-btn"
  onClick={() =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }
>
  {t("Explorar proyectos")}
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</button>
          )}

          {sub.done && (
          <div className="hero__stats">
  {stats.map(([val, label]) => (
    <div key={label} className="stat">
      <div className="stat__val">{val}</div>
      <div className="stat__label">{label}</div>
    </div>
  ))}
</div>
          )}
        </div>

        <div className="binary-rain">
          {Array.from({ length: 24 }, (_, i) => ["01","10","11","00"][i % 4]).map((bin, i, arr) => (
  <div
    key={i}
    className="binary-rain__row"
    style={{
      opacity: (arr.length - i) / arr.length,
      animationDuration: `${2 + (i % 12) * 0.3}s`,
      animationDelay: `${(i % 12) * 0.2}s`,
    }}
  >
    {bin}
  </div>
))}
        </div>
      </section>

      
    </div>
  );
}