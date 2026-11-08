import { useState, useEffect } from "react";
import { useSettings } from "../i18n/settings";

const ICONS = {
  sunrise: (
    <>
      <path d="M17 18a5 5 0 0 0-10 0" />
      <line x1="12" y1="2" x2="12" y2="9" />
      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
      <line x1="1" y1="18" x2="3" y2="18" />
      <line x1="21" y1="18" x2="23" y2="18" />
      <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
      <line x1="23" y1="22" x2="1" y2="22" />
      <polyline points="8 6 12 2 16 6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </>
  ),
  sunset: (
    <>
      <path d="M17 18a5 5 0 0 0-10 0" />
      <line x1="12" y1="9" x2="12" y2="2" />
      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
      <line x1="1" y1="18" x2="3" y2="18" />
      <line x1="21" y1="18" x2="23" y2="18" />
      <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
      <line x1="23" y1="22" x2="1" y2="22" />
      <polyline points="16 5 12 9 8 5" />
    </>
  ),
  moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
};

// Momento del día según la hora (0-23)
function getPeriod(hour) {
  if (hour >= 5 && hour < 12) return { icon: "sunrise", label: "Mañana" };
  if (hour >= 12 && hour < 14) return { icon: "sun", label: "Mediodía" };
  if (hour >= 14 && hour < 19) return { icon: "sunset", label: "Tarde" };
  return { icon: "moon", label: "Noche" };
}

export default function Clock() {
  const { lang, t } = useSettings();
  const [now, setNow] = useState(() => new Date());

  // Actualiza la hora cada 30 segundos
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const period = getPeriod(now.getHours());
  const time = now.toLocaleTimeString(lang === "en" ? "en-US" : "es-NI", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: lang === "en" ? "h12" : "h23",
  });

  return (
    <div className="nav__clock" title={t(period.label)}>
      <svg
        width="16" height="16" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        viewBox="0 0 24 24" aria-hidden="true"
      >
        {ICONS[period.icon]}
      </svg>
      <span className="nav__time">{time}</span>
      <span className="nav__period">{t(period.label)}</span>
    </div>
  );
}
