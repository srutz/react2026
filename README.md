# React Example project

## Usage

```sh
npm install
npm run dev       # start dev server
npm run build     # typecheck + production build
npm run preview   # serve the production build
npm run lint      # eslint
npm run format    # prettier
```

React Compiler opt in/out: edit the `reactCompilerOptIn(filename)` callback in `vite.config.ts` (return `true` to compile a file). Single components can opt out with `"use no memo"`.

## Installed

- **Core:** React 19, TypeScript, Vite 8
- **React Compiler:** `babel-plugin-react-compiler` via `@vitejs/plugin-react` + `@rolldown/plugin-babel`
- **Styling/UI:** Tailwind CSS 4, shadcn (with `@base-ui/react`), `tw-animate-css`, `class-variance-authority`, `cn`, Geist font
- **Icons:** `lucide-react`, `react-icons`
- **Hooks:** `@uidotdev/usehooks`
- **Tooling:** ESLint (react-hooks, react-refresh, typescript-eslint), Prettier (+ organize-imports)
