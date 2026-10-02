# Nuvex web

The Nuvex website. It does not read chain state and it does not submit transactions.

The protocol, the documentation site, and the off-chain services are separate repositories.

```bash
pnpm install
pnpm dev
```
The development server listens on port 3000. Optional public URLs are listed in `.env.example`.

## Layout

- `src/app/` — routes (App Router)
- `src/components/` — `layout/` (navbar, footer), `navigation/`, `buttons/`, `cards/`, `ui/`, `animations/`, and folders for page sections
- `src/data/` — navigation and content, kept apart from components
- `src/styles/globals.css` — design tokens and typography classes
- `docs/` — reference analysis and information architecture
