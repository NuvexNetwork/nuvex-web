# Reference analysis

Reference: the ScaleOS Webflow template at `scaleos.webflow.io`, inspected on 2 October 2026.

This document records what the reference looks like and how it behaves, so the Nuvex site can reproduce
the same design system with its own code, content, and assets. Nothing here is copied into the Nuvex
source. Class names, scripts, stylesheets, images, text, logos, testimonials, and company names from the
reference are not used.

## Method and limits

- The home page and 19 linked pages were fetched as HTML. The shared stylesheet (about 159 KB) was
  parsed for custom properties, media queries, transitions, borders, radii, and shadows.
- Inline scripts were read to understand motion behaviour (timings, easing, trigger points).
- No browser automation was available in this environment. Layout at each breakpoint was inferred from
  the stylesheet rules, not from screenshots. Phase 10 should confirm it in a real browser.

## Page inventory

| Route                   | Template        | Sections, in order                                                                                                                                            |
| ----------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                     | Home            | Hero, logo strip, capability grid, case-study list, pinned scroll tabs, services, agents, bento reasons, assistant, integrations, testimonials, counters, CTA |
| `/about`                | Marketing       | Banner, logo strip, mission, scale, capability grid, testimonial, team, CTA                                                                                   |
| `/ai-marketing`         | Product         | Banner, logo strip, capability grid, focus tabs, agents, CTA                                                                                                  |
| `/intelligent-campaign` | Product         | Banner, assistant, services, sticky feature tabs, CTA                                                                                                         |
| `/integration`          | Product         | Banner, integrations grid, CTA                                                                                                                                |
| `/pricing`              | Pricing         | Banner, plan cards with monthly or yearly toggle, logo strip, comparison table, FAQ accordion, CTA                                                            |
| `/work`                 | Collection      | Banner, case-study list, CTA                                                                                                                                  |
| `/works/[slug]` (3)     | Collection item | Hero with cover, details sidebar and rich text, related stories, CTA                                                                                          |
| `/blog`                 | Collection      | Banner, featured post, post grid                                                                                                                              |
| `/blogs/[slug]`         | Collection item | Banner with meta and cover, rich text, CTA                                                                                                                    |
| `/career`               | Marketing       | Banner, logo strip, open roles list, principles, counters, CTA                                                                                                |
| `/career/[slug]`        | Collection item | Banner with role meta, role overview rich text, apply                                                                                                         |
| `/customer`             | Marketing       | Banner, featured quote, testimonial grid, CTA                                                                                                                 |
| `/contact`              | Form            | Contact form beside contact details, logo strip, CTA                                                                                                          |
| `/privacy-policy`       | Legal           | Banner, rich text                                                                                                                                             |
| `/terms-and-conditions` | Legal           | Banner, rich text                                                                                                                                             |
| `/style-guide`          | Utility         | Tokens, type scale, buttons                                                                                                                                   |
| `/changelog`            | Utility         | Version list                                                                                                                                                  |
| `/licenses`             | Utility         | Asset licences                                                                                                                                                |
| `/instructions`         | Utility         | Template usage notes                                                                                                                                          |
| `/401`, `/404`          | Utility         | Password form, not-found message                                                                                                                              |

Every marketing page uses the same frame: a centred banner, an optional logo strip, two to five content
sections, a full-width CTA, and the footer.

## Navigation structure

- A floating bar, not a full-width strip. It is centred, as wide as the content container (1070px), and
  sits 16px below the top of the viewport (10px on small screens).
- Pill shape (30px radius) with a very light translucent fill (white at about 6%) and a strong
  background blur (50px). Inner padding is 8px on top and bottom, 12px on the left, and 6px on the right,
  so the CTA button sits flush with the right edge.
- Left: the logo. Centre: Home, About, a **Product** dropdown, Pricing, and a **Pages** dropdown.
  Right: one white CTA.
- The Product dropdown is a dark panel (`#181818`, 12px radius, about 384px wide) centred under its
  trigger. It holds a small "Key features" label and items, each with a title and a one-line description.
- The Pages dropdown is a two-column panel listing every page, grouped by type.
- Dropdown triggers use a chevron that rotates on open. Links are light grey (`#dfdfdf`) and turn white
  on hover.
- At 991px and below, the links collapse behind a hamburger, and the bar narrows to 90% of the viewport.
  The menu opens as a panel below the bar, with the dropdowns becoming nested groups.

## Section inventory (home)

1. **Hero.** A centred H1 with the last words in grey, a short paragraph (max about 527px, 20px), two
   buttons (primary and secondary), then a large product screenshot in a rounded frame (12px radius)
   that bleeds into the next section.
2. **Logo strip.** A left-aligned heading beside a three-column grid of logos with 0.5px dark borders,
   so the cells read as a table.
