import "../style/Cv.css";
import { cv, CV_URL } from "../data/portafolio";

function Group({ title, items }) {
  return (
    <div className="cv__group">
      <h3 className="cv__group-title">{title}</h3>
      <ul className="cv__list">
        {items.map((item) => (
          <li key={item.role + item.period} className="cv__item">
            <span className="cv__dot" />
            <h4 className="cv__role">{item.role}</h4>
            <p className="cv__meta">
              {item.org} | {item.period}
            </p>
            {item.description && <p className="cv__desc">{item.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Curriculum() {
  return (
    <section className="cv" id="cv">
      <h2 className="cv__title">Mi Trayectoria</h2>
      <p className="cv__sub">
        Un resumen de mi experiencia y educación. Para ver el detalle, descarga el CV completo.
      </p>

      <Group title="Experiencia" items={cv.experience} />
      <Group title="Educación" items={cv.education} />

      {cv.achievements.length > 0 && (
        <div className="cv__group">
          <h3 className="cv__group-title">Logros</h3>
          <ul className="cv__achievements">
            {cv.achievements.map((a) => (
              <li key={a}>
                <span className="cv__star">★</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="cv__download">
        <a className="cv__btn" href={CV_URL} download>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 3v12m0 0l-5-5m5 5l5-5M4 21h16" />
          </svg>
          Descargar CV completo (PDF)
        </a>
      </div>
    </section>
  );
}