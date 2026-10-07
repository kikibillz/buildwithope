# HR reporting desk

Four working browser tools, with three featured case studies in the HR reporting desk. No employer data, client outcomes or trained-model results are implied.

## Tools and boundaries

- Workforce reporting: department and inclusive month-range filters, closing headcount, hires/exits, average-headcount turnover, four charts, audit table and CSV export. The selected-period rate is not annualised.
- Recruitment: role, department and source filters, stage/source charts, editable stages, stage-age follow-ups, CSV export and text weekly handover. Search/stage filters narrow the table; charts and handover use the wider selected cohort. Counts are snapshots, not conversions. Moving a stage resets stage age.
- Onboarding: department-filtered checklist, completion chart, explicit report date, overdue status and CSV export. Edits reset on reload. The shared employee deadline covers all pending checklist items.
- CSV cleanup: upload or paste a comma-separated CSV, validate quoted fields/column counts/headings, trim cells and lowercase email columns. Exact normalised duplicate rows are flagged; removal is opt-in. Missing cells remain blank. Before/after previews show eight records; exports include every processed row. Completely blank rows are ignored. CSV formula-like text is prefixed with an apostrophe on export. Limits: 1 MB, 5,000 data rows, 50 columns. No server upload, permanent storage, fuzzy matching or inferred missing values.

Three featured cards open the correct tool; direct hash links also select each view. Each includes a problem, dataset, approach, delivered behaviour, lesson, limitation, source file and real local browser screenshot. The existing projects remain in the searchable explorer. The main page and original personal/career data file are not changed by this upgrade.

## Validation performed

- `npm run lint` and `npm run build`: passed. Existing Vite chunk warning remains (~615 kB before gzip).
- `npm run test:hr`: passed quoted comma/newline/escaped quote and BOM parsing; malformed/duplicate headers and ragged rows; formula escaping; deduplication/missing preservation; all 105 department/month-range combinations; onboarding deadline boundaries and empty cohorts.
- DOM interaction tests passed department/date/role controls, candidate edits/reset/exports, onboarding checkboxes/export, CSV file upload, malformed input, opt-in dedupe, change-report export and hash navigation.
- Real Chromium browser checks passed desktop rendering, filters, stage edits, uploads, malformed CSV errors, downloaded CSV contents, onboarding updates, reset, direct tool anchors and PDF retrieval. All four tools were checked at 375px without overflow in the HR section. No uncaught page JavaScript errors were recorded. Keyboard tab activation, modal focus containment/Escape, mobile navigation, theme switching and the configured mail link were also checked.
- Desktop screenshots of workforce/recruitment/cleanup and a mobile cleanup screenshot were rendered and visually reviewed. Charts show fictional sample records, not employer results.
- Contact links use the configured email; no contact form message was sent. External old project deployments and FormSubmit delivery are not asserted as verified.

## Reproduce

Use Node 24 and `npm install`, then `npm run lint`, `npm run test:hr`, `npm run build`. For browser verification, install Playwright as a local test dependency (`npm install --no-save playwright`; `npx playwright install chromium`) and run `node scripts/check-hr-browser.cjs`. `HR_BROWSER_PATH` can select an already installed Chromium executable. The browser test starts and stops its own local static server; exports and screenshots remain local.

## Deployment

Updates stay on the existing draft review branch. Production is not merged. Vercel preview authentication is retained; successful build status does not itself verify a signed-in production session. Review the preview before merging.

## Final completion pass

Workforce reports now include filter-aware interpretation and a downloadable management summary. The contact flow validates a draft, opens an email app or copies the draft; it never claims delivery. Existing external demos are labelled unverified. Production JavaScript is split into separate React, animation and shared-vendor chunks without a chunk warning. Browser verification covers the added downloads and contact controls. Synthetic records remain explicitly labelled; no real business findings are invented.
