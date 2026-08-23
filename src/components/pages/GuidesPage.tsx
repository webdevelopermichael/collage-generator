import React from 'react';
import { BookOpen, Clock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../../core/i18n';

export interface GuideArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  summary: string;
  content: Array<{
    heading: string;
    paragraphs: string[];
    tips?: string[];
  }>;
}

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: 'how-to-create-aesthetic-photo-collages-2026',
    title: 'How to Create Aesthetic Photo Collages in 2026: The Complete Guide',
    category: 'Design & Aesthetics',
    readTime: '6 min read',
    author: 'CollaGenie Editorial Team',
    date: 'August 2026',
    summary: 'A step-by-step masterclass on visual hierarchy, complementary color palettes, bento box grid structures, and export settings for maximum social engagement.',
    content: [
      {
        heading: '1. The Evolution of Photo Collages: Beyond Basic Grids',
        paragraphs: [
          'In recent years, standard uniform grid collages have evolved into dynamic, asymmetrical Bento-style compositions. Audiences on Instagram, TikTok, and Pinterest respond far more positively to layouts featuring varied focal depths, negative space, and modern typography.',
          'Creating an aesthetic collage requires understanding narrative hierarchy: one primary focal image (the hero shot) anchored by two to four secondary supporting detail captures.',
        ],
        tips: [
          'Use the 70/30 rule: allocate 70% of visual weight to your main story theme and 30% to environmental texture shots.',
          'Maintain consistent color grading and temperature across all inserted photographs.',
        ],
      },
      {
        heading: '2. Understanding Negative Space and Cell Spacing (Gap)',
        paragraphs: [
          'One of the most common mistakes in collage design is overcrowding. Adding outer padding and a subtle gap (between 8px to 16px) creates breathing room and allows individual photos to stand out without competing for attention.',
          'In CollaGenie, adjusting cell rounding to 16px–24px combined with a subtle outer drop shadow immediately imparts a modern, glassmorphic look suitable for editorial magazines and luxury branding.',
        ],
      },
      {
        heading: '3. Framing and Image Fit: Cover vs. Contain',
        paragraphs: [
          'Cropping is essential when photos possess conflicting aspect ratios. However, critical details such as product edges or facial features must not be clipped inadvertently. CollaGenie includes both Fill (cover) and 1-Click Fit (contain) options, accompanied by live panning so you can adjust the framing with precision.',
        ],
      },
      {
        heading: '4. Optimizing Resolution and Export Formats for Social Feeds',
        paragraphs: [
          'Always design at double the display density (2x Retina scaling) to prevent blurriness after social media algorithmic compression. For Instagram Feed posts, 1080×1350 px (4:5) delivers the highest vertical engagement on smartphones, whereas 1080×1920 px (9:16) remains the gold standard for TikTok and Instagram Stories.',
        ],
      },
    ],
  },
  {
    slug: 'understanding-image-resolutions-retina-4k-explained',
    title: 'Understanding Image Resolutions: 1080p vs. Retina 2x vs. 4K Ultra-HD',
    category: 'Technical & Rendering',
    readTime: '7 min read',
    author: 'Graphics Engineering Lead',
    date: 'August 2026',
    summary: 'Learn how subpixel rendering, device pixel ratios (DPR), and raster scaling impact the clarity of digital collages and print posters.',
    content: [
      {
        heading: '1. Device Pixel Ratios (DPR) and Modern High-DPI Screens',
        paragraphs: [
          'Standard legacy computer monitors render images at 1x density (approximately 72–96 DPI). Modern smartphones, OLED screens, and Retina MacBooks boast Device Pixel Ratios of 2x or 3x, compressing multiple physical hardware pixels into every CSS logical pixel.',
          'If a graphic is exported strictly at 1x resolution, high-DPI screens must interpolate pixel boundaries, causing subtle blurriness and soft text edges.',
        ],
      },
      {
        heading: '2. Why CollaGenie Uses Client-Side Hardware-Accelerated 4K Canvas',
        paragraphs: [
          'CollaGenie executes all graphics rasterization directly inside your web browser using HTML5 Canvas with bilinear smoothing algorithms. When you choose 2x or 4x Ultra-HD export, the canvas multiplies logical dimensions internally before sampling source images, preserving every fine gradient and sharp serif font.',
        ],
        tips: [
          'Choose 1x (Standard) for quick sharing, email signatures, and low-bandwidth previews.',
          'Choose 2x (High-Res) for standard Instagram, Twitter, and website portfolio displays.',
          'Choose 4x (Ultra-HD) for physical poster printing, large desktop wallpapers, and press kits.',
        ],
      },
      {
        heading: '3. File Formats: When to Use PNG, JPEG, or WebP',
        paragraphs: [
          'PNG provides lossless compression and supports alpha-channel transparency, making it the ideal choice when your collage features custom rounded borders or transparent overlays. JPEG remains the most compatible format for high-photographic compositions, while WebP delivers 30% smaller file sizes at comparable visual fidelity.',
        ],
      },
    ],
  },
  {
    slug: 'how-founders-build-high-converting-saas-mockups',
    title: 'How Founders Build High-Converting SaaS Product Mockups',
    category: 'Product & Marketing',
    readTime: '8 min read',
    author: 'Growth & Product Design',
    date: 'August 2026',
    summary: 'A complete playbook on utilizing bento grids, verified traction stickers, MRR metrics, and social proof badges for Product Hunt and Twitter launches.',
    content: [
      {
        heading: '1. The Power of Visual Social Proof in Tech Marketing',
        paragraphs: [
          'Software buyers and early adopters evaluate tools in fractions of a second. Simply displaying a generic application screenshot is no longer enough. High-converting landing pages and launch announcements combine the software interface with verified social proof: customer satisfaction ratings, growth milestones, and revenue metrics.',
        ],
      },
      {
        heading: '2. Structuring an Asymmetrical Bento Showcase',
        paragraphs: [
          'The Bento Box layout—popularized by Apple and modern SaaS leaders—organizes complex product features into modular, digestible tiles. The central slot highlights your core dashboard, while surrounding cards display complementary metrics: "4.9/5 Star Rating", "$50k MRR", or "99.9% Uptime".',
        ],
        tips: [
          'Place high-contrast accent metric badges near the top-right corner to catch natural reading flow.',
          'Use dark luxury themes (slate-950, deep indigo) to accentuate colorful UI elements and data visualizations.',
        ],
      },
      {
        heading: '3. OpenGraph Social Card Optimization',
        paragraphs: [
          'When users share your application link on Twitter, LinkedIn, or Discord, the OpenGraph header image dictates click-through rates. Generating a 1200×630 px collage with CollaGenie ensures your preview displays crisply across all social graph scrapers.',
        ],
      },
    ],
  },
  {
    slug: 'client-side-privacy-zero-logs-architecture-guide',
    title: 'Client-Side Privacy: Why Local HTML5 Canvas Processing Keeps Your Photos 100% Safe',
    category: 'Privacy & Security',
    readTime: '5 min read',
    author: 'Security & Compliance Team',
    date: 'August 2026',
    summary: 'An architectural deep dive into zero-storage web applications, memory cleanup, and how client-side processing eliminates data leaks.',
    content: [
      {
        heading: '1. The Privacy Risks of Traditional Cloud-Based Image Editors',
        paragraphs: [
          'Most online graphic editors require uploading your personal photos and screenshots to remote third-party cloud servers. This exposes personal files, confidential business metrics, and proprietary mockups to potential data breaches, analytics harvesting, and unintended cloud storage persistence.',
        ],
      },
      {
        heading: '2. The CollaGenie Zero-Logs Approach',
        paragraphs: [
          'CollaGenie operates entirely client-side. When you drag photos into the studio or paste image URLs, the browser processes the binary data locally using FileReader and CanvasRenderingContext2D. No photo data is ever transmitted over the network to external APIs.',
        ],
        tips: [
          '100% GDPR, CCPA, and COPPA compliant out of the box.',
          'Zero risk of server-side data retention or unauthorized training on user assets.',
          'Complete offline functionality once the lightweight client bundle is cached in your browser.',
        ],
      },
      {
        heading: '3. Ephemeral Memory and Local Project History',
        paragraphs: [
          'Project state and layout preferences are stored strictly in your browser’s localStorage or IndexedDB. You maintain complete control over your files, with the ability to clear or export project history at any time.',
        ],
      },
    ],
  },
];

