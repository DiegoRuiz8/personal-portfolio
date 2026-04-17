# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Type-check with tsc, then build for production
npm run lint      # Run ESLint on all TS/TSX files
npm run preview   # Serve the production build locally
```

There are no tests in this project.

## Architecture

Single-page portfolio site built with React 19 + TypeScript + Vite + Tailwind CSS v4.

**All UI lives in one file: `src/App.tsx`.** There are no separate component files — the entire page (hero, projects, about, contact, lightbox modal) is rendered from a single default export. The `projects` array and `links` object are defined inline within the component.

**Styling** is done exclusively with Tailwind utility classes applied inline on JSX elements. `src/App.css` contains leftover scaffolding from the Vite template and is not used by the current UI. `src/index.css` handles global base styles. Tailwind is integrated via the `@tailwindcss/vite` plugin — there is no `tailwind.config.js`.

**Assets** are imported directly into `App.tsx` and used as `src` values for `<img>` tags. Project screenshots live in `src/assets/`. The resume PDF (`CVRuizDiego_portfolio.pdf`) is served from `public/` and referenced as `/CVRuizDiego_portfolio.pdf`.

**The only runtime state** is `selectedImage: string | null` — used to drive a fullscreen lightbox overlay when a project screenshot is clicked.

To add a new project, add an object to the `projects` array in `App.tsx`, import its screenshot assets, and place the images in `src/assets/`.
