# snappr-react

The Snappr frontend: a React 18 + TypeScript single-page app built with [Vite](https://vitejs.dev/).

See the [root README](../README.md) for full documentation of how the system works (webcam capture, saving, storage, and user association).

## Scripts

```bash
npm install     # install dependencies
npm run dev     # start the Vite dev server on http://localhost:5173
npm run build   # type-check (tsc) + production build to dist/
npm run preview # serve the production build locally
npm test        # run tests with Vitest (watch mode; use `npx vitest run` for one-shot)
```

The app expects the Rails API to be running on `http://localhost:3001`.

## Structure

- `index.html` — Vite entry HTML (loads `src/index.tsx` and `public/stickerbomb.min.js`)
- `src/index.tsx` — React 18 `createRoot` entry point
- `src/App.tsx` — routing (React Router 5) and global auth state
- `src/components/` — UI components (`Create`, `Gallery`, `ShowDestroy`, `Landing`, navs, `Auth/`)
- `src/types/` — shared model interfaces and module declaration stubs for untyped dependencies
- `public/` — static assets served as-is (`stickerbomb.min.js`, `manifesto.json`)
