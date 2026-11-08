import "../style/Footer.css";
import { contact } from "../data/portafolio";
import { useSettings } from "../i18n/settings";

const NAV_LINKS = [
  { id: "", label: "Inicio" },
  { id: "projects", label: "Proyectos" },
  { id: "skills", label: "Habilidades" },
  { id: "cv", label: "CV" },
  { id: "services", label: "Servicios" },
  { id: "contact", label: "Contacto" },
];

export default function Footer() {
  const { t } = useSettings();
  const year = new Date().getFullYear();
  const socials = contact.socials.filter((s) => s.url && s.id !== "email");

  return (
    <footer className="footer">
      <nav className="footer__nav" aria-label={t("Secciones")}>
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={`#${link.id}`} className="footer__link">
            {t(link.label)}
          </a>
        ))}
      </nav>

      <div className="footer__bottom">
        <p className="footer__copy">
          © {year} Ivandy Casaya. {t("Todos los derechos reservados.")}
        </p>

        {socials.length > 0 && (
          <nav className="footer__socials" aria-label={t("Redes sociales")}>
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                {s.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
