import { useState } from "react";
import "../style/Proyectos.css";
import { projects, skillGroups } from "../data/portafolio";
import TypeText from "../component/TypeText";
import { useSettings } from "../i18n/settings";

const allSkills = skillGroups.flatMap((g) => g.items);

// Imagen del proyecto. Si no hay imagen (o no carga), muestra un recuadro con </>
function ProjectImage({ src, title }) {
  const { t } = useSettings();
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="project-card__media project-card__media--empty" aria-hidden="true">
        <span>{"</>"}</span>
      </div>
    );
  }

  return (
    <div className="project-card__media">
      <img
        src={src}
        alt={`${t("Captura de")} ${t(title)}`}
        width="640"
        height="400"
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

// Convierte el id ("javascript") en el nombre ("JavaScript")
const skillName = (id) => allSkills.find((s) => s.id === id)?.name ?? id;

export default function Proyectos() {
  const { t } = useSettings();
  const [filter, setFilter] = useState(null);

  // Solo se muestran como filtro las skills que algún proyecto usa
  const usedTags = [...new Set(projects.flatMap((p) => p.tags))];
  const visible = filter ? projects.filter((p) => p.tags.includes(filter)) : projects;

  return (
    <section className="projects" id="projects">
          <TypeText as="h2" className="projects__title" text={t("Mis Proyectos")} speed={60} glitch />
      <TypeText
        as="p"
        className="projects__sub"
        text={t("Cada proyecto está vinculado a las habilidades que usé en él.")}
        speed={20}
        delay={800}
      />

      {usedTags.length > 0 && (
        <div className="projects__filters">
          <button
            className={`chip ${filter === null ? "chip--active" : ""}`}
            onClick={() => setFilter(null)}
          >
            {t("Todos")}
          </button>
          {usedTags.map((tag) => (
            <button
              key={tag}
              className={`chip ${filter === tag ? "chip--active" : ""}`}
              onClick={() => setFilter(tag === filter ? null : tag)}
            >
              {t(skillName(tag))}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="projects__empty">{t("Aún no hay proyectos con esta habilidad.")}</p>
      ) : (
        <div className="projects__grid">
          {visible.map((p) => (
            <article key={p.title} className="project-card">
              <ProjectImage src={p.image} title={p.title} />

              <div className="project-card__head">
                <h3 className="project-card__title">{t(p.title)}</h3>
                {p.year && <span className="project-card__year">{p.year}</span>}
              </div>

              <p className="project-card__desc">{t(p.description)}</p>

              <div className="project-card__tags">
                {p.tags.map((tag) => (
                  <button
                    key={tag}
                    className="chip chip--small"
                    onClick={() => setFilter(tag)}
                  >
                    {t(skillName(tag))}
                  </button>
                ))}
              </div>

              {(p.repo || p.demo) && (
                <div className="project-card__links">
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${t("Código →")} ${t(p.title)}`}
                    >
                      {t("Código →")}
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${t("Ver demo →")} ${t(p.title)}`}
                    >
                      {t("Ver demo →")}
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}