import "../style/Cv.css";
import { cv, CV_URL } from "../data/portafolio";
import TypeText from "../component/TypeText";
import { useSettings } from "../i18n/settings";

function Group({ title, items }) {
  const { t } = useSettings();
  return (
    <div className="cv__group">
      <h3 className="cv__group-title">{t(title)}</h3>
      <ul className="cv__list">
        {items.map((item) => (
          <li key={item.role + item.period} className="cv__item">
            <span className="cv__dot" />
            <h4 className="cv__role">{t(item.role)}</h4>
            <p className="cv__meta">
              {t(item.org)} | {t(item.period)}
            </p>
            {item.description && <p className="cv__desc">{t(item.description)}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Curriculum() {
  const { t } = useSettings();
  return (
    <section className="cv" id="cv">
<TypeText as="h2" className="cv__title" text={t("Mi Trayectoria")} speed={60} glitch />
<TypeText
  as="p"
  className="cv__sub"
  text={t("Un resumen de mi experiencia y educación. Para ver el detalle, descarga el CV completo.")}
  speed={18}
  delay={900}
/>

      <Group title="Experiencia" items={cv.experience} />
      <Group title="Educación" items={cv.education} />

      {cv.achievements.length > 0 && (
        <div className="cv__group">
          <h3 className="cv__group-title">{t("Logros")}</h3>
          <ul className="cv__achievements">
            {cv.achievements.map((a) => (
              <li key={a}>
                <span className="cv__star">★</span>
                {t(a)}
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
          {t("Descargar CV completo (PDF)")}
        </a>
      </div>
    </section>
  );
}