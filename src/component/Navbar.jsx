import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Clock from "./Clock";
import { useSettings } from "../i18n/settings";
import foto from "../assets/img/perfil.jpg";
import fotoMini from "../assets/img/perfil-mini.jpg";
import "../style/Navbar.css";

const NAV_LINKS = [
  { id: "", label: "Inicio" },
  { id: "projects", label: "Proyectos" },
  { id: "skills", label: "Habilidades" },
  { id: "cv", label: "CV" },
  { id: "services", label: "Servicios" },
  { id: "contact", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, theme, t, toggleLang, toggleTheme } = useSettings();

  // Cerrar la foto con Escape
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
        {NAV_LINKS.map((link) => (
          <a key={link.id} href={`#${link.id}`} className="nav__link">
            {t(link.label)}
          </a>
        ))}
      </div>

      <div className="nav__actions">
        <Clock />

        {/* Botón de idioma */}
        <button
          className="nav__lang"
          onClick={toggleLang}
          aria-label={t("Cambiar idioma")}
          title={t("Cambiar idioma")}
        >
          <span className={lang === "es" ? "is-active" : ""}>ES</span>
          <span>/</span>
          <span className={lang === "en" ? "is-active" : ""}>EN</span>
        </button>

        {/* Botón de modo claro / oscuro */}
        <button
          className="nav__icon-btn"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? t("Cambiar a modo claro") : t("Cambiar a modo oscuro")}
          title={theme === "dark" ? t("Cambiar a modo claro") : t("Cambiar a modo oscuro")}
        >
          {theme === "dark" ? (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>

        <button
          className="nav__avatar"
          onClick={() => setOpen(true)}
          aria-label={t("Ver foto de perfil")}
        >
          <img src={fotoMini} alt="Ivandy Casaya" width="34" height="34" />
        </button>
      </div>

      {open &&
        createPortal(
          <div className="lightbox" onClick={() => setOpen(false)}>
            <div className="lightbox__frame" onClick={(e) => e.stopPropagation()}>
              <img src={foto} alt="Ivandy Casaya" width="380" height="380" />
              <button
                className="lightbox__close"
                onClick={() => setOpen(false)}
                aria-label={t("Cerrar")}
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
