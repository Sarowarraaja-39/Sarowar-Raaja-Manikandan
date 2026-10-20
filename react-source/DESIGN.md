# Portfolio design system

## Direction
A portrait-led editorial portfolio in indigo, centred on the requested #3949ab. The central portrait crosses the split hero beside a large ANALYST statement. Light indigo panels support scanning and reading; the experience chapter uses the primary indigo canvas. The introduction now positions a network and security professional building a career in cybersecurity analysis. Scoped project results and separate Presto L1/L2 responsibilities remain intact.

## Design tokens
| Token | Value | Use |
|---|---|---|
| Primary | #3949AB | Hero, outer frame, timeline chapter, actions, selected tabs |
| Primary deep | #293681 | Emphasis and headings |
| Main text | #1B2453 | Dark indigo ink |
| Supporting text | #566287 | Body metadata and explanations |
| Background | #F4F5FF | Pale indigo page canvas |
| Paper | #FEFEFF | Reading panels |
| Surface tint | #E3E7FC | Tabs, skill tiles and credential accents |
| Signal tint | #C5CEFF | Highlights on indigo and avatar circle |
| Dividers | #C9D0EF | Borders and separators |
| Focus | #3949AB | Focus on light surfaces; white on selected tabs |

Legacy `--amber` and `--cyan` variable names are retained for component compatibility; both now resolve to pale indigo tints. All interface colour, SVG artwork and the Three.js scene use the indigo family. Photographs preserve their natural colours.

Self-hosted Manrope supplies body copy and role headings; Bebas Neue supplies the poster statement, section headings and numbers. Courier New is used for short technical labels. The hero statement reaches 184px, section headings use 48–106px, carousel skill titles use 48–68px, body text uses 13–17px and compact photo attribution uses 10px. Spacing follows 8/12/16/20/24/32/40/48px; section spacing reduces from 104px on desktop to 80px and 65px. The maximum content width is 1300px.

## Identity
The editable SR mark combines letter paths, a connection baseline and an indigo node. It appears in the header, level portrait nameplate, footer and favicon. Strokes draw and the name reveals through a mask when motion is enabled. The contact circle contains a transparent personal avatar with a subtle nod, dashed orbit and small arrow badge.

## Skills and education
Four skills frames combine a large discipline title, a concise description, a tool list and a link to experience or a related case study. Every category remains visible in the tab strip.

Education uses three photo-led frames: Surrey, Madurai Kamaraj and Anna University. Each frame pairs the degree and dates with skills, focus areas and clickable project cards. Surrey projects are academic work. The earlier degrees show explicitly labelled related portfolio work rather than attributing newer projects to those degrees. The Anna photograph depicts the university's Guindy campus; it does not assert attendance at a specific affiliated college.

Each campus image has local image bytes, descriptive alternative text, photographer credit, source and licence links, and a resize/display-crop notice. ASSET_NOTES.md records attribution for redistribution.

## Motion and accessibility
Skills advance after eight seconds; education advances after eleven seconds, only while visible and in view. Hover, focus, manual navigation, an open project dialog, hidden documents and offscreen sections pause progression. Focus and manual navigation pause until Play is chosen. The pause/play button itself retains its current action when focused. Site motion off and system reduced-motion preferences disable autoplay and sliding transitions. Use direct tabs, arrow buttons, Left/Right/Home/End keys or a horizontal swipe to navigate. Inactive frames are inert and hidden from assistive technology. Only manual selections announce a change, so automatic slides do not interrupt screen readers.

Projects retain manual control and their existing directional transitions. Case studies use native modal dialogs with Escape and focus restoration. The portrait remains gently animated, the nameplate stays level and the hero scene pauses offscreen and in hidden documents.

## Responsive behaviour
Header navigation switches to a menu at 1100px. The poster sidebar follows the portrait below 900px. Project tabs become horizontal at 900px. Skills and education frames stack below 760px; campus photographs retain a 300–320px upper frame. Their tab strips scroll independently. Certifications use three columns, two at 1100px and one on narrow screens. Controls retain clear labels and touch targets.


## Analyst positioning update
The hero introduction uses the supplied two-paragraph narrative, with a wider sidebar on large screens and a stacked reading panel at intermediate widths. Every project now includes evidence/deliverables and analyst relevance; the sixth case, Change to Evidence, covers AT documentation for hundreds of sites and MOP documentation for more than 365 routers. That coverage is distinguished from personally executed migrations. The project repository is pending, with no invented URL or public evidence claim.

Three contribution cards preserve the supplied messages: understand the traffic; investigate with structure; make findings actionable. Project buttons open the corresponding case study. The career timeline adds BP Customer Assistant, February 2026–present, with an editable operational-records illustration. The role is described through POS use, equipment readings, operational logs, reporting and communication. The inconsistent “over one year” tenure line is omitted. Project and career tab grids derive their counts from the data, so all six cases and seven chapters remain accessible on narrow screens.