3. **Capability grid.** A centred section title (max 510px) and four cards.
4. **Case-study list.** A title with a "View all" button on the right, then large image-led stories.
5. **Pinned scroll tabs.** The section is 300vh tall. A sticky panel shows tab titles on the left and an
   image panel on the right. Scroll progress switches the active tab: the old description collapses and
   the new one expands, while the image slides out left and the new one slides in from the right.
6. **Services.** Three cards with an image, title, text, and a "Learn more" link.
7. **Agent toolkit.** Three cards.
8. **Reasons (bento).** Mixed-size cards in a grid.
9. **Assistant.** A two-column feature with an image.
10. **Integrations.** A centre tile with logo tiles on each side. Logos enter with a stagger, then drift
    slowly toward the centre in a looping yoyo.
11. **Testimonials.** A three-card slider.
12. **Benefits.** Two items.
13. **Counters.** Four cells in a bordered grid (two columns on small screens). Numbers count up once
    when they reach 85% of the viewport.
14. **CTA.** A tall section (712px, then 500px and 400px on smaller screens) with a large background
    word image anchored to the bottom, and a centred title and button.
15. **Footer.**

## Typography hierarchy

One family: Inter Tight, weights 400, 500, and 600. Headings are mostly **regular weight**, which is the
main reason the reference feels calm rather than loud.

| Role            | Desktop | ≤991px | ≤767px | ≤479px | Line height | Weight | Tracking |
| --------------- | ------- | ------ | ------ | ------ | ----------- | ------ | -------- |
| H1 (hero)       | 72      | 60     | 46     | 36     | 115%        | 400    | -1.5px   |
| H2 (section)    | 48      | 40     | 36     | 32     | 120%        | 400    | 0        |
| H3              | 36      | 32     | 28     | 26     | 110%        | 500    | 0        |
| H4 (card title) | 28      | 24     | 22     | 20     | 110%        | 400    | 0        |
| H5              | 24      | 22     | 20     | 20     | 110%        | 400    | 0        |
| H6 / lead       | 20      | 18     | 18     | 18     | 120%        | 400    | 0        |
| Paragraph large | 18      | 18     | 18     | 16     | 130%        | 400    | 0        |
| Paragraph       | 16      | 16     | 16     | 16     | 130%        | 400    | 0        |
| Caption / meta  | 14      | 14     | 14     | 14     | 130%        | 400    | 0        |

Accent words inside headings are set in grey (`#8f8f8f`), not in a colour or gradient.

## Colours

The reference is monochrome with one accent.

| Token        | Value     | Use                                |
| ------------ | --------- | ---------------------------------- |
| neutral 01   | `#000000` | Page background                    |
| neutral 02   | `#181818` | Cards, dropdowns, hairline borders |
| neutral 03   | `#3a3a3a` | Strong borders                     |
| neutral 04   | `#707070` | Dividers in lists and FAQ          |
| neutral 05   | `#8f8f8f` | Muted text, grey accent words      |
| neutral 06   | `#dfdfdf` | Nav links, secondary text          |
| neutral 07   | `#efefef` | Light surfaces                     |
| neutral 08   | `#ffffff` | Headings, primary button fill      |
| accent       | `#265ff3` | Button hover fill                  |
| accent light | `#638efd` | Highlights                         |
| translucent  | white 50% | Low-emphasis text                  |

Gradients are rare. The only one in the stylesheet goes from `#181818` to black, top to bottom, on cards.

## Spacing system

A named scale in pixels: 4, 8, 10, 12, 14, 16, 18, 20, 24, 30, 40, 50, 60, 70, 80, 100, 120, 140, 145,
150, 180, 230, 245.

- Section padding: 80px on top and bottom. The banner uses 100px on top. Utility pages use 120px.
- Section title to content: 50px.
- Banner stack gap: 14px. Hero paragraph top margin: 24px.
- Grid gaps: 16px to 24px for cards. 40px to 70px for footer and large layouts.

## Container widths

- Main container: 1070px with 16px side padding.
- Small container: 1001px, for reading-width pages.
- Large wrapper: 88.75rem (1420px) for full-bleed compositions.
- Banner text block: max 750px. Section title: max 510px, centred. Hero paragraph: max 527px.

## Card patterns

- Surface `#181818` on black, or a `#181818`-to-black vertical gradient.
- Radius 16px for standard cards, 20px for large panels, 30px for feature frames, and 12px for images.
- Hairline borders of 0.5px in `#181818` for grid tables (logos, counters, pricing rows), so cells
  share edges instead of floating apart.
- Padding 20px to 30px.
- Almost no drop shadows. The only heavy shadow belongs to the white primary button.
- Hover: a short colour or background transition (0.3s ease-in-out). Cards do not lift far.

## Button patterns

