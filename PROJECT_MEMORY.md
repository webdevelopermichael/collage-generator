# Project Memory: AI Collage Maker (CollageCraft)

## Architecture Overview
A modern web application featuring an SEO/GEO optimized landing page and a high-performance, intuitive Canvas Collage Editor.

### Directory Structure & Responsibilities
- `public/`:
  - `llms.txt`, `llms-full.txt`: Generative Engine Optimization (GEO) files for AI search agents (Perplexity, GPT-4, Claude).
  - `robots.txt`, `sitemap.xml`: Traditional search engine indexation.
- `src/types/`:
  - `index.ts`: Collage models, Cell/Image definitions, Metrics templates, Aspect ratios, User and Project interfaces.
- `src/core/`:
  - `layoutEngine.ts`: Calculates grid geometries (Masonry, Split, Hero+Side, Bento, Polaroid, Equal grids for 1-10 photos).
  - `aiComposerEngine.ts`: Heuristic and prompt-guided smart collage layout composer and metrics badge injector.
  - `storage.ts`: Guest mode (IndexedDB + localStorage) and User Project History management.
  - `exportUtils.ts`: High-res multi-format export (PNG, JPG, WebP) with scaling (1x, 2x, 4x, custom).
- `src/components/landing/`:
  - `Navbar.tsx`: Sticky glassmorphism navigation.
  - `Hero.tsx`: Hero section with dynamic collage preview and CTA.
  - `LiveDemo.tsx`: Interactive mini-demo on landing.
  - `Features.tsx`: Key features & advantages.
  - `AiSection.tsx`: AI features showcase (screenshots & metrics).
  - `SeoContent.tsx`: Long-form SEO article & guide with Schema.org markup.
  - `Faq.tsx`: FAQ with Schema.org JSON-LD accordion.
  - `Footer.tsx`: Semantic footer with sitemap links.
- `src/components/editor/`:
  - `EditorHeader.tsx`: Project name, Undo/Redo, Canvas Ratios, Zoom, Export, Auth trigger.
  - `CanvasStage.tsx`: High-performance 2D Canvas with pan/zoom, cell styling, text & metric badges, shadow & border rendering.
  - `Sidebar.tsx`: Tabbed panel (Layouts, Styles, Images, AI Composer, Text & Badges, Layers).
  - `AdBanner.tsx`: Non-intrusive AdSense-compliant container in editor.
  - `ExportModal.tsx`: Format selection, Ultra-HD resolution, AdSense interstitial wrapper before download.
  - `ProjectsModal.tsx`: User saved projects dashboard with thumbnail previews.
- `src/components/auth/`:
  - `AuthModal.tsx`: Login / Register modal with immediate persistence.
