# Good Transformer - Knowledge Index

This folder is the structured reference for AI agents, developers, and designers working on this project.

Every file here describes one specific area of the project. Start with `AGENTS.md` at the root, then navigate here for detail.

If files disagree, use this priority order:

1. `AGENTS.md` and current user instructions
2. Live source code for the area you are editing
3. The relevant `knowledge/` topic file
4. General references such as `README.md` or `COLOURS.md`

When you find a stale knowledge note, update it as part of the change rather than copying the stale pattern forward.

When searching for files, ignore generated/vendor/local scratch folders unless the task is specifically about them: `node_modules/`, `.next/`, `out/`, `.git/`, `GTM research/`, and `Vision Doc/`.

---

## Contents

### Brand
- `brand/brand-tokens.json` - all colour, font, and spacing tokens as machine-readable JSON
- `brand/visual-rules.md` - how to apply the visual system correctly
- `brand/copy-voice.md` - tone of voice, vocabulary, writing rules
- `brand/logo-usage.md` - logo treatments, file locations, sizing

### Site
- `site/architecture.md` - stack, structure, build and deploy overview
- `site/routing.md` - all pages, paths, and what each one does

### Components
- `components/component-library.md` - every React component with props and usage
- `components/css-patterns.md` - Tailwind utilities and custom CSS patterns

### Content
- `content/site-content-guide.md` - how `site-content.ts` works; where to find and edit all copy

### Services
- `services/offers.md` - both service lines fully documented

### Development
- `dev/dev-setup.md` - local dev environment, commands, tooling
- `dev/tailwind-config.md` - Tailwind theme extensions
- `dev/globals-css.md` - CSS custom properties and component classes

### Operations
- `ops/deployment.md` - GitHub Actions deploy pipeline
- `ops/env-vars.md` - all environment variables

### Assets
- `assets/asset-guide.md` - public assets: images, logos, client logos
