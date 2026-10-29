import "../style/Footer.css";
import { contact } from "../data/portafolio";

export default function Footer() {
  const year = new Date().getFullYear();
  const links = contact.socials.filter((s) => s.url && s.id !== "email");

  return (
    <footer className="footer">
      <p className="footer__copy">
        © {year} Ivandy Casaya. Todos los derechos reservados.
      </p>

      {links.length > 0 && (
        <nav className="footer__links" aria-label="Redes sociales">
          {links.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
              {s.name}
            </a>
          ))}
        </nav>
      )}
    </footer>
  );
}