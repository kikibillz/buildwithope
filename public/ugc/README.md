# AI UGC Creator portfolio

The standalone page is served at `/ugc/`. Vite copies this folder into `dist/ugc/` during the existing build. It uses the portfolio's existing video files and needs no new dependencies.

## Add a video

1. Upload your MP4 and a JPG or WebP poster to `public/videos/`. Use short filenames, for example `coffee-story.mp4` and `coffee-story.webp`.
2. Add an entry to `public/ugc/videos.js` with `title`, `category`, `format`, `description`, `video`, `poster`, and `label`.
3. Use `../videos/coffee-story.mp4` and `../videos/coffee-story.webp` for the paths. Use an existing category (`Beauty` or `Real estate`), or add a matching filter button in `index.html` when introducing another category.
4. Label AI-created concepts clearly. Only describe paid partnerships or performance results when they are verified.
5. Commit and deploy using the portfolio's existing hosting workflow.

Videos should be web-compatible MP4 (H.264 video with AAC audio). Keep files compressed; for larger collections use a video hosting service rather than storing large files in Git. External video URLs must be direct playable media URLs; YouTube/watch links need an embed implementation instead.

## Contact and branding

The name and email come from the existing portfolio configuration at the time this page was added. Update `index.html` if these change. All styling is isolated to `style.css`; the existing React portfolio remains separate.
