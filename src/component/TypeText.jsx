import { useState, useEffect, useRef } from "react";

function Cursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);
  return <span className={`cursor ${on ? "cursor--on" : "cursor--off"}`} />;
}

function GlitchText({ text }) {
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 3500 + Math.random() * 2000);
    return () => clearInterval(id);
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

// Texto que se escribe solo (con cursor) cuando aparece en pantalla.
// as: etiqueta ("h2", "p"), speed: ms por letra, delay: espera antes de empezar,
// glitch: efecto de glitch como el título del home.
export default function TypeText({
  as: Tag = "p",
  text,
  className = "",
  speed = 50,
  delay = 0,
  glitch = false,
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [displayed, setDisplayed] = useState("");

  // Detecta cuando el texto entra y sale de la pantalla
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Si la persona prefiere menos movimiento, se muestra el texto completo
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Escribe el texto letra por letra mientras está en pantalla
  useEffect(() => {
    if (!inView || reduceMotion) return;
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
      setDisplayed(""); // al salir de pantalla se reinicia
    };
  }, [inView, reduceMotion, text, speed, delay]);

  const shown = !inView ? "" : reduceMotion ? text : displayed;

  const done = shown.length === text.length;

  return (
    <Tag ref={ref} className={`${className} tw`}>
      {/* Texto completo solo para lectores de pantalla */}
      <span className="sr-only">{text}</span>
      {/* Texto invisible que reserva el espacio, para que la página no salte */}
      <span className="tw__ghost" aria-hidden="true">{text}</span>
      <span className="tw__live" aria-hidden="true">
        {glitch ? <GlitchText text={shown} /> : shown}
        {shown.length > 0 && !done && <Cursor />}
      </span>
    </Tag>
  );
}