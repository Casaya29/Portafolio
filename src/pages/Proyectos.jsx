import { useState } from "react";
import "../style/Proyectos.css";
import { projects, skillGroups } from "../data/portafolio";

const allSkills = skillGroups.flatMap((g) => g.items);

// Convierte el id ("javascript") en el nombre ("JavaScript")
const skillName = (id) => allSkills.find((s) => s.id === id)?.name ?? id;

export default function Proyectos() {
  const [filter, setFilter] = useState(null);

  // Solo se muestran como filtro las skills que algún proyecto usa
  const usedTags = [...new Set(projects.flatMap((p) => p.tags))];
  const visible = filter ? projects.filter((p) => p.tags.includes(filter)) : projects;

  return (
    <section className="projects" id="projects">
      <h2 className="projects__title">Mis Proyectos</h2>
      <p className="projects__sub">
        Cada proyecto está vinculado a las habilidades que usé en él.
      </p>

      {usedTags.length > 0 && (
        <div className="projects__filters">
          <button
            className={`chip ${filter === null ? "chip--active" : ""}`}
            onClick={() => setFilter(null)}
          >
            Todos
          </button>
          {usedTags.map((tag) => (
            <button
              key={tag}
              className={`chip ${filter === tag ? "chip--active" : ""}`}
              onClick={() => setFilter(tag === filter ? null : tag)}
            >
              {skillName(tag)}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="projects__empty">Aún no hay proyectos con esta habilidad.</p>
      ) : (
        <div className="projects__grid">
          {visible.map((p) => (
            <article key={p.title} className="project-card">
              <div className="project-card__head">
                <h3 className="project-card__title">{p.title}</h3>
                {p.year && <span className="project-card__year">{p.year}</span>}
              </div>

              <p className="project-card__desc">{p.description}</p>

              <div className="project-card__tags">
                {p.tags.map((tag) => (
                  <button
                    key={tag}
                    className="chip chip--small"
                    onClick={() => setFilter(tag)}
                  >
                    {skillName(tag)}
                  </button>
                ))}
              </div>

              {(p.repo || p.demo) && (
                <div className="project-card__links">
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer">Código →</a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer">Ver demo →</a>
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