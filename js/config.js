/* ==========================================================================
   PAPIER STORIES CO. — SITE CONFIGURATION
   Edit the values below to update brand details across the whole site,
   or to add/remove services, portfolio pieces, and testimonials.
   Nothing here is fabricated data — replace placeholders with the real
   thing before launch (see README "Editing content").
   ========================================================================== */

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

// Shown on the Services page and in the homepage services explorer.
// "image" paths point at placeholder SVGs — see images/services/.
const servicesData = [
  {
    id: "custom-installations",
    title: "Custom Art Installations",
    short: "Large-scale creative installations and statement pieces designed specifically for your event.",
    description:
      "From oversized welcome moments to sculptural backdrops, we design installations built around your celebration — not pulled from a catalogue.",
    image: "images/services/custom-installations.svg",
    link: "services/custom-builds.html",
  },
  {
    id: "seating-charts",
    title: "Personalized Seating Charts",
    short: "Thoughtfully designed seating displays that become part of the overall wedding aesthetic.",
    description:
      "Seating charts deserve more than a printed list. We design them as a genuine piece of your day's visual identity, in materials that suit your space.",
    image: "images/services/seating-charts.svg",
    link: "services/custom-builds.html",
  },
  {
    id: "traditional-signs",
    title: "Traditional Wedding Signs",
    short: "Elegant signage designed to complement cultural traditions and your celebration's visual identity.",
    description:
      "Welcome signs, order-of-events, bar menus and more — designed to sit naturally within your ceremony and reception, traditional or otherwise.",
    image: "images/services/traditional-signs.svg",
    link: "services/signage.html",
  },
  {
    id: "signage-florals",
    title: "Signage + Florals",
    short: "Traditional or custom wedding signage paired with florals to create a cohesive visual experience.",
    description:
      "We collaborate closely on composition, scale and colour so your signage and florals read as one considered moment, not two separate vendors.",
    image: "images/services/signage-florals.svg",
    link: "services/signage.html",
  },
  {
    id: "signage",
    title: "Signage",
    short: "Custom and traditional signage designed to stand beautifully on its own.",
    description:
      "Mirror signs, acrylic, wood and custom-built pieces — chosen for what suits your venue and story, not what's trending.",
    image: "images/services/signage.svg",
    link: "services/signage.html",
  },
  {
    id: "prints-invitations",
    title: "Prints + Invitations",
    short: "Custom invitations, menus, handouts and table cards designed as one cohesive paper suite.",
    description:
      "Save-the-dates through day-of stationery — designed together from the start, so every piece a guest holds feels part of the same story.",
    image: "images/services/prints-invitations.svg",
    link: "services/stationery.html",
  },
];

// Portfolio grid. "category" values are used by the filter buttons on
// portfolio.html — keep them consistent with the categories listed there.
const portfolioItems = [
  { title: "EDIT: Wedding Story 01", category: "Signage", image: "images/portfolio/wedding-01.svg", description: "EDIT THIS DESCRIPTION" },
  { title: "EDIT: Wedding Story 02", category: "Stationery", image: "images/portfolio/wedding-02.svg", description: "EDIT THIS DESCRIPTION" },
  { title: "EDIT: Wedding Story 03", category: "South Asian Weddings", image: "images/portfolio/wedding-03.svg", description: "EDIT THIS DESCRIPTION" },
  { title: "EDIT: Wedding Story 04", category: "Custom Builds", image: "images/portfolio/wedding-04.svg", description: "EDIT THIS DESCRIPTION" },
  { title: "EDIT: Wedding Story 05", category: "Day-of Details", image: "images/portfolio/wedding-05.svg", description: "EDIT THIS DESCRIPTION" },
  { title: "EDIT: Wedding Story 06", category: "Signage", image: "images/portfolio/wedding-06.svg", description: "EDIT THIS DESCRIPTION" },
  { title: "EDIT: Wedding Story 07", category: "Stationery", image: "images/portfolio/wedding-07.svg", description: "EDIT THIS DESCRIPTION" },
  { title: "EDIT: Wedding Story 08", category: "South Asian Weddings", image: "images/portfolio/wedding-08.svg", description: "EDIT THIS DESCRIPTION" },
  { title: "EDIT: Wedding Story 09", category: "Custom Builds", image: "images/portfolio/wedding-09.svg", description: "EDIT THIS DESCRIPTION" },
  { title: "EDIT: Wedding Story 10", category: "Day-of Details", image: "images/portfolio/wedding-10.svg", description: "EDIT THIS DESCRIPTION" },
  { title: "EDIT: Wedding Story 11", category: "Signage", image: "images/portfolio/wedding-11.svg", description: "EDIT THIS DESCRIPTION" },
  { title: "EDIT: Wedding Story 12", category: "Stationery", image: "images/portfolio/wedding-12.svg", description: "EDIT THIS DESCRIPTION" },
];

// Testimonials are NOT real — replace every entry with a verified quote
// from an actual couple before publishing. See README "Testimonials".
const testimonials = [
  { couple: "ADD COUPLE NAME", date: "ADD DATE", quote: "ADD VERIFIED TESTIMONIAL HERE — do not publish placeholder text as a real review." },
  { couple: "ADD COUPLE NAME", date: "ADD DATE", quote: "ADD VERIFIED TESTIMONIAL HERE — do not publish placeholder text as a real review." },
  { couple: "ADD COUPLE NAME", date: "ADD DATE", quote: "ADD VERIFIED TESTIMONIAL HERE — do not publish placeholder text as a real review." },
];

// Contact form integration. The site is static HTML/CSS/JS, so it cannot
// send email on its own — point "endpoint" at a form backend and submissions
// will POST there as JSON. See README "Connecting the contact form" for
// setup steps with Formspree, Netlify Forms, or EmailJS.
const formConfig = {
  endpoint: "", // e.g. "https://formspree.io/f/yourFormId"
  destinationEmail: "info@papierstories.ca",
};

// Instagram fallback grid — replace with real post exports, or wire up
// a live embed per README "Instagram".
const instagramImages = [
  "images/instagram/insta-01.svg",
  "images/instagram/insta-02.svg",
  "images/instagram/insta-03.svg",
  "images/instagram/insta-04.svg",
  "images/instagram/insta-05.svg",
  "images/instagram/insta-06.svg",
];
