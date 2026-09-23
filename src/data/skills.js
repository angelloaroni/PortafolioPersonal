// "level" (1 a 5) es una autoevaluación: ajústala a tu gusto.
export const stats = [
  {
    title: 'Conocimiento',
    group: 'Lenguajes',
    level: 4,
    icon: 'code',
    flavor: 'La base: con esto piensa el resto del stack.',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Kotlin', 'C++', 'HTML', 'CSS'],
  },
  {
    title: 'Destreza',
    group: 'Frameworks y librerías',
    level: 4,
    icon: 'wrench',
    flavor: 'Con lo que construyo cosas que sí abren en el navegador.',
    items: ['React', 'Node.js', 'Android Studio', 'Jetpack Compose', 'Prisma'],
  },
  {
    title: 'Técnica',
    group: 'Herramientas y bases de datos',
    level: 4,
    icon: 'server',
    flavor: 'Donde vive la data y no se pierde (casi nunca).',
    items: ['PostgreSQL', 'MySQL', 'Docker', 'Git', 'Vercel'],
  },
  {
    title: 'Agallas',
    group: 'Seguridad',
    level: 3,
    icon: 'shield',
    flavor: 'Pensar como quien quiere romper lo que armaste.',
    items: ['Fundamentos de ethical hacking', 'Wireshark', 'Burp Suite', 'Parcheo de vulnerabilidades en APIs'],
  },
  {
    title: 'Encanto',
    group: 'Idiomas',
    level: 4,
    icon: 'chat',
    flavor: 'Para explicar los bugs sin que suene a excusa.',
    items: ['Español (nativo)', 'Inglés B2 (Cambridge)'],
  },
];

// Nivel (1-5) -> rango, para que se lea como una ficha de personaje.
export const RANKS = { 1: 'D', 2: 'C', 3: 'B', 4: 'A', 5: 'S' };

export const marquee = [
  'React', 'Node.js', 'Kotlin', 'Jetpack Compose', 'PostgreSQL', 'Docker',
  'TypeScript', 'Prisma', 'C++', 'Ethical hacking',
];
