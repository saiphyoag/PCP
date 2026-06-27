# Pre-College Diploma in Social Science — Website

A React + Vite + Tailwind CSS website for a pre-college diploma program, including a dashboard,
announcements, events, program updates, an online application form, instructor list, course outlines,
a 4-term program timeline, an alumni list, an activities photo gallery, a location/map page, and a
contact page — all behind a responsive header with a side toggle menu.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  data/content.js        ← ALL placeholder content lives here (edit this first)
  components/
    Header.jsx           ← top bar: logo, title, menu toggle, Apply button
    SideDrawer.jsx        ← side toggle navigation menu
    Footer.jsx
    PageHeader.jsx        ← reusable banner used at the top of each page
    Slideshow.jsx         ← reusable photo slideshow used on the Gallery page
  pages/
    Dashboard.jsx          /
    HistoryPage.jsx        /history
    AnnouncementsPage.jsx  /announcements
    EventsPage.jsx         /events
    UpdatesPage.jsx        /updates
    ApplyPage.jsx          /apply
    InstructorsPage.jsx    /instructors
    CoursesPage.jsx        /courses
    TimelinePage.jsx       /timeline
    AlumniPage.jsx         /alumni
    GalleryPage.jsx        /gallery
    LocationPage.jsx       /location
    ContactPage.jsx        /contact
  App.jsx                 ← routes + page shell
  main.jsx                ← React entry point
  index.css               ← Tailwind + design tokens
```

## Editing content

Open `src/data/content.js` — every announcement, event, instructor, course, term, alumni entry,
gallery image, and contact detail is defined there as plain JS objects/arrays. Edit the values;
no component code needs to change for content updates.

Gallery and instructor photos currently point to placeholder Unsplash URLs — replace with your own
image paths (e.g. `/images/instructors/reyes.jpg` placed in `public/images/...`) when ready.

The application form and contact form are currently front-end only (no backend submission wired up).
To connect them to a real backend, replace the `handleSubmit` functions in `ApplyPage.jsx` and
`ContactPage.jsx` with an API call (e.g. `fetch('/api/apply', { method: 'POST', body: ... })`).

## Design tokens

Colors and fonts are defined in `tailwind.config.js` (`academic` = primary blue scale, `gold` = accent,
`ink` = near-black text). Fonts: Fraunces (headings) + Inter (body) + JetBrains Mono (eyebrow labels),
loaded via Google Fonts in `index.html`.
