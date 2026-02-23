## NOCTURNE — Systems Engineer Portfolio

Hybrid tech/art portfolio landing page built with Next.js (App Router) and CSS Modules. Features a dark cyber grid background, interactive systems map, and concise sections for philosophy, ecosystem, principles, and tech stack.

### Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Project structure
- `app/page.tsx` — main page layout with hero, systems map, cards, and footer
- `app/page.module.css` — page-level styling and animations
- `app/globals.css` — design tokens (lime + charcoal), base typography

### Notes
- Animations respect `prefers-reduced-motion`.
- Fonts: Space Grotesk (display/body) and JetBrains Mono (mono accents).

### Scripts
- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — lint with Next.js ESLint config
