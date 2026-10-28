# Portfolio design system

## Direction

An evidence-led portfolio with an identity rail, connected project map and photographic university chapters. The design references supplied by Sarowar informed the navy canvas and connected-path motif; all UI and diagrams are native React/CSS/SVG.

## Tokens

| Role | Value |
| --- | --- |
| Background | `#202b40` |
| Panel | `#2a3850` |
| Raised surface | `#33445f` |
| Primary indigo | `#3949ab` |
| Main text | `#f2f3f7` |
| Secondary text | `#c6d0e2` |
| Accent | `#b4abff` |
| Focus | `#d4c5ff` |
| Interactive boundary | `#899db9` |
| Warm portrait accent | `#f0b978` |

Manrope is the main typeface, with Courier New for small metadata. Bebas Neue is limited to decorative display type. Spacing uses 4/8/12/16/24/32/48/64/96/128px roles. Radius is restrained: 8px panels, 12px campus/dialog viewports and round icon controls.

The canvas uses a softer slate-navy palette. Shared RGB tokens keep translucent navigation and experience surfaces consistent. Campus photograph scrims retain their original contrast treatment. The London clip uses 90% saturation and a small brightness lift. A lighter directional scrim reveals the skyline while retaining stronger shading behind the text; the mobile scrim opens up across the portrait and strengthens again behind the lower copy. The original video, poster, motion controls and reduced-motion behaviour are preserved.

## Structure

Desktop navigation uses a 104px identity rail, reduced to 80px on tablet. Under 760px it becomes a compact header/menu and bottom dock. The content maximum is 1360px. Main composition changes at 760px and 1100px.

About appears directly after the introduction and comes first in desktop, expanded-menu and mobile-dock navigation. All six section links remain available in the compact dock. The six-project map is the signature. Its nodes select real case studies; scope and metrics remain in a readable adjacent panel. On phones, the nodes become a two-column selector. Experience is presented as six full-width work experience slides with large role titles, concept artwork, supplied facts, analyst relevance and visible responsibilities. The MSc is presented in Education, with its project work in the project map. The filmstrip keeps the supplied chronological order; satellite precedes Presto L2. The L2 chapter is the initial spotlight, while L1 remains independently selectable. The hero explains concrete work tasks and academic lab activities in separate paragraphs.

Experience, skills and education share the keyboard-accessible `SlidingFrames` component. Skills pair four capability chapters with three-step applied workflows, their actual tool groups and evidence links. No skill scores or invented incident streams are used. Experience advances every 30 seconds, capabilities every 11 and education every 30, only when visible and uninterrupted. University images remain full frame backgrounds on desktop and mobile. Translucent navy reading panels and lighter nested project cards let the campus photographs show through the achievements, with full-opacity text, a reduced photo shade and no backdrop blur. The panels explain the degree purpose, each learning area, its practical relevance and the related project evidence. The two master's frames replace repeated tags with complete explanations and examples. The BEng frame separates demonstrated model-building skills from its six R2013 academic groups, and links to the university curriculum. A compact academic mechanical foundation also appears in the skills section. Regulation 2013 is separate from the existing 2016–2020 degree dates. The MCA frame links to later work under an explicit related-work label. The BEng frame features Sarowar's Bell helicopter model, built entirely from scrap metals and recovered motors with no new parts, which won first place at his college symposium. The original supplied photograph is included; SecureFI is not associated with the bachelor's degree.

The personal mountain poster appears intact beside the biography. The London video and animated personal avatar remain locally bundled. Global motion controls and system reduced-motion preferences are respected.

## Source ownership

`src/styles/studio.css` owns shared tokens and page layout; `showcase.css` owns the experience and capability variants; `education.css` owns education and the mechanical foundation panel; `visuals.css` owns the decorative case-study illustrations. The retired timeline and skill-list CSS has been removed. Experience artwork moves to a separate block below the role title on phones, with no text/image overlap; on intermediate screens it shares a two-column header and moves the facts into a lower row. Capability workflows become vertical steps on phones. `src/data/portfolio.js` remains the authoritative supplied content. Components are split by navigation, hero, project selection, career, skills/education, biography/contact and the native case-study dialog. Legacy styles/components remain in source history but are not imported into the current page.
