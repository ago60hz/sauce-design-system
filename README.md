> **Sauce Design System** — forked from [elevenlabs/ui](https://github.com/elevenlabs/ui)
> at commit `23c31bd` (MIT, © Eleven Labs Inc.; see [LICENSE.md](LICENSE.md)).
> The first commit in this repo is an unmodified copy; later commits are local changes.
>
> **Run locally**
>
> ```bash
> pnpm install
> cp apps/www/.env.example apps/www/.env.local
> pnpm --filter=www dev          # docs + component previews at http://localhost:4000
> pnpm --filter=www registry:build  # regenerates apps/www/public/r/*.json
> ```
>
> Component source lives in `apps/www/registry/elevenlabs-ui/`.
>
> **Deploy (Vercel)**
>
> Import the repo at vercel.com/new, set **Root Directory** to `apps/www`, and deploy. No environment
> variables are required; the site URL falls back to the Vercel address. Every push redeploys.
>
> **Style playground** (`/playground` on the deployed site, source in `playground/index.html`)
>
> Edit colors (light and dark), font and corner radius against live component previews, then commit
> the result to `apps/www/styles/tokens.css`. Every color, radius and font token lives in that file.
>
> - To save, click the GitHub icon in the playground and paste a fine-grained token with access to this
>   repo only and **Contents: Read and write**. The token stays in your browser.
> - Each save is a commit, so Vercel redeploys the docs site with the new tokens a minute or two later.
> - After changing components, run `pnpm --filter=www playground:build` to refresh the previews.
>
> **Still pointing at ElevenLabs infrastructure** (change before shipping under your own brand):
> - `ui/orb.tsx` loads its texture from ElevenLabs' CDN (`storage.googleapis.com/eleven-public-cdn`).
> - Blocks in `registry/__index__.tsx` declare dependencies on `https://ui.elevenlabs.io/r/*.json`.
> - Voice-agent and transcription blocks need an ElevenLabs API key / agent ID (paid ElevenLabs usage).
> - Logos, name and links (`lib/config.ts`, `public/`) are ElevenLabs trademarks. The MIT license covers the code, not the brand.

![elevenlabs-ui](https://github.com/user-attachments/assets/a5b73bfc-b0a3-4b4e-8915-f90a086c5723)

# II ElevenLabs UI

[ElevenLabs UI](https://ui.elevenlabs.io) is a component library built on top of [shadcn/ui](https://ui.shadcn.com/) to help you build audio & agentic applications faster.

## Overview

ElevenLabs UI provides pre-built, customizable React components specifically designed for agent & audio applications, including orbs, waveforms, voice agents, audio players, and more. 
The CLI makes it easy to add these components to your Next.js project.

## Installation
You can use the ElevenLabs Agents CLI directly with npx, or install it globally:
```bash
# Use directly (recommended)
npx @elevenlabs/cli@latest components add <component-name>

# Or using shadcn cli
npx shadcn@latest add https://ui.elevenlabs.io/r/all.json
```

## Prerequisites
Before using ElevenLabs UI, ensure your Next.js project meets these requirements:
- **Node.js 18** or later
- **shadcn/ui** initialized in your project (npx shadcn@latest init)
- **Tailwind CSS** configured

## Usage

### Install All Components
Install all available ElevenLabs UI components at once:
```bash
npx @elevenlabs/cli@latest components add all
```
This command will:
- Set up shadcn/ui if not already configured
- Install all ElevenLabs UI components to your configured components directory
- Add necessary dependencies to your project

### Install Specific Components
Install individual components using the `components add` command:
```bash
npx @elevenlabs/cli@latest components add <component-name>
```
Examples:
```bash
# Install the orb component
npx @elevenlabs/cli@latest components add orb
```

### Alternative: Use with shadcn/ui CLI

You can also install components using the standard shadcn/ui CLI:
```bash
# Install all components
npx shadcn@latest add https://ui.elevenlabs.io/r/all.json

# Install a specific component
npx shadcn@latest add https://ui.elevenlabs.io/r/orb.json
```

All available components can be found [here](https://ui.elevenlabs.io/docs/components) or explore a list of example components [here](https://ui.elevenlabs.io/blocks).

## Contributing

If you'd like to contribute to ElevenLabs UI, please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes to the components in the registry.
4. Open a PR to the main branch.

Please read the [contributing guide](/CONTRIBUTING.md).

## License

Licensed under the [MIT license](https://github.com/elevenlabs/ui/blob/main/LICENSE.md).

Engineered by [ElevenLabs](https://elevenlabs.io).
