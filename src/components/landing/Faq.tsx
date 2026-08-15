import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Is CollaGenie photo collage maker completely free?',
    a: 'Yes! You can create, edit, customize layouts, use AI composition tools, and export high-resolution collages without paying any subscription fees.',
  },
  {
    q: 'Can I compose SaaS screenshot mockups with metric badges?',
    a: 'Absolutely. CollaGenie includes built-in AI layout templates designed specifically for app showcases, allowing you to attach MRR metrics, growth badges, star ratings, and user quotes.',
  },
  {
    q: 'Do I need to sign up to save my work?',
    a: 'No sign-up is required for instant autosave. Your collages are stored in your browser storage. Creating a free account lets you access multi-project history and manage unlimited saved collages across devices.',
  },
  {
    q: 'What image formats and resolutions are supported for export?',
    a: 'CollaGenie supports PNG, JPEG, and WebP exports at 1x, 2x, and 4x Ultra-HD resolutions, as well as custom pixel dimensions.',
  },
  {
    q: 'Are my uploaded photos safe and private?',
    a: 'Yes, 100%. All image cropping, filters, grid rendering, and collage synthesis happen directly inside your web browser via HTML5 Canvas. Your photos are never uploaded or saved to any external servers.',
  },
];

export const Faq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-400 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Questions & Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-400">
            Everything you need to know about our collage studio and AI generator.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-neutral-800 rounded-2xl bg-neutral-900/40 overflow-hidden transition-colors hover:border-neutral-700"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
