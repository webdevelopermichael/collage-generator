import React from 'react';
import { LayoutGrid, Sparkles, Monitor, Layers, Sliders, Lock, Palette, Cpu } from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      icon: LayoutGrid,
      title: 'Smart Bento & Masonry Layouts',
      description:
        'Instantly arrange 1 to 10 photos or screenshots into balanced grids, hero showcases, polaroid cards, and asymmetric bento boxes.',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
    },
    {
      icon: Sparkles,
      title: 'AI Composition Synthesizer',
      description:
        'Upload your product screenshots and let AI automatically balance aspect ratios, typography hierarchy, and traction metrics.',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20',
    },
    {
      icon: Sliders,
      title: 'Precision Styling Controls',
      description:
        'Customize outer padding, cell gaps, corner rounding, multi-layer drop shadows, border strokes, and backdrop blur effortlessly.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    {
      icon: Monitor,
      title: 'Multi-Platform Aspect Ratios',
      description:
        'One-click sizing for Instagram Posts (1:1), Stories/Reels (9:16), Twitter/X & YouTube (16:9), Dribbble (4:3), and Print (A4, 3:2).',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      icon: Palette,
      title: 'Mesh Gradients & Themes',
      description:
        'Curated radial gradients, dark luxury backdrops, glassmorphism card styling, and solid vibrant studio backgrounds.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      icon: Lock,
      title: '100% Private & Browser-Native',
      description:
        'Your photos never leave your device. All rasterization and high-res rendering runs client-side via hardware-accelerated Canvas.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
  ];

  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-indigo-400 mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">
          Everything You Need to Create Visual Masterpieces
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg">
          Designed for creators, SaaS founders, and digital marketers who demand pixel-perfect aesthetic design without clunky software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div
              key={idx}
              className={`p-7 rounded-2xl bg-neutral-900/50 border ${f.border} hover:bg-neutral-900/80 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center ${f.color} mb-5`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{f.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
