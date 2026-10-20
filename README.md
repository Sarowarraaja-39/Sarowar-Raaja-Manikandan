# Sarowar Raaja Manikandan — Cybersecurity Analysis Portfolio

A React portfolio connecting network and security experience with cybersecurity analysis, intrusion detection, digital forensics and evidence-led reporting.

The homepage uses a portrait-led layout, an indigo `#3949ab` theme and an **ANALYST** headline. It includes six project cases, seven career chapters, animated skills and education frames, university photographs and direct contact links.

## Run locally

Install a current Node.js LTS release, then run these commands from the repository root:

```sh
npm ci
npm run dev
```

Vite prints the local development URL.

## Check and build

```sh
npm run check
npm run build
npm run preview
```

The production website is generated in `dist/`. Publish the contents of that folder to a static website host. The project uses relative asset URLs and can run from a subfolder. No runtime API keys are required. Fonts and images are bundled locally.

## Edit the portfolio

| Path | Purpose |
| --- | --- |
| `src/data/portfolio.js` | Profile, projects, career, skills and education content |
| `src/App.jsx` | Page sections, project dialogs and navigation |
| `src/components/` | Identity, visuals, slides and the Three.js scene |
| `src/styles/` | Layout, colours, responsive rules and motion |
| `public/assets/` | Portraits, university photos and career illustrations |
| `DESIGN.md` | Design and interaction guidance |
| `ASSET_NOTES.md` | Image methods, credits and licences |

## Features

- Project cases with deliverables, analyst relevance, scoped results and native case-study dialogs.
- Separate Presto L1 and L2 responsibilities and a current BP Customer Assistant chapter.
- Skills and education carousels with pause/play, keyboard navigation, arrows and touch swipes.
- Reduced-motion support, inactive-slide focus exclusion and focus restoration after dialogs.
- Original/editorial portrait switching, animated personal avatar and a lazy-loaded Three.js scene with a static fallback.
- Email, LinkedIn and GitHub links, copy-email feedback and UK local time.

## Project evidence

**Change to Evidence** covers AT documentation for hundreds of sites and MOP documentation for more than 365 routers. The documentation repository is pending; original employer documents are not included here. Documentation coverage is distinct from personally executed migrations.

Research results describe their stated evaluation only. Research concepts and architecture projects retain explicit scope labels. BP is listed from February 2026 to present, with operational duties presented as transferable experience.

## Assets and notices

Campus photo credits and Creative Commons licences are recorded in `ASSET_NOTES.md` and shown on the website. Personal portraits are supplied assets or AI-refined interpretations of the supplied photograph. Career scenes are labelled as illustrations. Dependency and font notices are in `third-party-licenses/`.
