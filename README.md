# gayashankariyawasam.github.io

Personal portfolio for **Gayashan Kariyawasam** — Tech Lead & AI Engineer at Codegen International.

Live at <https://gayashankariyawasam.github.io>.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript, static export)
- [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP + ScrollTrigger](https://gsap.com) for scroll-driven sequences
- [Motion](https://motion.dev) for component-level animation
- [Three.js + React Three Fiber + drei](https://r3f.docs.pmnd.rs) for the hero scene
- [Lenis](https://lenis.darkroom.engineering) for smooth scroll
- [lucide-react](https://lucide.dev) for icons
- Hosted on **GitHub Pages** via GitHub Actions

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → out/
```

## Deploy

Push to `main` — the workflow at `.github/workflows/deploy.yml` builds and deploys to GitHub Pages automatically.

## Editing content

All editable copy lives in `src/data/`:

- `profile.ts` — name, role, bio, socials
- `experience.ts` — timeline entries
- `projects.ts` — selected work cards
- `research.ts` — papers and newsletter
- `stack.ts` — tech stack rows

## License

© Gayashan Kariyawasam. Code is MIT, content is reserved.
