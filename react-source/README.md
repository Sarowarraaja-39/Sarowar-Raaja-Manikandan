# Sarowar — React Portfolio / UI & UX Redesign

A portrait-led portfolio for a Network & Security Engineer, built with React, Vite and Three.js. The supplied post guides the split hero, oversized ANALYST headline and central portrait. The indigo edition uses #3949ab across the page, with pale indigo reading panels, a visual project index, a chronological career timeline and animated skills and education frames.

## Quickest way to open the download

Extract the ZIP and open `ready-to-open/index.html` in a modern browser. It includes a bundled, classic JavaScript build that works without a development server or installation. Keep its CSS, fonts and assets together. The clipboard feature may need localhost or HTTPS; the email link works directly.

## Edit and run the React source

From the `react-source` folder:

```sh
npm install
npm run dev
```

The terminal prints the local development URL. To build:

```sh
npm run check
npm run build
npm run preview
```

Upload the contents of `dist/` to a static web host. Vite uses relative URLs so it can also run in a subfolder. No runtime API keys, account system, external fonts or third-party email integration are required.

## Main files

- `src/data/portfolio.js`: profile, career chapters, project content, skills and education.
- `src/App.jsx`: the React page, accessible project/career slides and case-study dialog.
- `src/components/NetworkScene.jsx`: lazy-loaded Three.js network scene with a CSS fallback.
- `src/components/Brand.jsx`: custom editable SR monogram and wordmark.
- `src/components/ProjectGlyph.jsx`: project index symbols.
- `src/components/ProjectVisual.jsx`: lightweight project-specific visual concepts.
- `src/components/CareerVisual.jsx`: role-specific career illustrations and the accessible LAN topology.
- `src/styles/global.css`: design tokens, layout, transitions and motion preferences.
- `src/styles/visuals.css`: editable project artwork.
- `src/styles/poster.css`: reference composition, indigo palette and personal avatar motion.
- `public/assets/sarowar-avatar-v1.png`: transparent avatar made from the supplied photograph.
- `src/components/SlidingFrames.jsx`: reusable accessible skills and education carousels.
- `src/styles/frames.css`: sliding frames, campus photos, controls and responsive layouts.
- `src/styles/analyst.css`: expanded introduction, evidence details and analyst contribution cards.
- `ASSET_NOTES.md`: avatar method and university photo sources/licences.
- `public/brandmark.svg`: matching browser icon.
- `public/assets/`: original photograph and the AI-refined editorial portrait.
- `DESIGN.md`: style and interaction guidance.

## Included interactions

- Poster headline reveal, gentle portrait float and original-photo toggle.
- Personal avatar in the indigo contact circle, with a gentle nod and a small arrow badge.
- Animated Three.js network scene; static fallback when motion is off or WebGL is unavailable.
- Custom SR monogram with drawn SVG strokes and a masked name reveal.
- Visual project selector with visible maturity labels and a selected-project Problem → Approach → Result summary.
- Six project slides with directional transitions, layered artwork/copy movement, labelled arrow buttons, keyboard-accessible tabs and touch swipes.
- Evidence and deliverables for every project, plus a concise explanation of what each demonstrates for an analyst role.
- Change to Evidence: a professional AT/MOP documentation case covering hundreds of sites and more than 365 routers. The repository remains clearly labelled as pending.
- Three analyst-strength cards: understand traffic, investigate with structure and make findings actionable.
- Larger project metadata and metric notes, with a consistent rounded style for tools across projects, career and skills.
- Native case-study dialogs with Escape, focus containment and focus restoration.
- Seven chronological career chapters with role-specific visuals, including distinct Presto L1 and L2 responsibilities and the current BP Customer Assistant role.
- Skills slideshow: four full-width frames with an eight-second reading interval, direct category tabs, arrows, swipe, pause/play and project evidence links.
- Education slideshow: three university frames with real campus photos, degree-specific skills and related project buttons, at an eleven-second interval.
- Slides pause on hover, focus, manual navigation, an open case study, hidden documents or leaving the viewport. Keyboard focus pauses until Play is chosen.
- Optional motion, a level portrait nameplate, reduced-motion support, section reveals, scroll progress and UK local time.
- Direct email, LinkedIn and GitHub actions; copy-email gives temporary confirmation.

## Content and evidence

The narrative comes from the supplied HTML/PDF and the current CV used for the earlier portfolio. Presto L1 has been rewritten to cover ticket handling, customer/L2 coordination and RCA after resolution. L2 retains engineering, migrations, vulnerability review and vendor coordination. Both are within the same June 2022–July 2025 employment; individual promotion dates were not supplied. Documentation for more than 365 routers is separate from the earlier figure of 341 routers personally migrated. BP is shown as Customer Assistant from February 2026 to present; an inconsistent “over one year” tenure claim is omitted. Its POS, equipment-log and reporting responsibilities are presented as transferable operational experience.

TwinShield scores are attributed to the supplied portfolio, with a note to document dataset, split and leakage checks. The banking 99.99% value is an availability target. Career figures are self-reported. Safe Digiworld remains a research concept; SecureFI is presented as architecture/design. No example report timings are presented as measured results. Repository-specific URLs are not invented; GitHub actions point to the supplied profile.

The portrait is an AI-refined interpretation of the supplied photo, with the original one click away. Animation is implemented in the interface; this is not a generated video.

## Verification

Production build, source content checks, React server rendering and DOM-based interaction checks passed before delivery. The interaction checks covered slides, keyboard navigation, modal state and focus restoration, portrait switching, reduced motion and the mobile menu. Skills and education checks also covered autoplay, pausing, keyboard and swipe navigation, inactive-frame focus exclusion, campus images and project buttons. Full live-browser and device testing was not available in the authoring environment.

## Dependency licences

React, Vite and Three.js are distributed under their respective open-source licences. Self-hosted Bebas Neue and Manrope fonts use the SIL Open Font License. Their package licence files are included in the downloadable package. Personal photographs remain user-supplied assets. University photographs use Creative Commons licences; see the on-page credit links and ASSET_NOTES.md.

## Career visuals

The LAN chapter uses an editable SVG topology with a managed switch, VPN gateway and separate office/CCTV VLANs. The other chapters use AI-generated concept illustrations: a banking backend, telecom operations centre, LEO satellite communications, national telecom backbone and cyber analyst desk. These are illustrative scenes rather than photographs or exact client network architectures. Assets are under `public/assets/career/`.
