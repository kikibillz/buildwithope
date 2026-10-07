# Portfolio review and handover

This revision focuses the offer on candidate-tracker cleanup, workforce reporting and repeatable data workflows for HR and recruitment teams.

## Changed behaviour

- Removed unsupported savings, accuracy, financial-impact and production-reliability figures from the active portfolio and CV.
- Replaced simulated model outputs, API responses and fabricated policy retrieval with labelled project previews and a deterministic local portfolio FAQ. The FAQ makes no LLM, company-policy or confidence-score claim.
- Kept source links separate from deployment links. GitHub README/profile URLs no longer appear as standalone demos. Missing screenshots show a project-specific overview rather than another project's interface.
- Replaced the speculative ROI calculator with a scoped pilot offer. Removed public cold-email templates that invented client conversations and results.
- Updated printable, HTML and downloadable PDF CVs. Employment dates, education dates and job titles are retained from the existing repository, not independently verified; the owner should check them before applying.
- Removed blanket verification language from credential headings and production-ready labels from creative samples. Listed credential metadata and third-party links remain supplied portfolio information, not verified credentials.
- Fixed duplicate contact and theme-control IDs and misleading case-study labels.

## Completed checks

- `npm run lint` (TypeScript): passed.
- `npm run build`: passed. Vite still reports a JavaScript chunk over 500 kB; this is a performance warning, not a build failure.
- `git diff --check`: passed.
- React server-rendered page: no duplicate IDs, missing section-anchor targets or empty link targets.
- All 13 project IDs are unique; no unverified KPI array remains; repository URLs are not classified as deployment links; each case study includes limitations.
- The regenerated one-page PDF was rendered and visually inspected.
- Contact implementation reviewed: it posts to FormSubmit and handles activation, failure and direct-email fallback states.

## Checks still needed on a reachable preview

The cloud browser could not reach the local dev server (connection refused). Desktop/mobile visual layout, keyboard interactions and actual external deployment availability are not claimed as verified. Contact-message delivery has not been tested: FormSubmit may require mailbox activation. No test email or cold outreach was sent.

After a preview is available, check navigation/filtering, FAQ search/no-match/closing, each case study, PDF download, light/dark modes and 375px mobile width. Confirm every external repository/deployment exists and matches the card, and send an owner-approved contact test.

## Integration

Review this branch before merging. Merging to the production branch may trigger the existing Vercel integration. This work does not merge or deploy production.

The replacement-files archive preserves repository-relative paths. Replace those files only; do not replace the entire project with the archive. Run `npm install`, `npm run lint`, and `npm run build` afterwards. The PDF is already generated. To regenerate it, install ReportLab and ensure DejaVu Sans fonts are available, then run `python3 scripts/generate-resume-pdf.py`; the legacy TypeScript command delegates to this same generator.
