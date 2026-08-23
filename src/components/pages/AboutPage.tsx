import React from 'react';
import { Sparkles, Shield, Cpu, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../../core/i18n';

interface AboutPageProps {
  onOpenEditor: () => void;
  onNavigateHome: () => void;
  language: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEditor, onNavigateHome, language }) => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
          <button onClick={onNavigateHome} className="hover:text-indigo-400 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-neutral-300">About & Technology</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Creator Tools</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
            About CollaGenie Studio
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            CollaGenie is an intelligent, hardware-accelerated photo collage maker and SaaS product mockup studio running 100% inside your web browser.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            Our Mission & Core Philosophy
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Visual storytelling is essential for creators, SaaS founders, indie hackers, and digital marketers. However, traditional graphic editors are often slow, require steep subscriptions, or add obtrusive watermarks.
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            We built CollaGenie to democratize high-converting design mockups and bento layouts. Our goal is to provide a free, privacy-first, zero-friction canvas where users can generate 4K-quality imagery in seconds without any sign-up barriers or watermark penalties.
          </p>
        </div>

        {/* Core Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Client-Side Canvas 2D</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              All rasterization, image filters, and matrix transformations run directly on your device GPU via HTML5 Canvas and WebGL, guaranteeing sub-millisecond response times.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Zero-Logs & Privacy</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Your photos never upload to remote servers. Images remain stored in temporary browser memory or local IndexedDB, providing complete privacy compliance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Adaptive Bento Grids</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Dynamic aspect-ratio matching algorithms automatically balance slot geometry, spacing gaps, and metric badges across mobile, tablet, and ultra-wide screens.
            </p>
          </div>
        </div>

        {/* Team & Background */}
        <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <h2 className="text-xl font-heading font-bold text-white">
            Engineering & Product Standards
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Developed by a passionate team of web engineers and visual designers, CollaGenie adheres to modern Web Standards, strict WCAG accessibility guidelines, and Core Web Vitals optimization. We continuously audit our platform to ensure instant load times and seamless cross-platform touch gestures on mobile devices.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-300 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full-Spectrum 4K Ultra-HD Export</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Cross-Platform Web Share API Integration</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Unrestricted Custom Dimensions up to 10,000px</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>GDPR & CCPA Compliant Zero-Storage Architecture</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <button
            onClick={onOpenEditor}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 transition-all cursor-pointer hover:scale-105"
          >
            <span>Launch CollaGenie Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
