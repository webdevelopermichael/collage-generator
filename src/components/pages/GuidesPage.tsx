import React from 'react';
import { BookOpen, Clock, User, ArrowRight, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
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
    slug: '5-bento-grid-mockup-layouts-to-boost-product-hunt-upvotes',
    title: '5 Bento Grid Mockup Layouts That Boosted Product Hunt Upvotes by 40%',
    category: 'SaaS Marketing & Conversion',
    readTime: '7 min read',
    author: 'CollaGenie AI Growth Team',
    date: 'August 2026',
    summary: 'A data-backed guide on designing aesthetic bento screenshot cards with verified MRR badges, user counts, and star ratings for viral launch campaigns.',
    content: [
      {
        heading: '1. Why Traditional Screenshots Fail on Modern Product Directories',
        paragraphs: [
          'Raw 16:9 full-screen desktop captures often look cluttered on mobile feeds and Product Hunt gallery cards. Today’s top launches use Bento grids: structured visual clusters that showcase core UX workflows alongside social proof.',
          'By segmenting an interface into a hero screenshot paired with 3-4 feature highlights, viewers comprehend the product’s core value proposition in under 3 seconds.',
        ],
        tips: [
          'Feature your most visually impressive feature in a dominant 2x2 hero tile.',
          'Keep contrast high between the background gradient and mockup borders.',
        ],
      },
      {
        heading: '2. The Power of Metric Badges and Trust Indicators',
        paragraphs: [
          'Embedding traction indicators (such as "+142% MRR growth", "4.9/5 Rating", or "Verified Founder") directly into the graphic frame creates instant cognitive trust before the visitor even reads the copy.',
          'CollaGenie provides built-in vector badge overlays that can be freely styled, dragged, and aligned with pixel precision on the canvas.',
        ],
      },
      {
        heading: '3. Choosing the Ideal Canvas Resolution',
        paragraphs: [
          'Product Hunt and Twitter card previews prioritize 16:9 (1920x1080) and 1200x630 dimensions. Exporting at 2x or 4K Retina resolution prevents JPEG compression artifacts on high-DPI smartphone displays.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-design-aesthetic-moodboards-and-pinterest-grids',
    title: 'How to Design Aesthetic Moodboards & High-CTR Pinterest Grids',
    category: 'Visual Storytelling',
    readTime: '6 min read',
    author: 'Elena Rostova, Lead Designer',
    date: 'August 2026',
    summary: 'Mastering the 2:3 vertical aspect ratio, complementary color matching, and asymmetrical polaroid effects for viral Pinterest pins.',
    content: [
      {
        heading: '1. The Golden 2:3 Ratio for Pinterest Viral Loops',
        paragraphs: [
          'Pinterest algorithms heavily favor vertical 1000x1500 px (2:3 ratio) imagery. When designing photo collages for fashion, architecture, or interior design, asymmetrical masonry layouts outperform standard square grids by over 60% in repin rates.',
        ],
        tips: [
          'Stick to 3-5 images per board to maintain visual cleanliness.',
          'Use warm, natural lighting tones across all inserted shots.',
        ],
      },
      {
        heading: '2. Creating Harmonious Color Gradients',
        paragraphs: [
          'Avoid harsh solid borders. Using subtle pastel or mesh gradients that borrow tones from the photo palette unifies diverse images into a cohesive aesthetic piece.',
        ],
      },
    ],
  },
  {
    slug: 'optimal-aspect-ratios-for-instagram-tiktok-and-twitter',
    title: 'Ultimate Social Media Aspect Ratio Guide (2026 Update)',
    category: 'Platform Specifications',
    readTime: '5 min read',
    author: 'Michael Pan, Technical Architect',
    date: 'August 2026',
    summary: 'Comprehensive dimension cheatsheet for 1:1, 4:5, 9:16, 16:9, and custom resolutions with compression-free export recommendations.',
    content: [
      {
        heading: '1. Why Aspect Ratio Dictates Feed Engagement',
        paragraphs: [
          'Mobile social feeds are vertically oriented. Choosing a landscape (16:9) ratio on Instagram costs you up to 40% of physical screen real estate compared to portrait (4:5). More screen area directly correlates with longer user dwell time and higher conversion rates.',
        ],
      },
      {
        heading: '2. Platform by Platform Resolution Cheatsheet',
        paragraphs: [
          'Instagram Feed: 1080×1350 px (4:5) for single posts and carousels.',
          'TikTok / Instagram Stories / YouTube Shorts: 1080×1920 px (9:16) full viewport.',
          'Twitter / X & LinkedIn Posts: 1200×675 px (16:9) or 1080×1080 px (1:1).',
          'Dribbble & Portfolio Previews: 1600×1200 px (4:3) with subtle backdrop shadow.',
        ],
      },
    ],
  },
  {
    slug: 'client-side-privacy-why-browser-canvas-processing-matters',
    title: 'Client-Side Privacy: Why Local Browser Canvas Processing Matters',
    category: 'Security & Engineering',
    readTime: '7 min read',
    author: 'Security & Cloud Engineering Team',
    date: 'August 2026',
    summary: 'How CollaGenie processes your images entirely inside browser GPU memory without ever sending files to external cloud servers.',
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
  const activeArticle = GUIDE_ARTICLES.find(a => a.slug === selectedSlug);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onOpenArticle('')}
            className={`hover:text-white transition-colors cursor-pointer ${!activeArticle ? 'text-indigo-400 font-semibold' : ''}`}
          >
            Design Guides & Blog
          </button>
          {activeArticle && (
            <>
              <span>/</span>
              <span className="text-neutral-200 truncate max-w-xs">{activeArticle.title}</span>
            </>
          )}
        </div>

        {/* ── ARTICLE VIEW ──────────────────────────────────────────────────────── */}
        {activeArticle ? (
          <article className="space-y-8 animate-in fade-in duration-300">
            <header className="space-y-4 border-b border-neutral-800/80 pb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeArticle.category}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight leading-tight">
                {activeArticle.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{activeArticle.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{activeArticle.readTime}</span>
                </div>
                <span>•</span>
                <span>{activeArticle.date}</span>
              </div>
              <p className="text-base text-neutral-300 leading-relaxed font-normal pt-2">
                {activeArticle.summary}
              </p>
            </header>

            <div className="space-y-10 text-neutral-300 text-sm leading-relaxed">
              {activeArticle.content.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="text-xl font-heading font-bold text-white tracking-tight">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-neutral-300 leading-relaxed text-sm">
                      {p}
                    </p>
                  ))}
                  {section.tips && section.tips.length > 0 && (
                    <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-2 mt-4">
                      <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Key Takeaways & Pro Tips</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-neutral-300 list-disc list-inside">
                        {section.tips.map((tip, tIdx) => (
                          <li key={tIdx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-tr from-neutral-900 to-neutral-900/60 border border-neutral-800 text-center space-y-4 mt-12">
              <h3 className="text-lg font-heading font-bold text-white">Ready to create your collage?</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Apply these principles in CollaGenie Studio. Zero watermark, 100% browser-based, instant 4K export.
              </p>
              <button
                onClick={onOpenEditor}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                <span>Launch Studio Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        ) : (
          /* ── BLOG FEED LIST ─────────────────────────────────────────────────── */
          <div className="space-y-8">
            <header className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>CollaGenie Academy & SEO Blog</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
                Design Guides & Growth Playbooks
              </h1>
              <p className="text-sm text-neutral-400">
                In-depth articles on visual storytelling, bento layouts, SaaS conversion mockups, and client-side web technology.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {GUIDE_ARTICLES.map(art => (
                <div
                  key={art.slug}
                  onClick={() => onOpenArticle(art.slug)}
                  className="p-6 rounded-3xl bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-indigo-500/40 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                        {art.category}
                      </span>
                      <span className="text-neutral-500 font-mono text-[11px]">{art.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                    <span>{art.author}</span>
                    <span className="text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
