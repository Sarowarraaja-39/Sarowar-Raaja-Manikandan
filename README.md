# Sarowar Raaja Manikandan — Portfolio

A React portfolio connecting network and security experience with cybersecurity analysis.

**Website:** https://sarowarraaja-39.github.io/Sarowar-Raaja-Manikandan/

The homepage includes a personal introduction and London skyline video, a six-project evidence map with full case studies, a chronological career timeline with separate Presto L1/L2 responsibilities, sliding skill categories, immersive university backgrounds, a personal mountain poster and contact links. Project metrics and research/professional scope remain explicit.

## Edit and run

```bash
cd react-source
npm ci
npm run dev
```

Run `npm run check` for the content checks and `npm run build` for the production build. The build uses relative asset paths, so it works under a GitHub Pages project URL.

## Included versions

- `react-source/`: editable React source and bundled images/video/fonts.
- `static-hosting/`: production build for static hosting.
- `ready-to-open/`: bundled browser version; open its `index.html`.
- `third-party-licenses/`: dependency and font notices.
- `ASSET_NOTES.md`: image sources, credits, licences and video processing details.
- `DESIGN.md`: design tokens and interaction structure.

The `gh-pages` branch contains the published production build. After rebuilding, update that branch with the contents of `static-hosting/`, retain `.nojekyll`, and GitHub Pages publishes the update.

## Controls and accessibility

The motion button stops the background video, path animation and automatic slides. Initial reduced-motion visits use the video poster instead of loading the clip. Project and career selectors support arrow keys, Home and End; case-study dialogs support Escape and return keyboard focus. Skills and education frames have manual controls, pause on interaction and stop while a case study is open. Mobile navigation uses a menu and compact bottom dock.

Campus photographs retain their original Creative Commons credits. The personal mountain poster was specifically selected by the portfolio owner; see its source note before reusing it. No original employer documents or private production logs are included.
