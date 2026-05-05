# project_specs.md

## What this is

A single-page cinematic site for the album **"Halden | The Album"** by **ZKRUTREKKERZIDD**. Functions as a digital album experience — not a typical landing page. All copy in Norwegian.

## Who uses it

Listeners and fans landing on the artist's promotional URL. Goal: communicate the album exists, show the tracklist, and route them to SoundCloud.

## Tech stack

- **Language:** TypeScript
- **Build tool:** Vite (`@vitejs/plugin-react`)
- **Framework:** React 18
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Hosting:** Vercel (static, no server runtime needed)
- **Backend:** none. No DB, no auth, no API routes, no third-party services beyond an outbound SoundCloud link.

> Note: this overrides CLAUDE.md's Next.js default per the user's explicit "TECH STACK (STRICT)" instruction in the build brief.

## Pages and user flows

One page (`/`), three scroll-driven sections:

1. **Hero** — full-bleed B&W portrait + gothic blackletter title "Halden | The Album" layered in front of the subject.
2. **Tracklist Experience** — pinned scroll stage. A spinning vinyl exits left, the album poster fades in, then the 7 tracks stagger in as styled list rows.
3. **Story** — full-bleed album poster with slow Ken Burns zoom + poetic Norwegian copy fading in line by line.

Plus a fixed minimal liquid-glass nav pill at the top with the artist wordmark and a "Lytt på SoundCloud" link.

## Data models

None. The tracklist is hard-coded in `Tracklist.tsx`:

```ts
const tracks = [
  "Du kan ta meg ut av Halden, men",
  "Rægg City",
  "Don't You Worry Halden",
  "Saigon & Hæng",
  "Hannestad minnestund",
  "Ræggens Romeo & Juliet",
  "Farvel, Tigerstaden",
];
```

## Where data is stored

Nowhere — all content is static in source code. Images are in `public/images/`.

## Third-party services

- **Google Fonts:** Instrument Serif + UnifrakturCook (loaded via `@import` in CSS).
- **SoundCloud:** outbound link only. No embed, no API.

## Definition of done

- `npm run dev` runs without console errors.
- All three sections animate smoothly at 60fps on a modern laptop.
- The hero title sits visibly in front of the subject's hand (depth layering works).
- Vinyl spins, exits, poster fades in, tracklist staggers in — all reversible on scroll-up.
- Story section: copy fades in line by line, background poster has subtle Ken Burns zoom.
- All copy is in Norwegian.
- B&W only. No color, no emoji, no generic gradients.
- `npm run build` completes with no TypeScript errors.
- Mobile (375px width) renders without horizontal scroll; title scales down responsively.
- Respects `prefers-reduced-motion` (animations collapse to instant fades).
