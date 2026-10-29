import "../style/Servicios.css";
import { services } from "../data/portafolio";

const ICONS = {
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </>
  ),
};

export default function Servicios({ onSelect }){
  return (
    <section className="services" id="services">
      <h2 className="services__title">Servicios</h2>
      <p className="services__sub">
        Creando soluciones digitales a través de código y buen diseño.
      </p>

      <div className="services__list">
        {services.map((s) => (
          <article key={s.id} className="service-card">
            <div className="service-card__pill">
              <span className="service-card__icon">
                <svg
                  width="14" height="14" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  {ICONS[s.icon]}
                </svg>
              </span>
              {s.title}
            </div>

            <p className="service-card__desc">{s.description}</p>

                        <a
              className="service-card__btn"
              href="#contact"
              onClick={() =>
                onSelect?.({
                  subject: `Información sobre ${s.title}`,
                  message: `Hola, me interesa el servicio de "${s.title}". Me gustaría recibir más información.`,
                })
              }
            >
              Solicitar información
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}