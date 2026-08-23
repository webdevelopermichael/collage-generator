import React, { useState } from 'react';
import { Mail, Clock, Send, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '../../core/i18n';

interface LegalPagesProps {
  view: 'privacy' | 'terms' | 'dmca' | 'contact';
  onNavigateHome: () => void;
  language: Language;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ view, onNavigateHome, language }) => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
          <button onClick={onNavigateHome} className="hover:text-indigo-400 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-neutral-300 capitalize">{view === 'dmca' ? 'DMCA Policy' : view}</span>
        </nav>

        {/* ── PRIVACY POLICY ────────────────────────────────────────────── */}
        {view === 'privacy' && (
          <div className="space-y-6 text-sm text-neutral-300 leading-relaxed">
            <div className="border-b border-neutral-800 pb-4">
              <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white mb-2">
                Privacy Policy & Cookie Disclosure
              </h1>
              <p className="text-xs text-neutral-500">Last updated: August 23, 2026</p>
            </div>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">1. Local Canvas Architecture & Zero Photo Storage</h2>
              <p>
                CollaGenie is architected as a client-side web application. All image manipulations, matrix crops, aspect ratio rendering, and export synthesis take place directly inside your browser utilizing the HTML5 Canvas API and local device GPU. We do not transmit, process, or store your uploaded photographs or generated collages on any remote servers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">2. Cookies, Google AdSense & Third-Party Advertising</h2>
              <p>
                We partner with Google AdSense and third-party advertising vendors to display contextual and personalized advertisements. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites on the Internet:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-400">
                <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to CollaGenie and/or other sites across the Web.</li>
                <li>Users may opt out of personalized advertising by visiting Google's <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-indigo-400 underline">Ads Settings</a>.</li>
                <li>Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-indigo-400 underline">aboutads.info</a>.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">3. Analytics & Telemetry</h2>
              <p>
                We utilize minimal, privacy-centric telemetry (such as Google Analytics / Vercel Analytics) strictly to measure page load performance, Core Web Vitals, and aggregate country-level traffic. No Personally Identifiable Information (PII) or uploaded image metadata is ever tracked.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">4. GDPR and CCPA Compliance</h2>
              <p>
                In compliance with the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you retain full rights over your data. Because we maintain a zero-knowledge, zero-storage backend for user graphics, there is no personal media to retrieve, sell, or delete from our databases.
              </p>
            </section>
          </div>
        )}

        {/* ── TERMS OF SERVICE ─────────────────────────────────────────── */}
        {view === 'terms' && (
          <div className="space-y-6 text-sm text-neutral-300 leading-relaxed">
            <div className="border-b border-neutral-800 pb-4">
              <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white mb-2">
                Terms of Service & Usage
              </h1>
              <p className="text-xs text-neutral-500">Effective Date: August 23, 2026</p>
            </div>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing or using CollaGenie Studio, you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, you must discontinue use of the platform immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">2. Intellectual Property & User Content</h2>
              <p>
                You retain 100% full ownership of all images, logos, graphics, and text overlays uploaded to or exported from CollaGenie. CollaGenie claims no intellectual property rights or ownership licenses over your exported collages.
              </p>
              <p>
                You represent and warrant that you possess all necessary rights, licenses, or fair-use permissions for any third-party images or copyrighted assets included in your compositions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">3. Prohibited Uses</h2>
              <p>
                Users agree not to use the service to generate illegal, defamatory, threatening, or infringing material, or attempt to reverse-engineer or abuse any underlying application programming interfaces.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">4. Disclaimer of Warranties</h2>
              <p>
                CollaGenie is provided "as is" without express or implied warranties of any kind. While we engineer our software to high reliability standards, we are not liable for any data loss, browser crashes, or inaccuracies resulting from service usage.
              </p>
            </section>
          </div>
        )}

        {/* ── DMCA POLICY ─────────────────────────────────────────────── */}
        {view === 'dmca' && (
          <div className="space-y-6 text-sm text-neutral-300 leading-relaxed">
            <div className="border-b border-neutral-800 pb-4">
              <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white mb-2">
                DMCA & Copyright Takedown Policy
              </h1>
              <p className="text-xs text-neutral-500">Compliance & Intellectual Property Protection</p>
            </div>

            <p>
              CollaGenie respects the intellectual property rights of creators and adheres to the Digital Millennium Copyright Act (17 U.S.C. § 512). Because CollaGenie is an entirely client-side application that does not host, distribute, or store user-uploaded media files on public servers, user collages remain strictly in the local browser cache of the creator.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">Filing a Notice of Infringement</h2>
              <p>
                If you believe that any stock asset, template, or default sample image distributed directly by CollaGenie infringes upon your copyright, please notify our Designated Copyright Agent with the following information:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-neutral-400">
                <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                <li>Identification of the material on CollaGenie that is claimed to be infringing, with sufficient detail to allow us to locate it.</li>
                <li>Your contact information (name, mailing address, telephone number, and email address).</li>
                <li>A statement that you have a good-faith belief that use of the material is not authorized by the copyright owner, its agent, or the law.</li>
              </ol>
            </section>

            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 space-y-1">
              <div className="font-bold text-white">Designated Copyright Agent:</div>
              <div>CollaGenie Legal Operations</div>
              <div>Email: <a href="mailto:dmca@collagenie.app" className="text-indigo-400 underline">dmca@collagenie.app</a> / <a href="mailto:support@collagenie.app" className="text-indigo-400 underline">support@collagenie.app</a></div>
              <div>Response Time: Within 24–48 business hours</div>
            </div>
          </div>
        )}

        {/* ── CONTACT & SUPPORT ───────────────────────────────────────── */}
        {view === 'contact' && (
          <div className="space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white mb-2">
                Contact & Support
              </h1>
              <p className="text-xs text-neutral-500">We are here to assist creators, founders, and media partners.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                <Mail className="w-4 h-4 text-indigo-400" />
                <div className="text-xs font-bold text-white">Direct Support Email</div>
                <div className="text-xs text-indigo-400">support@collagenie.app</div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                <Clock className="w-4 h-4 text-emerald-400" />
                <div className="text-xs font-bold text-white">Average Response Time</div>
                <div className="text-xs text-neutral-400">&lt; 24 business hours</div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <div className="text-xs font-bold text-white">Partnerships & Press</div>
                <div className="text-xs text-neutral-400">press@collagenie.app</div>
              </div>
            </div>

            {formSent ? (
              <div className="p-8 rounded-3xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Message Dispatched</h3>
                <p className="text-xs text-neutral-300">
                  Thank you for reaching out! Our engineering and support team will respond to your inquiry within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-400 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-400 block mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Feature suggestion, AdSense inquiry, or bug report"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your question or request..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
