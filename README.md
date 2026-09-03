# Noroz Hussain — Portfolio Website

A fast, dependency-free portfolio built with plain **HTML, CSS and JavaScript**,
plus a small **PHP** endpoint for the contact form. No build step, no
Node/React required — upload the folder to any web host (including basic
shared hosting) and it works.

## Folder structure

```
├── index.html              Home page (hero, about, skills, experience, education, projects teaser, contact)
├── projects.html            Full case-study page — detailed write-ups with slideable image galleries
├── gallery.html             Art gallery page with filtering + lightbox
├── 404.html                 Custom not-found page
├── css/style.css            All styling (dark/light theme, layout, animations)
├── js/content.js            ⭐ Edit this file to update skills, projects & gallery
├── js/main.js                Site behaviour (theme, nav, animations, sliders, form)
├── php/contact.php          Contact form handler (validates, emails you, logs to /data)
├── data/                    Contact-form submissions are logged here as JSON (protected from public access)
├── assets/img/               Profile photo, gallery art, project screenshots, favicon
├── assets/resume/             Downloadable resume PDF
├── robots.txt, sitemap.xml   Basic SEO
└── site.webmanifest          Browser tab/app icon metadata
```

## Updating your content

Almost everything you'll want to change lives in **`js/content.js`**:

- `roles` — the rotating titles typed in the hero ("AI Agent Engineer", etc.)
- `skills.tech` / `skills.art` — each entry is `{ name, level }` (level 0–100 = the progress bar %)
- `projects` — each entry is `{ title, subtitle, desc, tech: [...], category, link }`.
  `category` must be one of `AI`, `Web Development`, `Art`, `Character Design`, `Branding`
  (or add your own — the filter buttons on the Projects section are hard-coded in
  `index.html`, so add a matching button there if you introduce a new category).
  For a full case study on `projects.html`, add three more optional fields to the same
  entry: `slug` (used as the anchor id, e.g. `projects.html#your-slug`), `overview` (a
  longer write-up shown instead of `desc`), `features` (an array of bullet strings for
  the "Key features" list), and `images` (an array of image paths for the slideable
  gallery — omit it and the card just shows an icon instead of a slider).
- `gallery` — each entry is `{ title, category, image }`. Categories here are automatic —
  the filter buttons on `gallery.html` are generated from whatever categories you use.

To add a new project with its own case study: drop the screenshots into
`assets/img/projects/`, then add a `projects` entry in `js/content.js` with `slug`,
`overview`, `features` and `images` set — it will automatically appear on both the
homepage teaser grid and `projects.html`, with a swipeable/clickable image slider.

Text that isn't in `content.js` — the hero name/tagline, the About paragraph, the
Experience timeline, Education, and the contact info/socials — lives directly in
`index.html`. Search for the matching heading (e.g. `id="experience"`) and edit the
markup in place; it's plain HTML, no templating.

To add new gallery artwork: drop the image file into `assets/img/art/`, then add a
matching `{ title, category, image: "assets/img/art/your-file.jpg" }` entry to the
`gallery` array in `js/content.js`.

To swap the profile photo: replace `assets/img/profile.png` (keep the same filename,
or update the `src` in the hero section of `index.html`).

## Setting up the contact form

The form posts to `php/contact.php`, which:

1. Validates and sanitizes the input (name, email, subject, message).
2. Blocks obvious bots via a hidden honeypot field and basic per-IP rate limiting.
3. **Always logs the message** to `data/messages.json` first — so nothing is lost
   even before email is configured.
4. Attempts to email you via PHP's built-in `mail()` function.

**This requires a host that runs PHP** (shared hosting like Hostinger, GoDaddy,
Namecheap, cPanel hosts, etc. all support this out of the box). It will **not**
work on a plain static host (GitHub Pages, Netlify static, etc.) unless you swap
the endpoint for a form service — ask me and I can wire that up instead.

### Before going live

1. Open `php/contact.php` and confirm `TO_EMAIL` is the address you want messages
   sent to (currently `norozk123@gmail.com`).
2. Many hosts' `mail()` function only works reliably once the domain's outgoing
   mail/SPF records are set up, or may land in spam. If emails don't arrive:
   - Check `data/messages.json` on the server — every submission is saved there
     regardless of whether the email sends, so you'll never lose a message.
   - Ask your host to confirm `mail()` is enabled, or switch to SMTP via
     PHPMailer (a few-line change in `contact.php` — happy to do this once you
     tell me which host/SMTP credentials you're using).
3. The `data/` folder ships with an `.htaccess` that blocks public access on
   Apache hosts. If your host uses Nginx, ask your host to deny access to `/data/`
   at the server-config level, since `.htaccess` has no effect there.

## Theme

Dark mode is the default; the moon/sun icon in the navbar toggles light mode
and remembers the choice per-visitor (`localStorage`). Colors, fonts and spacing
are all defined as CSS custom properties at the top of `css/style.css` — change
`--cyan`, `--violet`, `--blue` there to re-theme the whole site.

## Browser support

Vanilla JS (ES5-friendly), no external runtime dependencies, uses
`IntersectionObserver` and `fetch` with graceful fallbacks — works in all
modern evergreen browsers.

## What changed vs. the previous version

The earlier build was a React/TanStack app with a Supabase backend and a
password-gated admin dashboard for editing content live. This version keeps
the same visual language (glassmorphic dark UI, neon cyan/violet gradients,
the AI+art dual identity) but trades the framework/database for a static
HTML/CSS/JS + PHP site that's simpler to host, faster to load, and easier
for anyone to edit by hand — content updates now happen by editing
`js/content.js` or the HTML directly instead of needing a database or admin
login. Added: a working typed-role hero animation, animated skill bars,
a real lightbox on the gallery, an accessible mobile menu, SEO metadata +
structured data, a 404 page, and a contact form that keeps a durable JSON
log of every message as a safety net.
