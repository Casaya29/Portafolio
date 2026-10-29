import { useState, useEffect, useRef } from "react";
import "../style/Contacto.css";
import { contact } from "../data/portafolio";

const ICONS = {
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  github: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  ),
  email: (
    <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </>
  ),
};

export default function Contacto({ request }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const nameRef = useRef(null);

  // Cuando llega una solicitud desde Servicios, rellena el asunto y el mensaje
  const [lastRequest, setLastRequest] = useState(null);
  if (request && request !== lastRequest) {
    setLastRequest(request);
    setForm((f) => ({ ...f, subject: request.subject, message: request.message }));
  }

  // ...y deja el cursor en "Nombre" para que solo falten tus datos
  useEffect(() => {
    if (request) nameRef.current?.focus({ preventScroll: true });
  }, [request]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // idle = sin enviar, sending = enviando, success = enviado, error = falló
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contact.web3formsKey === "PEGA_AQUI_TU_CLAVE") {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: contact.web3formsKey,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          botcheck: "", // campo trampa contra bots: debe ir vacío
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const socials = contact.socials.filter((s) => s.url);

  return (
    <section className="contact" id="contact">
      <h2 className="contact__title">Contáctame</h2>
      <p className="contact__sub">
        Estoy abierto a hablar de nuevos proyectos, ideas u oportunidades.
        Escríbeme y te responderé lo antes posible.
      </p>

      <div className="contact__layout">
        <form className="contact__form" onSubmit={handleSubmit}>
          <label className="contact__label" htmlFor="name">Nombre</label>
          <input
            id="name" name="name" className="contact__input" ref={nameRef}
            placeholder="Tu nombre" value={form.name} onChange={handleChange} required
          />

          <label className="contact__label" htmlFor="email">Correo</label>
          <input
            id="email" name="email" type="email" className="contact__input"
            placeholder="Tu correo" value={form.email} onChange={handleChange} required
          />

          <label className="contact__label" htmlFor="subject">Asunto</label>
          <input
            id="subject" name="subject" className="contact__input"
            placeholder="Asunto" value={form.subject} onChange={handleChange} required
          />

          <label className="contact__label" htmlFor="message">Mensaje</label>
          <textarea
            id="message" name="message" rows="5" className="contact__input contact__textarea"
            placeholder="Tu mensaje" value={form.message} onChange={handleChange} required
          />

          <button type="submit" className="contact__send" disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>

          {status === "success" && (
            <p className="contact__msg contact__msg--ok" role="status">
              ¡Mensaje enviado! Te responderé pronto.
            </p>
          )}
          {status === "error" && (
            <p className="contact__msg contact__msg--error" role="alert">
              No se pudo enviar. Inténtalo de nuevo o escríbeme a {contact.email}.
            </p>
          )}
        </form>

        <div className="contact__side">
          <h3 className="contact__side-title">Conecta conmigo</h3>
          <p className="contact__side-sub">Encuéntrame en tus plataformas favoritas.</p>

          <div className="contact__socials">
            {socials.map((s) => (
              <a
                key={s.id}
                className="social-card"
                href={s.url}
                target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
              >
                <svg
                  width="20" height="20" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  {ICONS[s.id]}
                </svg>
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}