# Papier Stories Co. — Website

A complete, hand-built website for Papier Stories Co., a Toronto wedding
stationery and custom signage studio. Plain HTML, CSS and JavaScript —
no build step, no framework, nothing to install.

This README is written for someone comfortable with a computer but not
a professional developer. If a step below assumes more than that,
that's a bug in the README — get in touch with whoever built the site.

---

## 1. Project structure

```
papier-stories/
├── index.html                     Homepage
├── about.html                     About / founders / philosophy
├── services.html                  All services + packages
├── portfolio.html                 Full portfolio gallery
├── process.html                   "How we work"
├── contact.html                   Contact form
├── privacy.html / terms.html / accessibility.html
│
├── services/
│   ├── signage.html
│   ├── stationery.html
│   ├── custom-builds.html
│   └── south-asian-weddings.html
│
├── css/
│   ├── style.css                  Design tokens, reset, header/footer
│   ├── components.css             Hero, portfolio, forms, etc.
│   └── animations.css             Motion (respects reduced-motion)
│
├── js/
│   ├── config.js                  ← MOST OF YOUR EDITS HAPPEN HERE
│   ├── navigation.js               Header + mobile menu behaviour
│   ├── animations.js               Scroll reveals, hero entrance
│   ├── portfolio.js                Gallery rendering + lightbox
│   ├── testimonials.js             Testimonial carousel
│   └── forms.js                    Contact form logic
│
└── images/                        Organized by section (see below)
```

