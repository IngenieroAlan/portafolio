# AGENTS.md

## Cursor Cloud specific instructions

### Product

Single-page React 19 + Vite 8 portfolio (`portafolio`). No backend, database, or Docker. End-to-end testing only needs the Vite dev server (or `preview` after a build).

### Commands

See `package.json` scripts:

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` (port **5173**, bind `0.0.0.0` in Cloud: `pnpm dev --host 0.0.0.0`) |
| Lint | `pnpm lint` |
| Build | `pnpm build` |
| Production preview | `pnpm build && pnpm preview` |

There is **no** `test` script in this repo.

### Lint caveat

`pnpm lint` runs ESLint on the whole tree, including `.agents/skills/**` templates. As of setup, lint may fail on files under `.agents/` and on `src/hooks/use-typewriter.ts` (`react-hooks/set-state-in-effect`). `pnpm build` (tsc + vite) is the reliable compile check for app code.

### Running the dev server

Use a **tmux** session so the server survives between commands, e.g. session name `vite-dev-server`:

```bash
tmux -f /exec-daemon/tmux.portal.conf new-session -d -s vite-dev-server -c /workspace -- zsh -l
tmux -f /exec-daemon/tmux.portal.conf send-keys -t vite-dev-server:0.0 'pnpm dev --host 0.0.0.0' C-m
```

Verify: `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5173/` should return `200`.

### Hello-world E2E check

1. Open `http://127.0.0.1:5173/`
2. Use the header language switcher (EN ↔ ES) and confirm nav/hero strings change (e.g. PROJECTS ↔ PROYECTOS)
3. Scroll to **Projects** and **Contact** sections

Core functionality is static content + i18n; the contact form does not submit to a backend.
