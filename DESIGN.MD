# LobbyQ Visual Design System & Style Specification

This manual defines the visual identity, typography, layout system, color language, and interaction style used across the **LobbyQ** platform.

The queue management workflow, OBS-first philosophy, and queue logic remain unchanged.

Only the visual and UI design language is replaced.

---

# 1. Design Philosophy

LobbyQ adopts an editorial retro-tech aesthetic inspired by Sync Tree.

The interface should feel:

* Structured
* Clean
* Technical
* Gaming-oriented
* Lightweight
* Highly scannable

Unlike traditional SaaS dashboards, LobbyQ avoids enterprise complexity and instead embraces a modern retro-control-panel aesthetic.

---

# 2. Typography System

## Font Families

### Primary Display Font

Outfit

Used for:

* Streamer names
* Queue page titles
* Statistics values
* Major headings
* Landing page hero

Characteristics:

* Geometric
* Bold
* Strong visual hierarchy

---

### Metadata Font

Space Mono

Used for:

* Queue positions
* Match counters
* Status badges
* Labels
* Queue IDs
* Dates and timestamps

Characteristics:

* Retro terminal aesthetic
* High scanability
* Gaming control-panel feel

---

### Body Font

Inter

Used for:

* Descriptions
* Bios
* Tooltips
* Instructions
* General UI copy

Characteristics:

* Neutral
* Readable
* Compact

---

# 3. Color System

## Core Palette

```css
:root {
  --color-ink: #111111;
  --color-canvas: #ffffff;

  --color-accent-primary: #ef233c;
  --color-accent-secondary: #3a86c8;

  --color-border: #111111;
}
```

---

## Dark Theme Adaptation

LobbyQ remains Dark Mode Only.

```css
:root {
  --bg-primary: #0d0d0d;
  --bg-secondary: #171717;

  --text-primary: #ffffff;
  --text-secondary: #bdbdbd;

  --accent-primary: #ef233c;
  --accent-secondary: #3a86c8;
}
```

---

# 4. Layout Philosophy

## OBS Dashboard

Dashboard remains optimized for OBS Dock.

Width target:

```text
300px – 400px
```

Requirements:

* No horizontal scrolling
* One-column layout
* Primary actions visible immediately

---

## Vertical Flow

```text
Quick Add Queue

↓

Statistics

↓

PLAYING

↓

WAITING

↓

PARKED
```

---

# 5. Visual Style

## Borders

All components use visible borders.

```css
border: 1.5px solid #111111;
```

Characteristics:

* Sharp
* Editorial
* Print-inspired

No glassmorphism.

No neumorphism.

---

## Border Radius

```css
border-radius: 10px;
```

Range:

```text
8px – 12px
```

---

## Shadows

Minimal.

```css
box-shadow:
0 2px 8px rgba(0,0,0,.08);
```

Purpose:

* Separation only
* Not decorative

---

# 6. Queue Card Design

Every queue item behaves as a compact editorial card.

Structure:

```text
#1

Budi

1234***

Sisa 2 Match

⭐ Fast Track
```

Visual hierarchy:

1. Position
2. Username
3. Match information
4. Priority indicator

---

## Queue Position

Uses Space Mono.

Large.

```css
font-family: 'Space Mono';
font-weight: 700;
```

Example:

```text
#01
```

---

## Viewer Name

Uses Outfit.

Example:

```text
Budi
```

---

## Metadata

Uses Space Mono.

Example:

```text
1234***
Sisa 2 Match
```

---

# 7. Statistics Cards

Compact control-panel style.

Example:

```text
WAITING

12
```

```text
PLAYING

4
```

```text
PARKED

18
```

---

Style:

* Border-based
* Large number
* Small label

No charts.

No graphs.

No trend indicators.

---

# 8. Landing Page Style

Inspired by Sync Tree editorial layout.

Sections:

1. Hero
2. Product Preview
3. Cara Kerja
4. CTA

---

## Hero Layout

Large Outfit headline.

Example:

```text
MANAGE YOUR MABAR QUEUE
WITHOUT NOTEPAD.
```

Supporting copy uses Inter.

---

# 9. Retro-Tech Decorative Elements

Decorative only.

Never interfere with usability.

---

## Scanline Effects

Allowed on:

* Hero preview
* Landing page illustrations
* Streamer avatar cards

Not allowed on:

* Queue text
* Statistics
* Action buttons

Readability must remain perfect.

---

## CRT Filters

May be used for:

* Streamer profile image
* Marketing screenshots

Not used inside queue management views.

---

# 10. Buttons

## Primary

Filled Accent Red

```css
background: #ef233c;
color: white;
```

---

## Secondary

Outlined

```css
border: 1.5px solid #111111;
background: transparent;
```

---

## Hover

```css
transform: translateY(-2px);
transition: 300ms;
```

---

# 11. Animation Rules

Animation Level:

```text
3 / 10
```

Allowed:

* Toast appearance
* Queue movement
* Accordion expand
* Status change

---

Not Allowed:

* Floating elements
* Parallax
* Decorative particles
* Heavy page transitions

---

# 12. Component Styling

Required Components:

* Toast
* Accordion
* Collapsible
* Skeleton Loading
* Inline Form
* Badge
* Queue Card
* Stats Card

Visual Characteristics:

* Visible borders
* Monospace metadata
* Editorial spacing
* Compact layouts

---

# 13. Empty States

## OBS Dashboard

```text
Belum ada antrean.

Ketik nama viewer di atas untuk memulai.
```

---

## Public Queue

```text
Lobi sedang kosong.

Streamer sedang istirahat atau belum membuka pendaftaran mabar.
```

Illustration style:

* Monochrome
* Retro-tech
* CRT-inspired

---

# 14. UX Constraints

The following LobbyQ product rules remain unchanged:

* OBS First
* No Horizontal Scroll
* Zero Modal Policy
* Read Only Public Queue
* Instant Feedback
* Queue Position Always Visible
* One Screen Priority
* Minimal Cognitive Load

Visual changes must never compromise these principles.