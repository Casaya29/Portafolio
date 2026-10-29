// Tu CV va en /public. Cambia el nombre si lo renombras.
export const CV_URL = "/CV_Ivandy_Casaya.pdf";

// Cada proyecto que agregues aquí sube las skills automáticamente.
// Los "tags" deben coincidir con el "id" de una skill.
export const projects = [
  {
    title: "Página web KM Ingeniería",
    year: 2025,
    description:
      "Diseño y desarrollo del front-end y back-end de una página web para un profesional de Arquitectura e Ingeniería.",
    tags: ["javascript", "sqlserver"],
    repo: "", // ejemplo: "https://github.com/tuusuario/km-ingenieria"
    demo: "", // ejemplo: "https://kmingenieria.com"
  },
  {
    title: "Mininos UCA (front-end)",
    year: 2022,
    description:
      "Colaboré en el front-end, en la documentación del proyecto y en el soporte de mantenimiento.",
    tags: ["javascript"],
    repo: "",
    demo: "",
  },
  {
    title: "Portafolio personal",
    year: 2026,
    description: "Este portafolio, con estilo pixelado, hecho con React y Vite.",
    tags: ["javascript", "vscode"],
    repo: "",
    demo: "",
  },
];

// base = nivel de partida (0-100). Cada proyecto que use la skill suma +8.
export const skillGroups = [
  {
    title: "Lenguajes de programación",
    type: "bars",
    items: [
      { id: "javascript", name: "JavaScript", base: 50 },
      { id: "java", name: "Java", base: 50 },
      { id: "cpp", name: "C++", base: 40 },
      { id: "csharp", name: "C#", base: 40 },
      { id: "python", name: "Python", base: 40 },
      { id: "kotlin", name: "Kotlin", base: 30 },
    ],
  },
  {
    title: "Software y bases de datos",
    type: "cards",
    items: [
      { id: "vs", name: "Visual Studio", icon: "▣", base: 50 },
      { id: "vscode", name: "Visual Studio Code", icon: "</>", base: 60 },
      { id: "netbeans", name: "Apache NetBeans", icon: "◆", base: 45 },
      { id: "android", name: "Android Studio", icon: "⚡", base: 35 },
      { id: "sqlserver", name: "SQL Server", icon: "≡", base: 45 },
      { id: "mysql", name: "MySQL Server", icon: "≡", base: 45 },
      { id: "oracle", name: "Oracle Database", icon: "≡", base: 35 },
    ],
  },
  {
    title: "Habilidades blandas",
    type: "cards",
    items: [
      { id: "equipo", name: "Trabajo en equipo", icon: "☻", base: 70 },
      { id: "analisis", name: "Investigación y análisis", icon: "◎", base: 65 },
    ],
  },
];

// ── Sección de CV: experiencia, educación y logros ──
export const cv = {
  experience: [
    {
      role: "Diseño de página web",
      org: "KM Ingeniería, Managua",
      period: "Septiembre 2025",
      description:
        "Diseñé y desarrollé el front-end y el back-end de una página web para un profesional que ofrece servicios de Arquitectura e Ingeniería.",
    },
    {
      role: "Desarrollador",
      org: "Universidad Centroamericana, Managua",
      period: "2022",
      description:
        "Colaboré en la elaboración del front-end de mininos UCA, en la documentación del proyecto y di seguimiento al soporte de mantenimiento.",
    },
  ],
  education: [
    {
      role: "Ingeniería en Sistemas y Computación",
      org: "Universidad Tecnológica de El Salvador (UTEC)",
      period: "Actual",
    },
    {
      role: "Ingeniería Informática",
      org: "Universidad Centroamericana, José Simeón Cañas, El Salvador",
      period: "2023 - Actual",
    },
    {
      role: "Ingeniería en Sistemas de Información",
      org: "Universidad Centroamericana, Managua, Nicaragua",
      period: "2021 - 2023",
    },
  ],
  // Escribe aquí tus logros reales (premios, certificados, etc.).
  // Si la lista está vacía, la sección "Logros" no se muestra.
  achievements: [
    // "Certificado de ... en ...",
  ],
};

// ── Contacto ──
// Si dejas una url vacía (""), ese botón no se muestra.
export const contact = {
  email: "samuelcasaya17@gmail.com",
 web3formsKey: "1a668068-05cb-4b77-b1f5-1d785b944550",
  socials: [
    { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/in/ivandycasayamora/" }, // ej: "https://www.linkedin.com/in/tuusuario"
    { id: "github", name: "GitHub", url: "https://github.com/Casaya29" },     // ej: "https://github.com/tuusuario"
    { id: "email", name: "Correo", url: "mailto:samuelcasaya17@gmail.com" },
  ],
};

// ── Servicios ──
// "icon" puede ser: code, wrench, file
export const services = [
  {
    id: "web",
    icon: "code",
    title: "Desarrollo web",
    description:
      "Diseño y desarrollo de páginas web completas, con front-end y back-end, para profesionales y pequeños negocios.",
  },
  {
    id: "soporte",
    icon: "wrench",
    title: "Soporte y mantenimiento",
    description:
      "Seguimiento, correcciones y mejoras de sitios y sistemas ya existentes para que sigan funcionando bien.",
  },
  {
    id: "docs",
    icon: "file",
    title: "Documentación de proyectos",
    description:
      "Documentación clara de tu proyecto de software: cómo funciona, cómo se instala y cómo se mantiene.",
  },
];