export const quiz = [
  {
    q: '¿Qué hook de React ejecuta efectos secundarios después del renderizado?',
    options: ['useState', 'useEffect', 'useMemo', 'useRef'],
    answer: 1,
    why: 'useEffect corre después de pintar el componente: ideal para peticiones, suscripciones y timers.',
  },
  {
    q: 'Cambias el ID en la URL y ves datos de otro usuario. ¿Qué vulnerabilidad es?',
    options: ['XSS', 'CSRF', 'DoS', 'IDOR'],
    answer: 3,
    why: 'IDOR (referencia directa insegura a objetos): el servidor no comprueba que el recurso te pertenezca.',
  },
  {
    q: '¿Cuál es la defensa principal contra la inyección SQL?',
    options: ['Consultas parametrizadas', 'Ocultar los mensajes de error', 'Usar HTTP en lugar de HTTPS', 'Limitar el largo del input'],
    answer: 0,
    why: 'Con consultas parametrizadas el input nunca se interpreta como código SQL.',
  },
  {
    q: 'En Kotlin, ¿qué se usa para trabajo asíncrono ligero, como sincronizar datos?',
    options: ['Thread.sleep()', 'Callbacks anidados', 'Corrutinas', 'Cron jobs'],
    answer: 2,
    why: 'Las corrutinas suspenden sin bloquear el hilo principal y se leen como código secuencial.',
  },
  {
    q: '¿Qué herramienta permite interceptar y modificar peticiones HTTP al probar una API?',
    options: ['Burp Suite', 'Prisma', 'Vercel', 'Jetpack Compose'],
    answer: 0,
    why: 'Burp Suite actúa como proxy entre el navegador y el servidor para inspeccionar y alterar el tráfico.',
  },
  {
    q: '¿Qué es Prisma en un backend con Node.js y TypeScript?',
    options: ['Un servidor web', 'Un ORM', 'Un framework de UI', 'Un contenedor'],
    answer: 1,
    why: 'Prisma es un ORM: modela las tablas en un esquema y genera un cliente tipado para consultarlas.',
  },
  {
    q: '¿Qué archivo describe cómo construir una imagen de Docker?',
    options: ['package.json', '.gitignore', 'vite.config.js', 'Dockerfile'],
    answer: 3,
    why: 'El Dockerfile lista, paso a paso, la base, las dependencias y el comando de arranque de la imagen.',
  },
  {
    q: '¿Cuál es la complejidad de la búsqueda binaria en un arreglo ordenado?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    answer: 1,
    why: 'Cada comparación descarta la mitad de los elementos, así que el costo crece de forma logarítmica.',
  },
];
