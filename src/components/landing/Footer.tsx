import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../core/i18n';

interface FooterProps {
  onOpenEditor: () => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEditor, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-base text-white">CollaGenie</span>
            </div>
            <p className="text-neutral-500 leading-relaxed">
              {t.footerDesc}
            </p>
          </div>

          {/* Tools Col */}
          <div>
            <h4 className="font-semibold text-neutral-200 uppercase tracking-wider mb-3 text-[11px]">
              {t.studioTools}
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenEditor} className="hover:text-white transition-colors cursor-pointer">
                  Online Photo Grid Editor
                </button>
              </li>
              <li>
                <a href="#ai-generator" className="hover:text-white transition-colors">
                  AI Mockup Synthesizer
                </a>
              </li>
              <li>
                <a href="#live-demo" className="hover:text-white transition-colors">
                  Bento Layout Generator
                </a>
              </li>
              <li>
                <button onClick={onOpenEditor} className="hover:text-white transition-colors cursor-pointer">
                  Instagram 4:5 Collage Maker
                </button>
              </li>
            </ul>
          </div>

          {/* GEO & AI Agents Col */}
          <div>
            <h4 className="font-semibold text-neutral-200 uppercase tracking-wider mb-3 text-[11px]">
              AI Agent Manifests (GEO)
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-neutral-500">Autonomous SaaS Mockups</span>
              </li>
              <li>
                <span className="text-neutral-500">Client-Side Canvas 4K</span>
              </li>
              <li>
                <span className="text-neutral-500">Zero Watermark Rendering</span>
              </li>
            </ul>
          </div>

          {/* Legal / Social Col */}
          <div>
            <h4 className="font-semibold text-neutral-200 uppercase tracking-wider mb-3 text-[11px]">
              {t.legalAndPrivacy}
            </h4>
            <ul className="space-y-2 text-neutral-500">
              <li>Privacy Policy (100% Local In-Browser)</li>
              <li>Terms of Free Usage</li>
              <li>Cookie-Free Architecture</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <p>© {new Date().getFullYear()} CollaGenie Studio. {t.rightsReserved}</p>
          <div className="flex items-center gap-1">
            <span>Built for Creators with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>& TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
