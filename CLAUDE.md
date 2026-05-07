# Project Overview


Build a lightweight web application. This guide is instructions to get Claude Code to behave the way I want.
Each feature does one thing, the code is easy to follow, and the app is easy to run locally and deploy.


---


# Design
You are a senior UI designer and frontend developer. Build premium, modern, elegant interfaces. Use subtle animations, proper spacing, and visual hierarchy. No emoji icons. No generic gradients.
Claude Code to behave the way I want. Each feature does one thing, the code is easy to follow, and the app is easy to run locally and deploy.




# Development Rules


**Rule 1: Always read first**
Before taking any action, always read:
- `CLAUDE.md`
- `project_specs.md`


If either file doesn't exist, create it before doing anything else.


**Rule 2: Define before you build**
Before writing any code:
1. Create or update `project_specs.md` and define:
  - What the app does and who uses it
  - Tech stack (framework, database, auth, hosting)
  - Pages and user flows (public vs authenticated)
  - Data models and where data is stored
  - Third-party services being used (Stripe, Supabase, etc.)
  - What "done" looks like for this task
2. Show the file
3. Wait for approval


No code should be written before this file is approved.


**Rule 3: Look before you create**
Always look at existing files before creating new ones. Don't start building until you understand what's being asked. If anything is unclear, ask before starting.


**Rule 4: Test before you respond**
After making any code changes, run the relevant tests or start the dev server to check for errors before responding. Never say "done" if the code is untested.


**Rule 5: Plan design changes before coding**
For any visual design change: list the files to be changed, describe the outcome in one sentence, and wait for approval before writing code.


**Core Rule**
Do exactly what is asked. Nothing more, nothing less. If something is unclear, ask before starting.


**Rule 6: Explain the plan before starting**
Before making changes, briefly explain the plan and wait for approval.

The plan must include:
- What will be changed
- Which files are likely to be changed
- What will not be changed
- Any risks, assumptions, or unclear points

Keep the plan short. The goal is to prevent Claude Code from doing extra work, touching unrelated files, or building something different from what was requested.

Do not start editing, creating, deleting, installing packages, or running migrations until the plan is approved, unless the user explicitly says to proceed without approval.


---


# How to Respond


## Topic: Plan Before Work Starts

When the user asks Claude Code to do something, Claude Code must explain the plan before starting. This protects the project from accidental changes.

The plan should be short and practical:
- Goal: what the user asked for
- Files: which files Claude Code expects to touch
- Approach: how Claude Code will do it
- Boundaries: what Claude Code will not change
- Approval: ask the user to approve before any changes are made

Example:
```text
Plan before I start:
I will update the pricing section only. I expect to change app/page.tsx and components/pricing-card.tsx. I will not touch authentication, database code, or global styling. If this looks right, approve and I will continue.
```


Always explain like you're talking to a 15 year old with no coding background.


For every response, include:
- **What I just did** — plain English, no jargon
- **What you need to do** — step by step, assume they've never seen this before
- **Why** — one sentence explaining what it does or why it matters
- **Next step** — one clear action
- **Errors** — if something went wrong, explain it simply and say exactly how to fix it


When a task involves external tools or technical elements that a non-coder wouldn’t know (Supabase, Vercel, Stripe, localhost:3000, etc.):
- Walk through exactly where to find what they need (e.g. "go to your Supabase dashboard → Settings → API")
- Describe what each key or setting does in one plain sentence
- If there's SQL to run, explain what it's doing before they run it
- If there's a bucket, folder, or config to create manually, explain what it is and why it exists
- Be as concise as possible. Do not ramble. Less is more


---


# Tech Stack