Every page is a **separate, complete HTML file** — there's no shared
template engine. That means editing the header or footer means editing
it in every file that has one (a find-and-replace across files handles
this quickly; ask a developer to script it if you're doing this often).

---

## 2. Editing brand information (name, phone, email, Instagram)

Open **`js/config.js`**. Near the top is:

```javascript
const siteConfig = {
  brandName: "Papier Stories Co.",
  tagline: "Love Stories on Paper.",
  phone: "905-906-2960",
  phoneHref: "tel:+19059062960",
  email: "info@papierstories.ca",
  instagramHandle: "@PAPIERSTORIES.CO",
  instagramUrl: "https://instagram.com/papierstories.co",
  location: "Greater Toronto Area, Ontario, Canada",
};
```

Change any value in quotes and every page that references it (footer,
contact page details, etc.) updates automatically. Phone numbers and
email links hard-coded directly in HTML (e.g. in the footer) should
also be updated by find-and-replace if you change them.

---

## 3. Changing the logo

The current logo is a **temporary typographic wordmark** (there's no
official logo file yet). It's inline SVG inside every page's `<header>`
and `<footer>`, plus standalone copies at:

```
images/logo/papier-stories-logo.svg   (full wordmark)
images/logo/papier-stories-mark.svg   (compact "PS" monogram, used as favicon)
```

To use a real logo:
1. Export it as an SVG (preferred) or PNG, ideally on a transparent background.
2. Replace `images/logo/papier-stories-logo.svg`.
3. In each HTML file, replace the inline `<svg>...</svg>` inside
   `.brand-mark` with `<img src="images/logo/papier-stories-logo.svg" alt="Papier Stories Co.">`
   (adjust the path with `../` on pages inside `services/`).

---

## 4. Replacing images

Every photo on the site is currently a **placeholder** — a soft,
paper-textured graphic with a small caption telling you what belongs
there (e.g. "Hero — Full Bleed — EDIT · REPLACE WITH BRAND PHOTO").
Nothing will ever show a broken-image icon; placeholders degrade
gracefully until replaced.

To swap one in:
1. Export your photo at a reasonable web size (a hero image around
   2000px wide is plenty; portfolio images around 1200px wide).
2. Save it into the matching folder under `images/` using a similar
   filename (e.g. `images/hero/hero-main.jpg`).
3. In the HTML, change the `src="images/hero/hero-main.svg"` to your
   new filename, and update the `alt="..."` text to describe the photo.

Folders:
```
images/hero/         Homepage hero + supporting shots
images/general/       Statement sections, CTA bands, about, process
images/services/      One image per service
images/portfolio/     The 12 gallery placeholders
images/weddings/      Featured "real wedding" story images
images/founders/      Esther & Janeesh, studio behind-the-scenes
images/instagram/     Instagram fallback grid (6 images)
```

**Image art direction tip:** the hero and several sections crop images
differently on mobile vs. desktop (`object-position` in the CSS). If a
replacement photo's most important subject isn't centered, adjust the
`object-position` value on that image's CSS rule in `components.css`.

---

## 5. Adding or editing portfolio items

Open **`js/config.js`** and find `portfolioItems`. Each entry:

```javascript
{ title: "EDIT: Wedding Story 01", category: "Signage", image: "images/portfolio/wedding-01.svg", description: "EDIT THIS DESCRIPTION" },
```

- `title` — shown as the caption in the gallery and lightbox.
- `category` — must match one you want visitors to filter by
  (currently: Signage, Stationery, South Asian Weddings, Custom
  Builds, Day-of Details). Add a new category by just typing a new
  value here — the filter buttons on `portfolio.html` build
  themselves from whatever categories exist.
- `image` — path to the photo (see section 4).

Add a new entry by copying a line and changing the values — no limit
on how many. The homepage automatically shows the **first 6** entries
in this array as "Featured Work," so put your strongest pieces first.

---

## 6. Adding or editing services

Open **`js/config.js`** and find `servicesData`. Each service has a
`title`, `short` description (shown in the interactive list), a longer
`description`, an `image`, and a `link` to its dedicated page under
`services/`. Editing this array updates both the homepage services
explorer and the `services.html` page automatically.

---

## 7. Testimonials — important

**The placeholder testimonials in `js/config.js` are NOT real reviews.**
Do not publish the site with them in place. Replace every entry in the
`testimonials` array with a verified quote from an actual couple:

```javascript
{ couple: "Their Names", date: "Month Year", quote: "Their actual words." },
```

---

## 8. Editing founders / about content

Founder names, bio and the studio story are written directly in
`about.html` (and a shorter version on `index.html`). Search for
"Esther Daniel &amp; Janeesh Mylvaganam" to find the relevant section
and edit the surrounding paragraphs directly.

---

## 9. Editing packages

`services.html` has a `<section id="packages">` with five placeholder
package rows (Signage, Signage + Florals, Stationery, Custom Builds,
Full Wedding Paper Experience). Nothing has been invented — every
price and inclusion is marked `EDIT:`. Fill these in directly in the
HTML before launch.

---

## 10. Connecting the contact form

The site is static HTML/CSS/JS, so it **cannot send email on its own**
— the browser has no way to do that securely. `js/forms.js` posts the
form data as JSON to whatever endpoint you set in `js/config.js`:

```javascript
const formConfig = {
  endpoint: "", // e.g. "https://formspree.io/f/yourFormId"
  destinationEmail: "info@papierstories.ca",
};
```

Until `endpoint` is set, the form still validates normally but shows a
message pointing visitors to email you directly — it will never fail
silently.

**Option A — Formspree (easiest):**
1. Create a free account at formspree.io and a new form.
2. Set the form's destination to `info@papierstories.ca`.
3. Copy the endpoint URL it gives you (`https://formspree.io/f/xxxxxxx`)
   into `formConfig.endpoint`.

**Option B — Netlify Forms (if hosting on Netlify):**
1. Add `data-netlify="true"` and a hidden `form-name` input to the
   `<form id="contactForm">` in `contact.html`.
2. Netlify detects the form at deploy time automatically — no endpoint
   needed in `config.js`, though you can leave `js/forms.js` as a
   progressive-enhancement layer or simplify it to a plain submit.

**Option C — EmailJS:** follow EmailJS's browser SDK docs and replace
the `fetch()` call inside `js/forms.js`'s submit handler with their
`emailjs.send()` call.

**Option D — Custom backend:** point `formConfig.endpoint` at your own
API route that accepts a JSON POST and sends mail server-side.

---

## 11. Configuring Instagram

By default, the Instagram section shows a **fallback grid** of 6
placeholder images (`instagramImages` in `js/config.js`) linking out to
your profile. To show real posts, either:
- Manually export recent post images into `images/instagram/` and
  update the array with their filenames (simplest, no API needed), or
- Replace the `.instagram-grid` rendering in `js/main.js` with a live
  embed from a service like SnapWidget or Elfsight, pasting their
  embed code into the `<section>` in each HTML file that has an
  `.instagram-grid` div.

The site never depends on a live Instagram API to function — the
fallback grid always renders.

---

## 12. Deploying the site

This is a static site — any static host works. Two easy, free options:

**Netlify:**
1. Drag the whole `papier-stories` folder onto app.netlify.com/drop, or
2. Connect a GitHub repo containing this folder and deploy from there.

**GitHub Pages:**
1. Push this folder to a GitHub repository.
2. In the repo's Settings → Pages, set the source to the `main` branch,
   root folder.
3. Your site will be live at `https://yourusername.github.io/reponame/`.

No build step is required either way — these are the final files.

---

## 13. Connecting a custom domain

Both Netlify and GitHub Pages support custom domains under their
"Domain settings":
1. Buy a domain (e.g. from Namecheap, Google Domains, or a Canadian
   registrar like Hover or Namecheap).
2. In your host's dashboard, add the domain and follow the DNS
   instructions shown (usually a CNAME or A record pointed at the
   host).
3. Update your domain's DNS records at your registrar accordingly.
   Propagation can take a few hours.

---

## 14. Enabling HTTPS

Netlify and GitHub Pages both provision free HTTPS certificates
automatically once a custom domain is connected and verified — there's
nothing to configure manually.

---

## 15. Optimizing images before upload

Before replacing a placeholder, compress your photo:
- Use [squoosh.app](https://squoosh.app) (free, in-browser) to export
  as WebP or optimized JPEG.
- Aim for under 300KB for hero/full-bleed images, under 150KB for
  portfolio and grid images.
- Keep the `width`/`height` attributes on `<img>` tags accurate to the
  image's real proportions to avoid layout shift.

---

## 16. Modifying colors

Open **`css/style.css`** and edit the `:root { ... }` block near the
top. The core palette:

```css
--color-ink:    #221D18;   /* text / dark backgrounds */
--color-paper:  #ECE4D3;   /* base background */
--color-wine:   #661F2C;   /* primary accent */
--color-brass:  #A9803F;   /* secondary accent */
```

Every color used across the whole site references these variables, so
changing a value here updates it everywhere at once.

---

## 17. Modifying typography

Also in `css/style.css`'s `:root` block:

```css
--font-display: 'Fraunces', Georgia, serif;   /* headlines */
--font-sans: 'Inter', -apple-system, sans-serif; /* body text */
```

Both fonts load from Google Fonts via the `@import` at the very top of
`style.css`. To swap a typeface, replace the Google Fonts URL and the
variable value together.

---

## 18. Exporting / backing up the project

This entire folder **is** the project — there's no compiled output to
generate. To back it up or hand it off, just copy the whole
`papier-stories` folder (or zip it) and share it.

---

## 19. Troubleshooting

**Fonts look like a generic serif/sans-serif, not the intended ones.**
Check your internet connection — fonts load from Google Fonts and
need it on first load (they're cached after that).

**A page's navigation doesn't highlight the current page.**
`js/navigation.js` matches the current page against each nav link's
`href`. If you renamed a file, make sure the `href`s pointing to it
were updated too.

**Images show a small caption instead of a real photo.**
That's expected until you replace the placeholder — see section 4.

**The contact form shows "This form isn't connected to an inbox yet."**
Expected until you set `formConfig.endpoint` — see section 10.

**Mobile menu won't close / scroll is stuck.**
This happens if `<body>` still has `overflow: hidden` from an
interrupted script — hard-refresh the page. If it persists after a
recent edit to `js/navigation.js`, check for a JavaScript error in the
browser console (right-click → Inspect → Console).

**A new portfolio or service item I added isn't showing up.**
Double check the entry in `js/config.js` doesn't have a trailing comma
error or unmatched quote — a small JavaScript syntax mistake will
silently stop that whole file from running. The browser console
(Inspect → Console) will show a red error pointing at the line.

---

Built to a WCAG 2.2 AA-minded standard, with keyboard support
throughout, reduced-motion support, and no dependency on any single
external API to remain functional. Replace every `EDIT:` marker in
the content before launch.
#   P a p i e r - S t o r i e s - C o  
 