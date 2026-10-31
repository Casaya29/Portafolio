import "../style/Footer.css";
import { contact } from "../data/portafolio";

const NAV_LINKS = ["Home", "Projects", "Skills", "CV", "Services", "Contact"];

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = contact.socials.filter((s) => s.url && s.id !== "email");

  return (
    <footer className="footer">
      <nav className="footer__nav" aria-label="Secciones">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={link === "Home" ? "#" : `#${link.toLowerCase()}`}
            className="footer__link"
          >
            {link}
          </a>
        ))}
      </nav>

      <div className="footer__bottom">
        <p className="footer__copy">
          © {year} Ivandy Casaya. Todos los derechos reservados.
        </p>

        {socials.length > 0 && (
          <nav className="footer__socials" aria-label="Redes sociales">
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