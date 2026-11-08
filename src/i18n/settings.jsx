import { createContext, useContext, useEffect, useState } from "react";
import { EN } from "./translations";

const SettingsContext = createContext(null);

// Lee un valor guardado en el navegador (idioma o tema)
const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* sin acceso a localStorage: no pasa nada */
  }
};

export function SettingsProvider({ children }) {
  const [lang, setLang] = useState(() => read("lang", "es"));
  const [theme, setTheme] = useState(() => read("theme", "dark"));

  useEffect(() => {
    document.documentElement.lang = lang;
    save("lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    save("theme", theme);
  }, [theme]);

  // t("texto en español") devuelve el texto en el idioma activo
  const t = (text) => (lang === "en" ? EN[text] ?? text : text);

  const value = {
    lang,
    theme,
    t,
    toggleLang: () => setLang((l) => (l === "es" ? "en" : "es")),
    toggleTheme: () => setTheme((m) => (m === "dark" ? "light" : "dark")),
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  return useContext(SettingsContext);
}
