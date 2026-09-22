// Si un proyecto tiene repositorio propio, pon la URL en "repo".
// Si está vacío, el botón lleva a tu perfil de GitHub.
export const projects = [
  {
    id: 'objetos-perdidos',
    title: 'Aplicación web de objetos perdidos',
    context: 'Universidad de Lima',
    date: 'Julio 2026',
    category: 'Web',
    bullets: [
      'Plataforma full-stack de reporte y búsqueda de objetos perdidos, con roles de estudiante y administrador.',
      'Filtros por categoría y nombre, y notificaciones.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Vercel'],
    repo: '',
  },
  {
    id: 'eps-programa',
    title: 'EPS Programa',
    context: 'Aplicación Android de inspección de campo',
    date: 'Marzo 2026',
    category: 'Android',
    bullets: [
      'App Android con más de 8 pantallas para inspectores y verificadores en campo.',
      'Backend en Node.js, TypeScript y Prisma con PostgreSQL, sincronización de datos con corrutinas y cifrado AES-256.',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Node.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    repo: '',
  },
  {
    id: 'api-vulnerable',
    title: 'Detección y parcheo de vulnerabilidades en una API web',
    context: 'Práctica de ethical hacking',
    date: 'Junio 2026',
    category: 'Seguridad',
    bullets: [
      'Simulación de una API intencionalmente vulnerable para practicar ethical hacking.',
      'Detección y corrección de 4 vulnerabilidades (inyección SQL, man-in-the-middle, IDOR y DoS) con Wireshark y Burp Suite.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Wireshark', 'Burp Suite'],
    repo: '',
  },
  {
    id: 'fireworks-pfsp',
    title: 'Algoritmo de fuegos artificiales para Permutation Flow Shop Scheduling',
    context: 'Análisis y Diseño de Algoritmos',
    date: 'Julio 2026',
    category: 'Algoritmos',
    bullets: [
      'Fireworks Algorithm en C++ aplicado al problema PFSP.',
      'Comparado con un heurístico constructivo: mejor rendimiento en instancias grandes; el constructivo es más eficiente en instancias pequeñas.',
    ],
    stack: ['C++'],
    repo: '',
  },
  {
    id: 'docker-python',
    title: 'Contenerización de una aplicación Python con Docker',
    context: 'Sistemas Operativos, Universidad de Lima',
    date: 'Diciembre 2024',
    category: 'Docker',
    bullets: ['Contenerización de una aplicación desarrollada en Python usando Docker.'],
    stack: ['Python', 'Docker'],
    repo: '',
  },
];
