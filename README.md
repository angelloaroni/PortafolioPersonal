# Portafolio personal (estilo Persona 5)

Portafolio de Hubert Angello Aroni Yauri hecho con **React + Vite**, JavaScript y CSS puro.
Incluye 3 minijuegos, transiciones de página, efectos de sonido opcionales y un easter egg.

## Empezar

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # genera /dist
npm run preview  # prueba la build local
```

Requiere Node.js 18 o superior.

## Estructura

```
portafolio-p5/
├── index.html                # fuentes de Google y metadatos
├── vite.config.js
├── public/favicon.svg
└── src/
    ├── main.jsx              # punto de entrada
    ├── App.jsx               # carga, navegación, Konami
    ├── data/                 # TODO EL CONTENIDO SE EDITA AQUÍ
    │   ├── profile.js        # datos personales, redes y menú
    │   ├── skills.js         # stats (stack) y cinta del hero
    │   ├── projects.js       # proyectos
    │   ├── history.js        # estudios, experiencia y certificaciones
    │   └── quiz.js           # preguntas de la Sala de terciopelo
    ├── components/
    │   ├── Ransom.jsx        # texto estilo recorte de revista
    │   ├── Menu, Hero, About, Stats, Projects, Log, Arcade, Contact
    │   ├── Loader, Wipe, Steal   # carga, transición, easter egg
    │   └── games/            # MemoryGame, ShadowHunt, Quiz
    ├── context/SfxContext.jsx    # sonidos con Web Audio (sin archivos)
    ├── hooks/                # useKonami, useActiveSection, useLocalBest
    └── styles/               # global, overlays, menu, hero, sections, arcade
```

## Personalizar

- **Contenido:** edita los archivos de `src/data/`. No hace falta tocar los componentes.
- **Repositorios:** en `projects.js`, pon la URL en `repo`. Si queda vacío, el botón lleva a tu perfil de GitHub.
- **Niveles de las stats:** en `skills.js`, `level` va de 1 a 5 y es una autoevaluación. Ajústalo.
- **Teléfono:** no se muestra a propósito. Si lo quieres, agrégalo en `profile.js` y en `Contact.jsx`.
- **Colores:** variables al inicio de `src/styles/global.css` (`--red`, `--ink`, etc.).

## Minijuegos

1. **Memoria de tarot:** 8 pares de tecnologías, gana quien use menos movimientos.
2. **Caza de sombras:** 30 segundos, sombras negras suman y aliados blancos restan.
3. **Sala de terciopelo:** quiz de 8 preguntas con rango final (C a S).

Los récords se guardan en `localStorage`. Easter egg: código Konami (↑ ↑ ↓ ↓ ← → ← → B A).

## Despliegue en Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. En Vercel: **Add New > Project**, elige el repo. Detecta Vite solo.
3. Deploy. No necesita variables de entorno.

## Créditos

Diseño inspirado en la estética de Persona 5 como proyecto de fan sin fines comerciales.
No usa logos, imágenes ni fuentes oficiales de Atlus/SEGA. Tipografías: Anton, Barlow Condensed y
Permanent Marker (Google Fonts).
