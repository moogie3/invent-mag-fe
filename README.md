# Invent-MAG Frontend

The marketing and authentication frontend for [Invent-MAG](https://github.com/moogie3/invent-mag) — an enterprise ERP SaaS platform for inventory, sales, purchasing, CRM, and accounting.

Built with **Astro 5**, **Tailwind CSS 4**, and **Alpine.js**.

## Tech Stack

- **Astro 5** — Static-first web framework
- **Tailwind CSS 4** — Utility-first styling
- **Alpine.js 3** — Lightweight interactivity
- **TypeScript** — Type safety (strict mode)
- **astro-seo** — SEO metadata & OpenGraph

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Clone & install
git clone https://github.com/moogie3/invent-mag-fe.git
cd invent-mag-fe
npm install

# Start dev server
npm run dev
# → http://localhost:4321
```

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production → `dist/`   |
| `npm run preview` | Preview production build locally |

## Project Structure

```
src/
├── components/         # 13 Astro components (Hero, Pricing, Nav, etc.)
├── layouts/            # BaseLayout with SEO config
├── pages/              # index, login, signup, pricing
└── styles/             # Design tokens & utility classes
public/
├── icons/              # SVG icon set
└── js/                 # Client-side scripts (modal, registration)
```

## Pages

| Route      | Description                         |
| ---------- | ----------------------------------- |
| `/`        | Landing page (features, stats, CTA) |
| `/login`   | User login                          |
| `/signup`  | Tenant registration                 |
| `/pricing` | Pricing plans                       |

## Customization

Design tokens are in `src/styles/global.css`:

```css
@theme {
  --color-dark: #0d121c;
  --color-primary: #b692f6;
  --color-light: #f2f4f7;
  --font-sans: "Manrope", system-ui, sans-serif;
  --font-heading: "Outfit", system-ui, sans-serif;
}
```

## Deployment

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, Cloudflare Pages, or any static hosting provider. See [Astro deployment docs](https://docs.astro.build/en/guides/deploy/).

## Related

- **Backend:** [invent-mag](https://github.com/moogie3/invent-mag) — Laravel 11 API & admin panel

## License

MIT — see [LICENSE](LICENSE) for details.
