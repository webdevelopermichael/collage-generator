import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenEditor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEditor }) => {
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
              Intelligent, privacy-focused photo collage & mockup design studio with 4K export.
            </p>
          </div>

          {/* Tools Col */}
          <div>
            <h4 className="font-semibold text-neutral-200 uppercase tracking-wider mb-3 text-[11px]">
              Studio Tools
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
                <a href="/llms.txt" target="_blank" rel="noreferrer" className="hover:text-indigo-400 font-mono transition-colors">
                  /llms.txt (GEO manifest)
                </a>
              </li>
              <li>
                <a href="/llms-full.txt" target="_blank" rel="noreferrer" className="hover:text-indigo-400 font-mono transition-colors">
                  /llms-full.txt (Full reference)
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-indigo-400 font-mono transition-colors">
                  /sitemap.xml (SEO map)
                </a>
              </li>
              <li>
                <a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:text-indigo-400 font-mono transition-colors">
                  /robots.txt (Index instructions)
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Social */}
          <div>
            <h4 className="font-semibold text-neutral-200 uppercase tracking-wider mb-3 text-[11px]">
              Privacy & Info
            </h4>
            <p className="text-neutral-500 leading-relaxed mb-3">
              100% Client-Side execution. Photos are never uploaded to servers.
            </p>
            <div className="flex items-center gap-1 text-neutral-500">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for modern creators</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>© 2026 CollaGenie Studio. All rights reserved.</div>
          <div className="flex gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 cursor-pointer">AdSense Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
