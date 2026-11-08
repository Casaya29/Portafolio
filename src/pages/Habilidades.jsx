import "../style/Habilidades.css";
import { projects, skillGroups } from "../data/portafolio";
import TypeText from "../component/TypeText";

const levelLabel = (p) =>
  p < 35 ? "Principiante" : p < 60 ? "Intermedio" : p < 85 ? "Avanzado" : "Experto";

function withProjects(skill) {
  const used = projects.filter((p) => p.tags.includes(skill.id));
  return {
    ...skill,
    used,
    percent: Math.min(100, skill.base + used.length * 8),
  };
}

function SkillCard({ skill, type }) {
  const s = withProjects(skill);
  const title = s.used.length
    ? "Usado en: " + s.used.map((p) => p.title).join(", ")
    : "Aún sin proyectos";

  return (
    <div className="skill-card" title={title}>
      {type === "cards" && <span className="skill-card__icon">{s.icon}</span>}
      <div className="skill-card__body">
        <h4 className="skill-card__name">{s.name}</h4>
        <p className="skill-card__level">{levelLabel(s.percent)}</p>

        {type === "bars" && (
          <div className="skill-bar">
            <div className="skill-bar__fill" style={{ width: `${s.percent}%` }} />
          </div>
        )}

        {s.used.length > 0 && (
          <p className="skill-card__projects">
            {s.used.length} {s.used.length === 1 ? "proyecto" : "proyectos"}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Habilidades() {
  return (
    <section className="skills" id="skills">
<TypeText as="h2" className="skills__title" text="Mis Skills" speed={60} glitch />
<TypeText
  as="p"
  className="skills__sub"
  text="Tecnologías y herramientas que he usado en mis proyectos."
  speed={20}
  delay={700}
/>

      {skillGroups.map((group) => (
        <div key={group.title} className="skills__group">
          <h3 className="skills__group-title">{group.title}</h3>
          <div className="skills__grid">
            {group.items.map((skill) => (
              <SkillCard key={skill.id} skill={skill} type={group.type} />
            ))}
          </div>
        </div>
      ))}

     
    </section>
  );
}