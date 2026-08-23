import React from 'react';
import { Sparkles, Heart, ExternalLink } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../core/i18n';
import { PlatformId } from '../pages/PlatformHubPage';

interface FooterProps {
  onOpenEditor: () => void;
  onNavigatePage: (page: string) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEditor, onNavigatePage, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => onNavigatePage('home')}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-base text-white">CollaGenie</span>
            </div>
            <p className="text-neutral-500 leading-relaxed text-[11px]">
              {t.footerDesc}
            </p>
          </div>

          {/* Tools & Generator */}
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
                  Ultra-HD 4K Canvas
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Hubs */}
          <div>
            <h4 className="font-semibold text-neutral-200 uppercase tracking-wider mb-3 text-[11px]">
              Platform Hubs
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigatePage('platform-instagram')} className="hover:text-white transition-colors cursor-pointer">
                  Instagram Collages (4:5, 1:1)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('platform-tiktok')} className="hover:text-white transition-colors cursor-pointer">
                  TikTok & Reels (9:16)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('platform-saas-mockup')} className="hover:text-white transition-colors cursor-pointer">
                  SaaS Product Mockups
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('platform-pinterest')} className="hover:text-white transition-colors cursor-pointer">
                  Pinterest Pin Grids (2:3)
                </button>
              </li>
            </ul>
          </div>

          {/* Knowledge Base & About */}
          <div>
            <h4 className="font-semibold text-neutral-200 uppercase tracking-wider mb-3 text-[11px]">
              Knowledge & Company
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigatePage('about')} className="hover:text-white transition-colors cursor-pointer">
                  About CollaGenie & Tech
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('guides')} className="hover:text-white transition-colors cursor-pointer">
                  Design Guides & Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Support & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Compliance */}
          <div>
            <h4 className="font-semibold text-neutral-200 uppercase tracking-wider mb-3 text-[11px]">
              {t.legalAndPrivacy}
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigatePage('privacy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy & Cookies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('terms')} className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('dmca')} className="hover:text-white transition-colors cursor-pointer">
                  DMCA Takedown Policy
                </button>
              </li>
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
