# Portfolio design system

## Direction

An evidence-led portfolio with an identity rail, connected project map and photographic university chapters. The design references supplied by Sarowar informed the navy canvas and connected-path motif; all UI and diagrams are native React/CSS/SVG.

## Tokens

| Role | Value |
| --- | --- |
| Background | `#10182b` |
| Panel | `#172239` |
| Raised surface | `#1c2943` |
| Primary indigo | `#3949ab` |
| Main text | `#f2f3f7` |
| Secondary text | `#b4bed2` |
| Accent | `#b4abff` |
| Focus | `#d4c5ff` |
| Interactive boundary | `#647994` |
| Warm portrait accent | `#f0b978` |

Manrope is the main typeface, with Courier New for small metadata. Bebas Neue is limited to decorative display type. Spacing uses 4/8/12/16/24/32/48/64/96/128px roles. Radius is restrained: 8px panels, 12px campus/dialog viewports and round icon controls.

## Structure

Desktop navigation uses a 104px identity rail, reduced to 80px on tablet. Under 760px it becomes a compact header/menu and bottom dock. The content maximum is 1360px. Main composition changes at 760px and 1100px.

The six-project map is the signature. Its nodes select real case studies; scope and metrics remain in a readable adjacent panel. On phones, the nodes become a two-column selector. The journey keeps the supplied chronological order; satellite precedes Presto L2.

Skills and education share the keyboard-accessible `SlidingFrames` component. University images are full frame backgrounds with dark reading panels for qualifications, tools, projects and credits. Earlier degrees link to later work under explicit related-work labels.

The personal mountain poster appears intact beside the biography. The London video and animated personal avatar remain locally bundled. Global motion controls and system reduced-motion preferences are respected.

## Source ownership

`src/styles/studio.css` owns the interface tokens and layout; `visuals.css` owns the decorative case-study illustrations. `src/data/portfolio.js` remains the authoritative supplied content. Components are split by navigation, hero, project selection, career, skills/education, biography/contact and the native case-study dialog. Legacy styles/components remain in source history but are not imported into the current page.
