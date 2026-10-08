# Product Image System

Build-time helper for the Sahana Technologies website. It scans the product
database in `script.js`, searches [Wikimedia Commons](https://commons.wikimedia.org)
for a reuse-permitted product photo, downloads the chosen image into a category
folder, and wires it into the product cards. The public site stays fully static
and never talks to a search service at runtime.

## Quick start

```sh
npm run find-images          # search + write report (no downloads)
npm run download-approved-images   # download auto-approved / interactively confirmed images
npm run image-report         # regenerate image-report.json / image-report.html
npm run verify-images   # check all downloaded files are valid images
```

Equivalent direct commands:

```sh
node tools/find-product-images.js --dry            # search only
node tools/find-product-images.js --download --auto-approved
node tools/find-product-images.js --report
node tools/find-product-images.js --verify
```

## Statuses

- **FOUND** — a valid image exists locally and is mapped to the product card.
- **REVIEW** — a candidate was found but needs human approval before download.
- **MISSING** — no suitable image was found.
- **FAILED** — the download/validation failed.

## Where images are stored

`assets/products/<category-folder>/<slug>.jpg` (or `.jpeg`/`.png`/`.webp`).

Category mapping (`script.js` mirrors `tools/image-sources.json`):

| Site category | Folder |
|---|---|
| processors | `cpu` |
| motherboards | `motherboard` |
| graphics | `gpu` |
| ram | `ram` |
| storage | `storage` |
| psu | `psu` |
| cases | `cases` |
| cooling | `cooling` |
| fans | `fans` |
| monitors | `monitors` |
| keyboards | `keyboards` |
| mice | `mice` |
| headsets | `headsets` |
| laptops | `laptops` |
| printers | `printers` |
| networking | `networking` |

The card renderer reads `assets/products/images.js` (generated), which maps
`product id -> local path`. If no entry exists, the card falls back to the SVG
placeholder — a broken image icon never appears.

## How filenames are generated

Brand prefixes are stripped, then the rest is lowercased and non-alphanumeric
characters become hyphens:

- Intel Core i5-12400F → `i5-12400f`
- AMD Ryzen 5 5600 → `ryzen-5-5600`
- NVIDIA GeForce RTX 4060 → `rtx-4060`
- Kingston Fury 16GB DDR4 → `kingston-fury-16gb-ddr4`

## Sources, quality and approval

Only [Wikimedia Commons](https://commons.wikimedia.org) is used as the source:
it hosts freely licensed images with machine-readable license/author metadata.
Candidates must pass size/dimension/mime validation and are confidence-scored
against the product slug with hard rejects for screenshots, video frames and
wrong platform families. Generic-token matches (e.g. a photo captioned
"Student using a laptop") are never auto-approved.

Auto-approval (no prompt) requires: trusted source, confidence ≥ 85%,
permissive license, AND the product name containing a strong model token.
Anything else lands in **REVIEW**.

- Interactive: `node tools/find-product-images.js --download` prompts
  `Download this image? (y/n)` for each REVIEW candidate.
- Batch, trusted only: `node tools/find-product-images.js --download --auto-approved`.

Every source and license is recorded in `tools/image-cache.json` and the report.
Wikimedia-compatible attribution text is stored per image in the cache.

## API key (optional)

No API key is required for the default Wikimedia source. If a paid search API is
added later, its key must live in an environment variable and **not** in
`index.html`, `script.js`, CSS or the Git repository. A template is provided in
`.env.example`; add `.env` to `.gitignore` and never commit a real secret.

## How to add a new product

1. Add the product object to the `COMPONENTS` array in `script.js`.
2. Run `npm run find-images` — the tool reads the array automatically and
   computes the category folder and filename.
3. Review the report, then download:

```sh
npm run download-approved-images
```

4. No manual wiring is required — the renderer reads the generated
   `assets/products/images.js` mapping, and also auto-calculates the path from
   category + name as a fallback.

## How to replace / remove an image

- Replace: overwrite the file under `assets/products/...` (keep the same
  filename), or delete it and re-run the finder for a new candidate.
- Force a full re-download of every found image:

```sh
node tools/find-product-images.js --download --force
```

- Good images are never overwritten automatically.

## Before publishing to GitHub Pages

```sh
node tools/find-product-images.js --verify
```

All paths are relative (`assets/products/...`) so the site works under
`https://<user>.github.io/<repo>/`. No local filesystem/`file://`/localhost
paths are used. The website functions fully even if the image finder is never
run again.