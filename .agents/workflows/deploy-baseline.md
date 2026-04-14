---
description: Baseline instructions for any updates or deployments to the Dr. Sumit Aesthetics website.
---
# Website Deployment & Maintenance Baseline

**CRITICAL:** Every time you push changes or add new content to `drsumitaesthetics.com`, you MUST run through this checklist to ensure SEO, performance, and monitoring remain intact.

## 1. SEO & Routing Integrity
- **Sitemap Updates:** If you add a new page or blog post, you MUST add its route to the `routes` array in `vite.config.ts`. The `vite-plugin-sitemap` will automatically generate the `sitemap.xml` upon build. 
  - *Rule:* Never manually edit `dist/sitemap.xml` or `public/sitemap.xml`. It is auto-generated.
- **Pre-rendering:** Any route added to `vite.config.ts` must also be pre-rendered to static HTML for SEO. Ensuring the route is in the `vite.config.ts` array handles this automatically via `prerender.js`.

## 2. Image Optimization
- **Format:** All newly added images MUST be in modern formats like `.webp` or `.avif`, or highly compressed `.jpg`/`.png`.
- **Dimensions:** Never upload raw, full-resolution camera files. Resize images to a maximum width of 1920px (for heroes) or 800px-1200px (for content).
- **How to Convert:** Use a Node.js script with the `sharp` library for consistent results. 
  Example `convert.cjs`:
  ```javascript
  const sharp = require('sharp');
  sharp('Upload/input.png')
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile('public/output.webp');
  ```
- **Lazy Loading:** Ensure any new `<img>` tags or React image components utilize `loading="lazy"` where appropriate (if below the fold).

## 3. Schema Markup (Rich Results)
- **New Procedure Pages:** Must utilize the `<SEO>` component with `schemaType="MedicalProcedure"`. They must also include the `<FAQ>` component, which automatically injects `FAQPage` schema.
- **New Blog Posts:** Must utilize the `<SEO>` component with `schemaType="Article"`, `type="article"`, and pass the `articleDate` prop.

## 4. Google Analytics 4 (GA4)
- **Verification:** The GA4 snippet (`G-NQ6ENX37P8`) is hardcoded in the `<head>` of `index.html`. 
  - *Rule:* Do not remove or alter the `gtag` script in `index.html`. It ensures tracking across the entire SPA and all pre-rendered static pages.

## 5. Deployment Process
To publish changes to the live website:
1. Ensure your local server is stopped.
2. Run `npm run build` to compile the app and trigger the `prerender.js` script.
3. Verify that `dist/sitemap.xml` generated successfully.
4. Commit your changes via Git (`git add -A; git commit -m "..."; git push origin main`).
5. Run `npm run deploy` to push the `dist/` folder to the `gh-pages` branch.