interface GuidesPageProps {
  selectedSlug?: string;
  onOpenArticle: (slug: string) => void;
  onOpenEditor: () => void;
  onNavigateHome: () => void;
  language: Language;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({
  selectedSlug,
  onOpenArticle,
  onOpenEditor,
  onNavigateHome,
  language,
}) => {
  const currentArticle = selectedSlug ? GUIDE_ARTICLES.find(a => a.slug === selectedSlug) : null;

  if (currentArticle) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Breadcrumb navigation */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
            <button onClick={onNavigateHome} className="hover:text-indigo-400 cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button onClick={() => onOpenArticle('')} className="hover:text-indigo-400 cursor-pointer">
              Guides & Blog
            </button>
            <span>/</span>
            <span className="text-neutral-300 truncate max-w-[200px] sm:max-w-none">{currentArticle.title}</span>
          </nav>

          {/* Article Header */}
          <div className="space-y-4 pb-6 border-b border-neutral-800">
            <div className="flex items-center gap-3 text-xs text-indigo-400 font-semibold">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                {currentArticle.category}
              </span>
              <span className="flex items-center gap-1 text-neutral-500">
                <Clock className="w-3.5 h-3.5" />
                {currentArticle.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight leading-tight">
              {currentArticle.title}
            </h1>

            <p className="text-base text-neutral-400 leading-relaxed">
              {currentArticle.summary}
            </p>

            <div className="flex items-center gap-4 text-xs text-neutral-500 pt-2">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                {currentArticle.author}
              </span>
              <span>•</span>
              <span>{currentArticle.date}</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="space-y-8 text-neutral-300 leading-relaxed text-sm sm:text-base">
            {currentArticle.content.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-neutral-300 leading-relaxed">
                    {p}
                  </p>
                ))}
                {sec.tips && sec.tips.length > 0 && (
                  <div className="p-4 rounded-2xl bg-neutral-900/80 border border-indigo-500/30 space-y-2 mt-4">
                    <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                      Pro Tips & Best Practices
                    </div>
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {sec.tips.map((tip, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Footer */}
          <div className="pt-8 border-t border-neutral-800 text-center space-y-4">
            <h3 className="text-lg font-bold text-white">Ready to create your collage?</h3>
            <button
              onClick={onOpenEditor}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs shadow-lg transition-all cursor-pointer hover:scale-105"
            >
              <span>Open CollaGenie Editor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
          <button onClick={onNavigateHome} className="hover:text-indigo-400 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-neutral-300">Guides & Knowledge Base</span>
        </nav>

        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articles & Design Knowledge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
            CollaGenie Guides & Tutorials
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            Comprehensive guides on mastering bento grid layouts, resolution standards, and privacy-first visual production.
          </p>
        </div>

        {/* Guides List */}
        <div className="grid grid-cols-1 gap-6">
          {GUIDE_ARTICLES.map(article => (
            <div
              key={article.slug}
              onClick={() => onOpenArticle(article.slug)}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-indigo-500/60 transition-all duration-200 cursor-pointer group space-y-3 hover:bg-neutral-900"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">
                  {article.category}
                </span>
                <span className="text-neutral-500 text-[11px] font-mono">{article.readTime}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-indigo-300 transition-colors">
                {article.title}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {article.summary}
              </p>

              <div className="flex items-center justify-between pt-2 text-xs text-neutral-500">
                <span>By {article.author} • {article.date}</span>
                <span className="text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
