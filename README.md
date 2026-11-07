# Build with Ope

Opeyemi Olamiju’s engineering portfolio and AI UGC creative studio.

- Main portfolio: https://buildwithope.vercel.app/
- AI UGC Creator: https://buildwithope.vercel.app/ugc/

The main portfolio stays at the root. Its AI UGC navigation link and creative-studio callout open the separate `/ugc/` page, which links back to the engineering work.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. To check and build:

```sh
npm run check
npm run build
```

The Vite build writes to `dist/`. The UGC folder and videos are copied from `public/` unchanged.

## Update your work

- Engineering projects, profile, and credentials: `src/data/portfolioData.ts`.
- Main portfolio’s video section: `src/data/videoData.ts`.
- Dedicated UGC gallery: `public/ugc/videos.js`.
- UGC images and videos: put files in `public/videos/`, then reference them as `../videos/filename.mp4` from the UGC data file.
- UGC page text and email: `public/ugc/index.html`.
- Main contact email: `initialConfig.email` in `src/data/portfolioData.ts`.

See `public/ugc/README.md` for the video entry format. Category filters on the UGC page are generated automatically. Use unique IDs, compressed H.264/AAC MP4 files, and a JPG/WebP poster. Do not replace a filename with a new video unless you also intend to change every place referencing it.

## Publish through GitHub

The repository is connected to Vercel. Changes on a branch receive a preview deployment; merging to `main` triggers the production build. Check the Vercel status on the commit before considering a release complete. No paid AI service is required to view the portfolio or play uploaded videos.

## Contact and demonstrations

The main contact form uses FormSubmit and may require one-time activation by the mailbox owner. A direct email link is always provided. If delivery cannot complete, the form shows a fallback; a local browser test cannot prove mailbox delivery. Do not place private keys or service credentials in browser code.

The interactive BI dashboards use illustrative sample data. Their outputs demonstrate interface behavior and calculations, rather than live company reporting. The terminal walkthrough is also illustrative. AI video examples are labelled as portfolio concepts; do not describe them as commissioned work without confirmation.

## Maintenance checklist

After updating projects or videos, run the type check and build; visit `/` and `/ugc/` on desktop and phone; try project search, a case study, gallery filters, both video players, and the return link. Verify public project links and that the Vercel deployment reaches a successful status.
