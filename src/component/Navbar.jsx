import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "../style/Navbar.css";
import foto from "../assets/img/perfil.jpg";

const NAV_LINKS = ["Home", "Projects", "Skills", "CV", "Services", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className="nav">
      <div className="nav__logo">
        <div className="nav__diamond" />
        <span className="nav__brand"></span>
      </div>

      <div className="nav__links">
        {NAV_LINKS.map(link => (
  <a key={link} href={`#${link.toLowerCase()}`} className="nav__link">{link}</a>
))}
      </div>

      <div className="nav__actions">
        <button className="nav__icon-btn" aria-label="Search">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        <button className="nav__icon-btn" aria-label="Dark mode">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <button
          className="nav__avatar"
          onClick={() => setOpen(true)}
          aria-label="Ver foto de perfil"
        >
          <img src={foto} alt="Ivandy Casaya" />
        </button>
      </div>

      {open &&
        createPortal(
          <div className="lightbox" onClick={() => setOpen(false)}>
            <div className="lightbox__frame" onClick={(e) => e.stopPropagation()}>
              <img src={foto} alt="Ivandy Casaya" />
              <button
                className="lightbox__close"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
              >
                X
              </button>
            </div>
          </div>,
          document.body
        )}
    </nav>
  );
}