# 🧘 The Mindful EM

> Practical frameworks, systems, and deep dives for transitioning from engineer to engineering manager.

![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![MDX](https://img.shields.io/badge/Content-MDX-1B1F24?logo=mdx&logoColor=white)
![Node](https://img.shields.io/badge/Node-%E2%89%A520.3-339933?logo=nodedotjs&logoColor=white)
[![CI](https://github.com/vibhorsingh11/em-blueprints/actions/workflows/ci.yml/badge.svg)](https://github.com/vibhorsingh11/em-blueprints/actions/workflows/ci.yml)

A fast, static blog written by [Vibhor Singh](https://github.com/vibhorsingh11). It covers the move from engineer to engineering manager, plus a technical Resources section for system design and machine coding.

## ✨ What's inside

| Section                    | What you'll find                                                             |
| -------------------------- | ---------------------------------------------------------------------------- |
| 📝 **Blog**                | Long-form posts with series, tags, a table of contents, and reading progress |
| 📚 **Resources**           | Technical study tracks (System Design, Machine Coding)                       |
| 💌 **Newsletter**          | "The Sunday letter" signup form, wired to any provider                       |
| 🙋 **About**               | Who writes this and why                                                      |
| 📡 **RSS and sitemap**     | Generated automatically at build time                                        |
| 🌗 **Light and dark mode** | With syntax-highlighted code in both themes                                  |

## 🧰 Tech stack

- **[Astro 5](https://astro.build)** for static site generation
- **MDX** for content with embedded components
- **Tailwind CSS 4** with the typography plugin
- **Fraunces, Inter and JetBrains Mono** as self-hosted fonts
- **Prettier and cspell** for formatting and spell checking

## 🚀 Quick start

```bash
git clone https://github.com/vibhorsingh11/em-blueprints.git
cd em-blueprints
npm install
cp .env.example .env     # then fill in your newsletter URL
npm run dev              # http://localhost:4321
```

## 📜 Commands

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload      |
| `npm run build`   | Build the production site into `dist/`    |
| `npm run preview` | Serve the built site locally              |
| `npm run check`   | Type-check Astro and TypeScript files     |
| `npm run spell`   | Spell-check all blog and resource content |
| `npm run format`  | Format the repo with Prettier             |

## 🗂️ Project structure

```text
src/
├── components/        Reusable UI (header, cards, newsletter form)
│   └── mdx/           Components usable inside posts (e.g. Callout)
├── content/
│   ├── blog/          Blog posts (.mdx)
│   └── resources/     Study material, one folder per track
├── layouts/           Page and post layouts
├── pages/             Routes: blog, resources, series, tags, about, RSS
├── consts.ts          Site title, author, nav links, resource tracks
└── content.config.ts  Content schemas (frontmatter validation)
```

## ✍️ Writing content

### A new blog post

Create `src/content/blog/my-post.mdx`:

```mdx
---
title: 'A short, clear title' # max 70 characters
description: 'One-line summary.' # max 160 characters
pubDate: 2026-11-15
tags: ['career', 'fundamentals']
level: 'aspiring' # aspiring | new-em | experienced
series: 'Optional series name'
seriesOrder: 1
draft: false # true hides it from the site
---

Your content here.
```

### A new resource article

Add an `.mdx` file under `src/content/resources/<track>/`. The folder name must match a `slug` in `RESOURCE_TRACKS` in `src/consts.ts`. Remove `comingSoon` from that track once it has articles.

Frontmatter fields: `title`, `description`, `topic`, `order`, `pubDate`.

## 💌 Newsletter setup

The signup form is a plain HTML form. Point it at your provider (Buttondown, Beehiiv, Kit, MailerLite) by setting its form URL:

```bash
PUBLIC_NEWSLETTER_ACTION=https://your-provider.example/subscribe
```

`PUBLIC_` variables are baked in at build time, so rebuild after changing the value.

## 🔄 CI/CD

| Stage  | How                                                                                                                                            |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **CI** | GitHub Actions (`.github/workflows/ci.yml`) runs spell check, `astro check` and a full build on every pull request and every push to `main`    |
| **CD** | Deploy to a static host such as Cloudflare Pages connected to this repo. Pushes to `main` go to production, and pull requests get preview URLs |

**Host build settings:** build command `npm run build`, output directory `dist`, Node 22, plus the `PUBLIC_NEWSLETTER_ACTION` variable.

Before going live, set `SITE` in `astro.config.mjs` to your real URL so the sitemap, RSS feed and canonical links are correct.

## 🤝 Contributing

1. Create a branch from `main`.
2. Make your change and run `npm run spell && npm run check && npm run build`.
3. Open a pull request. CI must pass before merging.

## 📄 License

Released under the MIT License. See [LICENSE](LICENSE).
