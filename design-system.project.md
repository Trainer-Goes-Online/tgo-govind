# tgo-govind · skin override (Layer 3)

> Per-project skin for the Govind Das VSL landing page. Inherits the design brain
> (`/workspace/.claude/design-system.base.md`, concepts C1–C13, recipes R1–R12).
> Where this skin and a concept disagree, the concept wins.

## Register (locked by the copy v4)
Calm, rational, **founder-to-camera**. Science as proof. NO hype, NO exclamation
marks, NO guru / robes / mystical language. Premium, restrained. House rule: **no em dashes**;
eyebrows ALWAYS uppercase. Buyer = the Hollow High Achiever (Dubai founder / senior exec, 35–55).

## Visual direction (LOCKED to robertsimiccoachinginstitute.com — reference-matched)
Atul's call: make this look and feel like the Robert Simic Coaching Institute page (style only,
nothing copied). One continuous deep-navy canvas, single sans voice, cool violet + cyan-sky accent.
NOTE: the reference's feel is photo-led (cinematic portraits, library closer, graduate video grid).
Repo has NO imagery yet, so the photographic richness is pending real Govind photos. No placeholder gradients.

## Tokens (the vars the whole funnel re-skins from)
- **Canvas (one continuous deep navy):** `--paper:#050714` · `--paper-soft:#090C1A` · `--ink:#E6E9F2`
- **Violet accent (pills, borders, small accents):** `--gold:#8B7CFF` · `--gold-deep:#6B5FE8` · `--gold-lite:#A99BFF`
- **Cyan→sky emphasis (the two-tone headline word + big numbers):** `--acc-a:#7CE8E1` · `--acc-b:#87C5F2`
- **Stage (cinematic peaks, a hair richer):** `--stage:#080B18` → `--stage-2:#0C1022`, subtle violet ambient glow

## One voice (reference grammar)
- **All type = Plus Jakarta Sans** — display/body/eyebrows/meta. Weight + size do the work, not font switching.
  Headlines tight-tracked, weight 600–700; emphasis word painted with the cyan→sky gradient (`.em`).

## Rhythm
No light/dark alternation any more — the whole page is the dark canvas, like the reference.
`.stage` peaks (Hero, §6 Authority, §10 Guarantee, §12 Finale) are a touch richer with a violet ambient.

## Concept-level exceptions
- **§11 Urgency deliberately omitted as a component** — the register forbids fake urgency.
  Scarcity is Govind's *real* calendar, stated as a quiet line ("slots genuinely limited"), never a countdown.
- Accent reads gold = **precious/value**, not spiritual. Kept strictly scarce so it never tips into guru.

## Files
- `app/page.tsx` — 12 server-rendered sections (the SHAPE build)
- `app/FunnelScripts.tsx` — reveals, FAQ accordion, VSL swap, sticky CTA (all fail-open)
- `app/funnel.css` — this skin + all section components (imported by `app/layout.tsx`, Next-fingerprinted)
- `public/assets/source/` — the v4 copy (source of truth) + script + testimonials