- **Language:** TypeScript
- **Framework:** Next.js@latest (App Router. Website must be built in Next.js - do not build a static HTML site unless explicitly asked.
- **Backend-as-a-Service:** Supabase (Auth, Postgres, Storage, RLS)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS
- **Key libraries:** `@supabase/supabase-js`, `@supabase/ssr`


---


# MCP Tools

Use MCP tools when they make the work safer, faster, or more accurate. Do not use an MCP just because it exists. Explain when a tool is being used and why, in plain English.

## shadcn/ui MCP

Use the shadcn/ui MCP when working with UI components, blocks, forms, cards, dialogs, navigation, dashboards, tables, or other interface building blocks.

Rules:
- Prefer existing shadcn/ui components before building custom UI from scratch.
- Use it to search, inspect, and install components from the relevant registry.
- Keep components clean, accessible, and consistent with the current project style.
- Do not overwrite existing component customizations without explaining the change first.
- After installing or changing components, check the affected files and run the relevant build/test command.

## Magic MCP

Use Magic MCP when the task is visual, design-heavy, or needs a polished frontend component quickly.

Good use cases:
- Landing page sections
- Hero sections
- Pricing sections
- Feature cards
- Dashboards
- Empty states
- Onboarding screens
- Modern component variations

Rules:
- Use Magic MCP for inspiration or component generation, but still adapt the result to this project.
- Do not paste in a design blindly. Match the existing tech stack, Tailwind setup, spacing, typography, and brand direction.
- Keep the code simple and readable.
- Remove unnecessary dependencies or effects.
- Make sure the result works with Next.js App Router and TypeScript.

## Playwright MCP

Use Playwright MCP when a change needs browser verification.

Good use cases:
- Testing pages after visual changes
- Checking forms and buttons
- Verifying navigation
- Confirming responsive layouts
- Catching console errors
- Testing login/logout flows when auth is involved
- Checking that a page actually works in the browser before saying it is done

Rules:
- Prefer Playwright MCP for real browser checks instead of only guessing from code.
- Use it after starting the dev server when practical.
- Check the happy path and the obvious error path.
- Report what was tested and what was not tested.
- Never claim the browser was tested if Playwright MCP or a manual browser check was not actually run.


---


# Running the Project


1. Ensure `.env.local` has all necessary keys
2. Install dependencies: `npm install`
3. Run: `npm run dev`
4. Open your browser at `http://localhost:3000`


---


# File Structure


- `/app` → All the pages your users actually see
- `/app/api/` → The behind-the-scenes code that handles data (saving, fetching, etc.)
- `/app/(admin)/` → Pages only the employer can see (dashboard, jobs, reviewing candidates)
- `/app/interview/[token]/` → The page candidates land on when they click their invite link
- `/components/` → Reusable building blocks (buttons, cards, forms) used across pages
- `/lib/` → Shared helper code used throughout the app
- `/lib/supabase/` → The code that connects the app to your Supabase database
- `/supabase/` → The instructions that set up your database tables
- `/public/` → Images and other static files
- `.env.local` → Your secret keys — never share or commit this to GitHub
- `project_specs.md` → The blueprint Claude reads before doing anything




**Code organisation rules:**
- Keep API routes thin — call a service or lib function, don't put business logic in the route handler
- One component per file; co-locate page-specific components with the page
- Supabase server client (SSR) for server components and API routes; browser client only in client components
- Don't create new top-level folders without asking first


---


# How the App Is Built


Think of the app like a series of requests and responses:


1. A user visits a page or clicks a button — that's the **input**
2. A route or server action receives the request and calls the right service
3. The service does **one job** and returns a result
4. The route sends the result back to the user — that's the **output**
5. If something fails, show a clear error — don't silently break


---


# How to Write Code


- Write simple, readable code — clarity matters more than cleverness
- Make one change at a time
- Don't change code that isn't related to the current task
- Don't over-engineer — build exactly what's needed, nothing more
- Add a `console.log` at the start and end of each API route so it's easy to follow what's happening


If a big structural change is needed, explain why before making it.


---


# Supabase Rules


- Always use RLS — never disable it
- Server-side Supabase client for all sensitive operations (API routes, server components)
- Candidate operations go through API routes so RLS doesn't need to expose candidate rows publicly
- Signed URLs for all video access — never make the storage bucket public
- Never expose the `service_role` key in client-side code


---


# Secrets & Safety


- Never put API keys or passwords directly in the code
- Never commit `.env.local` to GitHub
- Never expose Supabase `service_role` key in frontend code
- Ask before deleting or renaming any important files


---


# Testing


Before marking any task as done:
- Run `npm run build` and fix any TypeScript or build errors
- Start the dev server with `npm run dev` and check for runtime errors in the console
- Manually verify the feature works end-to-end in the browser
- Check that existing features weren't broken by the change


When building a new page or API route:
- Test the happy path (everything works as expected)
- Test the error path (what happens if something goes wrong)
- Check that auth is working — logged-in vs logged-out behaviour
- Confirm Supabase RLS is doing what it should (data is scoped correctly per user)


Never say "done" if:
- The build is failing
- There are console errors
- The feature hasn't been tested in the browser


---


# Pattern: Scroll-Driven Image Sequence Animation

Use this pattern when a page needs a premium scroll-controlled hero animation where the visual changes frame-by-frame as the user scrolls. This is often used for product launches, restaurants, portfolios, landing pages, and cinematic brand sections.

This pattern must stay project-agnostic. Do not hard-code project names, component paths, brand colors, section names, or frame counts. Claude Code must adapt the filenames, folders, styling, copy, and layout to the current project after reading `CLAUDE.md`, `project_specs.md`, and the existing files.

## When to use it

Use this pattern when:
- The animation is important to the page experience.
- The video is short, usually 3–10 seconds.
- The page should feel premium, cinematic, and controlled by scroll.
- The first frame and final frame both look good as still images.

Do not use this pattern when:
- A normal autoplay background video is enough.
- The asset is long, heavy, or not visually important.
- The user needs fast content-first loading more than cinematic animation.
- The user has requested a very simple page.

## Core rule

Do not drive a `<video>` element with `video.currentTime` on scroll unless there is a strong reason and it has been tested on real devices. Seeking inside a compressed video can feel delayed or choppy because the browser must jump between encoded video frames.

For the smooth Apple-style effect, use:

**pre-extracted image frames + `<canvas>` + `requestAnimationFrame`**

The browser loads and decodes the frames once, then the canvas draws the right frame when scroll progress changes. This usually feels smoother than repeatedly seeking a video.

## Recommended implementation

### Step 1 — Decide the asset strategy

Before coding, define this in `project_specs.md`:
- Where the source video lives.
- Where extracted frames should be stored, for example `public/scroll-sequence/[section-name]/`.
- The expected frame count.
- Whether the canvas is only for the hero or continues as a fixed background behind later sections.
- The mobile fallback.
- The reduced-motion fallback.
- The target payload budget.

Good default budgets:
- Premium hero: keep the frame sequence around 10–25 MB when possible.
- Mobile: use fewer frames, smaller images, or a static fallback.
- Long pages: avoid loading multiple heavy frame sequences at once.

### Step 2 — Extract frames with ffmpeg

Install ffmpeg if it is not already installed.

Windows:
```bash
winget install --id=Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements --silent
```

macOS:
```bash
brew install ffmpeg
```

Check the source video:
```bash
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration,r_frame_rate,nb_frames -of default=noprint_wrappers=1 path/to/source-video.mp4
```

Extract frames. Start with JPEG for photographic footage:
```bash
mkdir -p public/scroll-sequence/hero
ffmpeg -i path/to/source-video.mp4 -vf fps=24 -q:v 4 public/scroll-sequence/hero/frame%04d.jpg -y
```

Use these rules:
- Use `fps=24` as a good default for smooth scroll-controlled motion.
- Use `fps=12` or `fps=15` for mobile or subtle motion.
- Use `-q:v 3` for higher quality and larger files.
- Use `-q:v 5` for smaller files.
- Keep names predictable: `frame0001.jpg`, `frame0002.jpg`, etc.
- Use WebP or AVIF only if the project already supports and tests those formats well.

### Step 3 — Build a reusable client component

Create a generic component instead of a one-off project-specific component.

Suggested component API:
```tsx
<ScrollImageSequence
  frameCount={120}
  framePath={(index) => `/scroll-sequence/hero/frame${String(index + 1).padStart(4, "0")}.jpg`}
  className="fixed inset-0 -z-10"
  scrollTargetRef={containerRef}
  reducedMotionFrame="last"
/>
```

Implementation requirements:
- The component must be a Client Component with `"use client"`.
- Use a `<canvas>` for rendering frames.
- Use `requestAnimationFrame` for drawing so visual updates line up with browser repaint.
- Preload images into a ref so the same decoded images are reused.
- Prefer `HTMLImageElement.decode()` when available so frames are ready before drawing.
- Draw only when the frame index changes.
- Cancel pending animation frames on unmount.
- Handle `resize` and `devicePixelRatio` so the canvas stays sharp.
- Use manual `object-fit: cover` math when drawing into canvas.
- Keep the component reusable: no hard-coded section names, colors, copy, or frame totals.

### Step 4 — Connect scroll progress

Use the simplest scroll source that fits the project.

For Framer Motion projects:
- Use `useScroll` with a container ref.
- Use `offset: ["start start", "end end"]` when the sequence should last for the full scroll container.
- Convert progress from `0 → 1` into a frame index.

For projects without Framer Motion:
- Use `window.scrollY`, `getBoundingClientRect()`, and `requestAnimationFrame`.
- Do not add heavy work directly inside the scroll event.
- The scroll event should only schedule a render, not do all drawing work immediately.

Good default layout:
```tsx
<section ref={containerRef} className="relative min-h-[300vh]">
  <ScrollImageSequence ... />
  <div className="sticky top-0 flex min-h-screen items-center">
    {/* hero content */}
  </div>
</section>
```

### Step 5 — Decide hero-only vs fixed background

Use **hero-only** when the animation is only needed above the fold:
- Canvas can be `absolute inset-0` or `sticky top-0 h-screen`.
- Later sections can use their own backgrounds.

Use **fixed background** when the final frame should blend into the rest of the page:
- Canvas can be `fixed inset-0` with a safe z-index behind content.
- Later sections should use translucent overlays instead of unrelated background images.
- Text cards must still have enough contrast to be readable.
- Once scroll progress reaches `1`, keep showing the final frame.

Do not force the fixed-background version into every project. Choose it only when it improves the design.

## Accessibility and UX requirements

Always support reduced motion:
- Check `prefers-reduced-motion`.
- Show a static first frame, final frame, or normal image instead of scroll animation.
- Do not make important information depend only on motion.

Always support mobile:
- Test on a real phone when possible.
- Use fewer/smaller frames on mobile if the sequence is heavy.
- If `position: fixed` flickers on mobile, use a hero-only canvas or static fallback.
- Avoid blocking the first meaningful content while loading a huge sequence.

Always protect readability:
- Add overlays when text sits over busy frames.
- Keep text panels solid or semi-solid.
- Make sure the design still works on the brightest and darkest frames.

## Performance rules

Claude Code must keep the animation smooth and avoid page jank:
- Do not preload frames lazily if the first scroll would stutter.
- Do not decode the same image repeatedly.
- Do not update React state for every scroll frame.
- Do not do expensive layout reads and writes in the same scroll tick.
- Do not animate layout-heavy properties when opacity or transform would work.
- Use `requestAnimationFrame` for visual updates.
- Break up heavy loading work so the page does not freeze.
- Draw only the current frame, not every frame.
- Measure the final result in the browser before saying it is done.

## Claude Code workflow for this pattern

Before writing code:
1. Read `CLAUDE.md`, `project_specs.md`, and the existing files.
2. Add the animation plan to `project_specs.md`.
3. Explain which files will change and why.
4. Wait for approval.

When coding:
1. Create a reusable scroll image sequence component.
2. Add or document the frame extraction command.
3. Wire the component into the correct page or section.
4. Add reduced-motion and mobile fallback behavior.
5. Keep all names generic unless the current project clearly needs specific names.

Before responding:
1. Run `npm run build`.
2. Run `npm run dev` if practical and check the page.
3. Report exactly what was tested.
4. If the animation was not tested on a real mobile device, say that clearly.

## Common mistakes to avoid

- Do not copy paths from another project.
- Do not reference old demo components that do not exist in the current repo.
- Do not hard-code `TOTAL_FRAMES` inside a component if it should be passed as a prop.
- Do not assume every project uses Framer Motion.
- Do not make the whole page wait for 30 MB of images before showing any content.
- Do not hide text contrast problems with a beautiful but unreadable background.
- Do not say the animation is smooth until it has been tested in the browser.


---


# Scope


Only build what is described in `project_specs.md`.
If anything is unclear, ask before starting.
