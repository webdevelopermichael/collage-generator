import React from 'react';
import { ArrowRight, CheckCircle2, Layout, Smartphone, Share2, Sparkles } from 'lucide-react';
import { Language } from '../../core/i18n';

export type PlatformId = 'instagram' | 'tiktok' | 'saas-mockup' | 'pinterest';

interface PlatformHubPageProps {
  platformId: PlatformId;
  onOpenEditor: () => void;
  onNavigateHome: () => void;
  language: Language;
}

interface PlatformContent {
  title: string;
  badge: string;
  subtitle: string;
  idealRatio: string;
  features: Array<{ title: string; desc: string }>;
  faqs: Array<{ q: string; a: string }>;
}

const PLATFORM_DATA: Record<PlatformId, PlatformContent> = {
  instagram: {
    title: 'Instagram Photo Collage & Grid Maker (1:1, 4:5, 9:16)',
    badge: 'Instagram Visual Studio',
    subtitle: 'Create aesthetic photo grids, carousel split covers, and portrait-oriented 4:5 layouts tailored for the Instagram algorithm.',
    idealRatio: '4:5 Portrait & 1:1 Square',
    features: [
      {
        title: '4:5 Feed-Dominating Aspect Ratio',
        desc: 'Vertical 4:5 posts occupy 25% more screen real estate on mobile devices compared to square photos, driving higher engagement.',
      },
      {
        title: 'Aesthetic Film & Moodboard Presets',
        desc: 'One-click filter presets with soft grain, subtle drop shadows, and balanced negative padding to match vintage and modern curation themes.',
      },
      {
        title: 'Seamless Multi-Photo Grids',
        desc: 'Arrange from 2 to 10 photos into seamless bento blocks with customizable gap spacing and elegant rounded corners.',
      },
    ],
    faqs: [
      {
        q: 'What is the best resolution for Instagram collage posts?',
        a: 'We recommend exporting at 1080×1350 px (4:5 ratio) or 1080×1080 px (1:1 ratio) with 2x Retina rendering to ensure razor-sharp image quality after Instagram compression.',
      },
      {
        q: 'Can I add multiple photos without cropping important details?',
        a: 'Yes, CollaGenie features a 1-click Fit mode that preserves full aspect ratios without cropping, as well as interactive drag-and-pan controls inside each slot.',
      },
    ],
  },
  tiktok: {
    title: 'TikTok & Reels 9:16 Vertical Collage Creator',
    badge: 'TikTok & Short-Form Video',
    subtitle: 'Design viral 9:16 vertical split screens, before-and-after photo teasers, and thumbnail collages for TikTok, Shorts, and Reels.',
    idealRatio: '9:16 Full Screen (1080×1920)',
    features: [
      {
        title: 'Full-Height 9:16 Frame',
        desc: 'Zero black bars. Perfect pixel mapping for full-screen smartphone displays across all short-form video platforms.',
      },
      {
        title: 'Asymmetric Vertical Stacks',
        desc: 'Hero slots for main hooks combined with dual secondary detail cards for maximum viewer retention.',
      },
      {
        title: 'Instant 4K Export for Cover Frames',
        desc: 'High-res image export to use directly as video cover art, photo carousel posts, or story slides.',
      },
    ],
    faqs: [
      {
        q: 'How do I create a vertical story collage for TikTok photo mode?',
        a: 'Select the 9:16 aspect ratio preset, choose a 3 or 4-photo vertical layout, insert your media, and download the 4K Ultra-HD file for crystal clear playback.',
      },
      {
        q: 'Is there a watermark on downloaded collages?',
        a: 'No. All collages generated with CollaGenie are 100% free and have zero watermarks.',
      },
    ],
  },
  'saas-mockup': {
    title: 'SaaS Product Mockup & Feature Showcase Builder',
    badge: 'Product Marketing & Launch',
    subtitle: 'Craft high-converting product hero banners, Product Hunt gallery slides, and feature bento grids with verified metric KPI stickers.',
    idealRatio: '16:9 Landscape & 1200×630 OpenGraph',
    features: [
      {
        title: 'Social Proof & Metric Badges',
        desc: 'Attach floating MRR revenue stats, Product of the Day stickers, Lighthouse speed badges, and customer star ratings.',
      },
      {
        title: 'Modern Bento Layouts',
        desc: 'Clean asymmetric hierarchy highlighting your core software interface alongside supporting feature previews.',
      },
      {
        title: 'Dark Luxury & Mesh Themes',
        desc: 'Curated gradients and deep obsidian backgrounds tailored for developer tools, AI apps, and SaaS landing pages.',
      },
    ],
    faqs: [
      {
        q: 'Can I customize the text on metric stickers and badges?',
        a: 'Yes, you can edit badge titles, metric figures, badge colors, and scale them directly on the canvas.',
      },
      {
        q: 'What resolution is ideal for Product Hunt and Twitter/X headers?',
        a: 'We support standard 16:9 (1920×1080 px) as well as custom pixel dimensions for OpenGraph cards (1200×630 px) with 2x/4x high-DPI scaling.',
      },
    ],
  },
  pinterest: {
    title: 'Pinterest Long Pin & Aesthetic Moodboard Grids',
    badge: 'Pinterest & Visual Discovery',
    subtitle: 'Create eye-catching 2:3 vertical pins, moodboards, and multi-product collages designed to maximize saves and outbound clicks.',
    idealRatio: '2:3 Vertical & Custom Lengths',
    features: [
      {
        title: 'High-Converting 2:3 Vertical Layouts',
        desc: 'Optimized for Pinterest mobile search feeds with balanced top-to-bottom storytelling.',
      },
      {
        title: 'Unrestricted Height for Infographics',
        desc: 'Specify any custom pixel height (e.g. 1000×2500 px) for detailed multi-step guides and long-form visual recipes.',
      },
      {
        title: 'Color Palette Harmonization',
        desc: 'Select complementary gradient backdrops and border padding to create unified aesthetic boards.',
      },
    ],
    faqs: [
      {
        q: 'What is the optimal size for Pinterest Pins in 2026?',
        a: 'Pinterest recommends a 2:3 aspect ratio (1000×1500 px) or custom taller pin sizes for tutorial infographics.',
      },
      {
        q: 'Can I reposition individual images inside pin cells?',
        a: 'Yes, simply click and drag any photo inside its slot to frame the exact subject before downloading.',
      },
    ],
  },
};

export const PlatformHubPage: React.FC<PlatformHubPageProps> = ({
  platformId,
  onOpenEditor,
  onNavigateHome,
  language,
}) => {
  const content = PLATFORM_DATA[platformId] || PLATFORM_DATA.instagram;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
          <button onClick={onNavigateHome} className="hover:text-indigo-400 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span>Platforms</span>
          <span>/</span>
          <span className="text-neutral-300 capitalize">{platformId}</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
            {content.title}
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenEditor}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 transition-all cursor-pointer hover:scale-105"
            >
              <span>Create {content.badge} Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Recommended Ratio Banner */}
        <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Layout className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Recommended Canvas Ratio</div>
              <div className="text-[11px] text-neutral-400">{content.idealRatio}</div>
            </div>
          </div>
          <button
            onClick={onOpenEditor}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Apply in Studio →
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-white">
            Optimized Features & Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.features.map((feat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
          <h2 className="text-xl font-heading font-bold text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {content.faqs.map((faq, idx) => (
              <div key={idx} className="space-y-1.5 pb-4 border-b border-neutral-800/80 last:border-0 last:pb-0">
                <h4 className="text-sm font-semibold text-neutral-200">{faq.q}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