- **Primary:** white fill, dark text, 12px radius, 12px by 16px padding, weight 500. It carries an outer
  shadow (`0 14px 24px` at 20% black) and an inner glow (an inset white haze at 10%). On hover two blue
  halves (`#265ff3`) fade in from the left and right edges and meet in the middle, while the text turns
  white and an arrow icon slides through a clipped slot.
- **Secondary:** dark or translucent fill with light text and the same geometry.
- **Text link:** "Learn more" with a small arrow.
- **Form submit:** white, full width, 42px or 48px tall, 8px radius.
- Transitions are 0.2s to 0.4s, mostly `ease-in-out`.

## Animation patterns

The reference uses GSAP with ScrollTrigger and SplitText, plus Lenis smooth scrolling (lerp 0.05).
Nuvex will reproduce the observable motion with Framer Motion and CSS.

- **Entrance:** elements fade up from about 40px with `power3.out` easing, triggered when they enter
  the viewport.
- **Stagger:** grids of logos and cards reveal with 0.12s to 0.16s between children.
- **Scale-in:** images and centre tiles start at 0.85 to 0.96 scale and settle to 1.
- **Pinned tabs:** scroll-scrubbed (300vh section, scrub about 1.1). Each step crossfades text with a
  height change and slides images horizontally (out 35px left, in from 45px right, scale 0.94 to 1).
- **Feature tabs:** a progress indicator under four tabs follows scroll position. Inactive tabs sit at
  45% opacity.
- **Counters:** count from zero once, over 2s, with `power1.out`, when the counter reaches 85% of the
  viewport.
- **Ambient loops:** integration logos drift slowly in a sine yoyo. This is the only continuous motion.
- **Smooth scroll:** a global inertial scroll.
- There are no page transitions beyond the browser's default navigation.

## Responsive behaviour

Breakpoints: 1280px and up (large), 992px to 1279px (desktop), 768px to 991px (tablet), 480px to 767px
(mobile landscape), and 479px and below (mobile).

- **≤991px:** the navigation collapses to a hamburger. The type scale steps down. Hero title wraps
  become centred. Four-column grids become two columns. The CTA height drops to 500px.
- **≤767px:** the hero title is capped at about 360px wide and centred. Title-plus-button rows stack
  vertically. Pricing rows go from three columns to two. The footer menu stacks.
- **≤479px:** the smallest type scale. Card grids become one column. The CTA height drops to 400px.
- The pinned scroll section keeps its behaviour on desktop. On small screens it falls back to stacked
  content.

## Footer

- 80px top padding. The brand block (about 104px wide) sits on the left, and a menu block (max 690px)
  sits on the right.
- The menu is a three-column grid with 70px gaps. Each column has a 14px white title and grey links.
- Six groups: Navigation, Company, Product, Utility, Legal, and Platform (social links).
- A bottom row holds the copyright notice. A very large brand word image fills the bottom of the page.

## Reusable components observed

Navbar with dropdown, mobile menu, banner (page hero), section title block, logo grid, feature card,
image card, case-study row, pinned scroll tabs, sticky feature tabs, bento grid, integration orbit,
testimonial slider, counter grid, pricing card with billing toggle, comparison table, FAQ accordion, blog
card, rich-text article, role list row, contact form, CTA band, and footer.

## Page templates

1. **Home:** long-form with every section type.
2. **Marketing page:** banner, logo strip, two to five sections, CTA.
3. **Collection index:** banner, featured item, grid or list.
4. **Collection item:** banner with meta, cover, rich text, related items, CTA.
5. **Form page:** two columns with the form and details.
6. **Legal or utility:** banner and rich text at reading width.

## Interaction patterns

- Hover and focus dropdowns in the navbar, with a rotating chevron.
- A hamburger toggle that opens a panel menu.
- Scroll-driven tabs that also respond to clicks.
- A slider with previous and next controls.
- A monthly or yearly pricing toggle.
- A single-open FAQ accordion with a rotating plus icon.
- Counters that run once.
- Forms with success and error states.
- Buttons with a split fill and an arrow slide on hover.

## What Nuvex will change on purpose

- **Colour.** The reference's monochrome system is kept for structure: black, `#181818`-style surfaces,
  hairlines, and grey accent words. The single blue accent becomes the Nuvex orbital palette (blue, cyan,
  violet, magenta), used sparingly for focus, status, and small highlights, as the brief asks.
- **Content.** Every reference section is mapped to a Nuvex concept in
  `docs/nuvex-information-architecture.md`. Customer logos, testimonials, and stories have no Nuvex
  equivalent yet. They become clearly labelled examples or are left out until they are real.
- **Smooth scroll.** Lenis is not added in Phase 1. Native scrolling is kept to avoid an extra dependency.
  Whether to add it is a Phase 11 decision.
